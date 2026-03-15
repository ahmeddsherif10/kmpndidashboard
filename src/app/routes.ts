import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DevelopersOverview } from './pages/DevelopersOverview';
import { UnitManagement } from './pages/UnitManagement';
import { ParkingManagement } from './pages/ParkingManagement';
import { VehicleRegistry } from './pages/VehicleRegistry';
import { AccessControl } from './pages/AccessControl';
import { VisitorRules } from './pages/VisitorRules';
import { StaffManagement } from './pages/StaffManagement';
import { Announcements } from './pages/Announcements';
import { Hardware } from './pages/Hardware';
import { Reports } from './pages/Reports';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'developers', Component: DevelopersOverview },
      { path: 'units', Component: UnitManagement },
      { path: 'parking', Component: ParkingManagement },
      { path: 'vehicles', Component: VehicleRegistry },
      { path: 'access', Component: AccessControl },
      { path: 'visitor-rules', Component: VisitorRules },
      { path: 'staff', Component: StaffManagement },
      { path: 'announcements', Component: Announcements },
      { path: 'hardware', Component: Hardware },
      { path: 'reports', Component: Reports },
      { path: 'audit-logs', Component: AuditLogs },
      { path: 'settings', Component: Settings },
    ],
  },
]);
