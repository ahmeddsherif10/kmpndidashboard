import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { useMemo, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Car,
  Activity,
  Building2,
  Home,
  Zap,
  XCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  Layers,
} from 'lucide-react';

// ─── Static chart data ────────────────────────────────────────────────────────

const entryDataDaily = [
  { day: 'Mon', entries: 245, exits: 218 },
  { day: 'Tue', entries: 312, exits: 287 },
  { day: 'Wed', entries: 278, exits: 251 },
  { day: 'Thu', entries: 389, exits: 356 },
  { day: 'Fri', entries: 421, exits: 398 },
  { day: 'Sat', entries: 198, exits: 176 },
  { day: 'Sun', entries: 267, exits: 241 },
];

const entryDataHourly = [
  { hour: '12 AM', entries: 8, exits: 12 },
  { hour: '1 AM', entries: 5, exits: 8 },
  { hour: '2 AM', entries: 3, exits: 5 },
  { hour: '3 AM', entries: 2, exits: 3 },
  { hour: '4 AM', entries: 4, exits: 3 },
  { hour: '5 AM', entries: 12, exits: 8 },
  { hour: '6 AM', entries: 45, exits: 28 },
  { hour: '7 AM', entries: 98, exits: 67 },
  { hour: '8 AM', entries: 156, exits: 134 },
  { hour: '9 AM', entries: 89, exits: 78 },
  { hour: '10 AM', entries: 54, exits: 48 },
  { hour: '11 AM', entries: 42, exits: 38 },
  { hour: '12 PM', entries: 67, exits: 89 },
  { hour: '1 PM', entries: 58, exits: 72 },
  { hour: '2 PM', entries: 71, exits: 63 },
  { hour: '3 PM', entries: 82, exits: 58 },
  { hour: '4 PM', entries: 94, exits: 67 },
  { hour: '5 PM', entries: 134, exits: 98 },
  { hour: '6 PM', entries: 167, exits: 142 },
  { hour: '7 PM', entries: 112, exits: 156 },
  { hour: '8 PM', entries: 78, exits: 98 },
  { hour: '9 PM', entries: 52, exits: 67 },
  { hour: '10 PM', entries: 34, exits: 45 },
  { hour: '11 PM', entries: 18, exits: 28 },
];

const rushHoursData = [
  { hour: '6 AM', traffic: 45 },
  { hour: '7 AM', traffic: 98 },
  { hour: '8 AM', traffic: 156 },
  { hour: '9 AM', traffic: 89 },
  { hour: '5 PM', traffic: 134 },
  { hour: '6 PM', traffic: 167 },
  { hour: '7 PM', traffic: 112 },
];

const entriesSparkline = [{ v: 180 }, { v: 220 }, { v: 195 }, { v: 280 }, { v: 245 }, { v: 310 }, { v: 267 }];
const visitorsSparkline = [{ v: 98 }, { v: 115 }, { v: 89 }, { v: 132 }, { v: 110 }, { v: 128 }, { v: 124 }];
const alertsSparkline   = [{ v: 1 }, { v: 0 }, { v: 2 }, { v: 1 }, { v: 3 }, { v: 2 }, { v: 3 }];

const parkingDonut = [
  { name: 'Occupied', value: 78 },
  { name: 'Available', value: 22 },
];

// ─── Compound data ────────────────────────────────────────────────────────────

const DEVELOPER_COLORS: Record<string, { color: string; bg: string }> = {
  'Palm Hills': { color: '#1B4FD8', bg: '#EEF2FF' },
  'Sodic':      { color: '#16A34A', bg: '#DCFCE7' },
  'Hyde Park':  { color: '#D97706', bg: '#FEF3C7' },
  'New Zayed':  { color: '#7C3AED', bg: '#EDE9FE' },
};

type Compound = {
  id: string;
  name: string;
  developer: string;
  units: number;
  residents: number;
  occupancy: number;
  activeVisitors: number;
  entriesToday: number;
  alerts: number;
  color: string;
  bg: string;
};

const ALL_COMPOUNDS: Compound[] = [
  { id: 'phk',  name: 'Palm Hills Katameya',  developer: 'Palm Hills', units: 420, residents: 1248, occupancy: 84, activeVisitors: 47, entriesToday: 892,  alerts: 2, ...DEVELOPER_COLORS['Palm Hills'] },
  { id: 'pho',  name: 'Palm Hills October',   developer: 'Palm Hills', units: 310, residents: 876,  occupancy: 91, activeVisitors: 31, entriesToday: 604,  alerts: 0, ...DEVELOPER_COLORS['Palm Hills'] },
  { id: 'sw',   name: 'Sodic West',            developer: 'Sodic',      units: 512, residents: 1530, occupancy: 78, activeVisitors: 28, entriesToday: 710,  alerts: 1, ...DEVELOPER_COLORS['Sodic'] },
  { id: 'se',   name: 'Sodic East',            developer: 'Sodic',      units: 388, residents: 1102, occupancy: 72, activeVisitors: 19, entriesToday: 430,  alerts: 0, ...DEVELOPER_COLORS['Sodic'] },
  { id: 'hp',   name: 'Hyde Park',             developer: 'Hyde Park',  units: 680, residents: 2100, occupancy: 95, activeVisitors: 18, entriesToday: 1040, alerts: 0, ...DEVELOPER_COLORS['Hyde Park'] },
  { id: 'hpnc', name: 'Hyde Park New Cairo',   developer: 'Hyde Park',  units: 540, residents: 1640, occupancy: 88, activeVisitors: 22, entriesToday: 820,  alerts: 0, ...DEVELOPER_COLORS['Hyde Park'] },
  { id: 'nzp2', name: 'New Zayed Phase II',    developer: 'New Zayed',  units: 290, residents: 740,  occupancy: 65, activeVisitors: 12, entriesToday: 310,  alerts: 0, ...DEVELOPER_COLORS['New Zayed'] },
  { id: 'nzp3', name: 'New Zayed Phase III',   developer: 'New Zayed',  units: 180, residents: 390,  occupancy: 52, activeVisitors: 8,  entriesToday: 160,  alerts: 0, ...DEVELOPER_COLORS['New Zayed'] },
];

const DEVELOPERS = Object.keys(DEVELOPER_COLORS);

type AlertItem = {
  id: number;
  severity: 'critical' | 'warning';
  title: string;
  compound: string;
  compoundId: string;
  developer: string;
  detail: string;
  time: string;
};

const ALL_ALERTS: AlertItem[] = [
  { id: 1, severity: 'critical', title: 'Gate Offline: South Entrance',      compound: 'Palm Hills Katameya', compoundId: 'phk',  developer: 'Palm Hills', detail: 'South Gate Camera has been offline for 12 minutes. Manual inspection required.', time: '12 min ago' },
  { id: 2, severity: 'critical', title: 'Unauthorized Access Attempt',        compound: 'Palm Hills Katameya', compoundId: 'phk',  developer: 'Palm Hills', detail: 'Vehicle XPT-1190 denied entry at main gate — 3rd attempt in 30 minutes.',       time: '6 min ago' },
  { id: 3, severity: 'warning',  title: 'Pool QR Scanner Degraded',           compound: 'Sodic West',          compoundId: 'sw',   developer: 'Sodic',      detail: 'Last ping 45 seconds ago. Scanner may be unresponsive.',                        time: '45 sec ago' },
];

const recentActivity = [
  { plate: 'QAB-2841', unit: 'A-101', time: '09:54 AM', type: 'Resident',  status: 'allow' },
  { plate: 'DFC-7712', unit: 'C-302', time: '09:51 AM', type: 'Visitor',   status: 'allow' },
  { plate: 'HMN-5503', unit: 'B-207', time: '09:49 AM', type: 'Delivery',  status: 'allow' },
  { plate: 'XPT-1190', unit: '—',     time: '09:46 AM', type: 'Unknown',   status: 'deny'  },
  { plate: 'LKV-3388', unit: 'D-410', time: '09:43 AM', type: 'Resident',  status: 'allow' },
  { plate: 'RWS-9021', unit: 'A-204', time: '09:40 AM', type: 'Visitor',   status: 'allow' },
  { plate: 'TYU-6654', unit: '—',     time: '09:37 AM', type: 'Unknown',   status: 'deny'  },
  { plate: 'BNQ-4471', unit: 'E-501', time: '09:35 AM', type: 'Resident',  status: 'allow' },
];

const systemHealth = [
  { name: 'Main Gate Camera',  type: 'Camera',     zone: 'Zone A', status: 'online',  ping: '2s ago'  },
  { name: 'North Barrier',     type: 'Barrier',    zone: 'Zone A', status: 'online',  ping: '1s ago'  },
  { name: 'Pool QR Scanner',   type: 'QR Scanner', zone: 'Zone B', status: 'warning', ping: '45s ago' },
  { name: 'South Gate Camera', type: 'Camera',     zone: 'Zone B', status: 'offline', ping: '12m ago' },
  { name: 'Delivery Entrance', type: 'NFC Reader', zone: 'Street', status: 'online',  ping: '3s ago'  },
  { name: 'West LPR Camera',   type: 'LPR Camera', zone: 'Pool',   status: 'online',  ping: '1s ago'  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <LineChart width={80} height={32} data={data}>
      <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
    </LineChart>
  );
}

function KPICard({
  label, value, sub, trend, trendUp, icon: Icon, iconColor, iconBg, children,
}: {
  label: string; value: string; sub: string; trend?: string; trendUp?: boolean;
  icon: React.ElementType; iconColor: string; iconBg: string; children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] p-5 flex flex-col gap-3" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div className="flex items-start justify-between">
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: '#111827', marginTop: 4, lineHeight: 1 }}>{value}</p>
          <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{sub}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center justify-center rounded-[8px]" style={{ width: 36, height: 36, background: iconBg }}>
            <Icon size={18} color={iconColor} strokeWidth={2} />
          </div>
          {trend && (
            <div className="flex items-center gap-1">
              {trendUp ? <TrendingUp size={12} color="#16A34A" /> : <TrendingDown size={12} color="#DC2626" />}
              <span style={{ fontSize: 11, fontWeight: 500, color: trendUp ? '#16A34A' : '#DC2626' }}>{trend}</span>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

type FilterState = {
  developer: string | null;   // null = all
  compound: string | null;    // compound id, null = all / developer-level
};

function FilterBar({
  filter,
  onChange,
}: {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const [compoundOpen, setCompoundOpen] = useState(false);

  const activeDevCompounds = filter.developer
    ? ALL_COMPOUNDS.filter((c) => c.developer === filter.developer)
    : [];

  const selectedCompoundName = filter.compound
    ? ALL_COMPOUNDS.find((c) => c.id === filter.compound)?.name
    : null;

  function selectDeveloper(dev: string | null) {
    onChange({ developer: dev, compound: null });
    setCompoundOpen(false);
  }

  function selectCompound(id: string | null) {
    onChange({ ...filter, compound: id });
    setCompoundOpen(false);
  }

  return (
    <div
      className="rounded-[10px] p-4 mb-5 flex flex-wrap items-center gap-3"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* Label */}
      <div className="flex items-center gap-1.5 mr-1">
        <Layers size={14} color="#6B7280" strokeWidth={1.5} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Scope
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#E5E7EB' }} />

      {/* All pill */}
      <button
        onClick={() => selectDeveloper(null)}
        className="px-3 py-1.5 rounded-[6px] transition-all"
        style={{
          fontSize: 12,
          fontWeight: 600,
          background: !filter.developer ? '#1B4FD8' : '#F4F5F7',
          color: !filter.developer ? '#FFFFFF' : '#374151',
          border: !filter.developer ? '1px solid #1B4FD8' : '1px solid #E5E7EB',
        }}
      >
        All Compounds
      </button>

      {/* Developer pills */}
      {DEVELOPERS.map((dev) => {
        const { color, bg } = DEVELOPER_COLORS[dev];
        const isActive = filter.developer === dev;
        return (
          <button
            key={dev}
            onClick={() => selectDeveloper(isActive ? null : dev)}
            className="px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5"
            style={{
              fontSize: 12,
              fontWeight: 600,
              background: isActive ? bg : '#F4F5F7',
              color: isActive ? color : '#374151',
              border: isActive ? `1px solid ${color}` : '1px solid #E5E7EB',
            }}
          >
            <span
              className="rounded-full"
              style={{ width: 6, height: 6, background: isActive ? color : '#9CA3AF', flexShrink: 0 }}
            />
            {dev}
            <span
              className="rounded-full px-1.5"
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: isActive ? color : '#E5E7EB',
                color: isActive ? '#fff' : '#6B7280',
              }}
            >
              {ALL_COMPOUNDS.filter((c) => c.developer === dev).length}
            </span>
          </button>
        );
      })}

      {/* Compound dropdown — shown only when a developer is selected */}
      {filter.developer && (
        <>
          <div style={{ width: 1, height: 20, background: '#E5E7EB' }} />
          <div className="relative">
            <button
              onClick={() => setCompoundOpen((v) => !v)}
              className="px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-2"
              style={{
                fontSize: 12,
                fontWeight: 500,
                background: filter.compound ? '#EEF2FF' : '#F4F5F7',
                color: filter.compound ? '#1B4FD8' : '#374151',
                border: filter.compound ? '1px solid #1B4FD8' : '1px solid #E5E7EB',
              }}
            >
              <Building2 size={13} strokeWidth={1.5} />
              {selectedCompoundName ?? 'All in ' + filter.developer}
              <ChevronDown size={13} />
            </button>

            {compoundOpen && (
              <div
                className="absolute left-0 top-full mt-1 rounded-[8px] shadow-lg z-50 overflow-hidden"
                style={{ minWidth: 220, background: '#FFFFFF', border: '1px solid #E5E7EB' }}
              >
                {/* "All in developer" option */}
                <button
                  onClick={() => selectCompound(null)}
                  className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors flex items-center justify-between"
                  style={{ fontSize: 13, color: !filter.compound ? '#1B4FD8' : '#111827', fontWeight: !filter.compound ? 600 : 400, borderBottom: '1px solid #F3F4F6' }}
                >
                  All in {filter.developer}
                  {!filter.compound && <span style={{ fontSize: 10, background: '#EEF2FF', color: '#1B4FD8', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>}
                </button>
                {activeDevCompounds.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => selectCompound(c.id)}
                    className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors flex items-center justify-between"
                    style={{ fontSize: 13, color: filter.compound === c.id ? '#1B4FD8' : '#111827', fontWeight: filter.compound === c.id ? 600 : 400 }}
                  >
                    <div>
                      <span>{c.name}</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 6 }}>{c.units} units</span>
                    </div>
                    {filter.compound === c.id && (
                      <span style={{ fontSize: 10, background: '#EEF2FF', color: '#1B4FD8', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Active filter summary */}
      {(filter.developer || filter.compound) && (
        <div className="ml-auto flex items-center gap-2">
          <span
            className="px-2 py-1 rounded-[5px]"
            style={{ fontSize: 11, color: '#6B7280', background: '#F4F5F7' }}
          >
            Showing: {selectedCompoundName ?? (filter.developer ? `All ${filter.developer} compounds` : 'All')}
          </span>
          <button
            onClick={() => onChange({ developer: null, compound: null })}
            className="px-2 py-1 rounded-[5px] transition-colors hover:bg-red-50"
            style={{ fontSize: 11, color: '#DC2626', border: '1px solid #FEE2E2' }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Dashboard() {
  const [activityView, setActivityView] = useState<'daily' | 'hourly'>('daily');
  const [filter, setFilter] = useState<FilterState>({ developer: null, compound: null });

  const entryData = activityView === 'daily' ? entryDataDaily : entryDataHourly;
  const xAxisKey  = activityView === 'daily' ? 'day' : 'hour';

  // ── Derived filtered data ──────────────────────────────────────────────────

  const filteredCompounds = useMemo(() => {
    if (filter.compound) return ALL_COMPOUNDS.filter((c) => c.id === filter.compound);
    if (filter.developer) return ALL_COMPOUNDS.filter((c) => c.developer === filter.developer);
    return ALL_COMPOUNDS;
  }, [filter]);

  const filteredAlerts = useMemo(() => {
    if (filter.compound) return ALL_ALERTS.filter((a) => a.compoundId === filter.compound);
    if (filter.developer) return ALL_ALERTS.filter((a) => a.developer === filter.developer);
    return ALL_ALERTS;
  }, [filter]);

  // Aggregated KPIs from filtered compounds
  const kpi = useMemo(() => ({
    entries:  filteredCompounds.reduce((s, c) => s + c.entriesToday, 0),
    visitors: filteredCompounds.reduce((s, c) => s + c.activeVisitors, 0),
    units:    filteredCompounds.reduce((s, c) => s + c.units, 0),
    alerts:   filteredAlerts.length,
    critical: filteredAlerts.filter((a) => a.severity === 'critical').length,
    warning:  filteredAlerts.filter((a) => a.severity === 'warning').length,
    avgOcc:   filteredCompounds.length
      ? Math.round(filteredCompounds.reduce((s, c) => s + c.occupancy, 0) / filteredCompounds.length)
      : 0,
  }), [filteredCompounds, filteredAlerts]);

  const scopeLabel = useMemo(() => {
    if (filter.compound) return ALL_COMPOUNDS.find((c) => c.id === filter.compound)?.name ?? '';
    if (filter.developer) return `${filter.developer} compounds`;
    return 'all compounds';
  }, [filter]);

  return (
    <div className="p-6 max-w-[1376px] mx-auto" onClick={() => {}}>
      {/* Page Header */}
      <div className="mb-5">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Overview</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
          Real-time snapshot — {scopeLabel}
        </p>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────────────────── */}
      <FilterBar filter={filter} onChange={setFilter} />

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <KPICard
          label="Total Entries Today"
          value={kpi.entries.toLocaleString()}
          sub={`across ${filteredCompounds.length} compound${filteredCompounds.length !== 1 ? 's' : ''}`}
          trend="+12.1%"
          trendUp
          icon={Activity}
          iconColor="#1B4FD8"
          iconBg="#EEF2FF"
        >
          <Sparkline data={entriesSparkline} color="#1B4FD8" />
        </KPICard>

        <KPICard
          label="Active Visitors"
          value={kpi.visitors.toLocaleString()}
          sub={`across ${kpi.units.toLocaleString()} units`}
          trend="+8.3%"
          trendUp
          icon={Users}
          iconColor="#16A34A"
          iconBg="#DCFCE7"
        >
          <Sparkline data={visitorsSparkline} color="#16A34A" />
        </KPICard>

        <KPICard
          label="Avg Parking Occupancy"
          value={`${kpi.avgOcc}%`}
          sub="across selected scope"
          trend="-3.2%"
          trendUp={false}
          icon={Car}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        >
          <div className="flex items-center gap-3">
            <PieChart width={48} height={48}>
              <Pie
                data={[{ value: kpi.avgOcc }, { value: 100 - kpi.avgOcc }]}
                cx={20} cy={20} innerRadius={14} outerRadius={22}
                dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}
              >
                <Cell fill="#1B4FD8" />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
            <div>
              <p style={{ fontSize: 11, color: '#6B7280' }}><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#1B4FD8' }} />Occupied</p>
              <p style={{ fontSize: 11, color: '#6B7280' }}><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#E5E7EB' }} />Available</p>
            </div>
          </div>
        </KPICard>

        <KPICard
          label="Active Alerts"
          value={String(kpi.alerts)}
          sub={`${kpi.critical} critical, ${kpi.warning} warning`}
          trend={kpi.alerts > 0 ? `+${kpi.alerts}` : '0'}
          trendUp={false}
          icon={AlertTriangle}
          iconColor="#DC2626"
          iconBg="#FEE2E2"
        >
          <Sparkline data={alertsSparkline} color="#DC2626" />
        </KPICard>
      </div>

      {/* ── Compounds Overview ─────────────────────────────────────────────── */}
      <div
        className="rounded-[10px] p-5 mb-5"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Compounds Overview</h2>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
              {filteredCompounds.length} compound{filteredCompounds.length !== 1 ? 's' : ''} — {scopeLabel}
            </p>
          </div>
          <button className="flex items-center gap-1" style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500 }}>
            Manage compounds <ArrowRight size={12} />
          </button>
        </div>

        {filteredCompounds.length === 0 ? (
          <div className="flex items-center justify-center py-12" style={{ color: '#9CA3AF', fontSize: 13 }}>
            No compounds match the current filter.
          </div>
        ) : (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${Math.min(filteredCompounds.length, 4)}, 1fr)` }}
          >
            {filteredCompounds.map((c) => (
              <div
                key={c.id}
                className="rounded-[8px] p-4 cursor-pointer transition-all hover:shadow-md"
                style={{ border: '1px solid #E5E7EB', background: '#FAFAFA' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center rounded-[6px]" style={{ width: 32, height: 32, background: c.bg }}>
                    <Building2 size={16} color={c.color} strokeWidth={2} />
                  </div>
                  <span
                    className="px-1.5 py-0.5 rounded-[4px]"
                    style={{
                      fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
                      background: c.alerts > 0 ? '#FEE2E2' : '#DCFCE7',
                      color: c.alerts > 0 ? '#DC2626' : '#16A34A',
                    }}
                  >
                    {c.alerts > 0 ? `${c.alerts} alert${c.alerts > 1 ? 's' : ''}` : 'All clear'}
                  </span>
                </div>

                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600, color: '#111827' }}>{c.name}</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1, marginBottom: 10 }}>{c.developer}</p>

                <div className="grid grid-cols-2 gap-y-2 mb-3">
                  {[
                    { label: 'Units',      value: c.units.toLocaleString() },
                    { label: 'Residents',  value: c.residents.toLocaleString() },
                    { label: 'Occupancy',  value: `${c.occupancy}%` },
                    { label: 'Visitors',   value: c.activeVisitors.toString() },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-full overflow-hidden" style={{ height: 4, background: '#E5E7EB' }}>
                  <div className="rounded-full h-full" style={{ width: `${c.occupancy}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Active Alerts ──────────────────────────────────────────────────── */}
      {filteredAlerts.length > 0 && (
        <div
          className="rounded-[10px] overflow-hidden mb-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Active Alerts</h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Issues requiring attention</p>
            </div>
            <div className="flex items-center gap-2">
              {kpi.critical > 0 && (
                <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: '#FEE2E2', color: '#DC2626' }}>
                  {kpi.critical} CRITICAL
                </span>
              )}
              {kpi.warning > 0 && (
                <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: '#FEF3C7', color: '#D97706' }}>
                  {kpi.warning} WARNING
                </span>
              )}
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: '#F3F4F6' }}>
            {filteredAlerts.map((alert) => {
              const isCritical = alert.severity === 'critical';
              return (
                <div key={alert.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                    style={{ width: 32, height: 32, background: isCritical ? '#FEE2E2' : '#FEF3C7' }}
                  >
                    {isCritical
                      ? <XCircle size={16} color="#DC2626" strokeWidth={2} />
                      : <AlertTriangle size={16} color="#D97706" strokeWidth={2} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="px-1.5 py-0.5 rounded-[4px]"
                        style={{
                          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                          background: isCritical ? '#FEE2E2' : '#FEF3C7',
                          color: isCritical ? '#DC2626' : '#D97706',
                        }}
                      >
                        {alert.severity}
                      </span>
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{alert.compound}</span>
                      <span style={{ fontSize: 11, color: '#C4C9D4' }}>·</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{alert.developer}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{alert.title}</p>
                    <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{alert.detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1" style={{ color: '#9CA3AF' }}>
                      <Clock size={11} />
                      <span style={{ fontSize: 11 }}>{alert.time}</span>
                    </div>
                    <button
                      className="px-3 py-1 rounded-[5px] transition-colors hover:bg-gray-100"
                      style={{ fontSize: 11, fontWeight: 500, background: '#F4F5F7', color: '#374151', border: '1px solid #E5E7EB' }}
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No-alerts banner when filter shows a clean scope */}
      {filteredAlerts.length === 0 && filteredCompounds.length > 0 && (
        <div
          className="rounded-[10px] px-5 py-4 mb-5 flex items-center gap-3"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
        >
          <div className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: '#DCFCE7' }}>
            <Activity size={14} color="#16A34A" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D' }}>No active alerts</p>
            <p style={{ fontSize: 12, color: '#16A34A' }}>All systems in the selected scope are running normally.</p>
          </div>
        </div>
      )}

      {/* ── Entry Activity + Rush Hours ────────────────────────────────────── */}
      <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: '3fr 2fr' }}>
        {/* Entry Activity */}
        <div className="rounded-[10px] p-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Entry Activity</h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                {activityView === 'daily' ? 'Last 7 days — entries vs exits' : 'Today — hourly breakdown'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7' }}>
                {(['daily', 'hourly'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setActivityView(v)}
                    className="px-3 py-1 rounded-[4px] transition-all capitalize"
                    style={{
                      fontSize: 12, fontWeight: 500,
                      background: activityView === v ? '#FFFFFF' : 'transparent',
                      color: activityView === v ? '#111827' : '#6B7280',
                      boxShadow: activityView === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded" style={{ background: '#1B4FD8' }} />
                <span style={{ fontSize: 12, color: '#6B7280' }}>Entries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded" style={{ background: '#16A34A' }} />
                <span style={{ fontSize: 12, color: '#6B7280' }}>Exits</span>
              </div>
            </div>
          </div>

          {activityView === 'hourly' && (
            <div className="flex items-center gap-3 mb-4 px-3 py-2 rounded-[6px]" style={{ background: '#FEF3C7', border: '1px solid #FDE047' }}>
              <Zap size={14} color="#92400E" strokeWidth={2} />
              <div className="flex items-center gap-4 flex-1">
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Morning Rush: </span>
                  <span style={{ fontSize: 11, color: '#78350F' }}>7 AM – 9 AM · avg 127 vehicles/hr</span>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Evening Rush: </span>
                  <span style={{ fontSize: 11, color: '#78350F' }}>5 PM – 7 PM · avg 138 vehicles/hr</span>
                </div>
              </div>
            </div>
          )}

          <ResponsiveContainer width="100%" height={activityView === 'hourly' ? 240 : 200}>
            <AreaChart data={entryData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="entriesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4FD8" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#1B4FD8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exitsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.10} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey={xAxisKey}
                tick={{ fontSize: activityView === 'hourly' ? 10 : 12, fill: '#9CA3AF' }}
                axisLine={false} tickLine={false}
                interval={activityView === 'hourly' ? 1 : 0}
                angle={activityView === 'hourly' ? -45 : 0}
                textAnchor={activityView === 'hourly' ? 'end' : 'middle'}
                height={activityView === 'hourly' ? 60 : 30}
              />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111827', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, padding: '8px 12px' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="entries" stroke="#1B4FD8" strokeWidth={2} fill="url(#entriesGrad)" />
              <Area type="monotone" dataKey="exits"   stroke="#16A34A" strokeWidth={2} fill="url(#exitsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Rush Hours */}
        <div className="rounded-[10px] p-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="mb-4">
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Rush Hours</h2>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Peak traffic windows — today</p>
          </div>

          <div className="flex gap-2 mb-4">
            {[
              { label: 'Morning Peak', time: '8:00 AM', value: '156 vehicles', color: '#1B4FD8', bg: '#EEF2FF' },
              { label: 'Evening Peak', time: '6:00 PM', value: '167 vehicles', color: '#7C3AED', bg: '#EDE9FE' },
            ].map((p) => (
              <div key={p.label} className="flex-1 rounded-[8px] px-3 py-2.5" style={{ background: p.bg }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.label}</p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827', marginTop: 2 }}>{p.time}</p>
                <p style={{ fontSize: 11, color: '#6B7280' }}>{p.value}</p>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={rushHoursData} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111827', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, padding: '8px 12px' }}
                cursor={{ fill: '#F3F4F6' }}
              />
              <Bar dataKey="traffic" radius={[4, 4, 0, 0]}>
                {rushHoursData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.traffic >= 150 ? '#1B4FD8' : entry.traffic >= 100 ? '#7C3AED' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-4 mt-3">
            {[{ label: 'Peak rush', color: '#1B4FD8' }, { label: 'High traffic', color: '#7C3AED' }, { label: 'Normal', color: '#E5E7EB' }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span style={{ fontSize: 11, color: '#6B7280' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Activity + System Health ───────────────────────────────── */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 2fr' }}>
        {/* Recent Activity */}
        <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Recent Activity</h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Latest gate events — {scopeLabel}</p>
            </div>
            <button className="flex items-center gap-1" style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500 }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div>
            <div className="grid px-5 py-2.5" style={{ gridTemplateColumns: '130px 80px 90px 80px 80px', borderBottom: '1px solid #F3F4F6' }}>
              {['Plate No.', 'Unit', 'Time', 'Type', 'Status'].map((h) => (
                <span key={h} style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
              ))}
            </div>
            {recentActivity.map((row, i) => (
              <div
                key={i}
                className="grid px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ gridTemplateColumns: '130px 80px 90px 80px 80px', borderBottom: i < recentActivity.length - 1 ? '1px solid #F9FAFB' : 'none' }}
              >
                <span
                  className="px-2 py-0.5 rounded self-center"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: '#374151', background: '#F3F4F6', width: 'fit-content', letterSpacing: '0.05em' }}
                >
                  {row.plate}
                </span>
                <span style={{ fontSize: 13, color: '#374151', alignSelf: 'center' }}>{row.unit}</span>
                <span style={{ fontSize: 12, color: '#6B7280', alignSelf: 'center', fontFamily: "'JetBrains Mono', monospace" }}>{row.time}</span>
                <span style={{ fontSize: 12, color: '#6B7280', alignSelf: 'center' }}>{row.type}</span>
                <span
                  className="self-center px-2 py-0.5 rounded-[4px]"
                  style={{
                    fontSize: 11, fontWeight: 600, width: 'fit-content',
                    background: row.status === 'allow' ? '#DCFCE7' : '#FEE2E2',
                    color: row.status === 'allow' ? '#16A34A' : '#DC2626',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>System Health</h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Hardware & device status</p>
            </div>
            <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: '#FEE2E2', color: '#DC2626' }}>1 OFFLINE</span>
          </div>
          <div className="grid grid-cols-3 px-5 py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
            {[{ label: 'Online', count: 4, color: '#16A34A' }, { label: 'Warning', count: 1, color: '#D97706' }, { label: 'Offline', count: 1, color: '#DC2626' }].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-1">
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: s.color }}>{s.count}</span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-2">
            {systemHealth.map((item, i) => {
              const statusColor = item.status === 'online' ? '#16A34A' : item.status === 'warning' ? '#D97706' : '#DC2626';
              return (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: '#F9FAFB' }}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: statusColor }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{item.name}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF' }}>{item.type} · {item.zone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: statusColor, letterSpacing: '0.04em' }}>{item.status}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'JetBrains Mono', monospace" }}>{item.ping}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
