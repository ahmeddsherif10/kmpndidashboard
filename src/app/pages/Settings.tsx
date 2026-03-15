import { useState } from 'react';
import { Building2, Bell, Shield, Users, Globe, Mail, User, Camera, Lock, Eye, EyeOff } from 'lucide-react';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative rounded-full transition-colors"
      style={{ width: 40, height: 22, background: checked ? '#1B4FD8' : '#D1D5DB' }}
    >
      <span
        className="absolute rounded-full bg-white transition-all shadow"
        style={{ width: 16, height: 16, top: 3, left: checked ? 21 : 3 }}
      />
    </button>
  );
}

export function Settings() {
  const [notifs, setNotifs] = useState({
    offline: true, denial: true, quota: true, report: false, maintenance: true,
  });
  const [compound] = useState({ name: 'Palm Hills Katameya', location: 'Cairo, Egypt', timezone: 'Africa/Cairo', units: 240 });
  const [profile, setProfile] = useState({
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@kmpndi.com',
    phone: '+20 100 234 5678',
    role: 'Admin',
    language: 'English',
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="p-6 max-w-[900px]">
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Settings</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Manage compound configuration and account preferences</p>
      </div>

      {/* Profile Settings */}
      <div
        className="rounded-[10px] overflow-hidden mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
          <User size={16} color="#1B4FD8" strokeWidth={1.5} />
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Profile Settings</h2>
        </div>
        <div className="p-5">
          {/* Profile Picture */}
          <div className="flex items-center gap-6 pb-5 border-b" style={{ borderColor: '#E5E7EB' }}>
            <div className="relative">
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 80, height: 80, background: '#1B4FD8' }}
              >
                <span className="text-white" style={{ fontSize: 28, fontWeight: 600 }}>AH</span>
              </div>
              <button
                className="absolute bottom-0 right-0 p-2 rounded-full transition-colors hover:bg-blue-600"
                style={{ background: '#1B4FD8', border: '3px solid #FFFFFF' }}
                title="Change profile picture"
              >
                <Camera size={14} color="#FFFFFF" strokeWidth={2} />
              </button>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>{profile.name}</h3>
              <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{profile.role}</p>
              <button
                className="mt-3 px-3 py-1.5 rounded-[6px] transition-colors hover:bg-gray-100"
                style={{ border: '1px solid #E5E7EB', fontSize: 12, fontWeight: 500, color: '#374151' }}
              >
                Upload New Photo
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="pt-5 pb-5 border-b" style={{ borderColor: '#E5E7EB' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 16 }}>Personal Information</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Role
                </label>
                <input
                  value={profile.role}
                  disabled
                  className="w-full px-3 py-2 rounded-[6px] outline-none"
                  style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#6B7280', background: '#FAFAFA' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Language
                </label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                >
                  <option>English</option>
                  <option>Arabic</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="pt-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={14} color="#374151" strokeWidth={2} />
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Change Password</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 pr-10 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                  />
                  <button
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword.current ? (
                      <EyeOff size={16} color="#9CA3AF" strokeWidth={1.5} />
                    ) : (
                      <Eye size={16} color="#9CA3AF" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 pr-10 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword.new ? (
                        <EyeOff size={16} color="#9CA3AF" strokeWidth={1.5} />
                      ) : (
                        <Eye size={16} color="#9CA3AF" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      placeholder="Re-enter new password"
                      className="w-full px-3 py-2 pr-10 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827' }}
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword.confirm ? (
                        <EyeOff size={16} color="#9CA3AF" strokeWidth={1.5} />
                      ) : (
                        <Eye size={16} color="#9CA3AF" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 px-3 py-2 rounded-[6px]" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
                <Shield size={14} color="#1B4FD8" strokeWidth={2} className="mt-0.5" />
                <p style={{ fontSize: 11, color: '#4F46E5', lineHeight: 1.5 }}>
                  Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compound Info */}
      <div
        className="rounded-[10px] overflow-hidden mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
          <Building2 size={16} color="#1B4FD8" strokeWidth={1.5} />
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Compound Information</h2>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          {[
            { label: 'Compound Name', value: compound.name },
            { label: 'Location', value: compound.location },
            { label: 'Timezone', value: compound.timezone },
            { label: 'Total Units', value: String(compound.units) },
          ].map(({ label, value }) => (
            <div key={label}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
              <input
                defaultValue={value}
                className="w-full px-3 py-2 rounded-[6px] outline-none"
                style={{ border: '1px solid #E5E7EB', fontSize: 13, color: '#111827', background: '#FAFAFA' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div
        className="rounded-[10px] overflow-hidden mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
          <Bell size={16} color="#1B4FD8" strokeWidth={1.5} />
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>Notification Preferences</h2>
        </div>
        <div className="p-5">
          {[
            { key: 'offline', label: 'Device Goes Offline', desc: 'Alert when a gate device loses connection' },
            { key: 'denial', label: 'Unauthorized Access Attempt', desc: 'Alert on repeated DENY events at any gate' },
            { key: 'quota', label: 'Visitor Quota Exceeded', desc: 'Alert when a unit exceeds its daily visitor limit' },
            { key: 'report', label: 'Daily Summary Report', desc: 'Email a daily access summary every morning at 8 AM' },
            { key: 'maintenance', label: 'Hardware Maintenance Due', desc: 'Alert when a device has not been serviced in 90 days' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-start justify-between py-4 border-b last:border-0" style={{ borderColor: '#F3F4F6' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{label}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{desc}</p>
              </div>
              <Toggle
                checked={notifs[key as keyof typeof notifs]}
                onChange={(v) => setNotifs((prev) => ({ ...prev, [key]: v }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        <button className="px-4 py-2 rounded-[6px] hover:bg-gray-100 transition-colors" style={{ border: '1px solid #E5E7EB', fontSize: 13, fontWeight: 500, color: '#374151' }}>
          Discard
        </button>
        <button className="px-5 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90" style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
