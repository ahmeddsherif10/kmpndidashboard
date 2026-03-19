import { useState } from 'react';
import { Search, ChevronRight, ChevronDown, X, Eye, Pencil, SquareParking, Car, ChevronLeft, MoreHorizontal, Home, Building, Download, FileSpreadsheet, UserPlus } from 'lucide-react';
import * as XLSX from 'xlsx';

const UNITS = [
  { id: 'U001', unit: 'A-101', building: 'Block A', floor: 1, zone: 'North', owner: 'Omar Al-Rashidi', resident: null, status: 'active', vehicles: 2, parking: 'A-12' },
  { id: 'U002', unit: 'A-204', building: 'Block A', floor: 2, zone: 'North', owner: 'Sarah Mansour', resident: 'Ali Mahmoud', status: 'active', vehicles: 1, parking: 'A-07' },
  { id: 'U003', unit: 'B-301', building: 'Block B', floor: 3, zone: 'South', owner: 'Karim Nour', resident: null, status: 'active', vehicles: 3, parking: 'B-03' },
  { id: 'U004', unit: 'B-207', building: 'Block B', floor: 2, zone: 'South', owner: 'Dina El-Sayed', resident: null, status: 'inactive', vehicles: 0, parking: '—' },
  { id: 'U005', unit: 'C-103', building: 'Block C', floor: 1, zone: 'East', owner: 'Tarek Ibrahim', resident: 'Nour Ahmed', status: 'active', vehicles: 2, parking: 'C-21' },
  { id: 'U006', unit: 'C-302', building: 'Block C', floor: 3, zone: 'East', owner: 'Rania Khalil', resident: null, status: 'active', vehicles: 1, parking: 'C-18' },
  { id: 'U007', unit: 'D-401', building: 'Block D', floor: 4, zone: 'West', owner: 'Ahmed Hassan', resident: 'Fatima Saeed', status: 'suspended', vehicles: 2, parking: 'D-05' },
  { id: 'U008', unit: 'D-410', building: 'Block D', floor: 4, zone: 'West', owner: 'Mona Fathi', resident: null, status: 'active', vehicles: 1, parking: 'D-11' },
  { id: 'U009', unit: 'E-501', building: 'Block E', floor: 5, zone: 'Central', owner: 'Youssef Salem', resident: null, status: 'active', vehicles: 2, parking: 'E-02' },
  { id: 'U010', unit: 'E-502', building: 'Block E', floor: 5, zone: 'Central', owner: 'Layla Adel', resident: 'Mohamed Fouad', status: 'active', vehicles: 1, parking: 'E-03' },
  { id: 'U011', unit: 'A-305', building: 'Block A', floor: 3, zone: 'North', owner: 'Hassan Mustafa', resident: null, status: 'active', vehicles: 2, parking: 'A-19' },
  { id: 'U012', unit: 'B-408', building: 'Block B', floor: 4, zone: 'South', owner: 'Nadia Sherif', resident: null, status: 'inactive', vehicles: 0, parking: '—' },
];

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: '#DCFCE7', color: '#16A34A', label: 'Active' },
  inactive: { bg: '#F3F4F6', color: '#6B7280', label: 'Inactive' },
  suspended: { bg: '#FEE2E2', color: '#DC2626', label: 'Suspended' },
};

const VEHICLES_MOCK: Record<string, { plate: string; type: string; color: string }[]> = {
  'U001': [{ plate: 'QAB-2841', type: 'Sedan', color: 'White' }, { plate: 'DFC-7712', type: 'SUV', color: 'Black' }],
  'U003': [{ plate: 'BNQ-4471', type: 'Sedan', color: 'Silver' }, { plate: 'TYU-6654', type: 'Coupe', color: 'Red' }, { plate: 'XPT-1190', type: 'SUV', color: 'Blue' }],
  'U005': [{ plate: 'LKV-3388', type: 'SUV', color: 'White' }, { plate: 'RWS-9021', type: 'Sedan', color: 'Gray' }],
};

export function UnitManagement() {
  const [search, setSearch] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('All');
  const [floorFilter, setFloorFilter] = useState('All');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUnit, setSelectedUnit] = useState<typeof UNITS[0] | null>(null);
  const [page, setPage] = useState(1);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const perPage = 8;

  const buildings = ['All', 'Block A', 'Block B', 'Block C', 'Block D', 'Block E'];
  const floors = ['All', '1', '2', '3', '4', '5'];
  const zones = ['All', 'North', 'South', 'East', 'West', 'Central'];
  const statuses = ['All', 'Active', 'Inactive', 'Suspended'];

  const filtered = UNITS.filter((u) => {
    const matchSearch = !search ||
      u.owner.toLowerCase().includes(search.toLowerCase()) ||
      u.unit.toLowerCase().includes(search.toLowerCase()) ||
      (u.resident && u.resident.toLowerCase().includes(search.toLowerCase()));
    const matchBuilding = buildingFilter === 'All' || u.building === buildingFilter;
    const matchFloor = floorFilter === 'All' || u.floor === parseInt(floorFilter);
    const matchZone = zoneFilter === 'All' || u.zone === zoneFilter;
    const matchStatus = statusFilter === 'All' || u.status === statusFilter.toLowerCase();
    return matchSearch && matchBuilding && matchFloor && matchZone && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Unit Management</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{UNITS.length} units registered · Palm Hills Katameya</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-[6px] transition-colors hover:bg-gray-100"
            style={{ border: '1px solid #E5E7EB', background: '#FFFFFF', fontSize: 13, fontWeight: 500, color: '#374151' }}
          >
            <FileSpreadsheet size={16} color="#10B981" strokeWidth={1.5} />
            Import from Excel
          </button>
          <button
            onClick={() => setShowAddTenantModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-[6px] transition-opacity hover:opacity-90 text-white"
            style={{ background: '#16A34A', fontSize: 13, fontWeight: 500 }}
          >
            <UserPlus size={16} strokeWidth={2} />
            Add New Tenant
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="flex items-center gap-3 p-4 rounded-[10px] mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        {/* Search */}
        <div
          className="flex items-center gap-2 flex-1 max-w-[300px] rounded-[6px] px-3"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}
        >
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search units, owners, or residents…"
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>

        {/* Dropdowns */}
        {[
          { label: 'Building', options: buildings, value: buildingFilter, onChange: setBuildingFilter },
          { label: 'Floor', options: floors, value: floorFilter, onChange: setFloorFilter },
          { label: 'Zone', options: zones, value: zoneFilter, onChange: setZoneFilter },
        ].map(({ label, options, value, onChange }) => (
          <div key={label} className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="appearance-none rounded-[6px] px-3 pr-8 outline-none cursor-pointer"
              style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
            >
              {options.map((o) => <option key={o}>{o === 'All' ? `All ${label}s` : o}</option>)}
            </select>
            <ChevronDown size={12} color="#9CA3AF" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        ))}

        {/* Status Pills */}
        <div className="flex items-center gap-2 ml-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1 rounded-full transition-all"
              style={{
                fontSize: 12,
                fontWeight: 500,
                background: statusFilter === s ? '#1B4FD8' : '#F4F5F7',
                color: statusFilter === s ? '#FFFFFF' : '#6B7280',
                border: '1px solid',
                borderColor: statusFilter === s ? '#1B4FD8' : '#E5E7EB',
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
              {['Unit No.', 'Building', 'Floor', 'Zone', 'Owner Name', 'Resident Name', 'Status', 'Vehicles', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3"
                  style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => {
              const sc = STATUS_COLORS[row.status];
              return (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                  style={{ borderBottom: i < paged.length - 1 ? '1px solid #F3F4F6' : 'none' }}
                  onClick={() => setSelectedUnit(row)}
                >
                  <td className="px-5 py-3.5">
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1B4FD8', fontFamily: "'JetBrains Mono', monospace" }}>{row.unit}</span>
                  </td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, color: '#374151' }}>{row.building}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, color: '#374151' }}>{row.floor}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2 py-0.5 rounded-[4px]"
                      style={{ fontSize: 11, fontWeight: 500, background: '#EEF2FF', color: '#4F46E5' }}
                    >
                      {row.zone}
                    </span>
                  </td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{row.owner}</td>
                  <td className="px-5 py-3.5">
                    {row.resident ? (
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{row.resident}</span>
                    ) : (
                      <span style={{ fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>Owner</span>
                    )}
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
                    <div className="flex items-center gap-1">
                      <Car size={13} color="#6B7280" strokeWidth={1.5} />
                      <span style={{ fontSize: 13, color: '#374151' }}>{row.vehicles}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1.5 rounded-[4px] hover:bg-blue-50 transition-colors" title="View" onClick={() => setSelectedUnit(row)}>
                        <Eye size={15} color="#1B4FD8" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-[4px] hover:bg-gray-100 transition-colors" title="Edit">
                        <Pencil size={15} color="#6B7280" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded-[4px] hover:bg-gray-100 transition-colors" title="Assign Parking">
                        <SquareParking size={15} color="#6B7280" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-5 py-3 border-t"
          style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}
        >
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} units
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-[4px] disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={15} color="#374151" strokeWidth={1.5} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-7 h-7 rounded-[4px] transition-colors"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  background: page === p ? '#1B4FD8' : 'transparent',
                  color: page === p ? '#FFFFFF' : '#374151',
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-[4px] disabled:opacity-40 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={15} color="#374151" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-In Panel */}
      {selectedUnit && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.2)' }}
            onClick={() => setSelectedUnit(null)}
          />
          <div
            className="fixed right-0 top-0 h-full z-50 overflow-y-auto"
            style={{ width: 360, background: '#FFFFFF', borderLeft: '1px solid #E5E7EB', boxShadow: '-4px 0 24px rgba(0,0,0,0.08)' }}
          >
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#111827' }}>Unit Details</h2>
              <button onClick={() => setSelectedUnit(null)} className="p-1.5 rounded-[4px] hover:bg-gray-100 transition-colors">
                <X size={16} color="#6B7280" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-5">
              {/* Unit Badge */}
              <div
                className="flex items-center justify-between p-4 rounded-[10px] mb-5"
                style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
              >
                <div>
                  <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>Unit Number</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: '#1B4FD8' }}>{selectedUnit.unit}</p>
                  <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{selectedUnit.building} · Floor {selectedUnit.floor} · {selectedUnit.zone} Zone</p>
                </div>
                <span
                  className="px-3 py-1.5 rounded-[4px]"
                  style={{ fontSize: 11, fontWeight: 600, background: STATUS_COLORS[selectedUnit.status].bg, color: STATUS_COLORS[selectedUnit.status].color, textTransform: 'uppercase' }}
                >
                  {STATUS_COLORS[selectedUnit.status].label}
                </span>
              </div>

              {/* Owner Info */}
              <div className="mb-5">
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Owner Information</p>
                {[
                  { label: 'Full Name', value: selectedUnit.owner },
                  { label: 'Contact', value: '+20 100 234 5678' },
                  { label: 'Email', value: 'owner@email.com' },
                  { label: 'Ownership Date', value: 'Jan 15, 2023' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{label}</span>
                    <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Resident Info (only if rented) */}
              {selectedUnit.resident && (
                <div className="mb-5">
                  <div
                    className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-[6px] w-fit"
                    style={{ background: '#FEF3C7', border: '1px solid #FDE047' }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Rented Unit
                    </span>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Resident Information</p>
                  {[
                    { label: 'Full Name', value: selectedUnit.resident },
                    { label: 'Contact', value: '+20 100 987 6543' },
                    { label: 'Email', value: 'resident@email.com' },
                    { label: 'Move-in Date', value: 'Mar 10, 2024' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>{label}</span>
                      <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Registered Vehicles */}
              <div className="mb-5">
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                  Registered Vehicles ({selectedUnit.vehicles})
                </p>
                {(VEHICLES_MOCK[selectedUnit.id] || []).length === 0 ? (
                  <p style={{ fontSize: 13, color: '#9CA3AF' }}>No vehicles registered</p>
                ) : (
                  (VEHICLES_MOCK[selectedUnit.id] || [{ plate: 'QAB-2841', type: 'Sedan', color: 'White' }]).map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-[6px] mb-2"
                      style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
                    >
                      <div className="flex items-center gap-2">
                        <Car size={14} color="#6B7280" strokeWidth={1.5} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: '#374151' }}>{v.plate}</span>
                      </div>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>{v.type} · {v.color}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Parking Slot */}
              <div className="mb-5">
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Parking Allocation</p>
                <div
                  className="flex items-center gap-3 p-3 rounded-[6px]"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
                >
                  <SquareParking size={18} color="#1B4FD8" strokeWidth={1.5} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Slot {selectedUnit.parking}</p>
                    <p style={{ fontSize: 11, color: '#6B7280' }}>Zone A — Covered</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90" style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}>
                  Edit Unit
                </button>
                <button className="px-4 py-2 rounded-[6px] transition-colors hover:bg-gray-100" style={{ border: '1px solid #E5E7EB', fontSize: 13, fontWeight: 500, color: '#374151' }}>
                  More
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Unit Modal — removed (units managed via Buildings page) */}
      {false && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-lg overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Building size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Add New Unit
                </h2>
              </div>
              <button
                onClick={() => setShowAddUnitModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Unit Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., A-101"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Building *
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  >
                    <option>Block A</option>
                    <option>Block B</option>
                    <option>Block C</option>
                    <option>Block D</option>
                    <option>Block E</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Floor *
                  </label>
                  <input
                    type="number"
                    placeholder="Floor number"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Zone *
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  >
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                    <option>Central</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Parking Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., A-12"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Owner Name *
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>

              <div className="mt-4">
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Resident Name (if rented)
                </label>
                <input
                  type="text"
                  placeholder="Leave empty if owner-occupied"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+20 100 234 5678"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowAddUnitModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Villa Modal — removed */}
      {false && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-lg overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Home size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Add New Villa
                </h2>
              </div>
              <button
                onClick={() => setShowAddVillaModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Villa Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., V-01"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Street/Zone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Zone A"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Plot Size (sqm)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Parking Spaces
                  </label>
                  <input
                    type="number"
                    placeholder="Number of spaces"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Owner Name *
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>

              <div className="mt-4">
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Resident Name (if rented)
                </label>
                <input
                  type="text"
                  placeholder="Leave empty if owner-occupied"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+20 100 234 5678"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowAddVillaModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
              >
                Add Villa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Building Modal — removed */}
      {false && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-lg overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Building size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Add New Building
                </h2>
              </div>
              <button
                onClick={() => setShowAddBuildingModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Building Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Block F"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Number of Floors *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Units per Floor
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 4"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Total Units
                  </label>
                  <input
                    type="number"
                    placeholder="Calculated automatically"
                    className="w-full px-3 py-2 rounded-[6px] outline-none"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                    disabled
                  />
                </div>
              </div>

              <div className="mt-4">
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Zone/Area
                </label>
                <input
                  type="text"
                  placeholder="e.g., North Section"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Parking Slots
                  </label>
                  <input
                    type="number"
                    placeholder="Total parking spaces"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Year Built
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2020"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Notes
                </label>
                <textarea
                  placeholder="Additional information about the building..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowAddBuildingModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
              >
                Add Building
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Excel Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#DCFCE7' }}>
                  <FileSpreadsheet size={20} color="#10B981" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Import Units from Excel
                </h2>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              {/* Instructions */}
              <div
                className="p-4 rounded-[8px] mb-5"
                style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1B4FD8', marginBottom: 8 }}>
                  📋 Instructions
                </p>
                <ul style={{ fontSize: 12, color: '#374151', paddingLeft: 20 }}>
                  <li className="mb-1">Download the template to see the required format</li>
                  <li className="mb-1">Fill in your unit data (Unit Number, Building, Floor, Zone, Owner, etc.)</li>
                  <li className="mb-1">Upload the completed Excel file (.xlsx or .xls)</li>
                  <li>Review the preview before confirming the import</li>
                </ul>
              </div>

              {/* Download Template Button */}
              <div className="mb-5">
                <button
                  onClick={() => {
                    // Create sample Excel template
                    const template = [
                      ['Unit Number', 'Building', 'Floor', 'Zone', 'Owner Name', 'Resident Name', 'Status', 'Parking Slot'],
                      ['A-101', 'Block A', '1', 'North', 'John Doe', '', 'Active', 'A-12'],
                      ['A-102', 'Block A', '1', 'North', 'Jane Smith', 'Mike Johnson', 'Active', 'A-13'],
                    ];
                    const ws = XLSX.utils.aoa_to_sheet(template);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Units Template');
                    XLSX.writeFile(wb, 'units_import_template.xlsx');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                  style={{ background: '#10B981', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}
                >
                  <Download size={16} strokeWidth={2} />
                  Download Excel Template
                </button>
              </div>

              {/* File Upload Area */}
              <div
                className="border-2 border-dashed rounded-[10px] p-8 text-center cursor-pointer transition-colors hover:border-blue-400 hover:bg-blue-50/30"
                style={{ borderColor: '#D1D5DB' }}
                onClick={() => document.getElementById('excel-upload')?.click()}
              >
                <input
                  id="excel-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const data = new Uint8Array(event.target?.result as ArrayBuffer);
                          const workbook = XLSX.read(data, { type: 'array' });
                          const sheetName = workbook.SheetNames[0];
                          const worksheet = workbook.Sheets[sheetName];
                          const jsonData = XLSX.utils.sheet_to_json(worksheet);

                          console.log('Imported data:', jsonData);
                          alert(`Successfully parsed ${jsonData.length} units from Excel file!\n\nIn a real application, this would add the units to your system.`);
                          setShowImportModal(false);
                        } catch (error) {
                          alert('Error parsing Excel file. Please make sure the file format is correct.');
                          console.error(error);
                        }
                      };
                      reader.readAsArrayBuffer(file);
                    }
                  }}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full" style={{ background: '#EEF2FF' }}>
                    <Upload size={32} color="#1B4FD8" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
                      Click to upload or drag and drop
                    </p>
                    <p style={{ fontSize: 12, color: '#6B7280' }}>
                      Excel files only (.xlsx, .xls)
                    </p>
                  </div>
                </div>
              </div>

              {/* Expected Columns Info */}
              <div className="mt-5">
                <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 8 }}>
                  EXPECTED COLUMNS
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {['Unit Number', 'Building', 'Floor', 'Zone', 'Owner Name', 'Resident Name', 'Status', 'Parking Slot'].map((col) => (
                    <div
                      key={col}
                      className="px-2 py-1 rounded-[4px] text-center"
                      style={{ background: '#F4F5F7', fontSize: 10, color: '#374151', fontWeight: 500 }}
                    >
                      {col}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Tenant Modal */}
      {showAddTenantModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-lg overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#DCFCE7' }}>
                  <UserPlus size={20} color="#16A34A" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>Add New Tenant</h2>
              </div>
              <button onClick={() => setShowAddTenantModal(false)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>
            <div className="px-6 py-5 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input type="text" placeholder="e.g., Ahmed Hassan" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>National ID</label>
                  <input type="text" placeholder="ID number" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                  <input type="tel" placeholder="+20 100 234 5678" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
                  <input type="email" placeholder="tenant@email.com" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Assigned Unit *</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    <option value="">Select unit...</option>
                    {UNITS.filter((u) => !u.resident).map((u) => (
                      <option key={u.id} value={u.id}>{u.unit} — {u.building}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Move-in Date *</label>
                  <input type="date" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Lease End Date</label>
                <input type="date" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Notes</label>
                <textarea rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 rounded-[6px] outline-none resize-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setShowAddTenantModal(false)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Cancel</button>
              <button onClick={() => setShowAddTenantModal(false)} className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity" style={{ background: '#16A34A', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>Add Tenant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
