import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DevelopersOverview } from './pages/DevelopersOverview';
import { Compounds } from './pages/Compounds';
import { Buildings } from './pages/Buildings';
import { UnitManagement } from './pages/UnitManagement';
import { Residents } from './pages/Residents';
import { ParkingManagement } from './pages/ParkingManagement';
import { VehicleRegistry } from './pages/VehicleRegistry';
import { AccessControl } from './pages/AccessControl';
import { VisitorRules } from './pages/VisitorRules';
import { Services } from './pages/Services';
import { StaffManagement } from './pages/StaffManagement';
import { ServiceRequests } from './pages/ServiceRequests';
import { Announcements } from './pages/Announcements';
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
      { path: 'compounds', Component: Compounds },
      { path: 'buildings', Component: Buildings },
      { path: 'parking', Component: ParkingManagement },
      { path: 'access', Component: AccessControl },
      { path: 'visitor-rules', Component: VisitorRules },
      { path: 'services', Component: Services },
      { path: 'units', Component: UnitManagement },
      { path: 'residents', Component: Residents },
      { path: 'vehicles', Component: VehicleRegistry },
      { path: 'staff', Component: StaffManagement },
      { path: 'service-requests', Component: ServiceRequests },
      { path: 'announcements', Component: Announcements },
      { path: 'reports', Component: Reports },
      { path: 'audit-logs', Component: AuditLogs },
      { path: 'settings', Component: Settings },
    ],
  },
]);
