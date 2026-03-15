import { useState } from 'react';
import { Search, Plus, X, ChevronDown } from 'lucide-react';

const VEHICLES = [
  { id: 'V001', plate: 'QAB-2841', owner: 'Omar Al-Rashidi', unit: 'A-101', type: 'Sedan', parking: 'A-12', status: 'active' },
  { id: 'V002', plate: 'DFC-7712', owner: 'Sarah Mansour', unit: 'A-204', type: 'SUV', parking: 'A-07', status: 'active' },
  { id: 'V003', plate: 'BNQ-4471', owner: 'Karim Nour', unit: 'B-301', type: 'Sedan', parking: 'B-03', status: 'active' },
  { id: 'V004', plate: 'TYU-6654', owner: 'Karim Nour', unit: 'B-301', type: 'Coupe', parking: '—', status: 'unassigned' },
  { id: 'V005', plate: 'LKV-3388', owner: 'Tarek Ibrahim', unit: 'C-103', type: 'SUV', parking: 'C-21', status: 'active' },
  { id: 'V006', plate: 'RWS-9021', owner: 'Rania Khalil', unit: 'C-302', type: 'Sedan', parking: 'C-18', status: 'active' },
  { id: 'V007', plate: 'HMN-5503', owner: 'Ahmed Hassan', unit: 'D-401', type: 'SUV', parking: 'D-05', status: 'suspended' },
  { id: 'V008', plate: 'XPT-1190', owner: 'Ahmed Hassan', unit: 'D-401', type: 'Pickup', parking: '—', status: 'suspended' },
  { id: 'V009', plate: 'MNR-7721', owner: 'Mona Fathi', unit: 'D-410', type: 'Hatchback', parking: 'D-11', status: 'active' },
  { id: 'V010', plate: 'PLT-4452', owner: 'Youssef Salem', unit: 'E-501', type: 'Sedan', parking: 'E-02', status: 'active' },
  { id: 'V011', plate: 'GHJ-8843', owner: 'Youssef Salem', unit: 'E-501', type: 'SUV', parking: '—', status: 'unassigned' },
  { id: 'V012', plate: 'WQS-1129', owner: 'Layla Adel', unit: 'E-502', type: 'Sedan', parking: 'E-03', status: 'active' },
];

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: '#DCFCE7', color: '#16A34A', label: 'Active' },
  suspended: { bg: '#FEE2E2', color: '#DC2626', label: 'Suspended' },
  unassigned: { bg: '#FEF3C7', color: '#D97706', label: 'Unassigned' },
};

const VEHICLE_TYPES = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Pickup', 'Minivan'];

export function VehicleRegistry() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ plate: '', type: 'Sedan', owner: '', unit: '', parking: '' });

  const filtered = VEHICLES.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.plate.toLowerCase().includes(q) || v.owner.toLowerCase().includes(q) || v.unit.toLowerCase().includes(q);
    const matchType = typeFilter === 'All' || v.type === typeFilter;
    const matchStatus = statusFilter === 'All' || v.status === statusFilter.toLowerCase();
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Vehicle Registry</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{VEHICLES.length} vehicles registered</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={15} strokeWidth={2} /> Add Vehicle
        </button>
      </div>

      {/* Filter Bar */}
      <div
        className="flex items-center gap-3 p-4 rounded-[10px] mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div
          className="flex items-center gap-2 flex-1 max-w-[320px] rounded-[6px] px-3"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}
        >
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search plate, owner, unit…"
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none rounded-[6px] px-3 pr-8 outline-none cursor-pointer"
            style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
          >
            <option>All</option>
            {VEHICLE_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown size={12} color="#9CA3AF" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          {['All', 'Active', 'Suspended', 'Unassigned'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1 rounded-full transition-all"
              style={{
                fontSize: 12, fontWeight: 500,
                background: statusFilter === s ? '#1B4FD8' : '#F4F5F7',
                color: statusFilter === s ? '#FFFFFF' : '#6B7280',
                border: '1px solid', borderColor: statusFilter === s ? '#1B4FD8' : '#E5E7EB',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-[10px] overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Plate No.', 'Owner', 'Unit', 'Type', 'Parking Slot', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => {
              const sc = STATUS_COLORS[row.status];
              return (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none' }}
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2.5 py-1 rounded-[4px]"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13, fontWeight: 500,
                        background: '#F3F4F6', color: '#374151',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {row.plate}
                    </span>
                  </td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{row.owner}</td>
                  <td className="px-5 py-3.5">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#1B4FD8', fontWeight: 500 }}>{row.unit}</span>
                  </td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, color: '#374151' }}>{row.type}</td>
                  <td className="px-5 py-3.5">
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12, color: row.parking === '—' ? '#9CA3AF' : '#374151',
                      }}
                    >
                      {row.parking}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2.5 py-1 rounded-[4px]"
                      style={{ fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}
                    >
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="px-2.5 py-1 rounded-[4px] hover:bg-blue-50 transition-colors" style={{ fontSize: 12, color: '#1B4FD8', fontWeight: 500 }}>Edit</button>
                      <button className="px-2.5 py-1 rounded-[4px] hover:bg-red-50 transition-colors" style={{ fontSize: 12, color: '#DC2626', fontWeight: 500 }}>Remove</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p style={{ fontSize: 14, color: '#6B7280' }}>No vehicles match your filters.</p>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setShowModal(false)}
          />
          <div
            className="fixed z-50 rounded-[10px] overflow-hidden"
            style={{
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 480, background: '#FFFFFF', border: '1px solid #E5E7EB',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>Add New Vehicle</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-[4px] hover:bg-gray-100 transition-colors">
                <X size={16} color="#6B7280" strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {[
                { label: 'Plate Number', key: 'plate', placeholder: 'e.g. ABC-1234', mono: true },
                { label: 'Owner Name', key: 'owner', placeholder: 'Search resident name…' },
                { label: 'Unit Number', key: 'unit', placeholder: 'e.g. A-101' },
                { label: 'Parking Slot', key: 'parking', placeholder: 'e.g. A-12 (optional)' },
              ].map(({ label, key, placeholder, mono }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-[6px] outline-none"
                    style={{
                      border: '1px solid #E5E7EB', fontSize: 13, color: '#111827',
                      fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
                      background: '#FAFAFA',
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Vehicle Type</label>
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full appearance-none px-3 py-2 rounded-[6px] outline-none cursor-pointer"
                    style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827', background: '#FAFAFA' }}
                  >
                    {VEHICLE_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={14} color="#9CA3AF" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex items-center justify-end gap-3" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-[6px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 13, fontWeight: 500, color: '#374151', border: '1px solid #E5E7EB' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
                style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
              >
                Register Vehicle
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
