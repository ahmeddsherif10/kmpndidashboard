import { useState } from 'react';
import { UserPlus, Trash2, Mail, Shield, Search, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@kmpndi.com',
    role: 'Admin',
    createdAt: '2024-01-15',
    lastLogin: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Mohamed',
    email: 'sarah.m@kmpndi.com',
    role: 'Manager',
    createdAt: '2024-02-20',
    lastLogin: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Omar Ibrahim',
    email: 'omar.ibrahim@kmpndi.com',
    role: 'Security Officer',
    createdAt: '2024-03-10',
    lastLogin: '3 hours ago',
    status: 'active',
  },
  {
    id: '4',
    name: 'Layla Ali',
    email: 'layla.ali@kmpndi.com',
    role: 'Manager',
    createdAt: '2024-01-25',
    lastLogin: '5 days ago',
    status: 'inactive',
  },
];

export function StaffManagement() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Security Officer' });

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) return;

    const user: User = {
      id: String(users.length + 1),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      status: 'active',
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'Security Officer' });
    setShowCreateModal(false);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
            Staff Management
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280' }}>
            Manage staff members and their access permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] transition-colors hover:opacity-90"
          style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
        >
          <UserPlus size={18} strokeWidth={2} />
          Add Staff Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="rounded-[10px] p-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Users
          </p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: '#111827', marginTop: 8 }}>
            {users.length}
          </p>
        </div>
        <div
          className="rounded-[10px] p-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active Users
          </p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: '#16A34A', marginTop: 8 }}>
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div
          className="rounded-[10px] p-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <p style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Inactive Users
          </p>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: '#DC2626', marginTop: 8 }}>
            {users.filter(u => u.status === 'inactive').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div
        className="rounded-[10px] overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        {/* Search Bar */}
        <div className="px-5 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-2 px-3 rounded-[6px]" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}>
            <Search size={15} color="#9CA3AF" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 13, color: '#374151' }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  User
                </th>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Role
                </th>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Created
                </th>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Last Login
                </th>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Status
                </th>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                  style={{ borderBottom: index !== filteredUsers.length - 1 ? '1px solid #F3F4F6' : 'none' }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: 36, height: 36, background: '#EEF2FF' }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1B4FD8' }}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: '#6B7280' }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} color="#6B7280" />
                      <span style={{ fontSize: 13, color: '#374151' }}>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span style={{ fontSize: 13, color: '#374151' }}>{user.createdAt}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span style={{ fontSize: 13, color: '#374151' }}>{user.lastLogin}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="px-2 py-1 rounded-full"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        background: user.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                        color: user.status === 'active' ? '#065F46' : '#991B1B',
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 rounded-[6px] transition-colors hover:bg-red-50"
                      style={{ color: '#DC2626' }}
                      title="Delete account"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p style={{ fontSize: 14, color: '#6B7280' }}>No users found</p>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-md"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                Create New Account
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="email@kmpndi.com"
                    className="w-full pl-10 pr-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                >
                  <option value="Security Officer">Security Officer</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
