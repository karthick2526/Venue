export type EventType = 
  | 'Wedding'
  | 'Corporate'
  | 'Birthday'
  | 'Academic'
  | 'Social'
  | 'Entertainment'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  preferredEventType?: EventType;
  currency?: string;
  createdAt: string;
}

export interface VenueAmenity {
  id: string;
  name: string;
  icon?: string;
}

export interface Venue {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  city: string;
  capacityMin: number;
  capacityMax: number;
  pricePerDay: number;
  sqFt: number;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  supportedEvents: EventType[];
  amenities: string[];
  rules: {
    curfew: string;
    outsideCatering: boolean;
    valetParking: boolean;
    soundLimitDb: number;
  };
}

export interface LayoutElement {
  id: string;
  type: 'stage' | 'table-round' | 'table-rect' | 'dancefloor' | 'photobooth' | 'entrance' | 'bar' | 'lounge' | 'dj';
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  capacity?: number;
  color?: string;
}

export interface EventLayout {
  id: string;
  eventId: string;
  name: string;
  elements: LayoutElement[];
  canvasWidth: number;
  canvasHeight: number;
  lastUpdated: string;
}

export interface Guest {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'attending' | 'pending' | 'declined';
  plusOnes: number;
  dietary?: string;
  assignedTableId?: string; // Links to LayoutElement.id
  assignedTableName?: string;
  tableAssignment?: string;
  notes?: string;
  updatedAt: string;
}

export type VendorCategory = 
  | 'Photography'
  | 'Catering'
  | 'Decoration'
  | 'Music'
  | 'Makeup'
  | 'Transport'
  | 'Other';

export interface Vendor {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  category: VendorCategory;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'completed';
  contactPerson?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  quotedCost: number;
  quoteAmount?: number;
  depositPaid: number;
  notes?: string;
}

export interface ScheduleItem {
  id: string;
  eventId: string;
  userId: string;
  time: string; // e.g. "14:00"
  endTime?: string;
  title: string;
  description?: string;
  location?: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
  leadPerson?: string;
  order: number;
}

export interface BudgetItem {
  id: string;
  eventId: string;
  userId: string;
  description: string;
  item?: string;
  category: string;
  allocated: number;
  actual: number;
  status: 'planned' | 'deposit-paid' | 'paid';
  paidStatus?: 'planned' | 'deposit-paid' | 'paid' | 'unpaid' | 'partial';
  vendorId?: string;
  notes?: string;
}

export interface EventItem {
  id: string;
  userId: string;
  title: string;
  eventType: EventType;
  date: string;
  venueId?: string;
  venueName?: string;
  venueImage?: string;
  guestTargetCount: number;
  totalBudget: number;
  notes?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  eventId?: string;
  title: string;
  message: string;
  type: 'rsvp' | 'vendor' | 'budget' | 'schedule' | 'system';
  read: boolean;
  createdAt: string;
}

export interface FavoriteVenue {
  id: string;
  userId: string;
  venueId: string;
  addedAt: string;
}

export interface PlanningProgress {
  overallScore: number; // 0 - 100
  hasVenue: boolean;
  hasLayout: boolean;
  guestRsvpPercentage: number;
  vendorBookedCount: number;
  vendorNeededCount: number;
  scheduleCount: number;
  budgetAllocatedPercentage: number;
  milestones: {
    title: string;
    completed: boolean;
    weight: number;
    description: string;
  }[];
}
