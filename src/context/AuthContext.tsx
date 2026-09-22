import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, EventType } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string, eventType?: EventType) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'venueflow_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to demo host Karthick so applet opens seamlessly into realistic state
        const demoUser: User = {
          id: 'user_karthick',
          name: 'Karthick Raman',
          email: 'karthick@venueflow.com',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          phone: '+1 (555) 234-5678',
          preferredEventType: 'Wedding',
          currency: 'USD',
          createdAt: '2026-01-15T08:00:00.000Z'
        };
        setUser(demoUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(demoUser));
      }
    } catch (e) {
      console.error('Error restoring user session', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const usersRaw = localStorage.getItem('venueflow_users');
      const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
      
      const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (found) {
        setUser(found);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
        return { success: true };
      }

      // If user isn't found in initial mock list, create new profile for them
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email: email.trim(),
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
        currency: 'USD',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('venueflow_users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Login failed' };
    }
  };

  const signup = async (
    name: string,
    email: string,
    _password?: string,
    eventType: EventType = 'Wedding'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const usersRaw = localStorage.getItem('venueflow_users');
      const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
      
      if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
        preferredEventType: eventType,
        currency: 'USD',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('venueflow_users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

      // Create initial first event for new signup user
      await api.createEvent({
        userId: newUser.id,
        title: `${name}'s ${eventType}`,
        eventType: eventType,
        date: '2026-11-15',
        guestTargetCount: 150,
        totalBudget: 25000,
        notes: 'Initial event space planning workspace.'
      });

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));

    const usersRaw = localStorage.getItem('venueflow_users');
    if (usersRaw) {
      const users: User[] = JSON.parse(usersRaw);
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        users[idx] = updated;
        localStorage.setItem('venueflow_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === 'admin',
        loading,
        login,
        signup,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
