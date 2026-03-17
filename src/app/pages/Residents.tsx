import { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, X, Eye, Pencil, Users, Home, UserCheck, UserX } from 'lucide-react';

type ResidentType = 'Owner' | 'Tenant' | 'Family';
type ResidentStatus = 'active' | 'inactive' | 'suspended';

type Resident = {
  id: string;
  name: string;
  unit: string;
  building: string;
  compound: string;
  type: ResidentType;
  status: ResidentStatus;
  phone: string;
  email: string;
  nationality: string;
  moveIn: string;
  members: number;
};

const RESIDENTS: Resident[] = [
  { id: 'R001', name: 'Omar Al-Rashidi',      unit: 'A-101', building: 'Block A', compound: 'Palm Hills Katameya', type: 'Owner',  status: 'active',    phone: '+20 100 123 4567', email: 'omar.rashidi@email.com',   nationality: 'Egyptian',  moveIn: '2021-03-15', members: 4 },
  { id: 'R002', name: 'Sarah Mansour',         unit: 'A-204', building: 'Block A', compound: 'Palm Hills Katameya', type: 'Owner',  status: 'active',    phone: '+20 111 234 5678', email: 'sarah.mansour@email.com',   nationality: 'Egyptian',  moveIn: '2020-07-01', members: 3 },
  { id: 'R003', name: 'Ali Mahmoud',           unit: 'A-204', building: 'Block A', compound: 'Palm Hills Katameya', type: 'Tenant', status: 'active',    phone: '+20 122 345 6789', email: 'ali.mahmoud@email.com',      nationality: 'Egyptian',  moveIn: '2023-01-10', members: 2 },
  { id: 'R004', name: 'Karim Nour',            unit: 'B-301', building: 'Block B', compound: 'Palm Hills Katameya', type: 'Owner',  status: 'active',    phone: '+20 100 456 7890', email: 'karim.nour@email.com',       nationality: 'Egyptian',  moveIn: '2019-11-20', members: 5 },
  { id: 'R005', name: 'Dina El-Sayed',         unit: 'B-207', building: 'Block B', compound: 'Palm Hills Katameya', type: 'Owner',  status: 'inactive',  phone: '+20 111 567 8901', email: 'dina.sayed@email.com',       nationality: 'Egyptian',  moveIn: '2022-06-30', members: 0 },
  { id: 'R006', name: 'Tarek Ibrahim',         unit: 'C-103', building: 'Block C', compound: 'Palm Hills October',  type: 'Owner',  status: 'active',    phone: '+20 122 678 9012', email: 'tarek.ibrahim@email.com',    nationality: 'Egyptian',  moveIn: '2020-02-14', members: 3 },
  { id: 'R007', name: 'Nour Ahmed',            unit: 'C-103', building: 'Block C', compound: 'Palm Hills October',  type: 'Tenant', status: 'active',    phone: '+20 100 789 0123', email: 'nour.ahmed@email.com',       nationality: 'Egyptian',  moveIn: '2023-09-01', members: 1 },
  { id: 'R008', name: 'Rania Khalil',          unit: 'C-302', building: 'Block C', compound: 'Palm Hills October',  type: 'Owner',  status: 'active',    phone: '+20 111 890 1234', email: 'rania.khalil@email.com',     nationality: 'Egyptian',  moveIn: '2021-05-18', members: 4 },
  { id: 'R009', name: 'Ahmed Hassan',          unit: 'D-401', building: 'Block D', compound: 'Sodic West',          type: 'Owner',  status: 'suspended', phone: '+20 122 901 2345', email: 'ahmed.hassan@email.com',     nationality: 'Egyptian',  moveIn: '2018-08-10', members: 2 },
  { id: 'R010', name: 'Fatima Saeed',          unit: 'D-401', building: 'Block D', compound: 'Sodic West',          type: 'Tenant', status: 'active',    phone: '+20 100 012 3456', email: 'fatima.saeed@email.com',     nationality: 'Egyptian',  moveIn: '2024-01-15', members: 3 },
  { id: 'R011', name: 'Mona Fathi',            unit: 'D-410', building: 'Block D', compound: 'Sodic West',          type: 'Owner',  status: 'active',    phone: '+20 111 123 4567', email: 'mona.fathi@email.com',       nationality: 'Egyptian',  moveIn: '2022-03-22', members: 2 },
  { id: 'R012', name: 'Youssef Salem',         unit: 'E-501', building: 'Block E', compound: 'Sodic West',          type: 'Owner',  status: 'active',    phone: '+20 122 234 5678', email: 'youssef.salem@email.com',    nationality: 'Egyptian',  moveIn: '2020-10-05', members: 6 },
  { id: 'R013', name: 'Hana El-Masri',         unit: 'E-502', building: 'Block E', compound: 'Sodic East',          type: 'Owner',  status: 'active',    phone: '+20 100 345 6789', email: 'hana.masri@email.com',       nationality: 'Lebanese',  moveIn: '2021-12-01', members: 3 },
  { id: 'R014', name: 'Sherif Osman',          unit: 'F-102', building: 'Block F', compound: 'Sodic East',          type: 'Tenant', status: 'active',    phone: '+20 111 456 7890', email: 'sherif.osman@email.com',     nationality: 'Egyptian',  moveIn: '2023-04-20', members: 2 },
  { id: 'R015', name: 'Layla Mostafa',         unit: 'F-205', building: 'Block F', compound: 'Sodic East',          type: 'Owner',  status: 'active',    phone: '+20 122 567 8901', email: 'layla.mostafa@email.com',    nationality: 'Egyptian',  moveIn: '2019-07-14', members: 4 },
  { id: 'R016', name: 'Khaled Al-Amin',        unit: 'G-301', building: 'Villa G', compound: 'Hyde Park',           type: 'Owner',  status: 'active',    phone: '+20 100 678 9012', email: 'khaled.alamin@email.com',    nationality: 'Saudi',     moveIn: '2022-01-30', members: 5 },
  { id: 'R017', name: 'Nadia Ramadan',         unit: 'H-101', building: 'Block H', compound: 'Hyde Park',           type: 'Tenant', status: 'active',    phone: '+20 111 789 0123', email: 'nadia.ramadan@email.com',    nationality: 'Egyptian',  moveIn: '2024-02-01', members: 1 },
  { id: 'R018', name: 'Adel Zaki',             unit: 'H-204', building: 'Block H', compound: 'Hyde Park',           type: 'Owner',  status: 'inactive',  phone: '+20 122 890 1234', email: 'adel.zaki@email.com',        nationality: 'Egyptian',  moveIn: '2020-09-18', members: 0 },
  { id: 'R019', name: 'Mariam Al-Ghamdi',      unit: 'I-401', building: 'Block I', compound: 'Hyde Park New Cairo', type: 'Owner',  status: 'active',    phone: '+20 100 901 2345', email: 'mariam.ghamdi@email.com',    nationality: 'Saudi',     moveIn: '2023-06-10', members: 3 },
  { id: 'R020', name: 'Bassem Wael',           unit: 'J-302', building: 'Block J', compound: 'Hyde Park New Cairo', type: 'Tenant', status: 'active',    phone: '+20 111 012 3456', email: 'bassem.wael@email.com',      nationality: 'Egyptian',  moveIn: '2023-11-05', members: 2 },
  { id: 'R021', name: 'Iman Salah',            unit: 'K-101', building: 'Block K', compound: 'New Zayed Phase II',  type: 'Owner',  status: 'active',    phone: '+20 122 123 4568', email: 'iman.salah@email.com',       nationality: 'Egyptian',  moveIn: '2021-04-12', members: 4 },
  { id: 'R022', name: 'Walid Nassar',          unit: 'K-203', building: 'Block K', compound: 'New Zayed Phase II',  type: 'Owner',  status: 'active',    phone: '+20 100 234 5679', email: 'walid.nassar@email.com',     nationality: 'Egyptian',  moveIn: '2022-08-25', members: 3 },
  { id: 'R023', name: 'Samira El-Deeb',        unit: 'L-105', building: 'Block L', compound: 'New Zayed Phase III', type: 'Tenant', status: 'active',    phone: '+20 111 345 6790', email: 'samira.eldeeb@email.com',    nationality: 'Egyptian',  moveIn: '2024-03-01', members: 2 },
  { id: 'R024', name: 'Hassan Al-Qassem',      unit: 'L-301', building: 'Villa L', compound: 'New Zayed Phase III', type: 'Owner',  status: 'active',    phone: '+20 122 456 7891', email: 'hassan.qassem@email.com',    nationality: 'Kuwaiti',   moveIn: '2023-12-20', members: 5 },
];

const STATUS_STYLES: Record<ResidentStatus, { bg: string; color: string; label: string }> = {
  active:    { bg: '#DCFCE7', color: '#16A34A', label: 'Active' },
  inactive:  { bg: '#F3F4F6', color: '#6B7280', label: 'Inactive' },
  suspended: { bg: '#FEE2E2', color: '#DC2626', label: 'Suspended' },
};

const TYPE_STYLES: Record<ResidentType, { bg: string; color: string }> = {
  Owner:  { bg: '#EEF2FF', color: '#1B4FD8' },
  Tenant: { bg: '#FEF3C7', color: '#D97706' },
  Family: { bg: '#F3E8FF', color: '#7C3AED' },
};

const PAGE_SIZE = 10;

const COMPOUNDS = ['All Compounds', 'Palm Hills Katameya', 'Palm Hills October', 'Sodic West', 'Sodic East', 'Hyde Park', 'Hyde Park New Cairo', 'New Zayed Phase II', 'New Zayed Phase III'];

export function Residents() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [compoundFilter, setCompoundFilter] = useState('All Compounds');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Resident | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = RESIDENTS.filter((r) => {
    const matchSearch = !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.unit.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search);
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    const matchCompound = compoundFilter === 'All Compounds' || r.compound === compoundFilter;
    return matchSearch && matchStatus && matchType && matchCompound;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeCount = RESIDENTS.filter((r) => r.status === 'active').length;
  const ownerCount  = RESIDENTS.filter((r) => r.type === 'Owner').length;
  const tenantCount = RESIDENTS.filter((r) => r.type === 'Tenant').length;

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>
            Residents
          </h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {RESIDENTS.length} total residents across all compounds
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Resident
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Residents', value: RESIDENTS.length, icon: Users, color: '#1B4FD8', bg: '#EEF2FF' },
          { label: 'Active', value: activeCount, icon: UserCheck, color: '#16A34A', bg: '#DCFCE7' },
          { label: 'Owners', value: ownerCount, icon: Home, color: '#F59E0B', bg: '#FEF3C7' },
          { label: 'Tenants', value: tenantCount, icon: UserX, color: '#8B5CF6', bg: '#F3E8FF' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="p-4 rounded-[10px]" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-[6px]" style={{ background: bg }}>
                <Icon size={18} color={color} strokeWidth={1.5} />
              </div>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', fontFamily: "'Sora', sans-serif" }}>{value}</p>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap items-center gap-3 p-4 rounded-[10px] mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-2 rounded-[6px] px-3" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, unit, email..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>

        <select
          value={compoundFilter}
          onChange={(e) => { setCompoundFilter(e.target.value); setPage(1); }}
          className="rounded-[6px] px-3 outline-none"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
        >
          {COMPOUNDS.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="rounded-[6px] px-3 outline-none"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
        >
          <option value="all">All Types</option>
          <option value="Owner">Owner</option>
          <option value="Tenant">Tenant</option>
          <option value="Family">Family</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-[6px] px-3 outline-none"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>

        <span style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 'auto' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Resident', 'Unit', 'Compound', 'Type', 'Phone', 'Move-in', 'Members', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((r, idx) => {
              const statusStyle = STATUS_STYLES[r.status];
              const typeStyle   = TYPE_STYLES[r.type];
              return (
                <tr
                  key={r.id}
                  style={{ borderBottom: idx < paginated.length - 1 ? '1px solid #F3F4F6' : 'none' }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Resident */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: 32, height: 32, background: '#EEF2FF' }}
                      >
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#1B4FD8' }}>
                          {r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{r.name}</p>
                        <p style={{ fontSize: 11, color: '#9CA3AF' }}>{r.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Unit */}
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{r.unit}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{r.building}</p>
                  </td>
                  {/* Compound */}
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, color: '#374151' }}>{r.compound}</p>
                  </td>
                  {/* Type */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: typeStyle.bg, color: typeStyle.color }}>
                      {r.type}
                    </span>
                  </td>
                  {/* Phone */}
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, color: '#374151' }}>{r.phone}</p>
                  </td>
                  {/* Move-in */}
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, color: '#374151' }}>
                      {new Date(r.moveIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  {/* Members */}
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, color: '#374151', textAlign: 'center' }}>{r.members}</p>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: statusStyle.bg, color: statusStyle.color }}>
                      {statusStyle.label}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelected(r)}
                        className="p-1.5 rounded-[4px] hover:bg-blue-50 transition-colors"
                        title="View"
                      >
                        <Eye size={14} color="#1B4FD8" strokeWidth={1.5} />
                      </button>
                      <button
                        className="p-1.5 rounded-[4px] hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} color="#6B7280" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={9} className="py-12 text-center" style={{ color: '#9CA3AF', fontSize: 14 }}>
                  No residents match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#E5E7EB' }}>
            <p style={{ fontSize: 12, color: '#6B7280' }}>
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-[4px] hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} color="#374151" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="rounded-[4px] transition-colors"
                  style={{
                    width: 28, height: 28, fontSize: 13, fontWeight: n === page ? 600 : 400,
                    background: n === page ? '#EEF2FF' : 'transparent',
                    color: n === page ? '#1B4FD8' : '#374151',
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-[4px] hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} color="#374151" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Resident Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-end z-50">
          <div className="h-full w-full max-w-md overflow-y-auto" style={{ background: '#FFFFFF', borderLeft: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 600, color: '#111827' }}>
                Resident Profile
              </h2>
              <button onClick={() => setSelected(null)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="p-6">
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-full flex items-center justify-center" style={{ width: 56, height: 56, background: '#EEF2FF' }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#1B4FD8' }}>
                    {selected.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#111827' }}>{selected.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: TYPE_STYLES[selected.type].bg, color: TYPE_STYLES[selected.type].color }}>{selected.type}</span>
                    <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: STATUS_STYLES[selected.status].bg, color: STATUS_STYLES[selected.status].color }}>{STATUS_STYLES[selected.status].label}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {[
                  { label: 'Resident ID', value: selected.id },
                  { label: 'Unit', value: `${selected.unit} · ${selected.building}` },
                  { label: 'Compound', value: selected.compound },
                  { label: 'Phone', value: selected.phone },
                  { label: 'Email', value: selected.email },
                  { label: 'Nationality', value: selected.nationality },
                  { label: 'Move-in Date', value: new Date(selected.moveIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
                  { label: 'Household Members', value: selected.members.toString() },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                    <span style={{ fontSize: 13, color: '#6B7280' }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-2 rounded-[8px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}
                >
                  <Pencil size={14} strokeWidth={2} />
                  Edit Resident
                </button>
                <button
                  className="py-2 px-4 rounded-[8px] hover:bg-red-50 transition-colors"
                  style={{ border: '1px solid #FCA5A5', color: '#DC2626', fontSize: 13, fontWeight: 500 }}
                >
                  Suspend
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Resident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-lg overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Users size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Add New Resident
                </h2>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input type="text" placeholder="e.g., Omar Al-Rashidi" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Nationality</label>
                  <input type="text" placeholder="e.g., Egyptian" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Compound *</label>
                <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                  {COMPOUNDS.slice(1).map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Unit *</label>
                  <input type="text" placeholder="e.g., A-101" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Type *</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    <option>Owner</option>
                    <option>Tenant</option>
                    <option>Family</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Phone *</label>
                  <input type="tel" placeholder="+20 100 000 0000" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
                  <input type="email" placeholder="resident@email.com" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Move-in Date</label>
                  <input type="date" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Household Members</label>
                  <input type="number" placeholder="0" min="0" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity" style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>
                Add Resident
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
