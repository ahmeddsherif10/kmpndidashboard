import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useState } from 'react';
import {
  Building2,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

// ─── Static chart data ────────────────────────────────────────────────────────

const entryDataDaily = [
  { day: 'Mon', entries: 245, exits: 218, guests: 42, services: 15, complaints: 3 },
  { day: 'Tue', entries: 312, exits: 287, guests: 58, services: 22, complaints: 5 },
  { day: 'Wed', entries: 278, exits: 251, guests: 49, services: 18, complaints: 2 },
  { day: 'Thu', entries: 389, exits: 356, guests: 71, services: 27, complaints: 7 },
  { day: 'Fri', entries: 421, exits: 398, guests: 83, services: 31, complaints: 4 },
  { day: 'Sat', entries: 198, exits: 176, guests: 35, services: 12, complaints: 1 },
  { day: 'Sun', entries: 267, exits: 241, guests: 54, services: 19, complaints: 3 },
];

const entryDataHourly = [
  { hour: '12 AM', entries: 8,   exits: 12,  guests: 1,  services: 0, complaints: 0 },
  { hour: '1 AM',  entries: 5,   exits: 8,   guests: 0,  services: 0, complaints: 0 },
  { hour: '2 AM',  entries: 3,   exits: 5,   guests: 0,  services: 0, complaints: 0 },
  { hour: '3 AM',  entries: 2,   exits: 3,   guests: 0,  services: 0, complaints: 0 },
  { hour: '4 AM',  entries: 4,   exits: 3,   guests: 0,  services: 0, complaints: 0 },
  { hour: '5 AM',  entries: 12,  exits: 8,   guests: 2,  services: 1, complaints: 0 },
  { hour: '6 AM',  entries: 45,  exits: 28,  guests: 6,  services: 3, complaints: 0 },
  { hour: '7 AM',  entries: 98,  exits: 67,  guests: 14, services: 7, complaints: 1 },
  { hour: '8 AM',  entries: 156, exits: 134, guests: 22, services: 11,complaints: 2 },
  { hour: '9 AM',  entries: 89,  exits: 78,  guests: 12, services: 8, complaints: 1 },
  { hour: '10 AM', entries: 54,  exits: 48,  guests: 9,  services: 5, complaints: 0 },
  { hour: '11 AM', entries: 42,  exits: 38,  guests: 7,  services: 4, complaints: 1 },
  { hour: '12 PM', entries: 67,  exits: 89,  guests: 11, services: 6, complaints: 0 },
  { hour: '1 PM',  entries: 58,  exits: 72,  guests: 10, services: 5, complaints: 0 },
  { hour: '2 PM',  entries: 71,  exits: 63,  guests: 13, services: 7, complaints: 1 },
  { hour: '3 PM',  entries: 82,  exits: 58,  guests: 15, services: 9,  complaints: 1 },
  { hour: '4 PM',  entries: 94,  exits: 67,  guests: 18, services: 10, complaints: 2 },
  { hour: '5 PM',  entries: 134, exits: 98,  guests: 27, services: 14, complaints: 2 },
  { hour: '6 PM',  entries: 167, exits: 142, guests: 35, services: 18, complaints: 3 },
  { hour: '7 PM',  entries: 112, exits: 156, guests: 24, services: 12, complaints: 1 },
  { hour: '8 PM',  entries: 78,  exits: 98,  guests: 16, services: 8,  complaints: 1 },
  { hour: '9 PM',  entries: 52,  exits: 67,  guests: 10, services: 5,  complaints: 0 },
  { hour: '10 PM', entries: 34,  exits: 45,  guests: 6,  services: 3,  complaints: 0 },
  { hour: '11 PM', entries: 18,  exits: 28,  guests: 3,  services: 1,  complaints: 0 },
];

// ─── Contract Activity data ───────────────────────────────────────────────────

const contractDataAll = [
  { label: 'Palm Hills K',     sold: 120, rented: 85  },
  { label: 'Palm Hills Oct',   sold: 94,  rented: 72  },
  { label: 'Sodic West',       sold: 148, rented: 103 },
  { label: 'Sodic East',       sold: 88,  rented: 67  },
  { label: 'Hyde Park',        sold: 210, rented: 145 },
  { label: 'Hyde Park NC',     sold: 172, rented: 128 },
  { label: 'NZ Phase II',      sold: 64,  rented: 48  },
  { label: 'NZ Phase III',     sold: 38,  rented: 29  },
];

const contractDataYear = [
  { label: 'Jan', sold: 18, rented: 12 },
  { label: 'Feb', sold: 22, rented: 15 },
  { label: 'Mar', sold: 31, rented: 20 },
  { label: 'Apr', sold: 27, rented: 19 },
  { label: 'May', sold: 35, rented: 24 },
  { label: 'Jun', sold: 42, rented: 31 },
  { label: 'Jul', sold: 38, rented: 28 },
  { label: 'Aug', sold: 29, rented: 22 },
  { label: 'Sep', sold: 33, rented: 25 },
  { label: 'Oct', sold: 45, rented: 34 },
  { label: 'Nov', sold: 52, rented: 38 },
  { label: 'Dec', sold: 61, rented: 44 },
];

const contractDataMonth = [
  { label: 'Wk 1', sold: 11, rented: 8  },
  { label: 'Wk 2', sold: 14, rented: 10 },
  { label: 'Wk 3', sold: 9,  rented: 7  },
  { label: 'Wk 4', sold: 16, rented: 11 },
];

const contractDataDay = [
  { label: 'Mon', sold: 3, rented: 2 },
  { label: 'Tue', sold: 5, rented: 3 },
  { label: 'Wed', sold: 2, rented: 2 },
  { label: 'Thu', sold: 6, rented: 4 },
  { label: 'Fri', sold: 4, rented: 3 },
  { label: 'Sat', sold: 1, rented: 1 },
  { label: 'Sun', sold: 2, rented: 1 },
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



// ─── Main ─────────────────────────────────────────────────────────────────────

export function Dashboard() {
  const [activityView, setActivityView] = useState<'daily' | 'hourly'>('daily');
  const [communityPeriod, setCommunityPeriod] = useState<'all' | 'year' | 'month' | 'day' | 'hour'>('day');
  const [contractPeriod, setContractPeriod] = useState<'all' | 'year' | 'month' | 'day'>('day');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null);
  const [devDropdownOpen, setDevDropdownOpen] = useState(false);

  const entryData = activityView === 'daily' ? entryDataDaily : entryDataHourly;
  const xAxisKey  = activityView === 'daily' ? 'day' : 'hour';

  const contractData =
    contractPeriod === 'year'  ? contractDataYear  :
    contractPeriod === 'month' ? contractDataMonth :
    contractPeriod === 'day'   ? contractDataDay   :
    contractDataAll;

  const contractTotals = contractData.reduce(
    (acc, d) => ({ sold: acc.sold + d.sold, rented: acc.rented + d.rented }),
    { sold: 0, rented: 0 }
  );

  const filteredCompounds = selectedDeveloper
    ? ALL_COMPOUNDS.filter((c) => c.developer === selectedDeveloper)
    : ALL_COMPOUNDS;

  return (
    <div className="p-6 max-w-[1376px] mx-auto" onClick={() => setDevDropdownOpen(false)}>

      {/* ── Compounds Overview ───────────────────────────────────────────── */}
      <div
        className="rounded-[10px] p-5 mb-5"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Compounds Overview</h2>
            {/* Developers dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setDevDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] transition-colors hover:bg-gray-50"
                style={{
                  fontSize: 12, fontWeight: 500,
                  background: selectedDeveloper ? DEVELOPER_COLORS[selectedDeveloper].bg : '#F4F5F7',
                  color: selectedDeveloper ? DEVELOPER_COLORS[selectedDeveloper].color : '#374151',
                  border: selectedDeveloper ? `1px solid ${DEVELOPER_COLORS[selectedDeveloper].color}` : '1px solid #E5E7EB',
                }}
              >
                {selectedDeveloper ? (
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: DEVELOPER_COLORS[selectedDeveloper].color }} />
                ) : null}
                {selectedDeveloper ?? 'Developers'}
                <ChevronDown
                  size={13}
                  style={{
                    transform: devDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
              {devDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1 rounded-[8px] shadow-lg z-50 overflow-hidden"
                  style={{ minWidth: 200, background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                >
                  <button
                    onClick={() => { setSelectedDeveloper(null); setDevDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between"
                    style={{ fontSize: 13, fontWeight: selectedDeveloper === null ? 600 : 400, color: selectedDeveloper === null ? '#1B4FD8' : '#111827', borderBottom: '1px solid #F3F4F6' }}
                  >
                    All Developers
                    {selectedDeveloper === null && <span style={{ fontSize: 10, background: '#EEF2FF', color: '#1B4FD8', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>}
                  </button>
                  {DEVELOPERS.map((dev) => {
                    const { color, bg } = DEVELOPER_COLORS[dev];
                    const isActive = selectedDeveloper === dev;
                    return (
                      <button
                        key={dev}
                        onClick={() => { setSelectedDeveloper(dev); setDevDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between"
                        style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? color : '#111827' }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                          {dev}
                          <span style={{ fontSize: 11, color: '#9CA3AF' }}>{ALL_COMPOUNDS.filter((c) => c.developer === dev).length} compounds</span>
                        </div>
                        {isActive && <span style={{ fontSize: 10, background: bg, color, padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedDeveloper && (
              <button
                onClick={() => setSelectedDeveloper(null)}
                className="px-2.5 py-1 rounded-[5px] transition-colors hover:bg-red-50"
                style={{ fontSize: 11, color: '#DC2626', border: '1px solid #FEE2E2' }}
              >
                Clear
              </button>
            )}
            <button className="flex items-center gap-1" style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500 }}>
              Manage compounds <ArrowRight size={12} />
            </button>
          </div>
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

      {/* ── Community Activity + Contract Activity ─────────────────────────── */}
      <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: '3fr 2fr' }}>
        {/* Community Activity */}
        <div className="rounded-[10px] p-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Community Activity</h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                {communityPeriod === 'hour' ? 'Today — hourly activity breakdown' : communityPeriod === 'day' ? 'Today — community events' : communityPeriod === 'month' ? 'This month — community events' : communityPeriod === 'year' ? 'This year — community events' : 'All-time — community events'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Period filter pills */}
              <div className="flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}>
                {(['All', 'Year', 'Month', 'Day', 'Hour'] as const).map((label) => {
                  const val = label.toLowerCase() as typeof communityPeriod;
                  const isActive = communityPeriod === val;
                  return (
                    <button
                      key={label}
                      onClick={() => {
                        setCommunityPeriod(val);
                        setActivityView(val === 'hour' ? 'hourly' : 'daily');
                      }}
                      className="px-3 py-1 rounded-[4px] transition-all"
                      style={{
                        fontSize: 12, fontWeight: isActive ? 600 : 400,
                        background: isActive ? '#1B4FD8' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#6B7280',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { label: 'Entries',    color: '#1B4FD8' },
                  { label: 'Exits',      color: '#16A34A' },
                  { label: 'Guests',     color: '#D97706' },
                  { label: 'Services',   color: '#7C3AED' },
                  { label: 'Complaints', color: '#DC2626' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 rounded" style={{ background: l.color }} />
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                <linearGradient id="guestsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="servicesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="complaintsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
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
              <Area type="monotone" dataKey="entries"    stroke="#1B4FD8" strokeWidth={2} fill="url(#entriesGrad)" />
              <Area type="monotone" dataKey="exits"      stroke="#16A34A" strokeWidth={2} fill="url(#exitsGrad)" />
              <Area type="monotone" dataKey="guests"     stroke="#D97706" strokeWidth={2} fill="url(#guestsGrad)" />
              <Area type="monotone" dataKey="services"   stroke="#7C3AED" strokeWidth={2} fill="url(#servicesGrad)" />
              <Area type="monotone" dataKey="complaints" stroke="#DC2626" strokeWidth={2} fill="url(#complaintsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Contract Activity */}
        <div className="rounded-[10px] p-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Contract Activity</h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                {contractPeriod === 'day' ? 'Sold vs rented — this week' : contractPeriod === 'month' ? 'Sold vs rented — this month' : contractPeriod === 'year' ? 'Sold vs rented — this year' : 'All-time sold vs rented'}
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}>
              {(['All', 'Year', 'Month', 'Day'] as const).map((label) => {
                const val = label.toLowerCase() as typeof contractPeriod;
                const isActive = contractPeriod === val;
                return (
                  <button
                    key={label}
                    onClick={() => setContractPeriod(val)}
                    className="px-3 py-1 rounded-[4px] transition-all"
                    style={{
                      fontSize: 12, fontWeight: isActive ? 600 : 400,
                      background: isActive ? '#1B4FD8' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#6B7280',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {[
              { label: 'Sold Units',   value: contractTotals.sold,   color: '#1B4FD8', bg: '#EEF2FF' },
              { label: 'Rented Units', value: contractTotals.rented, color: '#7C3AED', bg: '#EDE9FE' },
            ].map((p) => (
              <div key={p.label} className="flex-1 rounded-[8px] px-3 py-2.5" style={{ background: p.bg }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.label}</p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#111827', marginTop: 2 }}>{p.value}</p>
                <p style={{ fontSize: 11, color: '#6B7280' }}>units in selected period</p>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={contractData} margin={{ top: 0, right: 0, bottom: 0, left: -28 }} barGap={2} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111827', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, padding: '8px 12px' }}
                cursor={{ fill: '#F3F4F6' }}
              />
              <Bar dataKey="sold"   name="Sold"   fill="#1B4FD8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="rented" name="Rented" fill="#7C3AED" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-4 mt-3">
            {[{ label: 'Sold', color: '#1B4FD8' }, { label: 'Rented', color: '#7C3AED' }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span style={{ fontSize: 11, color: '#6B7280' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
