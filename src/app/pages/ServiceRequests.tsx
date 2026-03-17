import { useState } from 'react';
import type React from 'react';
import {
  Search, X, Eye, ChevronLeft, ChevronRight,
  Sparkles, Leaf, Baby, Wrench, Droplets, ShieldCheck,
  ChevronDown, Clock, CheckCircle, AlertCircle, Ban,
} from 'lucide-react';

// ─── Service Catalogue (for filtering) ───────────────────────────────────────

type ServiceCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

const SERVICE_CATALOGUE: ServiceCategory[] = [
  { id: 'SVC-001', name: 'Cleaning',          icon: Sparkles,    color: '#1B4FD8', bg: '#EEF2FF' },
  { id: 'SVC-002', name: 'Gardening',          icon: Leaf,        color: '#16A34A', bg: '#DCFCE7' },
  { id: 'SVC-003', name: 'Nanny / Babysitter', icon: Baby,        color: '#D97706', bg: '#FEF3C7' },
  { id: 'SVC-004', name: 'Home Maintenance',   icon: Wrench,      color: '#7C3AED', bg: '#F3E8FF' },
  { id: 'SVC-005', name: 'Pool Cleaning',      icon: Droplets,    color: '#0EA5E9', bg: '#E0F2FE' },
  { id: 'SVC-006', name: 'Security Guard',     icon: ShieldCheck, color: '#DC2626', bg: '#FEE2E2' },
];

// ─── Service Requests ────────────────────────────────────────────────────────

type RequestStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

type ServiceRequest = {
  id: string;
  serviceType: string;
  resident: string;
  unit: string;
  compound: string;
  worker: string | null;
  status: RequestStatus;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  createdAt: string;
  completedAt: string | null;
  rating: number | null;
};

const SERVICE_REQUESTS: ServiceRequest[] = [
  { id: 'REQ-1041', serviceType: 'Cleaning',          resident: 'Omar Al-Rashidi',    unit: 'A-101', compound: 'Palm Hills Katameya', worker: 'Amira Saleh',      status: 'completed',   scheduledDate: '2026-03-14', scheduledTime: '10:00 AM', notes: 'Full apartment deep clean before guests arrive.',            createdAt: '2026-03-10', completedAt: '2026-03-14', rating: 5 },
  { id: 'REQ-1042', serviceType: 'Gardening',          resident: 'Sarah Mansour',      unit: 'A-204', compound: 'Palm Hills Katameya', worker: 'Hassan Farouk',    status: 'completed',   scheduledDate: '2026-03-13', scheduledTime: '09:00 AM', notes: 'Trim hedges and mow the backyard lawn.',                     createdAt: '2026-03-11', completedAt: '2026-03-13', rating: 4 },
  { id: 'REQ-1043', serviceType: 'Home Maintenance',   resident: 'Karim Nour',         unit: 'B-301', compound: 'Palm Hills Katameya', worker: 'Samir Attia',      status: 'in_progress', scheduledDate: '2026-03-16', scheduledTime: '02:00 PM', notes: 'Kitchen sink is leaking, needs plumber.',                    createdAt: '2026-03-15', completedAt: null,         rating: null },
  { id: 'REQ-1044', serviceType: 'Nanny / Babysitter', resident: 'Rania Khalil',       unit: 'C-302', compound: 'Palm Hills October',  worker: 'Dalia Mahmoud',    status: 'assigned',    scheduledDate: '2026-03-17', scheduledTime: '08:00 AM', notes: 'Need babysitter from 8 AM to 6 PM, two kids (4 & 7 yrs).',  createdAt: '2026-03-14', completedAt: null,         rating: null },
  { id: 'REQ-1045', serviceType: 'Pool Cleaning',      resident: 'Khaled Al-Amin',     unit: 'G-301', compound: 'Hyde Park',           worker: null,               status: 'pending',     scheduledDate: '2026-03-18', scheduledTime: '07:00 AM', notes: 'Monthly pool service + chemical top-up.',                    createdAt: '2026-03-15', completedAt: null,         rating: null },
  { id: 'REQ-1046', serviceType: 'Cleaning',          resident: 'Mona Fathi',         unit: 'D-410', compound: 'Sodic West',          worker: 'Amira Saleh',      status: 'assigned',    scheduledDate: '2026-03-17', scheduledTime: '11:00 AM', notes: 'Regular weekly cleaning.',                                  createdAt: '2026-03-15', completedAt: null,         rating: null },
  { id: 'REQ-1047', serviceType: 'Home Maintenance',   resident: 'Youssef Salem',      unit: 'E-501', compound: 'Sodic West',          worker: 'Samir Attia',      status: 'pending',     scheduledDate: '2026-03-19', scheduledTime: '10:00 AM', notes: 'AC unit not cooling properly, needs technician.',           createdAt: '2026-03-15', completedAt: null,         rating: null },
  { id: 'REQ-1048', serviceType: 'Gardening',          resident: 'Hana El-Masri',      unit: 'E-502', compound: 'Sodic East',          worker: 'Hassan Farouk',    status: 'in_progress', scheduledDate: '2026-03-16', scheduledTime: '08:30 AM', notes: 'Plant new rose bushes along the villa entrance.',            createdAt: '2026-03-13', completedAt: null,         rating: null },
  { id: 'REQ-1049', serviceType: 'Nanny / Babysitter', resident: 'Mariam Al-Ghamdi',   unit: 'I-401', compound: 'Hyde Park New Cairo', worker: 'Dalia Mahmoud',    status: 'completed',   scheduledDate: '2026-03-12', scheduledTime: '09:00 AM', notes: 'One toddler, daytime care while parents attend event.',     createdAt: '2026-03-09', completedAt: '2026-03-12', rating: 5 },
  { id: 'REQ-1050', serviceType: 'Cleaning',          resident: 'Layla Mostafa',      unit: 'F-205', compound: 'Sodic East',          worker: 'Nadia Kamal',      status: 'completed',   scheduledDate: '2026-03-11', scheduledTime: '10:00 AM', notes: 'Post-renovation cleanup.',                                  createdAt: '2026-03-08', completedAt: '2026-03-11', rating: 4 },
  { id: 'REQ-1051', serviceType: 'Pool Cleaning',      resident: 'Tarek Ibrahim',      unit: 'C-103', compound: 'Palm Hills October',  worker: 'Yasser Gad',       status: 'completed',   scheduledDate: '2026-03-10', scheduledTime: '07:00 AM', notes: 'Full pool drain, clean and refill.',                        createdAt: '2026-03-07', completedAt: '2026-03-10', rating: 5 },
  { id: 'REQ-1052', serviceType: 'Home Maintenance',   resident: 'Adel Zaki',          unit: 'H-204', compound: 'Hyde Park',           worker: null,               status: 'cancelled',   scheduledDate: '2026-03-09', scheduledTime: '01:00 PM', notes: 'Repaint master bedroom walls (cancelled by resident).',     createdAt: '2026-03-06', completedAt: null,         rating: null },
  { id: 'REQ-1053', serviceType: 'Cleaning',          resident: 'Iman Salah',         unit: 'K-101', compound: 'New Zayed Phase II',  worker: 'Amira Saleh',      status: 'pending',     scheduledDate: '2026-03-20', scheduledTime: '11:00 AM', notes: 'New resident, first cleaning session for move-in.',         createdAt: '2026-03-16', completedAt: null,         rating: null },
  { id: 'REQ-1054', serviceType: 'Gardening',          resident: 'Walid Nassar',       unit: 'K-203', compound: 'New Zayed Phase II',  worker: null,               status: 'pending',     scheduledDate: '2026-03-21', scheduledTime: '09:00 AM', notes: 'Install irrigation drip system in garden.',                 createdAt: '2026-03-16', completedAt: null,         rating: null },
  { id: 'REQ-1055', serviceType: 'Nanny / Babysitter', resident: 'Bassem Wael',        unit: 'J-302', compound: 'Hyde Park New Cairo', worker: 'Dalia Mahmoud',    status: 'in_progress', scheduledDate: '2026-03-16', scheduledTime: '08:00 AM', notes: 'Regular Mon/Wed/Fri babysitting.',                          createdAt: '2026-03-12', completedAt: null,         rating: null },
  { id: 'REQ-1056', serviceType: 'Home Maintenance',   resident: 'Hassan Al-Qassem',   unit: 'L-301', compound: 'New Zayed Phase III', worker: 'Samir Attia',      status: 'assigned',    scheduledDate: '2026-03-18', scheduledTime: '03:00 PM', notes: 'Install wall-mounted TV and mount shelving in study.',      createdAt: '2026-03-14', completedAt: null,         rating: null },
  { id: 'REQ-1057', serviceType: 'Security Guard',     resident: 'Nour Ahmed',         unit: 'C-103', compound: 'Palm Hills October',  worker: 'Mahmoud Helal',    status: 'completed',   scheduledDate: '2026-03-08', scheduledTime: '05:00 PM', notes: 'Private event at villa, need guard for 6 hours.',           createdAt: '2026-03-05', completedAt: '2026-03-08', rating: 4 },
  { id: 'REQ-1058', serviceType: 'Cleaning',          resident: 'Sherif Osman',       unit: 'F-102', compound: 'Sodic East',          worker: 'Nadia Kamal',      status: 'completed',   scheduledDate: '2026-03-07', scheduledTime: '10:00 AM', notes: 'Bi-weekly standard cleaning.',                              createdAt: '2026-03-04', completedAt: '2026-03-07', rating: 3 },
  { id: 'REQ-1059', serviceType: 'Pool Cleaning',      resident: 'Samira El-Deeb',     unit: 'L-105', compound: 'New Zayed Phase III', worker: 'Yasser Gad',       status: 'assigned',    scheduledDate: '2026-03-19', scheduledTime: '07:30 AM', notes: 'First-time pool service setup.',                            createdAt: '2026-03-15', completedAt: null,         rating: null },
  { id: 'REQ-1060', serviceType: 'Nanny / Babysitter', resident: 'Nadia Ramadan',      unit: 'H-101', compound: 'Hyde Park',           worker: null,               status: 'pending',     scheduledDate: '2026-03-22', scheduledTime: '07:00 AM', notes: 'Need experienced nanny for newborn (3 months).',            createdAt: '2026-03-16', completedAt: null,         rating: null },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_META: Record<RequestStatus, { label: string; bg: string; color: string; icon: React.ElementType }> = {
  pending:     { label: 'Pending',     bg: '#FEF3C7', color: '#D97706', icon: Clock        },
  assigned:    { label: 'Assigned',    bg: '#EEF2FF', color: '#1B4FD8', icon: ChevronDown  },
  in_progress: { label: 'In Progress', bg: '#E0F2FE', color: '#0284C7', icon: AlertCircle  },
  completed:   { label: 'Completed',   bg: '#DCFCE7', color: '#16A34A', icon: CheckCircle  },
  cancelled:   { label: 'Cancelled',   bg: '#F3F4F6', color: '#6B7280', icon: Ban          },
};

const PAGE_SIZE = 10;

export function ServiceRequests() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ServiceRequest | null>(null);

  const filtered = SERVICE_REQUESTS.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      r.id.toLowerCase().includes(q) ||
      r.resident.toLowerCase().includes(q) ||
      r.unit.toLowerCase().includes(q) ||
      r.compound.toLowerCase().includes(q) ||
      (r.worker ?? '').toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchType   = typeFilter   === 'all' || r.serviceType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pending    = SERVICE_REQUESTS.filter((r) => r.status === 'pending').length;
  const inProgress = SERVICE_REQUESTS.filter((r) => r.status === 'in_progress' || r.status === 'assigned').length;
  const avgRating  = (SERVICE_REQUESTS.filter((r) => r.rating).reduce((s, r) => s + (r.rating ?? 0), 0) / SERVICE_REQUESTS.filter((r) => r.rating).length).toFixed(1);

  return (
    <div className="p-6 max-w-[1376px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Service Requests</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {SERVICE_REQUESTS.length} total requests · {pending} pending
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Requests', value: SERVICE_REQUESTS.length, color: '#1B4FD8', bg: '#EEF2FF' },
          { label: 'Pending',        value: pending,                 color: '#D97706', bg: '#FEF3C7' },
          { label: 'In Progress',    value: inProgress,              color: '#0284C7', bg: '#E0F2FE' },
          { label: 'Avg Rating',     value: `${avgRating} ★`,        color: '#16A34A', bg: '#DCFCE7' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="p-4 rounded-[10px]" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="p-2 rounded-[6px] w-fit mb-2" style={{ background: bg }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: color, opacity: 0.7 }} />
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', fontFamily: "'Sora', sans-serif" }}>{value}</p>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[10px] mb-4" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 rounded-[6px] px-3" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by resident, unit, worker..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="rounded-[6px] px-3 outline-none"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
        >
          <option value="all">All Services</option>
          {SERVICE_CATALOGUE.map((s) => <option key={s.id}>{s.name}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-[6px] px-3 outline-none"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
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
              {['Request', 'Resident', 'Service', 'Scheduled', 'Worker', 'Status', 'Rating', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((req, idx) => {
              const sm = STATUS_META[req.status];
              const svc = SERVICE_CATALOGUE.find((s) => s.name === req.serviceType);
              return (
                <tr key={req.id} style={{ borderBottom: idx < paginated.length - 1 ? '1px solid #F3F4F6' : 'none' }} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{req.id}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{req.createdAt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{req.resident}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{req.unit} · {req.compound}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {svc && (
                        <div className="p-1.5 rounded-[5px]" style={{ background: svc.bg }}>
                          <svc.icon size={13} color={svc.color} strokeWidth={1.5} />
                        </div>
                      )}
                      <span style={{ fontSize: 13, color: '#374151' }}>{req.serviceType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p style={{ fontSize: 13, color: '#374151' }}>{req.scheduledDate}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{req.scheduledTime}</p>
                  </td>
                  <td className="px-4 py-3">
                    {req.worker ? (
                      <div className="flex items-center gap-2">
                        <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 24, height: 24, background: '#EEF2FF' }}>
                          <span style={{ fontSize: 9, fontWeight: 600, color: '#1B4FD8' }}>
                            {req.worker.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </span>
                        </div>
                        <span style={{ fontSize: 13, color: '#374151' }}>{req.worker}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: '#9CA3AF' }}>Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: sm.bg, color: sm.color }}>
                      <sm.icon size={10} strokeWidth={2} />
                      {sm.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {req.rating != null ? (
                      <span style={{ fontSize: 13, color: '#D97706' }}>
                        {'★'.repeat(req.rating)}{'☆'.repeat(5 - req.rating)}
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: '#D1D5DB' }}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(req)}
                      className="p-1.5 rounded-[4px] hover:bg-blue-50 transition-colors"
                      title="View details"
                    >
                      <Eye size={14} color="#1B4FD8" strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center" style={{ color: '#9CA3AF', fontSize: 14 }}>
                  No requests match your filters.
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
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-[4px] hover:bg-gray-100 disabled:opacity-30 transition-colors">
                <ChevronLeft size={16} color="#374151" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className="rounded-[4px] transition-colors" style={{ width: 28, height: 28, fontSize: 13, fontWeight: n === page ? 600 : 400, background: n === page ? '#EEF2FF' : 'transparent', color: n === page ? '#1B4FD8' : '#374151' }}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-[4px] hover:bg-gray-100 disabled:opacity-30 transition-colors">
                <ChevronRight size={16} color="#374151" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Request Detail Panel ── */}
      {selected && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-end z-50">
          <div className="h-full w-full max-w-md overflow-y-auto" style={{ background: '#FFFFFF', borderLeft: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 600, color: '#111827' }}>
                  {selected.id}
                </h2>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>Submitted {selected.createdAt}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status flow */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Request Flow</p>
                <div className="flex items-center gap-0">
                  {(['pending', 'assigned', 'in_progress', 'completed'] as RequestStatus[]).map((s, i, arr) => {
                    const steps: RequestStatus[] = ['pending', 'assigned', 'in_progress', 'completed'];
                    const currentIdx = steps.indexOf(selected.status === 'cancelled' ? 'pending' : selected.status);
                    const stepIdx    = steps.indexOf(s);
                    const done       = selected.status === 'cancelled' ? false : stepIdx <= currentIdx;
                    const active     = stepIdx === currentIdx && selected.status !== 'cancelled';
                    const sm         = STATUS_META[s];
                    return (
                      <div key={s} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className="rounded-full flex items-center justify-center mb-1"
                            style={{
                              width: 28, height: 28,
                              background: done ? '#1B4FD8' : '#F3F4F6',
                              border: active ? '2px solid #1B4FD8' : 'none',
                            }}
                          >
                            <sm.icon size={13} color={done ? '#fff' : '#9CA3AF'} strokeWidth={2} />
                          </div>
                          <p style={{ fontSize: 9, color: done ? '#1B4FD8' : '#9CA3AF', fontWeight: done ? 600 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                            {sm.label}
                          </p>
                        </div>
                        {i < arr.length - 1 && (
                          <div style={{ height: 2, flex: 1, background: done && stepIdx < currentIdx ? '#1B4FD8' : '#E5E7EB', marginBottom: 16, marginTop: -2 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
                {selected.status === 'cancelled' && (
                  <div className="mt-3 px-3 py-2 rounded-[6px]" style={{ background: '#FEE2E2' }}>
                    <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 500 }}>This request was cancelled.</p>
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Details</p>
                <div className="space-y-2">
                  {[
                    { label: 'Service Type',   value: selected.serviceType },
                    { label: 'Resident',        value: selected.resident },
                    { label: 'Unit',            value: `${selected.unit} · ${selected.compound}` },
                    { label: 'Scheduled',       value: `${selected.scheduledDate} at ${selected.scheduledTime}` },
                    { label: 'Assigned Worker', value: selected.worker ?? 'Unassigned' },
                    ...(selected.completedAt ? [{ label: 'Completed On', value: selected.completedAt }] : []),
                    ...(selected.rating != null ? [{ label: 'Rating', value: '★'.repeat(selected.rating) + '☆'.repeat(5 - selected.rating) }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Resident Notes</p>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, padding: 12, background: '#F9FAFB', borderRadius: 6, border: '1px solid #E5E7EB' }}>
                    {selected.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              {(selected.status === 'pending' || selected.status === 'assigned') && (
                <div className="flex gap-3">
                  <button className="flex-1 py-2 rounded-[8px] hover:opacity-90 transition-opacity text-white" style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}>
                    {selected.status === 'pending' ? 'Assign Worker' : 'Mark In Progress'}
                  </button>
                  <button className="py-2 px-4 rounded-[8px] hover:bg-red-50 transition-colors" style={{ border: '1px solid #FCA5A5', color: '#DC2626', fontSize: 13, fontWeight: 500 }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
