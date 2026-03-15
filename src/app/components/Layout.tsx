import { Outlet, NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Building,
  SquareParking,
  Car,
  ShieldCheck,
  UserCheck,
  HardDrive,
  BarChart3,
  ClipboardList,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  LogOut,
  Users,
  Megaphone,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, path: '/', end: true },
  { label: 'Developers & Compounds', icon: Building, path: '/developers' },
  { label: 'Units & Residents', icon: Building2, path: '/units' },
  { label: 'Parking Management', icon: SquareParking, path: '/parking' },
  { label: 'Vehicle Registry', icon: Car, path: '/vehicles' },
  { label: 'Access Control', icon: ShieldCheck, path: '/access' },
  { label: 'Visitor Rules', icon: UserCheck, path: '/visitor-rules' },
  { label: 'Staff Management', icon: Users, path: '/staff' },
  { label: 'Announcements', icon: Megaphone, path: '/announcements' },
  { label: 'Hardware', icon: HardDrive, path: '/hardware' },
  { label: 'Reports & Analytics', icon: BarChart3, path: '/reports' },
  { label: 'Audit Logs', icon: ClipboardList, path: '/audit-logs' },
];

const BREADCRUMB_MAP: Record<string, string> = {
  '/': 'Overview',
  '/developers': 'Developers & Compounds',
  '/units': 'Units & Residents',
  '/parking': 'Parking Management',
  '/vehicles': 'Vehicle Registry',
  '/access': 'Access Control',
  '/visitor-rules': 'Visitor Pass Rules',
  '/staff': 'Staff Management',
  '/announcements': 'Announcements',
  '/hardware': 'Hardware',
  '/reports': 'Reports & Analytics',
  '/audit-logs': 'Audit Logs',
  '/settings': 'Settings',
};

const PROPERTY_DEVELOPERS = {
  'Palm Hills': ['Palm Hills Katameya', 'Palm Hills October'],
  'Sodic': ['Sodic West', 'Sodic East'],
  'Hyde Park': ['Hyde Park', 'Hyde Park New Cairo'],
  'New Zayed': ['New Zayed Phase II', 'New Zayed Phase III'],
};

const ALL_COMPOUNDS_PREFIX = 'All ';

export function Layout() {
  const location = useLocation();
  const developers = Object.keys(PROPERTY_DEVELOPERS);
  const [propertyDeveloper, setPropertyDeveloper] = useState(developers[0]);
  const [propertyDeveloperOpen, setPropertyDeveloperOpen] = useState(false);
  const [compound, setCompound] = useState(ALL_COMPOUNDS_PREFIX + developers[0]);
  const [compoundOpen, setCompoundOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const currentPage = BREADCRUMB_MAP[location.pathname] ?? 'Dashboard';

  const availableCompounds = [
    ALL_COMPOUNDS_PREFIX + propertyDeveloper,
    ...PROPERTY_DEVELOPERS[propertyDeveloper as keyof typeof PROPERTY_DEVELOPERS],
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#F4F5F7' }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full flex flex-col z-30 border-r"
        style={{
          width: 240,
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
        }}
      >
        {/* Logo + Property Developer & Compound Selector */}
        <div className="px-5 py-5 border-b" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 32, height: 32, background: '#1B4FD8' }}
            >
              <span className="text-white text-xs" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>K</span>
            </div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#111827', letterSpacing: '-0.3px' }}>
              KMPNDI
            </span>
          </div>

          {/* Property Developer Selector */}
          <div className="relative mb-3">
            <button
              onClick={() => setPropertyDeveloperOpen(!propertyDeveloperOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-left transition-colors hover:bg-gray-50"
              style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
            >
              <div>
                <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginBottom: 1 }}>Property Developer</p>
                <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }} className="truncate max-w-[140px]">{propertyDeveloper}</p>
              </div>
              <ChevronDown size={14} color="#6B7280" />
            </button>
            {propertyDeveloperOpen && (
              <div
                className="absolute left-0 right-0 top-full mt-1 rounded-[6px] shadow-lg z-50 overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                {developers.map((dev) => (
                  <button
                    key={dev}
                    onClick={() => {
                      setPropertyDeveloper(dev);
                      setCompound(ALL_COMPOUNDS_PREFIX + dev);
                      setPropertyDeveloperOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors"
                    style={{ fontSize: 13, color: dev === propertyDeveloper ? '#1B4FD8' : '#111827', fontWeight: dev === propertyDeveloper ? 500 : 400 }}
                  >
                    {dev}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compound Selector */}
          <div className="relative">
            <button
              onClick={() => setCompoundOpen(!compoundOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-left transition-colors hover:bg-gray-50"
              style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
            >
              <div>
                <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginBottom: 1 }}>Compound</p>
                <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }} className="truncate max-w-[140px]">{compound}</p>
              </div>
              <ChevronDown size={14} color="#6B7280" />
            </button>
            {compoundOpen && (
              <div
                className="absolute left-0 right-0 top-full mt-1 rounded-[6px] shadow-lg z-50 overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                {availableCompounds.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCompound(c); setCompoundOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors"
                    style={{ fontSize: 13, color: c === compound ? '#1B4FD8' : '#111827', fontWeight: c === compound ? 500 : 400 }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 8px', marginBottom: 2 }}>
            Main Menu
          </p>
          {NAV_ITEMS.map(({ label, icon: Icon, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 relative rounded-[6px] px-3 py-2 mb-0.5 transition-colors group ${
                  isActive ? '' : 'hover:bg-gray-50'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? '#EEF2FF' : undefined,
                color: isActive ? '#1B4FD8' : '#374151',
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute left-0 top-1 bottom-1 rounded-full"
                      style={{ width: 3, background: '#1B4FD8' }}
                    />
                  )}
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2 : 1.5}
                    color={isActive ? '#1B4FD8' : '#6B7280'}
                  />
                  <span style={{ fontSize: 13.5, fontWeight: isActive ? 600 : 400 }}>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="my-3 border-t" style={{ borderColor: '#E5E7EB' }} />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 relative rounded-[6px] px-3 py-2 transition-colors ${
                isActive ? '' : 'hover:bg-gray-50'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? '#EEF2FF' : undefined,
              color: isActive ? '#1B4FD8' : '#374151',
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1 bottom-1 rounded-full" style={{ width: 3, background: '#1B4FD8' }} />
                )}
                <Settings size={18} strokeWidth={isActive ? 2 : 1.5} color={isActive ? '#1B4FD8' : '#6B7280'} />
                <span style={{ fontSize: 13.5, fontWeight: isActive ? 600 : 400 }}>Settings</span>
              </>
            )}
          </NavLink>
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-3">
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{ width: 32, height: 32, background: '#1B4FD8' }}
            >
              <span className="text-white" style={{ fontSize: 12, fontWeight: 600 }}>AH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }} className="truncate">Ahmed Hassan</p>
              <p style={{ fontSize: 11, color: '#6B7280' }} className="truncate">Admin</p>
            </div>
            <button className="hover:text-red-500 transition-colors" style={{ color: '#9CA3AF' }}>
              <LogOut size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </aside>

      {/* Top Bar */}
      <header
        className="fixed top-0 right-0 flex items-center z-20 px-6"
        style={{
          left: 240,
          height: 64,
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 flex-1">
          <span style={{ fontSize: 13, color: '#6B7280' }}>KMPNDI</span>
          <ChevronRight size={14} color="#9CA3AF" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontFamily: "'Sora', sans-serif" }}>
            {currentPage}
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-[6px] px-3"
            style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, width: 240 }}
          >
            <Search size={15} color="#9CA3AF" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search units, plates, visitors…"
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 13, color: '#374151' }}
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="flex items-center justify-center rounded-[6px] transition-colors hover:bg-gray-100 relative"
              style={{ width: 36, height: 36, border: '1px solid #E5E7EB', background: '#FFFFFF' }}
            >
              <Bell size={16} color="#374151" strokeWidth={1.5} />
              <span
                className="absolute flex items-center justify-center rounded-full"
                style={{ top: 7, right: 7, width: 8, height: 8, background: '#DC2626' }}
              />
            </button>
            {notifOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-[10px] shadow-lg z-50 overflow-hidden"
                style={{ width: 320, background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: '#E5E7EB' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: '#111827' }}>Notifications</p>
                </div>
                {[
                  { title: 'Gate offline: South Entrance', time: '2 min ago', type: 'error' },
                  { title: 'Visitor limit exceeded — Unit C-203', time: '14 min ago', type: 'warning' },
                  { title: 'New vehicle registered: ABC-9921', time: '1 hr ago', type: 'info' },
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-0 cursor-pointer" style={{ borderColor: '#F3F4F6' }}>
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-1 rounded-full flex-shrink-0"
                        style={{
                          width: 8, height: 8,
                          background: n.type === 'error' ? '#DC2626' : n.type === 'warning' ? '#D97706' : '#1B4FD8',
                          marginTop: 5,
                        }}
                      />
                      <div>
                        <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{n.title}</p>
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div
            className="rounded-full flex items-center justify-center cursor-pointer"
            style={{ width: 36, height: 36, background: '#1B4FD8' }}
          >
            <span className="text-white" style={{ fontSize: 12, fontWeight: 600 }}>AH</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ marginLeft: 240, marginTop: 64, background: '#F4F5F7' }}
        onClick={() => { setPropertyDeveloperOpen(false); setCompoundOpen(false); setNotifOpen(false); }}
      >
        <Outlet />
      </main>
    </div>
  );
}
