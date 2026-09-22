import { 
  User, Venue, EventItem, EventLayout, Guest, Vendor, 
  ScheduleItem, BudgetItem, NotificationItem, FavoriteVenue, PlanningProgress 
} from '../types';
import { 
  INITIAL_USERS, INITIAL_VENUES, INITIAL_EVENTS, 
  INITIAL_LAYOUTS, INITIAL_GUESTS, INITIAL_VENDORS, 
  INITIAL_SCHEDULE, INITIAL_BUDGET, INITIAL_NOTIFICATIONS, INITIAL_FAVORITES 
} from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'venueflow_users',
  VENUES: 'venueflow_venues',
  EVENTS: 'venueflow_events',
  LAYOUTS: 'venueflow_layouts',
  GUESTS: 'venueflow_guests',
  VENDORS: 'venueflow_vendors',
  SCHEDULE: 'venueflow_schedule',
  BUDGET: 'venueflow_budget',
  NOTIFICATIONS: 'venueflow_notifications',
  FAVORITES: 'venueflow_favorites',
  ACTIVE_EVENT_ID: 'venueflow_active_event_id'
};

// Initialize localStorage with initial seed if empty
function initializeStorage() {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VENUES)) {
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(INITIAL_VENUES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LAYOUTS)) {
    localStorage.setItem(STORAGE_KEYS.LAYOUTS, JSON.stringify(INITIAL_LAYOUTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GUESTS)) {
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(INITIAL_GUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VENDORS)) {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(INITIAL_VENDORS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SCHEDULE)) {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(INITIAL_SCHEDULE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BUDGET)) {
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(INITIAL_BUDGET));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(INITIAL_FAVORITES));
  }
}

initializeStorage();

function getItems<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error(`Error reading ${key}`, e);
    return [];
  }
}

function setItems<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key}`, e);
  }
}

export const api = {
  // Venues
  async getVenues(): Promise<Venue[]> {
    return getItems<Venue>(STORAGE_KEYS.VENUES);
  },

  async getVenueById(id: string): Promise<Venue | undefined> {
    const venues = getItems<Venue>(STORAGE_KEYS.VENUES);
    return venues.find(v => v.id === id);
  },

  async createVenue(venue: Omit<Venue, 'id'>): Promise<Venue> {
    const venues = getItems<Venue>(STORAGE_KEYS.VENUES);
    const newVenue: Venue = {
      ...venue,
      id: `venue_${Date.now()}`
    };
    venues.unshift(newVenue);
    setItems(STORAGE_KEYS.VENUES, venues);
    return newVenue;
  },

  async updateVenue(id: string, updates: Partial<Venue>): Promise<Venue> {
    const venues = getItems<Venue>(STORAGE_KEYS.VENUES);
    const index = venues.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Venue not found');
    venues[index] = { ...venues[index], ...updates };
    setItems(STORAGE_KEYS.VENUES, venues);
    return venues[index];
  },

  async deleteVenue(id: string): Promise<void> {
    let venues = getItems<Venue>(STORAGE_KEYS.VENUES);
    venues = venues.filter(v => v.id !== id);
    setItems(STORAGE_KEYS.VENUES, venues);
  },

  // Events
  async getEvents(userId?: string): Promise<EventItem[]> {
    const events = getItems<EventItem>(STORAGE_KEYS.EVENTS);
    if (userId) {
      return events.filter(e => e.userId === userId);
    }
    return events;
  },

  async getEventById(id: string): Promise<EventItem | undefined> {
    const events = getItems<EventItem>(STORAGE_KEYS.EVENTS);
    return events.find(e => e.id === id);
  },

  async createEvent(data: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> {
    const events = getItems<EventItem>(STORAGE_KEYS.EVENTS);
    const newEvent: EventItem = {
      ...data,
      id: `event_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    events.unshift(newEvent);
    setItems(STORAGE_KEYS.EVENTS, events);

    // Also create initial blank/default layout for event
    const layouts = getItems<EventLayout>(STORAGE_KEYS.LAYOUTS);
    layouts.push({
      id: `layout_${Date.now()}`,
      eventId: newEvent.id,
      name: `${newEvent.title} Layout`,
      canvasWidth: 900,
      canvasHeight: 600,
      lastUpdated: new Date().toISOString(),
      elements: [
        {
          id: `elem_stage_${Date.now()}`,
          type: 'stage',
          label: 'Main Stage',
          x: 320,
          y: 40,
          width: 260,
          height: 70,
          rotation: 0,
          color: '#8b5cf6'
        },
        {
          id: `elem_table_1`,
          type: 'table-round',
          label: 'Table 1',
          x: 220,
          y: 200,
          width: 80,
          height: 80,
          rotation: 0,
          capacity: 10,
          color: '#6366f1'
        },
        {
          id: `elem_table_2`,
          type: 'table-round',
          label: 'Table 2',
          x: 600,
          y: 200,
          width: 80,
          height: 80,
          rotation: 0,
          capacity: 10,
          color: '#6366f1'
        },
        {
          id: `elem_dancefloor_${Date.now()}`,
          type: 'dancefloor',
          label: 'Dance Floor',
          x: 350,
          y: 220,
          width: 200,
          height: 160,
          rotation: 0,
          color: '#ec4899'
        }
      ]
    });
    setItems(STORAGE_KEYS.LAYOUTS, layouts);

    // Add initial notification
    await api.addNotification({
      userId: newEvent.userId,
      eventId: newEvent.id,
      title: 'Event Created Successfully',
      message: `"${newEvent.title}" was set up. Next, explore floor space planning or add your guest list.`,
      type: 'system'
    });

    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<EventItem>): Promise<EventItem> {
    const events = getItems<EventItem>(STORAGE_KEYS.EVENTS);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Event not found');
    events[index] = { ...events[index], ...updates };
    setItems(STORAGE_KEYS.EVENTS, events);
    return events[index];
  },

  async deleteEvent(id: string): Promise<void> {
    let events = getItems<EventItem>(STORAGE_KEYS.EVENTS);
    events = events.filter(e => e.id !== id);
    setItems(STORAGE_KEYS.EVENTS, events);
  },

  // Layouts
  async getLayout(eventId: string): Promise<EventLayout | undefined> {
    const layouts = getItems<EventLayout>(STORAGE_KEYS.LAYOUTS);
    return layouts.find(l => l.eventId === eventId);
  },

  async saveLayout(eventId: string, layoutData: Partial<EventLayout>): Promise<EventLayout> {
    const layouts = getItems<EventLayout>(STORAGE_KEYS.LAYOUTS);
    const index = layouts.findIndex(l => l.eventId === eventId);
    if (index >= 0) {
      layouts[index] = {
        ...layouts[index],
        ...layoutData,
        lastUpdated: new Date().toISOString()
      };
      setItems(STORAGE_KEYS.LAYOUTS, layouts);
      return layouts[index];
    } else {
      const newLayout: EventLayout = {
        id: `layout_${Date.now()}`,
        eventId,
        name: layoutData.name || 'Custom Floor Plan',
        canvasWidth: layoutData.canvasWidth || 900,
        canvasHeight: layoutData.canvasHeight || 600,
        elements: layoutData.elements || [],
        lastUpdated: new Date().toISOString()
      };
      layouts.push(newLayout);
      setItems(STORAGE_KEYS.LAYOUTS, layouts);
      return newLayout;
    }
  },

  // Guests
  async getGuests(eventId: string): Promise<Guest[]> {
    const guests = getItems<Guest>(STORAGE_KEYS.GUESTS);
    return guests.filter(g => g.eventId === eventId);
  },

  createGuest(data: Omit<Guest, 'id' | 'updatedAt'>): Promise<Guest> {
    const guests = getItems<Guest>(STORAGE_KEYS.GUESTS);
    const newGuest: Guest = {
      ...data,
      id: `guest_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    guests.unshift(newGuest);
    setItems(STORAGE_KEYS.GUESTS, guests);
    return Promise.resolve(newGuest);
  },

  async addGuest(data: any): Promise<Guest> {
    return this.createGuest(data);
  },

  async updateGuest(id: string, updates: Partial<Guest>): Promise<Guest> {
    const guests = getItems<Guest>(STORAGE_KEYS.GUESTS);
    const index = guests.findIndex(g => g.id === id);
    if (index === -1) throw new Error('Guest not found');
    guests[index] = { 
      ...guests[index], 
      ...updates, 
      updatedAt: new Date().toISOString().split('T')[0] 
    };
    setItems(STORAGE_KEYS.GUESTS, guests);
    return guests[index];
  },

  async deleteGuest(id: string): Promise<void> {
    let guests = getItems<Guest>(STORAGE_KEYS.GUESTS);
    guests = guests.filter(g => g.id !== id);
    setItems(STORAGE_KEYS.GUESTS, guests);
  },

  // Vendors
  async getVendors(eventId: string): Promise<Vendor[]> {
    const vendors = getItems<Vendor>(STORAGE_KEYS.VENDORS);
    return vendors.filter(v => v.eventId === eventId);
  },

  async createVendor(data: Omit<Vendor, 'id'>): Promise<Vendor> {
    const vendors = getItems<Vendor>(STORAGE_KEYS.VENDORS);
    const cost = data.quotedCost || data.quoteAmount || 0;
    const newVendor: Vendor = {
      ...data,
      quotedCost: cost,
      quoteAmount: cost,
      id: `vendor_${Date.now()}`
    };
    vendors.push(newVendor);
    setItems(STORAGE_KEYS.VENDORS, vendors);

    // Optionally connect to budget automatically
    if (newVendor.quotedCost > 0) {
      const budgetItems = getItems<BudgetItem>(STORAGE_KEYS.BUDGET);
      budgetItems.push({
        id: `budget_${Date.now()}`,
        eventId: newVendor.eventId,
        userId: newVendor.userId,
        description: `${newVendor.name} (${newVendor.category})`,
        category: (newVendor.category as any) || 'Misc',
        allocated: newVendor.quotedCost,
        actual: newVendor.quotedCost,
        status: newVendor.depositPaid > 0 ? 'deposit-paid' : 'planned',
        vendorId: newVendor.id
      });
      setItems(STORAGE_KEYS.BUDGET, budgetItems);
    }

    return newVendor;
  },

  async addVendor(data: any): Promise<Vendor> {
    return this.createVendor(data);
  },

  async updateVendor(id: string, updates: Partial<Vendor>): Promise<Vendor> {
    const vendors = getItems<Vendor>(STORAGE_KEYS.VENDORS);
    const index = vendors.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vendor not found');
    vendors[index] = { ...vendors[index], ...updates };
    setItems(STORAGE_KEYS.VENDORS, vendors);

    // Sync corresponding budget item if present
    const budgetItems = getItems<BudgetItem>(STORAGE_KEYS.BUDGET);
    const bIndex = budgetItems.findIndex(b => b.vendorId === id);
    if (bIndex >= 0) {
      if (updates.quotedCost !== undefined) {
        budgetItems[bIndex].actual = updates.quotedCost;
      }
      if (updates.depositPaid !== undefined) {
        budgetItems[bIndex].status = updates.depositPaid >= (updates.quotedCost || budgetItems[bIndex].actual) 
          ? 'paid' 
          : updates.depositPaid > 0 
          ? 'deposit-paid' 
          : 'planned';
      }
      setItems(STORAGE_KEYS.BUDGET, budgetItems);
    }

    return vendors[index];
  },

  async deleteVendor(id: string): Promise<void> {
    let vendors = getItems<Vendor>(STORAGE_KEYS.VENDORS);
    vendors = vendors.filter(v => v.id !== id);
    setItems(STORAGE_KEYS.VENDORS, vendors);
  },

  // Schedule
  async getSchedule(eventId: string): Promise<ScheduleItem[]> {
    const schedule = getItems<ScheduleItem>(STORAGE_KEYS.SCHEDULE);
    return schedule
      .filter(s => s.eventId === eventId)
      .sort((a, b) => a.order - b.order || a.time.localeCompare(b.time));
  },

  async createScheduleItem(data: Omit<ScheduleItem, 'id'>): Promise<ScheduleItem> {
    const schedule = getItems<ScheduleItem>(STORAGE_KEYS.SCHEDULE);
    const newItem: ScheduleItem = {
      ...data,
      id: `sched_${Date.now()}`
    };
    schedule.push(newItem);
    setItems(STORAGE_KEYS.SCHEDULE, schedule);
    return newItem;
  },

  async addScheduleItem(data: any): Promise<ScheduleItem> {
    return this.createScheduleItem(data);
  },

  async updateScheduleItem(id: string, updates: Partial<ScheduleItem>): Promise<ScheduleItem> {
    const schedule = getItems<ScheduleItem>(STORAGE_KEYS.SCHEDULE);
    const index = schedule.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Schedule item not found');
    schedule[index] = { ...schedule[index], ...updates };
    setItems(STORAGE_KEYS.SCHEDULE, schedule);
    return schedule[index];
  },

  async deleteScheduleItem(id: string): Promise<void> {
    let schedule = getItems<ScheduleItem>(STORAGE_KEYS.SCHEDULE);
    schedule = schedule.filter(s => s.id !== id);
    setItems(STORAGE_KEYS.SCHEDULE, schedule);
  },

  async reorderSchedule(eventId: string, items: ScheduleItem[]): Promise<void> {
    const allSchedule = getItems<ScheduleItem>(STORAGE_KEYS.SCHEDULE);
    const otherItems = allSchedule.filter(s => s.eventId !== eventId);
    const updated = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(STORAGE_KEYS.SCHEDULE, [...otherItems, ...updated]);
  },

  // Budget
  async getBudget(eventId: string): Promise<BudgetItem[]> {
    const budget = getItems<BudgetItem>(STORAGE_KEYS.BUDGET);
    return budget.filter(b => b.eventId === eventId);
  },

  async createBudgetItem(data: Omit<BudgetItem, 'id'>): Promise<BudgetItem> {
    const budget = getItems<BudgetItem>(STORAGE_KEYS.BUDGET);
    const desc = data.description || (data as any).item || 'Expense';
    const newItem: BudgetItem = {
      ...data,
      description: desc,
      item: desc,
      id: `budget_${Date.now()}`
    };
    budget.push(newItem);
    setItems(STORAGE_KEYS.BUDGET, budget);
    return newItem;
  },

  async addBudgetItem(data: any): Promise<BudgetItem> {
    return this.createBudgetItem(data);
  },

  async updateBudgetItem(id: string, updates: Partial<BudgetItem>): Promise<BudgetItem> {
    const budget = getItems<BudgetItem>(STORAGE_KEYS.BUDGET);
    const index = budget.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Budget item not found');
    budget[index] = { ...budget[index], ...updates };
    setItems(STORAGE_KEYS.BUDGET, budget);
    return budget[index];
  },

  async deleteBudgetItem(id: string): Promise<void> {
    let budget = getItems<BudgetItem>(STORAGE_KEYS.BUDGET);
    budget = budget.filter(b => b.id !== id);
    setItems(STORAGE_KEYS.BUDGET, budget);
  },

  // Favorites
  async getFavorites(userId: string): Promise<Venue[]> {
    const favs = getItems<FavoriteVenue>(STORAGE_KEYS.FAVORITES).filter(f => f.userId === userId);
    const venues = getItems<Venue>(STORAGE_KEYS.VENUES);
    const favIds = new Set(favs.map(f => f.venueId));
    return venues.filter(v => favIds.has(v.id));
  },

  async isFavorite(userId: string, venueId: string): Promise<boolean> {
    const favs = getItems<FavoriteVenue>(STORAGE_KEYS.FAVORITES);
    return favs.some(f => f.userId === userId && f.venueId === venueId);
  },

  async toggleFavorite(userId: string, venueId: string): Promise<boolean> {
    let favs = getItems<FavoriteVenue>(STORAGE_KEYS.FAVORITES);
    const exists = favs.some(f => f.userId === userId && f.venueId === venueId);
    if (exists) {
      favs = favs.filter(f => !(f.userId === userId && f.venueId === venueId));
      setItems(STORAGE_KEYS.FAVORITES, favs);
      return false;
    } else {
      favs.push({
        id: `fav_${Date.now()}`,
        userId,
        venueId,
        addedAt: new Date().toISOString().split('T')[0]
      });
      setItems(STORAGE_KEYS.FAVORITES, favs);
      return true;
    }
  },

  // Notifications
  async getNotifications(userId: string): Promise<NotificationItem[]> {
    const notifs = getItems<NotificationItem>(STORAGE_KEYS.NOTIFICATIONS);
    return notifs.filter(n => n.userId === userId);
  },

  async markAsRead(id: string): Promise<void> {
    const notifs = getItems<NotificationItem>(STORAGE_KEYS.NOTIFICATIONS);
    const index = notifs.findIndex(n => n.id === id);
    if (index >= 0) {
      notifs[index].read = true;
      setItems(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  },

  async markAllAsRead(userId: string): Promise<void> {
    const notifs = getItems<NotificationItem>(STORAGE_KEYS.NOTIFICATIONS);
    notifs.forEach(n => {
      if (n.userId === userId) n.read = true;
    });
    setItems(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  async addNotification(data: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): Promise<NotificationItem> {
    const notifs = getItems<NotificationItem>(STORAGE_KEYS.NOTIFICATIONS);
    const newNotif: NotificationItem = {
      ...data,
      id: `notif_${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    notifs.unshift(newNotif);
    setItems(STORAGE_KEYS.NOTIFICATIONS, notifs);
    return newNotif;
  },

  // Active Event Id helper
  getActiveEventId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_EVENT_ID);
  },

  setActiveEventId(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_EVENT_ID, id);
  },

  // Dynamic Progress Calculation
  calculateProgress(
    event: EventItem,
    guests: Guest[],
    vendors: Vendor[],
    schedule: ScheduleItem[],
    budgetItems: BudgetItem[],
    layout?: EventLayout
  ): PlanningProgress {
    // Check 6 key milestones:
    // 1. Venue selected (20%)
    const hasVenue = Boolean(event.venueId);
    
    // 2. Spatial Layout created with placed elements (20%)
    const hasLayout = Boolean(layout && layout.elements && layout.elements.length >= 3);

    // 3. Guest list initialized and >= 50% confirmed (15%)
    const totalGuests = guests.length;
    const attendingGuests = guests.filter(g => g.rsvpStatus === 'attending').length;
    const guestRsvpPercentage = totalGuests > 0 ? Math.round((attendingGuests / totalGuests) * 100) : 0;
    const guestComplete = totalGuests >= 5 && attendingGuests >= 3;

    // 4. Key vendors confirmed (15%)
    const vendorBookedCount = vendors.filter(v => v.status === 'confirmed' || v.status === 'completed').length;
    const vendorNeededCount = Math.max(vendors.length, 4);
    const vendorComplete = vendorBookedCount >= 3;

    // 5. Schedule timeline built (15%)
    const scheduleCount = schedule.length;
    const scheduleComplete = scheduleCount >= 4;

    // 6. Budget tracked and under/at target (15%)
    const totalAllocated = budgetItems.reduce((acc, item) => acc + item.allocated, 0);
    const budgetAllocatedPercentage = event.totalBudget > 0 
      ? Math.min(100, Math.round((totalAllocated / event.totalBudget) * 100)) 
      : 0;
    const budgetComplete = budgetItems.length >= 3 && totalAllocated > 0;

    const milestones = [
      {
        title: 'Venue Selected',
        completed: hasVenue,
        weight: 20,
        description: hasVenue ? `${event.venueName} reserved` : 'Select and confirm a venue'
      },
      {
        title: 'Space Layout Planned',
        completed: hasLayout,
        weight: 20,
        description: hasLayout ? `${layout?.elements.length || 0} spatial zones configured` : 'Arrange stage, tables, and zones'
      },
      {
        title: 'Guest RSVPs Tracked',
        completed: guestComplete,
        weight: 15,
        description: `${attendingGuests} attending of ${totalGuests} invited`
      },
      {
        title: 'Essential Vendors Booked',
        completed: vendorComplete,
        weight: 15,
        description: `${vendorBookedCount} of ${vendors.length} vendors confirmed`
      },
      {
        title: 'Event Run of Show Built',
        completed: scheduleComplete,
        weight: 15,
        description: `${scheduleCount} timeline milestones sequenced`
      },
      {
        title: 'Budget Categorized',
        completed: budgetComplete,
        weight: 15,
        description: `${budgetAllocatedPercentage}% of total budget allocated`
      }
    ];

    const overallScore = milestones.reduce((sum, m) => sum + (m.completed ? m.weight : 0), 0);

    return {
      overallScore,
      hasVenue,
      hasLayout,
      guestRsvpPercentage,
      vendorBookedCount,
      vendorNeededCount,
      scheduleCount,
      budgetAllocatedPercentage,
      milestones
    };
  }
};
