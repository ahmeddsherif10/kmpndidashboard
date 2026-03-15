import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, X, RefreshCw, Camera, Radio, Cpu, ZapOff } from 'lucide-react';

const DEVICES = [
  {
    id: 'DEV001', name: 'Main Gate LPR Camera', type: 'LPR Camera', zone: 'Zone A', gate: 'Main Gate',
    status: 'online', ping: '1s ago',
    ip: '192.168.1.101', firmware: 'v3.2.1', lastScan: 'QAB-2841 — Allowed · 09:54 AM',
  },
  {
    id: 'DEV002', name: 'Main Gate Barrier', type: 'Barrier', zone: 'Zone A', gate: 'Main Gate',
    status: 'online', ping: '2s ago',
    ip: '192.168.1.102', firmware: 'v2.1.0', lastScan: 'Opened 09:54 AM — 0.8s response',
  },
  {
    id: 'DEV003', name: 'Main Gate QR Scanner', type: 'QR Scanner', zone: 'Zone A', gate: 'Main Gate',
    status: 'online', ping: '2s ago',
    ip: '192.168.1.103', firmware: 'v1.8.3', lastScan: 'Pass #VIS-0921 scanned · 09:47 AM',
  },
  {
    id: 'DEV004', name: 'Side Gate A NFC Reader', type: 'NFC Reader', zone: 'Zone A', gate: 'Side Gate A',
    status: 'warning', ping: '44s ago',
    ip: '192.168.1.104', firmware: 'v1.5.0', lastScan: 'Tag #NFC-7721 · 09:32 AM',
  },
  {
    id: 'DEV005', name: 'Pool Gate QR Scanner', type: 'QR Scanner', zone: 'Zone B', gate: 'Pool Gate',
    status: 'warning', ping: '51s ago',
    ip: '192.168.1.201', firmware: 'v1.8.1', lastScan: 'Pass #VIS-0847 scanned · 09:15 AM',
  },
  {
    id: 'DEV006', name: 'Service Gate Camera', type: 'Camera', zone: 'Zone B', gate: 'Service Gate B',
    status: 'offline', ping: '12m ago',
    ip: '192.168.1.202', firmware: 'v2.9.0', lastScan: 'Connection lost · 09:41 AM',
  },
  {
    id: 'DEV007', name: 'Delivery LPR Camera', type: 'LPR Camera', zone: 'Street', gate: 'Delivery Entrance',
    status: 'online', ping: '1s ago',
    ip: '192.168.1.301', firmware: 'v3.2.1', lastScan: 'HMN-5503 — Allowed · 09:49 AM',
  },
  {
    id: 'DEV008', name: 'West LPR Camera', type: 'LPR Camera', zone: 'Pool', gate: 'Pool Gate',
    status: 'online', ping: '3s ago',
    ip: '192.168.1.302', firmware: 'v3.1.5', lastScan: 'LKV-3388 — Allowed · 09:40 AM',
  },
];

const STATUS_CONFIG: Record<string, { color: string; label: string; bg: string }> = {
  online: { color: '#16A34A', label: 'Online', bg: '#DCFCE7' },
  warning: { color: '#D97706', label: 'Warning', bg: '#FEF3C7' },
  offline: { color: '#DC2626', label: 'Offline', bg: '#FEE2E2' },
};

const TYPE_ICON: Record<string, React.ElementType> = {
  'LPR Camera': Camera,
  'Camera': Camera,
  'QR Scanner': Radio,
  'NFC Reader': Cpu,
  'Barrier': ZapOff,
};

const DEVICE_TYPES = ['LPR Camera', 'Camera', 'QR Scanner', 'NFC Reader', 'Barrier'];
const ZONES = ['Zone A', 'Zone B', 'Pool', 'Street'];

type Device = typeof DEVICES[number];

// Extract DeviceRow into its own named component so Figma's inspector
// wraps the component itself (not the Fragment), avoiding the
// "Invalid prop on React.Fragment" warning.
function DeviceRow({
  dev,
  isExpanded,
  onToggle,
}: {
  dev: Device;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const sc = STATUS_CONFIG[dev.status];
  const DevIcon = TYPE_ICON[dev.type] || Cpu;

  return (
    <>
      <tr
        className="hover:bg-gray-50 transition-colors cursor-pointer"
        style={{ borderBottom: '1px solid #F3F4F6' }}
        onClick={onToggle}
      >
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-2">
            <DevIcon size={15} color="#6B7280" strokeWidth={1.5} />
            <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{dev.name}</span>
          </div>
        </td>
        <td className="px-5 py-3.5" style={{ fontSize: 13, color: '#374151' }}>{dev.type}</td>
        <td className="px-5 py-3.5" style={{ fontSize: 13, color: '#374151' }}>{dev.zone}</td>
        <td className="px-5 py-3.5" style={{ fontSize: 13, color: '#374151' }}>{dev.gate}</td>
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="rounded-full" style={{ width: 7, height: 7, background: sc.color, display: 'inline-block' }} />
            <span
              className="px-2 py-0.5 rounded-[4px]"
              style={{ fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              {sc.label}
            </span>
          </div>
        </td>
        <td className="px-5 py-3.5">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#6B7280' }}>{dev.ping}</span>
        </td>
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button className="px-2.5 py-1 rounded-[4px] hover:bg-blue-50 transition-colors" style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500 }}>Edit</button>
            <button
              className="p-1.5 rounded-[4px] hover:bg-gray-100 transition-colors"
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
            >
              {isExpanded ? <ChevronUp size={14} color="#6B7280" strokeWidth={1.5} /> : <ChevronDown size={14} color="#6B7280" strokeWidth={1.5} />}
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
          <td colSpan={7} className="px-5 py-4" style={{ background: '#F9FAFB' }}>
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'IP Address', value: dev.ip, mono: true },
                { label: 'Firmware Version', value: dev.firmware, mono: true },
                { label: 'Device ID', value: dev.id, mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 13, color: '#374151', fontFamily: mono ? "'JetBrains Mono', monospace" : undefined, fontWeight: 500 }}>{value}</p>
                </div>
              ))}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Last Scan Result</p>
                <p style={{ fontSize: 12, color: '#374151' }}>{dev.lastScan}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function Hardware() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'LPR Camera', zone: 'Zone A', gate: '', ip: '' });

  const filtered = DEVICES.filter((d) => statusFilter === 'All' || d.status === statusFilter.toLowerCase());

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Hardware Configuration</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{DEVICES.length} devices registered across all zones</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-[6px] transition-colors hover:bg-gray-100"
            style={{ border: '1px solid #E5E7EB', fontSize: 13, fontWeight: 500, color: '#374151' }}
          >
            <RefreshCw size={14} strokeWidth={1.5} /> Sync All
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
            style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
          >
            <Plus size={15} strokeWidth={2} /> Add Device
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Online', count: DEVICES.filter((d) => d.status === 'online').length, ...STATUS_CONFIG.online },
          { label: 'Warning', count: DEVICES.filter((d) => d.status === 'warning').length, ...STATUS_CONFIG.warning },
          { label: 'Offline', count: DEVICES.filter((d) => d.status === 'offline').length, ...STATUS_CONFIG.offline },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(statusFilter === s.label ? 'All' : s.label)}
            className="flex items-center gap-4 p-4 rounded-[10px] text-left transition-all hover:shadow-md"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${statusFilter === s.label ? s.color : '#E5E7EB'}`,
              boxShadow: statusFilter === s.label ? `0 0 0 2px ${s.color}20` : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <div className="rounded-full" style={{ width: 10, height: 10, background: s.color, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#111827' }}>{s.count}</p>
              <p style={{ fontSize: 12, color: '#6B7280' }}>{s.label} devices</p>
            </div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-[10px] overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Device Name', 'Type', 'Zone', 'Gate', 'Status', 'Last Ping', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((dev) => (
              <DeviceRow
                key={dev.id}
                dev={dev}
                isExpanded={expanded === dev.id}
                onToggle={() => setExpanded(expanded === dev.id ? null : dev.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Device Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowModal(false)} />
          <div
            className="fixed z-50 rounded-[10px] overflow-hidden"
            style={{
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 440, background: '#FFFFFF', border: '1px solid #E5E7EB',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>Add New Device</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-[4px] hover:bg-gray-100">
                <X size={16} color="#6B7280" strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {[
                { label: 'Device Name', key: 'name', placeholder: 'e.g. North Gate LPR Camera' },
                { label: 'Gate Assignment', key: 'gate', placeholder: 'e.g. North Gate' },
                { label: 'IP Address', key: 'ip', placeholder: '192.168.1.xxx', mono: true },
              ].map(({ label, key, placeholder, mono }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-[6px] outline-none"
                    style={{ border: '1px solid #E5E7EB', fontSize: 13, background: '#FAFAFA', fontFamily: (mono as any) ? "'JetBrains Mono', monospace" : undefined }}
                  />
                </div>
              ))}
              {[
                { label: 'Device Type', key: 'type', options: DEVICE_TYPES },
                { label: 'Zone', key: 'zone', options: ZONES },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                  <select
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2 rounded-[6px] outline-none"
                    style={{ border: '1px solid #E5E7EB', fontSize: 13, background: '#FAFAFA' }}
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t flex items-center justify-end gap-3" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-[6px] hover:bg-gray-100 transition-colors" style={{ fontSize: 13, fontWeight: 500, color: '#374151', border: '1px solid #E5E7EB' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-5 py-2 rounded-[6px] text-white hover:opacity-90 transition-opacity" style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}>Register Device</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}