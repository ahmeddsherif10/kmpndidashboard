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
  ReferenceLine,
} from 'recharts';
import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Users, Car, Activity } from 'lucide-react';

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

const entriesSparkline = [{ v: 180 }, { v: 220 }, { v: 195 }, { v: 280 }, { v: 245 }, { v: 310 }, { v: 267 }];
const visitorsSparkline = [{ v: 98 }, { v: 115 }, { v: 89 }, { v: 132 }, { v: 110 }, { v: 128 }, { v: 124 }];
const alertsSparkline = [{ v: 1 }, { v: 0 }, { v: 2 }, { v: 1 }, { v: 3 }, { v: 2 }, { v: 3 }];

const recentActivity = [
  { plate: 'QAB-2841', unit: 'A-101', time: '09:54 AM', type: 'Resident', status: 'allow' },
  { plate: 'DFC-7712', unit: 'C-302', time: '09:51 AM', type: 'Visitor', status: 'allow' },
  { plate: 'HMN-5503', unit: 'B-207', time: '09:49 AM', type: 'Delivery', status: 'allow' },
  { plate: 'XPT-1190', unit: '—', time: '09:46 AM', type: 'Unknown', status: 'deny' },
  { plate: 'LKV-3388', unit: 'D-410', time: '09:43 AM', type: 'Resident', status: 'allow' },
  { plate: 'RWS-9021', unit: 'A-204', time: '09:40 AM', type: 'Visitor', status: 'allow' },
  { plate: 'TYU-6654', unit: '—', time: '09:37 AM', type: 'Unknown', status: 'deny' },
  { plate: 'BNQ-4471', unit: 'E-501', time: '09:35 AM', type: 'Resident', status: 'allow' },
];

const systemHealth = [
  { name: 'Main Gate Camera', type: 'Camera', zone: 'Zone A', status: 'online', ping: '2s ago' },
  { name: 'North Barrier', type: 'Barrier', zone: 'Zone A', status: 'online', ping: '1s ago' },
  { name: 'Pool QR Scanner', type: 'QR Scanner', zone: 'Zone B', status: 'warning', ping: '45s ago' },
  { name: 'South Gate Camera', type: 'Camera', zone: 'Zone B', status: 'offline', ping: '12m ago' },
  { name: 'Delivery Entrance', type: 'NFC Reader', zone: 'Street', status: 'online', ping: '3s ago' },
  { name: 'West LPR Camera', type: 'LPR Camera', zone: 'Pool', status: 'online', ping: '1s ago' },
];

const parkingDonut = [
  { name: 'Occupied', value: 78 },
  { name: 'Available', value: 22 },
];

function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <LineChart width={80} height={32} data={data}>
      <Line key="sparkline-line" type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
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
    <div
      className="rounded-[10px] p-5 flex flex-col gap-3"
      style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
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

export function Dashboard() {
  const [activityView, setActivityView] = useState<'daily' | 'hourly'>('daily');
  const entryData = activityView === 'daily' ? entryDataDaily : entryDataHourly;
  const xAxisKey = activityView === 'daily' ? 'day' : 'hour';

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>
          Community Dashboard
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
          Palm Hills Katameya — real-time access overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {/* Total Entries Today */}
        <KPICard
          label="Total Entries Today"
          value="2,847"
          sub="vs 2,540 yesterday"
          trend="+12.1%"
          trendUp
          icon={Activity}
          iconColor="#1B4FD8"
          iconBg="#EEF2FF"
        >
          <Sparkline data={entriesSparkline} color="#1B4FD8" />
        </KPICard>

        {/* Active Visitors */}
        <KPICard
          label="Active Visitors"
          value="124"
          sub="across 89 units"
          trend="+8.3%"
          trendUp
          icon={Users}
          iconColor="#16A34A"
          iconBg="#DCFCE7"
        >
          <div className="flex items-center gap-1">
            {['#1B4FD8', '#16A34A', '#D97706', '#7C3AED'].map((bg, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center rounded-full border-2 border-white"
                style={{ width: 22, height: 22, background: bg, marginLeft: i > 0 ? -6 : 0, fontSize: 8, color: '#fff', fontWeight: 700, zIndex: 4 - i }}
              >
                {String.fromCharCode(65 + i)}
              </span>
            ))}
            <span style={{ fontSize: 11, color: '#6B7280', marginLeft: 4 }}>+120 more</span>
          </div>
        </KPICard>

        {/* Parking Occupancy */}
        <KPICard
          label="Parking Occupancy"
          value="78%"
          sub="47 spaces available"
          trend="-3.2%"
          trendUp={false}
          icon={Car}
          iconColor="#D97706"
          iconBg="#FEF3C7"
        >
          <div className="flex items-center gap-3">
            <PieChart width={48} height={48}>
              <Pie data={parkingDonut} cx={20} cy={20} innerRadius={14} outerRadius={22} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                <Cell key="cell-occupied" fill="#1B4FD8" />
                <Cell key="cell-available" fill="#E5E7EB" />
              </Pie>
            </PieChart>
            <div>
              <p style={{ fontSize: 11, color: '#6B7280' }}><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#1B4FD8' }} />Occupied</p>
              <p style={{ fontSize: 11, color: '#6B7280' }}><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#E5E7EB' }} />Available</p>
            </div>
          </div>
        </KPICard>

        {/* Active Alerts */}
        <KPICard
          label="Active Alerts"
          value="3"
          sub="2 critical, 1 warning"
          trend="+2"
          trendUp={false}
          icon={AlertTriangle}
          iconColor="#DC2626"
          iconBg="#FEE2E2"
        >
          <Sparkline data={alertsSparkline} color="#DC2626" />
        </KPICard>
      </div>

      {/* Entry Activity Chart */}
      <div
        className="rounded-[10px] p-5 mb-5"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Entry Activity</h2>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
              {activityView === 'daily' ? 'Last 7 days — entries vs exits' : 'Today — hourly breakdown'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7' }}>
              <button
                onClick={() => setActivityView('daily')}
                className="px-3 py-1 rounded-[4px] transition-all"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  background: activityView === 'daily' ? '#FFFFFF' : 'transparent',
                  color: activityView === 'daily' ? '#111827' : '#6B7280',
                  boxShadow: activityView === 'daily' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                Daily
              </button>
              <button
                onClick={() => setActivityView('hourly')}
                className="px-3 py-1 rounded-[4px] transition-all"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  background: activityView === 'hourly' ? '#FFFFFF' : 'transparent',
                  color: activityView === 'hourly' ? '#111827' : '#6B7280',
                  boxShadow: activityView === 'hourly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                Hourly
              </button>
            </div>

            {/* Legend */}
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

        {/* Rush Hour Indicators (only for hourly view) */}
        {activityView === 'hourly' && (
          <div className="flex items-center gap-3 mb-4 px-3 py-2 rounded-[6px]" style={{ background: '#FEF3C7', border: '1px solid #FDE047' }}>
            <Activity size={14} color="#92400E" strokeWidth={2} />
            <div className="flex items-center gap-4 flex-1">
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Morning Rush:
                </span>
                <span style={{ fontSize: 11, color: '#78350F', marginLeft: 4 }}>7 AM - 9 AM</span>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Evening Rush:
                </span>
                <span style={{ fontSize: 11, color: '#78350F', marginLeft: 4 }}>5 PM - 7 PM</span>
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
              axisLine={false}
              tickLine={false}
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
            <Area key="area-entries" type="monotone" dataKey="entries" stroke="#1B4FD8" strokeWidth={2} fill="url(#entriesGrad)" />
            <Area key="area-exits" type="monotone" dataKey="exits" stroke="#16A34A" strokeWidth={2} fill="url(#exitsGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 2fr' }}>
        {/* Recent Activity */}
        <div
          className="rounded-[10px] overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Recent Activity</h2>
            <span style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500, cursor: 'pointer' }}>View all →</span>
          </div>
          <div>
            {/* Table Header */}
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
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#374151',
                    background: '#F3F4F6',
                    width: 'fit-content',
                    letterSpacing: '0.05em',
                  }}
                >
                  {row.plate}
                </span>
                <span style={{ fontSize: 13, color: '#374151', alignSelf: 'center' }}>{row.unit}</span>
                <span style={{ fontSize: 12, color: '#6B7280', alignSelf: 'center', fontFamily: "'JetBrains Mono', monospace" }}>{row.time}</span>
                <span style={{ fontSize: 12, color: '#6B7280', alignSelf: 'center' }}>{row.type}</span>
                <span
                  className="self-center px-2 py-0.5 rounded-[4px]"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    width: 'fit-content',
                    background: row.status === 'allow' ? '#DCFCE7' : '#FEE2E2',
                    color: row.status === 'allow' ? '#16A34A' : '#DC2626',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div
          className="rounded-[10px] overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>System Health</h2>
            <span
              className="px-2 py-0.5 rounded-[4px]"
              style={{ fontSize: 11, fontWeight: 600, background: '#FEE2E2', color: '#DC2626' }}
            >
              1 OFFLINE
            </span>
          </div>
          {/* Summary */}
          <div className="grid grid-cols-3 px-5 py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
            {[
              { label: 'Online', count: 4, color: '#16A34A', bg: '#DCFCE7' },
              { label: 'Warning', count: 1, color: '#D97706', bg: '#FEF3C7' },
              { label: 'Offline', count: 1, color: '#DC2626', bg: '#FEE2E2' },
            ].map((s) => (
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
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                  style={{ borderColor: '#F9FAFB' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{ width: 8, height: 8, background: statusColor }}
                    />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{item.name}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF' }}>{item.type} · {item.zone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: statusColor,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.status}
                    </p>
                    <p
                      style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.ping}
                    </p>
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