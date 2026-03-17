import { useState } from 'react';
import { ChevronRight, ChevronDown, Cpu, Camera, Radio, ZapOff, Power } from 'lucide-react';

type GateNode = {
  id: string;
  name: string;
  location: string;
  zone: string;
  enabled: boolean;
  allDay: boolean;
  rules: { residents: boolean; visitors: boolean; delivery: boolean };
  hours: { from: string; to: string };
  hardware: { type: string; id: string }[];
};

const ZONES = [
  {
    id: 'zone-a',
    name: 'Zone A — Main Residential',
    gates: [
      {
        id: 'gate-a1', name: 'Main Gate', location: 'North Entrance', zone: 'Zone A',
        enabled: true, allDay: false,
        rules: { residents: true, visitors: true, delivery: true },
        hours: { from: '06:00', to: '23:00' },
        hardware: [
          { type: 'LPR Camera', id: 'CAM-001' },
          { type: 'Barrier', id: 'BAR-001' },
          { type: 'QR Scanner', id: 'QRS-001' },
        ],
      },
      {
        id: 'gate-a2', name: 'Side Gate A', location: 'East Wing', zone: 'Zone A',
        enabled: true, allDay: false,
        rules: { residents: true, visitors: false, delivery: false },
        hours: { from: '07:00', to: '22:00' },
        hardware: [
          { type: 'NFC Reader', id: 'NFC-002' },
          { type: 'Barrier', id: 'BAR-002' },
        ],
      },
    ],
  },
  {
    id: 'zone-b',
    name: 'Zone B — Pool Area',
    gates: [
      {
        id: 'gate-b1', name: 'Pool Gate', location: 'Club Entry', zone: 'Zone B',
        enabled: true, allDay: false,
        rules: { residents: true, visitors: true, delivery: false },
        hours: { from: '08:00', to: '20:00' },
        hardware: [
          { type: 'QR Scanner', id: 'QRS-003' },
          { type: 'Camera', id: 'CAM-003' },
        ],
      },
      {
        id: 'gate-b2', name: 'Service Gate B', location: 'South Back', zone: 'Zone B',
        enabled: false, allDay: false,
        rules: { residents: false, visitors: false, delivery: true },
        hours: { from: '09:00', to: '17:00' },
        hardware: [
          { type: 'Camera', id: 'CAM-004' },
          { type: 'Barrier', id: 'BAR-003' },
        ],
      },
    ],
  },
  {
    id: 'zone-s',
    name: 'Street — Delivery',
    gates: [
      {
        id: 'gate-s1', name: 'Delivery Entrance', location: 'West Street', zone: 'Street',
        enabled: true, allDay: false,
        rules: { residents: false, visitors: false, delivery: true },
        hours: { from: '07:00', to: '21:00' },
        hardware: [
          { type: 'LPR Camera', id: 'CAM-005' },
          { type: 'NFC Reader', id: 'NFC-003' },
        ],
      },
    ],
  },
];

const HARDWARE_ICON: Record<string, React.ElementType> = {
  'LPR Camera': Camera,
  'Camera': Camera,
  'Barrier': ZapOff,
  'QR Scanner': Radio,
  'NFC Reader': Cpu,
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative rounded-full transition-colors flex-shrink-0"
      style={{ width: 36, height: 20, background: checked ? '#1B4FD8' : '#D1D5DB' }}
    >
      <span
        className="absolute rounded-full bg-white transition-all shadow"
        style={{ width: 14, height: 14, top: 3, left: checked ? 19 : 3 }}
      />
    </button>
  );
}

export function AccessControl() {
  const [expandedZones, setExpandedZones] = useState<string[]>(['zone-a', 'zone-b', 'zone-s']);
  const [selectedGate, setSelectedGate] = useState<GateNode>(ZONES[0].gates[0]);
  const [gateStates, setGateStates] = useState<Record<string, GateNode>>(() => {
    const map: Record<string, GateNode> = {};
    ZONES.forEach((z) => z.gates.forEach((g) => { map[g.id] = g; }));
    return map;
  });

  const gate = gateStates[selectedGate.id];

  const updateGate = (updates: Partial<GateNode>) => {
    setGateStates((prev) => ({ ...prev, [gate.id]: { ...prev[gate.id], ...updates } }));
  };

  const toggleZone = (id: string) => {
    setExpandedZones((prev) =>
      prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      <div className="mb-5">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Access Control</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Configure gate rules, access permissions, and hardware assignments</p>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '280px 1fr' }}>
        {/* Tree View */}
        <div
          className="rounded-[10px] overflow-hidden h-fit"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Zones & Gates</p>
          </div>
          {ZONES.map((zone) => (
            <div key={zone.id}>
              <button
                onClick={() => toggleZone(zone.id)}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors border-b"
                style={{ borderColor: '#F3F4F6' }}
              >
                {expandedZones.includes(zone.id)
                  ? <ChevronDown size={14} color="#9CA3AF" strokeWidth={1.5} />
                  : <ChevronRight size={14} color="#9CA3AF" strokeWidth={1.5} />
                }
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', textAlign: 'left' }}>{zone.name}</span>
              </button>
              {expandedZones.includes(zone.id) && zone.gates.map((g) => {
                const gState = gateStates[g.id];
                const isSelected = selectedGate.id === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGate(g)}
                    className="w-full flex items-center gap-3 px-5 py-2.5 transition-colors border-b"
                    style={{ borderColor: '#F3F4F6', background: isSelected ? '#EEF2FF' : 'transparent' }}
                  >
                    {isSelected && <span className="absolute left-0 w-0.5 h-8 rounded-r" style={{ background: '#1B4FD8' }} />}
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{ width: 7, height: 7, background: gState.enabled ? '#16A34A' : '#DC2626' }}
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <p style={{ fontSize: 13, fontWeight: isSelected ? 600 : 400, color: isSelected ? '#1B4FD8' : '#374151' }}>{g.name}</p>
                        {gState.allDay && (
                          <span className="px-1 py-0.5 rounded-[3px]" style={{ fontSize: 9, fontWeight: 700, background: '#DCFCE7', color: '#16A34A', letterSpacing: '0.04em' }}>
                            24/7
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 11, color: '#9CA3AF' }}>{g.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Gate Config Panel */}
        <div
          className="rounded-[10px] overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>{gate.name}</h2>
              <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{gate.location} · {gate.zone}</p>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 13, color: gate.enabled ? '#16A34A' : '#DC2626', fontWeight: 500 }}>
                {gate.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <Toggle checked={gate.enabled} onChange={(v) => updateGate({ enabled: v })} />
            </div>
          </div>

          <div className="p-6 grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* Access Rules */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Access Rules</p>
              {[
                { key: 'residents', label: 'Residents', desc: 'Allow registered residents to enter' },
                { key: 'visitors',  label: 'Visitors',  desc: 'Allow pre-approved guest passes' },
                { key: 'delivery',  label: 'Deliveries', desc: 'Allow delivery personnel entry' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-start justify-between py-4 border-b last:border-0" style={{ borderColor: '#F3F4F6' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{label}</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{desc}</p>
                  </div>
                  <Toggle
                    checked={gate.rules[key as keyof typeof gate.rules]}
                    onChange={(v) => updateGate({ rules: { ...gate.rules, [key]: v } })}
                  />
                </div>
              ))}
            </div>

            {/* Operating Hours + Hardware */}
            <div className="flex flex-col gap-6">
              {/* Operating Hours */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Operating Hours</p>
                  {/* 24/7 toggle */}
                  <button
                    onClick={() => updateGate({ allDay: !gate.allDay })}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] transition-all"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      background: gate.allDay ? '#DCFCE7' : '#F4F5F7',
                      color: gate.allDay ? '#16A34A' : '#6B7280',
                      border: gate.allDay ? '1px solid #86EFAC' : '1px solid #E5E7EB',
                    }}
                  >
                    <span
                      className="rounded-full"
                      style={{ width: 7, height: 7, background: gate.allDay ? '#16A34A' : '#D1D5DB', flexShrink: 0 }}
                    />
                    24/7 — Always Open
                  </button>
                </div>

                {gate.allDay ? (
                  <div
                    className="flex items-center gap-3 p-4 rounded-[8px]"
                    style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                  >
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{ width: 8, height: 8, background: '#16A34A' }}
                    />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D' }}>Gate operates 24 hours a day, 7 days a week</p>
                      <p style={{ fontSize: 12, color: '#16A34A', marginTop: 1 }}>No time restrictions apply. Disable 24/7 to set custom hours.</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-3 p-4 rounded-[8px]"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
                  >
                    <div className="flex-1">
                      <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>Open From</p>
                      <input
                        type="time"
                        value={gate.hours.from}
                        onChange={(e) => updateGate({ hours: { ...gate.hours, from: e.target.value } })}
                        className="w-full rounded-[4px] px-2 py-1.5 outline-none"
                        style={{ border: '1px solid #E5E7EB', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", background: '#FFFFFF' }}
                      />
                    </div>
                    <span style={{ color: '#9CA3AF', marginTop: 16 }}>—</span>
                    <div className="flex-1">
                      <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>Close At</p>
                      <input
                        type="time"
                        value={gate.hours.to}
                        onChange={(e) => updateGate({ hours: { ...gate.hours, to: e.target.value } })}
                        className="w-full rounded-[4px] px-2 py-1.5 outline-none"
                        style={{ border: '1px solid #E5E7EB', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", background: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Linked Hardware */}
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Linked Hardware</p>
                <div className="flex flex-wrap gap-2">
                  {gate.hardware.length === 0 && (
                    <p style={{ fontSize: 12, color: '#9CA3AF' }}>No hardware linked to this gate.</p>
                  )}
                  {gate.hardware.map((hw, i) => {
                    const HwIcon = HARDWARE_ICON[hw.type] || Cpu;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
                      >
                        <HwIcon size={13} color="#1B4FD8" strokeWidth={1.5} />
                        <span style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500 }}>{hw.type}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6B7280' }}>{hw.id}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gate Actions */}
              <div className="flex gap-3 mt-auto">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
                  style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => updateGate({ enabled: !gate.enabled })}
                  className="flex items-center gap-2 px-4 py-2 rounded-[6px] transition-colors hover:bg-red-50"
                  style={{ border: '1px solid #FCA5A5', color: '#DC2626', fontSize: 13, fontWeight: 500 }}
                >
                  <Power size={14} strokeWidth={1.5} />
                  {gate.enabled ? 'Disable Gate' : 'Enable Gate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
