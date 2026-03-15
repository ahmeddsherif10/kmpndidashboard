import { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';

type SlotStatus = 'available' | 'occupied' | 'reserved' | 'disabled';

interface ParkingSlot {
  id: string;
  status: SlotStatus;
  unit?: string;
  plate?: string;
}

function generateZone(prefix: string, count: number, overrides: Record<number, Partial<ParkingSlot>> = {}): ParkingSlot[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, '0')}`,
    status: 'available' as SlotStatus,
    ...overrides[i + 1],
  }));
}

const ZONES: Record<string, ParkingSlot[]> = {
  'Zone A': generateZone('A', 40, {
    1: { status: 'occupied', unit: 'A-101', plate: 'QAB-2841' },
    2: { status: 'occupied', unit: 'A-204', plate: 'DFC-7712' },
    3: { status: 'reserved', unit: 'A-305' },
    4: { status: 'occupied', unit: 'B-301', plate: 'BNQ-4471' },
    7: { status: 'occupied', unit: 'C-103', plate: 'LKV-3388' },
    11: { status: 'disabled' },
    12: { status: 'occupied', unit: 'A-101', plate: 'HMN-5503' },
    14: { status: 'reserved', unit: 'D-401' },
    19: { status: 'occupied', unit: 'A-305', plate: 'XPT-1190' },
    22: { status: 'disabled' },
    25: { status: 'occupied', unit: 'C-302', plate: 'RWS-9021' },
    28: { status: 'reserved', unit: 'E-501' },
    31: { status: 'occupied', unit: 'E-502', plate: 'TYU-6654' },
    35: { status: 'disabled' },
    37: { status: 'occupied', unit: 'D-410', plate: 'LKV-3388' },
  }),
  'Zone B': generateZone('B', 32, {
    2: { status: 'occupied', unit: 'B-207', plate: 'HMN-5503' },
    5: { status: 'reserved', unit: 'C-103' },
    9: { status: 'disabled' },
    13: { status: 'occupied', unit: 'D-401', plate: 'RWS-9021' },
    17: { status: 'occupied', unit: 'E-501', plate: 'QAB-2841' },
    20: { status: 'disabled' },
    24: { status: 'reserved', unit: 'A-204' },
    29: { status: 'occupied', unit: 'B-301', plate: 'DFC-7712' },
  }),
  'Pool': generateZone('P', 20, {
    1: { status: 'occupied', unit: 'C-302', plate: 'BNQ-4471' },
    3: { status: 'reserved', unit: 'A-101' },
    7: { status: 'disabled' },
    11: { status: 'occupied', unit: 'D-410', plate: 'XPT-1190' },
  }),
  'Street': generateZone('S', 16, {
    2: { status: 'occupied', unit: 'E-502', plate: 'TYU-6654' },
    5: { status: 'disabled' },
    8: { status: 'occupied', unit: 'A-305', plate: 'HMN-5503' },
    12: { status: 'reserved', unit: 'B-207' },
  }),
};

const OVERFLOW_REQUESTS = [
  { id: 'REQ001', unit: 'C-203', owner: 'Fatma El-Zahraa', requested: '2 additional slots', time: '10:30 AM', date: 'Today' },
  { id: 'REQ002', unit: 'A-107', owner: 'Hassan Ali', requested: '1 temporary slot', time: '09:15 AM', date: 'Today' },
  { id: 'REQ003', unit: 'B-405', owner: 'Nour Ibrahim', requested: '1 guest slot', time: 'Yesterday', date: 'Mar 6' },
];

const STATUS_STYLE: Record<SlotStatus, { bg: string; border: string; text: string }> = {
  available: { bg: '#DCFCE7', border: '#86EFAC', text: '#16A34A' },
  occupied: { bg: '#DBEAFE', border: '#93C5FD', text: '#1B4FD8' },
  reserved: { bg: '#FEF3C7', border: '#FCD34D', text: '#D97706' },
  disabled: { bg: '#F3F4F6', border: '#D1D5DB', text: '#9CA3AF' },
};

export function ParkingManagement() {
  const [activeZone, setActiveZone] = useState('Zone A');
  const [hoveredSlot, setHoveredSlot] = useState<ParkingSlot | null>(null);

  const slots = ZONES[activeZone];
  const stats = {
    available: slots.filter((s) => s.status === 'available').length,
    occupied: slots.filter((s) => s.status === 'occupied').length,
    reserved: slots.filter((s) => s.status === 'reserved').length,
    disabled: slots.filter((s) => s.status === 'disabled').length,
  };
  const occupancy = Math.round((stats.occupied / (slots.length - stats.disabled)) * 100);

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Parking Management</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Real-time parking occupancy across all zones</p>
        </div>
      </div>

      {/* Zone Tabs */}
      <div className="flex items-center gap-1 mb-5 p-1 rounded-[8px] w-fit" style={{ background: '#E5E7EB' }}>
        {Object.keys(ZONES).map((zone) => (
          <button
            key={zone}
            onClick={() => setActiveZone(zone)}
            className="px-4 py-1.5 rounded-[6px] transition-all"
            style={{
              fontSize: 13,
              fontWeight: 500,
              background: activeZone === zone ? '#FFFFFF' : 'transparent',
              color: activeZone === zone ? '#111827' : '#6B7280',
              boxShadow: activeZone === zone ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {zone}
          </button>
        ))}
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 280px' }}>
        {/* Parking Grid */}
        <div
          className="rounded-[10px] p-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          {/* Legend */}
          <div className="flex items-center gap-4 mb-5">
            {(['available', 'occupied', 'reserved', 'disabled'] as SlotStatus[]).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-[2px] border"
                  style={{ background: STATUS_STYLE[s].bg, borderColor: STATUS_STYLE[s].border }}
                />
                <span style={{ fontSize: 12, color: '#6B7280', textTransform: 'capitalize' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
            {slots.map((slot) => {
              const style = STATUS_STYLE[slot.status];
              return (
                <div
                  key={slot.id}
                  className="relative rounded-[6px] border cursor-pointer transition-all hover:scale-105 hover:shadow-md"
                  style={{
                    background: style.bg,
                    borderColor: style.border,
                    aspectRatio: '1.3',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                  }}
                  onMouseEnter={() => setHoveredSlot(slot)}
                  onMouseLeave={() => setHoveredSlot(null)}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, color: style.text }}>{slot.id}</span>
                  {slot.unit && (
                    <span style={{ fontSize: 8, color: style.text, marginTop: 1, fontWeight: 500 }}>{slot.unit}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hover Tooltip */}
          {hoveredSlot && (
            <div
              className="mt-4 p-3 rounded-[6px]"
              style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-[2px] border"
                  style={{ background: STATUS_STYLE[hoveredSlot.status].bg, borderColor: STATUS_STYLE[hoveredSlot.status].border }}
                />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                    Slot {hoveredSlot.id}
                    <span
                      className="ml-2 px-1.5 py-0.5 rounded-[3px]"
                      style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', background: STATUS_STYLE[hoveredSlot.status].bg, color: STATUS_STYLE[hoveredSlot.status].text, border: `1px solid ${STATUS_STYLE[hoveredSlot.status].border}` }}
                    >
                      {hoveredSlot.status}
                    </span>
                  </p>
                  {hoveredSlot.unit && <p style={{ fontSize: 12, color: '#6B7280' }}>Unit: {hoveredSlot.unit}</p>}
                  {hoveredSlot.plate && (
                    <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#374151', marginTop: 2 }}>{hoveredSlot.plate}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          {/* Zone Stats */}
          <div
            className="rounded-[10px] p-5"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 12 }}>
              {activeZone} Summary
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: '#E5E7EB' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${occupancy}%`, background: occupancy > 80 ? '#DC2626' : occupancy > 60 ? '#D97706' : '#1B4FD8' }}
                />
              </div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#111827', minWidth: 36 }}>{occupancy}%</span>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 12 }}>Occupancy rate ({slots.length} total slots)</p>

            {[
              { label: 'Available', count: stats.available, color: '#16A34A', bg: '#DCFCE7' },
              { label: 'Occupied', count: stats.occupied, color: '#1B4FD8', bg: '#DBEAFE' },
              { label: 'Reserved', count: stats.reserved, color: '#D97706', bg: '#FEF3C7' },
              { label: 'Disabled', count: stats.disabled, color: '#9CA3AF', bg: '#F3F4F6' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F3F4F6' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span style={{ fontSize: 13, color: '#374151' }}>{s.label}</span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-[4px]"
                  style={{ fontSize: 12, fontWeight: 600, background: s.bg, color: s.color }}
                >
                  {s.count}
                </span>
              </div>
            ))}
          </div>

          {/* Overflow Requests */}
          <div
            className="rounded-[10px] overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Overflow Requests</h3>
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ fontSize: 11, fontWeight: 600, background: '#FEE2E2', color: '#DC2626' }}
              >
                {OVERFLOW_REQUESTS.length}
              </span>
            </div>
            {OVERFLOW_REQUESTS.map((req) => (
              <div key={req.id} className="px-4 py-3 border-b last:border-0" style={{ borderColor: '#F3F4F6' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{req.owner}</p>
                    <p style={{ fontSize: 11, color: '#6B7280' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{req.unit}</span> · {req.requested}
                    </p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                      <Clock size={10} className="inline mr-1" strokeWidth={1.5} />
                      {req.time} · {req.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-[4px] text-white transition-opacity hover:opacity-90"
                    style={{ background: '#16A34A', fontSize: 12, fontWeight: 500 }}
                  >
                    <Check size={12} strokeWidth={2.5} /> Approve
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-[4px] transition-colors hover:bg-red-50"
                    style={{ border: '1px solid #FCA5A5', color: '#DC2626', fontSize: 12, fontWeight: 500 }}
                  >
                    <X size={12} strokeWidth={2.5} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
