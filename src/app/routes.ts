import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DevelopersOverview } from './pages/DevelopersOverview';
import { UnitManagement } from './pages/UnitManagement';
import { ParkingManagement } from './pages/ParkingManagement';
import { VehicleRegistry } from './pages/VehicleRegistry';
import { AccessControl } from './pages/AccessControl';
import { VisitorRules } from './pages/VisitorRules';
import { AccountManagement } from './pages/AccountManagement';
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
      { path: 'accounts', Component: AccountManagement },
      { path: 'hardware', Component: Hardware },
      { path: 'reports', Component: Reports },
      { path: 'audit-logs', Component: AuditLogs },
      { path: 'settings', Component: Settings },
    ],
  },
]);
