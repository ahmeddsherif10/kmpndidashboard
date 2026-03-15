import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Download, Calendar } from 'lucide-react';

const ZONE_OCCUPANCY = [
  { zone: 'Zone A', mon: 82, tue: 88, wed: 79, thu: 91, fri: 94, sat: 71, sun: 76 },
  { zone: 'Zone B', mon: 65, tue: 72, wed: 68, thu: 75, fri: 78, sat: 55, sun: 60 },
  { zone: 'Pool', mon: 45, tue: 52, wed: 49, thu: 61, fri: 70, sat: 88, sun: 82 },
  { zone: 'Street', mon: 38, tue: 41, wed: 44, thu: 48, fri: 52, sat: 30, sun: 35 },
];

const BAR_CHART_DATA = [
  { name: 'Zone A', occupancy: 83, capacity: 40 },
  { name: 'Zone B', occupancy: 68, capacity: 32 },
  { name: 'Pool', occupancy: 64, capacity: 20 },
  { name: 'Street', occupancy: 41, capacity: 16 },
];

// Heatmap: 7 days × 24 hours (simplified to key hours)
const HOURS = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HEATMAP_DATA: number[][] = [
  [2, 1, 0, 0, 8, 45, 72, 68, 71, 65, 48, 12],
  [3, 1, 0, 0, 9, 52, 78, 75, 79, 71, 55, 15],
  [2, 0, 0, 0, 7, 48, 69, 71, 68, 62, 44, 11],
  [4, 1, 0, 0, 11, 58, 85, 82, 87, 79, 61, 18],
  [5, 2, 1, 0, 14, 65, 91, 88, 94, 86, 70, 24],
  [6, 3, 1, 0, 5, 22, 38, 42, 48, 72, 85, 31],
  [4, 2, 0, 0, 6, 18, 32, 38, 44, 68, 78, 22],
];

const SUB_NAVS = ['Parking Utilization', 'Access Logs', 'Over Quota', 'Disputes'];

function getHeatColor(val: number): string {
  if (val === 0) return '#F3F4F6';
  if (val < 10) return '#DBEAFE';
  if (val < 30) return '#93C5FD';
  if (val < 60) return '#3B82F6';
  if (val < 80) return '#1D4ED8';
  return '#1E3A8A';
}

export function Reports() {
  const [activeNav, setActiveNav] = useState('Parking Utilization');
  const [dateRange, setDateRange] = useState('Last 7 Days');

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      <div className="mb-5">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Reports & Analytics</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Parking utilization, access trends, and operational reports</p>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '200px 1fr' }}>
        {/* Sub Nav */}
        <div
          className="rounded-[10px] overflow-hidden h-fit"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Report Type</p>
          </div>
          {SUB_NAVS.map((nav) => (
            <button
              key={nav}
              onClick={() => setActiveNav(nav)}
              className="w-full text-left px-4 py-3 border-b last:border-0 transition-colors relative"
              style={{
                borderColor: '#F3F4F6',
                background: activeNav === nav ? '#EEF2FF' : 'transparent',
                color: activeNav === nav ? '#1B4FD8' : '#374151',
              }}
            >
              {activeNav === nav && (
                <span className="absolute left-0 top-2 bottom-2 rounded-r w-0.5" style={{ background: '#1B4FD8' }} />
              )}
              <span style={{ fontSize: 13, fontWeight: activeNav === nav ? 600 : 400 }}>{nav}</span>
            </button>
          ))}
        </div>

        {/* Main Panel */}
        <div className="flex flex-col gap-5">
          {/* Controls */}
          <div
            className="flex items-center justify-between p-4 rounded-[10px]"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <Calendar size={16} color="#6B7280" strokeWidth={1.5} />
              {['Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className="px-3 py-1.5 rounded-[6px] transition-all"
                  style={{
                    fontSize: 12, fontWeight: 500,
                    background: dateRange === r ? '#1B4FD8' : '#F4F5F7',
                    color: dateRange === r ? '#FFFFFF' : '#6B7280',
                    border: '1px solid', borderColor: dateRange === r ? '#1B4FD8' : '#E5E7EB',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-[6px] transition-colors hover:bg-gray-100"
              style={{ border: '1px solid #E5E7EB', fontSize: 13, fontWeight: 500, color: '#374151' }}
            >
              <Download size={14} strokeWidth={1.5} /> Export CSV
            </button>
          </div>

          {activeNav === 'Parking Utilization' ? (
            <>
              {/* Bar Chart */}
              <div
                className="rounded-[10px] p-5"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Occupancy by Zone</h2>
                    <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Average occupancy rate — {dateRange.toLowerCase()}</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={BAR_CHART_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
                    <Tooltip
                      formatter={(val) => [`${val}%`, 'Occupancy']}
                      contentStyle={{ background: '#111827', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12 }}
                      cursor={{ fill: '#F3F4F6' }}
                    />
                    <Bar key="bar-occupancy" dataKey="occupancy" fill="#1B4FD8" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>

                {/* Zone Detail Rows */}
                <div className="mt-4 grid gap-2">
                  {BAR_CHART_DATA.map((z) => (
                    <div key={z.name} className="flex items-center gap-3">
                      <span style={{ fontSize: 12, color: '#6B7280', width: 60 }}>{z.name}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${z.occupancy}%`,
                            background: z.occupancy > 85 ? '#DC2626' : z.occupancy > 70 ? '#D97706' : '#1B4FD8',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', width: 36, textAlign: 'right' }}>{z.occupancy}%</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', width: 60 }}>{z.capacity} slots</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Hours Heatmap */}
              <div
                className="rounded-[10px] p-5"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div className="mb-4">
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#111827' }}>Peak Hours Heatmap</h2>
                  <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Entry volume by hour across the last 7 days</p>
                </div>

                <div className="overflow-x-auto">
                  <table style={{ borderCollapse: 'separate', borderSpacing: 3 }}>
                    <thead>
                      <tr>
                        <th style={{ width: 40 }} />
                        {HOURS.map((h) => (
                          <th key={h} style={{ width: 44, fontSize: 10, color: '#9CA3AF', fontWeight: 500, textAlign: 'center', paddingBottom: 4 }}>
                            {h}:00
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DAYS.map((day, di) => (
                        <tr key={day}>
                          <td style={{ fontSize: 11, fontWeight: 500, color: '#6B7280', paddingRight: 8, textAlign: 'right' }}>{day}</td>
                          {HEATMAP_DATA[di].map((val, hi) => (
                            <td key={hi}>
                              <div
                                className="rounded-[4px]"
                                style={{
                                  width: 44, height: 24,
                                  background: getHeatColor(val),
                                  cursor: 'default',
                                  position: 'relative',
                                }}
                                title={`${day} ${HOURS[hi]}:00 — ${val} entries`}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-4">
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>Low</span>
                  {['#F3F4F6', '#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8', '#1E3A8A'].map((c) => (
                    <div key={c} className="rounded-[2px]" style={{ width: 20, height: 12, background: c }} />
                  ))}
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>High</span>
                </div>
              </div>
            </>
          ) : (
            <div
              className="rounded-[10px] p-16 flex flex-col items-center justify-center"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div
                className="flex items-center justify-center rounded-[12px] mb-4"
                style={{ width: 56, height: 56, background: '#EEF2FF' }}
              >
                <Download size={24} color="#1B4FD8" strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: '#111827' }}>{activeNav}</p>
              <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 6, textAlign: 'center' }}>
                This report is available. Select a date range and click Export CSV to download.
              </p>
              <button
                className="mt-5 flex items-center gap-2 px-5 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
                style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
              >
                <Download size={14} strokeWidth={1.5} /> Export {activeNav}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}