import { useState, useMemo } from 'react';
import {
  UserPlus, Trash2, Mail, Shield, Search, X,
  Building2, Briefcase, Users, ChevronDown,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'active' | 'inactive';

interface KmpndiStaff {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager';
  createdAt: string;
  lastLogin: string;
  status: Status;
}

interface DeveloperStaff {
  id: string;
  name: string;
  email: string;
  role: 'Compound Manager' | 'Security Officer' | 'Receptionist' | 'Maintenance Lead';
  developer: string;
  compound: string;
  createdAt: string;
  lastLogin: string;
  status: Status;
}

interface ServicesStaff {
  id: string;
  name: string;
  email: string;
  serviceType: 'Maintenance' | 'Cleaning' | 'Landscaping' | 'Security' | 'Concierge';
  compound: string;
  developer: string;
  createdAt: string;
  status: Status;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const INIT_KMPNDI: KmpndiStaff[] = [
  { id: 'k1', name: 'Ahmed Hassan',    email: 'ahmed.hassan@kmpndi.com',   role: 'Admin',   createdAt: '2024-01-15', lastLogin: '2 hours ago', status: 'active'   },
  { id: 'k2', name: 'Sarah Mohamed',   email: 'sarah.m@kmpndi.com',        role: 'Manager', createdAt: '2024-02-20', lastLogin: '1 day ago',   status: 'active'   },
  { id: 'k3', name: 'Karim Nasser',    email: 'karim.n@kmpndi.com',        role: 'Manager', createdAt: '2024-03-05', lastLogin: '3 hours ago', status: 'active'   },
  { id: 'k4', name: 'Dina Farouk',     email: 'dina.f@kmpndi.com',         role: 'Admin',   createdAt: '2024-01-25', lastLogin: '5 days ago',  status: 'inactive' },
];

const INIT_DEVELOPER: DeveloperStaff[] = [
  { id: 'd1', name: 'Omar Ibrahim',    email: 'omar.ibrahim@palmhills.com',  role: 'Compound Manager',  developer: 'Palm Hills', compound: 'Palm Hills Katameya',  createdAt: '2024-02-10', lastLogin: '1 hour ago',  status: 'active'   },
  { id: 'd2', name: 'Nour Khalil',     email: 'nour.k@palmhills.com',        role: 'Security Officer',  developer: 'Palm Hills', compound: 'Palm Hills Katameya',  createdAt: '2024-03-01', lastLogin: '30 min ago',  status: 'active'   },
  { id: 'd3', name: 'Tarek Samir',     email: 'tarek.s@palmhills.com',       role: 'Receptionist',      developer: 'Palm Hills', compound: 'Palm Hills October',   createdAt: '2024-04-12', lastLogin: '4 hours ago', status: 'active'   },
  { id: 'd4', name: 'Hana Mostafa',    email: 'hana.m@sodic.com',            role: 'Compound Manager',  developer: 'Sodic',      compound: 'Sodic West',           createdAt: '2024-01-30', lastLogin: '2 days ago',  status: 'active'   },
  { id: 'd5', name: 'Youssef Adel',    email: 'youssef.a@sodic.com',         role: 'Security Officer',  developer: 'Sodic',      compound: 'Sodic East',           createdAt: '2024-05-20', lastLogin: 'Never',       status: 'inactive' },
  { id: 'd6', name: 'Rania Sayed',     email: 'rania.s@hydepark.com',        role: 'Maintenance Lead',  developer: 'Hyde Park',  compound: 'Hyde Park New Cairo',  createdAt: '2024-03-18', lastLogin: '6 hours ago', status: 'active'   },
];

const INIT_SERVICES: ServicesStaff[] = [
  { id: 's1', name: 'Hassan Ali',      email: 'hassan.a@services.com',   serviceType: 'Maintenance',  compound: 'Palm Hills Katameya',  developer: 'Palm Hills', createdAt: '2024-03-10', status: 'active'   },
  { id: 's2', name: 'Mona Ramzy',      email: 'mona.r@services.com',     serviceType: 'Cleaning',     compound: 'Palm Hills Katameya',  developer: 'Palm Hills', createdAt: '2024-04-05', status: 'active'   },
  { id: 's3', name: 'Samir Fouad',     email: 'samir.f@services.com',    serviceType: 'Landscaping',  compound: 'Palm Hills October',   developer: 'Palm Hills', createdAt: '2024-02-28', status: 'active'   },
  { id: 's4', name: 'Fatma Zaki',      email: 'fatma.z@services.com',    serviceType: 'Concierge',    compound: 'Sodic West',           developer: 'Sodic',      createdAt: '2024-05-14', status: 'active'   },
  { id: 's5', name: 'Walid Gaber',     email: 'walid.g@services.com',    serviceType: 'Security',     compound: 'Hyde Park New Cairo',  developer: 'Hyde Park',  createdAt: '2024-01-22', status: 'inactive' },
];

const COMPOUNDS_BY_DEVELOPER: Record<string, string[]> = {
  'Palm Hills': ['Palm Hills Katameya', 'Palm Hills October'],
  'Sodic':      ['Sodic West', 'Sodic East'],
  'Hyde Park':  ['Hyde Park', 'Hyde Park New Cairo'],
  'New Zayed':  ['New Zayed Phase II', 'New Zayed Phase III'],
};

const DEVELOPERS = Object.keys(COMPOUNDS_BY_DEVELOPER);

const DEVELOPER_STAFF_ROLES: DeveloperStaff['role'][] = [
  'Compound Manager', 'Security Officer', 'Receptionist', 'Maintenance Lead',
];

const SERVICE_TYPES: ServicesStaff['serviceType'][] = [
  'Maintenance', 'Cleaning', 'Landscaping', 'Security', 'Concierge',
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Avatar({ name, color = '#1B4FD8', bg = '#EEF2FF' }: { name: string; color?: string; bg?: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, background: bg }}>
      <span style={{ fontSize: 12, fontWeight: 600, color }}>{initials}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full"
      style={{
        fontSize: 11, fontWeight: 600,
        background: status === 'active' ? '#DCFCE7' : '#F3F4F6',
        color: status === 'active' ? '#16A34A' : '#6B7280',
      }}
    >
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  );
}

function StatCard({ label, value, color = '#111827' }: { label: string; value: number; color?: string }) {
  return (
    <div className="rounded-[10px] p-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <p style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color, marginTop: 8 }}>{value}</p>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {children}
    </th>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="px-5 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
      <div className="flex items-center gap-2 px-3 rounded-[6px]" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}>
        <Search size={15} color="#9CA3AF" strokeWidth={1.5} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize: 13, color: '#374151' }}
        />
        {value && (
          <button onClick={() => onChange('')}>
            <X size={13} color="#9CA3AF" />
          </button>
        )}
      </div>
    </div>
  );
}

function ModalField({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827',
};

// ─── Tab 1: KMPNDI Staff ──────────────────────────────────────────────────────

function KmpndiStaffTab() {
  const [staff, setStaff] = useState<KmpndiStaff[]>(INIT_KMPNDI);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'Manager' as KmpndiStaff['role'] });

  const filtered = useMemo(() =>
    staff.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
    ), [staff, search]);

  function handleAdd() {
    if (!form.name || !form.email) return;
    setStaff([...staff, {
      id: `k${Date.now()}`, ...form,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never', status: 'active',
    }]);
    setForm({ name: '', email: '', role: 'Manager' });
    setShowModal(false);
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <StatCard label="Total" value={staff.length} />
        <StatCard label="Active" value={staff.filter(s => s.status === 'active').length} color="#16A34A" />
        <StatCard label="Inactive" value={staff.filter(s => s.status === 'inactive').length} color="#DC2626" />
      </div>

      {/* Table */}
      <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>KMPNDI Staff</h3>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Internal team members with dashboard access</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-[8px] transition-colors hover:opacity-90"
            style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}
          >
            <UserPlus size={15} strokeWidth={2} /> Add Member
          </button>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email or role…" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <TableHeader>Member</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Created</TableHeader>
                <TableHeader>Last Login</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{s.name}</p>
                        <p style={{ fontSize: 12, color: '#6B7280' }}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={13} color="#6B7280" strokeWidth={1.5} />
                      <span style={{ fontSize: 13, color: '#374151' }}>{s.role}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span style={{ fontSize: 13, color: '#6B7280' }}>{s.createdAt}</span></td>
                  <td className="px-5 py-4"><span style={{ fontSize: 13, color: '#6B7280' }}>{s.lastLogin}</span></td>
                  <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => { if (confirm('Remove this staff member?')) setStaff(staff.filter(x => x.id !== s.id)); }}
                      className="p-2 rounded-[6px] transition-colors hover:bg-red-50"
                      style={{ color: '#DC2626' }}
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="px-5 py-10 text-center" style={{ fontSize: 13, color: '#9CA3AF' }}>No staff members found.</div>}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add KMPNDI Staff Member" onClose={() => setShowModal(false)} onSubmit={handleAdd} submitLabel="Add Member">
          <ModalField label="Full Name">
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle} />
          </ModalField>
          <ModalField label="Email Address">
            <div className="relative">
              <Mail size={15} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@kmpndi.com" className="w-full pl-9 pr-3 py-2 rounded-[6px] outline-none" style={inputStyle} />
            </div>
          </ModalField>
          <ModalField label="Role">
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as KmpndiStaff['role'] })} className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </ModalField>
        </Modal>
      )}
    </>
  );
}

// ─── Tab 2: Developer Staff ───────────────────────────────────────────────────

function DeveloperStaffTab() {
  const [staff, setStaff] = useState<DeveloperStaff[]>(INIT_DEVELOPER);
  const [search, setSearch] = useState('');
  const [filterDev, setFilterDev] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '',
    role: 'Security Officer' as DeveloperStaff['role'],
    developer: DEVELOPERS[0],
    compound: COMPOUNDS_BY_DEVELOPER[DEVELOPERS[0]][0],
  });

  const filtered = useMemo(() =>
    staff.filter(s => {
      const matchDev = filterDev === 'all' || s.developer === filterDev;
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.compound.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase());
      return matchDev && matchSearch;
    }), [staff, search, filterDev]);

  function handleAdd() {
    if (!form.name || !form.email) return;
    setStaff([...staff, {
      id: `d${Date.now()}`, ...form,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never', status: 'active',
    }]);
    setForm({ name: '', email: '', role: 'Security Officer', developer: DEVELOPERS[0], compound: COMPOUNDS_BY_DEVELOPER[DEVELOPERS[0]][0] });
    setShowModal(false);
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <StatCard label="Total" value={staff.length} />
        <StatCard label="Active" value={staff.filter(s => s.status === 'active').length} color="#16A34A" />
        <StatCard label="Inactive" value={staff.filter(s => s.status === 'inactive').length} color="#DC2626" />
      </div>

      {/* Table */}
      <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Developer Staff</h3>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Staff employed by property developers to manage their compounds</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-[8px] transition-colors hover:opacity-90"
            style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}
          >
            <UserPlus size={15} strokeWidth={2} /> Add Member
          </button>
        </div>

        {/* Developer filter + search */}
        <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7' }}>
            {['all', ...DEVELOPERS].map((dev) => (
              <button
                key={dev}
                onClick={() => setFilterDev(dev)}
                className="px-3 py-1 rounded-[4px] transition-all"
                style={{
                  fontSize: 12, fontWeight: 500,
                  background: filterDev === dev ? '#FFFFFF' : 'transparent',
                  color: filterDev === dev ? '#111827' : '#6B7280',
                  boxShadow: filterDev === dev ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {dev === 'all' ? 'All Developers' : dev}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 rounded-[6px] flex-1" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 34 }}>
            <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
            <input type="text" placeholder="Search staff…" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none" style={{ fontSize: 13, color: '#374151' }} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <TableHeader>Member</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Developer</TableHeader>
                <TableHeader>Compound</TableHeader>
                <TableHeader>Last Login</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} color="#16A34A" bg="#DCFCE7" />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{s.name}</p>
                        <p style={{ fontSize: 12, color: '#6B7280' }}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 500, background: '#F3F4F6', color: '#374151' }}>{s.role}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={13} color="#6B7280" strokeWidth={1.5} />
                      <span style={{ fontSize: 13, color: '#374151' }}>{s.developer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span style={{ fontSize: 13, color: '#6B7280' }}>{s.compound}</span></td>
                  <td className="px-5 py-4"><span style={{ fontSize: 13, color: '#6B7280' }}>{s.lastLogin}</span></td>
                  <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => { if (confirm('Remove this staff member?')) setStaff(staff.filter(x => x.id !== s.id)); }}
                      className="p-2 rounded-[6px] transition-colors hover:bg-red-50"
                      style={{ color: '#DC2626' }}
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="px-5 py-10 text-center" style={{ fontSize: 13, color: '#9CA3AF' }}>No staff members found.</div>}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Developer Staff Member" onClose={() => setShowModal(false)} onSubmit={handleAdd} submitLabel="Add Member">
          <ModalField label="Full Name">
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle} />
          </ModalField>
          <ModalField label="Email Address">
            <div className="relative">
              <Mail size={15} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@developer.com" className="w-full pl-9 pr-3 py-2 rounded-[6px] outline-none" style={inputStyle} />
            </div>
          </ModalField>
          <ModalField label="Role">
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as DeveloperStaff['role'] })} className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}>
              {DEVELOPER_STAFF_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </ModalField>
          <ModalField label="Property Developer">
            <select
              value={form.developer}
              onChange={e => setForm({ ...form, developer: e.target.value, compound: COMPOUNDS_BY_DEVELOPER[e.target.value][0] })}
              className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}
            >
              {DEVELOPERS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </ModalField>
          <ModalField label="Compound">
            <select value={form.compound} onChange={e => setForm({ ...form, compound: e.target.value })} className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}>
              {COMPOUNDS_BY_DEVELOPER[form.developer].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </ModalField>
        </Modal>
      )}
    </>
  );
}

// ─── Tab 3: Services Staff ────────────────────────────────────────────────────

function ServicesStaffTab() {
  const [staff, setStaff] = useState<ServicesStaff[]>(INIT_SERVICES);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '',
    serviceType: 'Maintenance' as ServicesStaff['serviceType'],
    developer: DEVELOPERS[0],
    compound: COMPOUNDS_BY_DEVELOPER[DEVELOPERS[0]][0],
  });

  const filtered = useMemo(() =>
    staff.filter(s => {
      const matchType = filterType === 'all' || s.serviceType === filterType;
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.compound.toLowerCase().includes(search.toLowerCase()) ||
        s.serviceType.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    }), [staff, search, filterType]);

  const serviceColors: Record<ServicesStaff['serviceType'], { color: string; bg: string }> = {
    Maintenance:  { color: '#1B4FD8', bg: '#EEF2FF' },
    Cleaning:     { color: '#16A34A', bg: '#DCFCE7' },
    Landscaping:  { color: '#059669', bg: '#D1FAE5' },
    Security:     { color: '#DC2626', bg: '#FEE2E2' },
    Concierge:    { color: '#7C3AED', bg: '#EDE9FE' },
  };

  function handleAdd() {
    if (!form.name || !form.email) return;
    setStaff([...staff, {
      id: `s${Date.now()}`, ...form,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    }]);
    setForm({ name: '', email: '', serviceType: 'Maintenance', developer: DEVELOPERS[0], compound: COMPOUNDS_BY_DEVELOPER[DEVELOPERS[0]][0] });
    setShowModal(false);
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Total" value={staff.length} />
        <StatCard label="Active" value={staff.filter(s => s.status === 'active').length} color="#16A34A" />
        {(['Maintenance', 'Cleaning'] as const).map(type => (
          <StatCard key={type} label={type} value={staff.filter(s => s.serviceType === type).length} color={serviceColors[type].color} />
        ))}
      </div>

      {/* Table */}
      <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Services Staff</h3>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Staff assigned to compound services (maintenance, cleaning, etc.)</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-[8px] transition-colors hover:opacity-90"
            style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}
          >
            <UserPlus size={15} strokeWidth={2} /> Add Member
          </button>
        </div>

        {/* Service type filter + search */}
        <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7' }}>
            {['all', ...SERVICE_TYPES].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className="px-3 py-1 rounded-[4px] transition-all"
                style={{
                  fontSize: 12, fontWeight: 500,
                  background: filterType === type ? '#FFFFFF' : 'transparent',
                  color: filterType === type ? '#111827' : '#6B7280',
                  boxShadow: filterType === type ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 rounded-[6px] flex-1" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 34 }}>
            <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
            <input type="text" placeholder="Search staff…" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none" style={{ fontSize: 13, color: '#374151' }} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <TableHeader>Member</TableHeader>
                <TableHeader>Service Type</TableHeader>
                <TableHeader>Developer</TableHeader>
                <TableHeader>Compound</TableHeader>
                <TableHeader>Created</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const sc = serviceColors[s.serviceType];
                return (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} color={sc.color} bg={sc.bg} />
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{s.name}</p>
                          <p style={{ fontSize: 12, color: '#6B7280' }}>{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={13} color={sc.color} strokeWidth={1.5} />
                        <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{s.serviceType}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={13} color="#6B7280" strokeWidth={1.5} />
                        <span style={{ fontSize: 13, color: '#374151' }}>{s.developer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span style={{ fontSize: 13, color: '#6B7280' }}>{s.compound}</span></td>
                    <td className="px-5 py-4"><span style={{ fontSize: 13, color: '#6B7280' }}>{s.createdAt}</span></td>
                    <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => { if (confirm('Remove this staff member?')) setStaff(staff.filter(x => x.id !== s.id)); }}
                        className="p-2 rounded-[6px] transition-colors hover:bg-red-50"
                        style={{ color: '#DC2626' }}
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="px-5 py-10 text-center" style={{ fontSize: 13, color: '#9CA3AF' }}>No staff members found.</div>}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Services Staff Member" onClose={() => setShowModal(false)} onSubmit={handleAdd} submitLabel="Add Member">
          <ModalField label="Full Name">
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle} />
          </ModalField>
          <ModalField label="Email Address">
            <div className="relative">
              <Mail size={15} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@services.com" className="w-full pl-9 pr-3 py-2 rounded-[6px] outline-none" style={inputStyle} />
            </div>
          </ModalField>
          <ModalField label="Service Type">
            <select value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value as ServicesStaff['serviceType'] })} className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}>
              {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </ModalField>
          <ModalField label="Property Developer">
            <select
              value={form.developer}
              onChange={e => setForm({ ...form, developer: e.target.value, compound: COMPOUNDS_BY_DEVELOPER[e.target.value][0] })}
              className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}
            >
              {DEVELOPERS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </ModalField>
          <ModalField label="Compound">
            <select value={form.compound} onChange={e => setForm({ ...form, compound: e.target.value })} className="w-full px-3 py-2 rounded-[6px] outline-none" style={inputStyle}>
              {COMPOUNDS_BY_DEVELOPER[form.developer].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </ModalField>
        </Modal>
      )}
    </>
  );
}

// ─── Shared Modal ─────────────────────────────────────────────────────────────

function Modal({ title, onClose, onSubmit, submitLabel, children }: {
  title: string; onClose: () => void; onSubmit: () => void;
  submitLabel: string; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="rounded-[12px] w-full max-w-md shadow-xl" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: '#111827' }}>{title}</h2>
          <button onClick={onClose} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
            <X size={17} color="#6B7280" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Cancel</button>
          <button onClick={onSubmit} className="px-4 py-2 rounded-[8px] transition-colors hover:opacity-90" style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 13, fontWeight: 500 }}>{submitLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = 'kmpndi' | 'developer' | 'services';

const TABS: { id: Tab; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'kmpndi',    label: 'KMPNDI Staff',     icon: Shield,    description: 'Internal team with dashboard access' },
  { id: 'developer', label: 'Developer Staff',  icon: Building2, description: 'Staff employed by property developers' },
  { id: 'services',  label: 'Services Staff',   icon: Briefcase, description: 'Compound service workers' },
];

export function StaffManagement() {
  const [activeTab, setActiveTab] = useState<Tab>('kmpndi');

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Staff Management</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Manage all three staff pools across the platform</p>
      </div>

      {/* Tab selector */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-[10px] p-4 text-left transition-all"
              style={{
                background: isActive ? '#1B4FD8' : '#FFFFFF',
                border: isActive ? '1px solid #1B4FD8' : '1px solid #E5E7EB',
                boxShadow: isActive ? '0 4px 12px rgba(27,79,216,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-[8px]"
                  style={{ width: 36, height: 36, background: isActive ? 'rgba(255,255,255,0.15)' : '#EEF2FF' }}
                >
                  <Icon size={18} color={isActive ? '#FFFFFF' : '#1B4FD8'} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: isActive ? '#FFFFFF' : '#111827' }}>{tab.label}</p>
                  <p style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.7)' : '#9CA3AF', marginTop: 1 }}>{tab.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'kmpndi'    && <KmpndiStaffTab />}
      {activeTab === 'developer' && <DeveloperStaffTab />}
      {activeTab === 'services'  && <ServicesStaffTab />}
    </div>
  );
}
