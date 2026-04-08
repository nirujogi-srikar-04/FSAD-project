import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { EducationPage } from './pages/EducationPage';
import { AdminPage } from './pages/AdminPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { AdvisorDashboard } from './pages/AdvisorDashboard';
import { UserProfilePage } from './pages/UserProfilePage';

export const router = createBrowserRouter([
  { path: '/login', Component: LoginPage },
  { path: '/admin-login', Component: AdminLoginPage },
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'dashboard',
        Component: DashboardPage,
      },
      {
        path: 'recommendations',
        Component: RecommendationsPage,
      },
      {
        path: 'education',
        Component: EducationPage,
      },
      {
        path: 'advisor-dashboard',
        Component: AdvisorDashboard,
      },
      {
        path: 'admin-dashboard',
        Component: AdminPage,
      },
      {
        path: 'admin-settings',
        Component: AdminSettingsPage,
      },
      {
        path: 'profile',
        Component: UserProfilePage,
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
