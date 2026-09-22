import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EventItem, PlanningProgress, Venue, Guest, Vendor, ScheduleItem, BudgetItem, EventLayout } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface EventContextType {
  events: EventItem[];
  activeEvent: EventItem | null;
  venues: Venue[];
  progress: PlanningProgress | null;
  guests: Guest[];
  vendors: Vendor[];
  schedule: ScheduleItem[];
  budget: BudgetItem[];
  layout: EventLayout | null;
  loading: boolean;
  toasts: ToastState[];
  setActiveEventId: (id: string) => void;
  refreshData: () => Promise<void>;
  createEvent: (data: Omit<EventItem, 'id' | 'createdAt'>) => Promise<EventItem>;
  updateActiveEvent: (updates: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [budget, setBudget] = useState<BudgetItem[]>([]);
  const [layout, setLayout] = useState<EventLayout | null>(null);
  const [progress, setProgress] = useState<PlanningProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const refreshData = useCallback(async () => {
    if (!user) {
      setEvents([]);
      setActiveEvent(null);
      setLoading(false);
      return;
    }

    try {
      const [allVenues, userEvents] = await Promise.all([
        api.getVenues(),
        api.getEvents(user.id)
      ]);

      setVenues(allVenues);
      setEvents(userEvents);

      let currentEvent: EventItem | null = null;
      const storedActiveId = api.getActiveEventId();

      if (storedActiveId) {
        currentEvent = userEvents.find(e => e.id === storedActiveId) || null;
      }

      if (!currentEvent && userEvents.length > 0) {
        currentEvent = userEvents[0];
        api.setActiveEventId(currentEvent.id);
      }

      setActiveEvent(currentEvent);

      if (currentEvent) {
        const [gList, vList, sList, bList, lData] = await Promise.all([
          api.getGuests(currentEvent.id),
          api.getVendors(currentEvent.id),
          api.getSchedule(currentEvent.id),
          api.getBudget(currentEvent.id),
          api.getLayout(currentEvent.id)
        ]);

        setGuests(gList);
        setVendors(vList);
        setSchedule(sList);
        setBudget(bList);
        setLayout(lData || null);

        const prog = api.calculateProgress(currentEvent, gList, vList, sList, bList, lData);
        setProgress(prog);
      } else {
        setGuests([]);
        setVendors([]);
        setSchedule([]);
        setBudget([]);
        setLayout(null);
        setProgress(null);
      }
    } catch (err) {
      console.error('Error refreshing event workspace data', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const setActiveEventId = (id: string) => {
    api.setActiveEventId(id);
    const ev = events.find(e => e.id === id);
    if (ev) {
      setActiveEvent(ev);
      refreshData();
      showToast(`Switched active event to "${ev.title}"`, 'info');
    }
  };

  const createEvent = async (data: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> => {
    const created = await api.createEvent(data);
    await refreshData();
    setActiveEventId(created.id);
    showToast(`Event "${created.title}" created successfully!`);
    return created;
  };

  const updateActiveEvent = async (updates: Partial<EventItem>) => {
    if (!activeEvent) return;
    await api.updateEvent(activeEvent.id, updates);
    await refreshData();
    showToast('Event details updated');
  };

  const deleteEvent = async (id: string) => {
    await api.deleteEvent(id);
    showToast('Event deleted', 'info');
    await refreshData();
  };

  return (
    <EventContext.Provider
      value={{
        events,
        activeEvent,
        venues,
        progress,
        guests,
        vendors,
        schedule,
        budget,
        layout,
        loading,
        toasts,
        setActiveEventId,
        refreshData,
        createEvent,
        updateActiveEvent,
        deleteEvent,
        showToast,
        removeToast
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
