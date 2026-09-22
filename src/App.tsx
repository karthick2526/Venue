import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExploreVenues } from './pages/public/ExploreVenues';
import { VenueDetails } from './pages/public/VenueDetails';
import { CompareVenues } from './pages/public/CompareVenues';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';

// Workspace Layout & Pages
import { WorkspaceLayout } from './components/layout/WorkspaceLayout';
import { OverviewPage } from './pages/workspace/OverviewPage';
import { EventsPage } from './pages/workspace/EventsPage';
import { EventCommandCenter } from './pages/workspace/EventCommandCenter';
import { PlannerPage } from './pages/workspace/PlannerPage';
import { GuestsPage } from './pages/workspace/GuestsPage';
import { SeatingPage } from './pages/workspace/SeatingPage';
import { VendorsPage } from './pages/workspace/VendorsPage';
import { SchedulePage } from './pages/workspace/SchedulePage';
import { BudgetPage } from './pages/workspace/BudgetPage';
import { SavedVenuesPage } from './pages/workspace/SavedVenuesPage';
import { NotificationsPage } from './pages/workspace/NotificationsPage';
import { SettingsPage } from './pages/workspace/SettingsPage';

// Admin Layout & Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminVenuesPage } from './pages/admin/AdminVenuesPage';
import { AdminVendorsPage } from './pages/admin/AdminVendorsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Showcase & Discovery Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExploreVenues />} />
            <Route path="/venues/:id" element={<VenueDetails />} />
            <Route path="/compare" element={<CompareVenues />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Authenticated Planning Workspace Routes */}
            <Route element={<WorkspaceLayout />}>
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventCommandCenter />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/guests" element={<GuestsPage />} />
              <Route path="/seating" element={<SeatingPage />} />
              <Route path="/vendors" element={<VendorsPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/saved" element={<SavedVenuesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Admin Management Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="venues" element={<AdminVenuesPage />} />
              <Route path="vendors" element={<AdminVendorsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Catch-all redirect to Landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
