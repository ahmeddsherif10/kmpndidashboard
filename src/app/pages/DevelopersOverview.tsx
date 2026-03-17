import { useState } from 'react';
import { Search, Building2, Building, MapPin, Home, Users, Car, TrendingUp, ChevronRight, Plus, X } from 'lucide-react';

const PROPERTY_DEVELOPERS = {
  'Palm Hills': {
    compounds: [
      {
        name: 'Palm Hills Katameya',
        location: 'New Cairo',
        units: 450,
        occupancy: 92,
        activeResidents: 1240,
        vehicles: 780,
        parkingSlots: 890,
        status: 'active'
      },
      {
        name: 'Palm Hills October',
        location: '6th of October',
        units: 320,
        occupancy: 87,
        activeResidents: 890,
        vehicles: 560,
        parkingSlots: 640,
        status: 'active'
      },
    ],
    totalUnits: 770,
    totalCompounds: 2,
  },
  'Sodic': {
    compounds: [
      {
        name: 'Sodic West',
        location: 'Sheikh Zayed',
        units: 580,
        occupancy: 95,
        activeResidents: 1650,
        vehicles: 980,
        parkingSlots: 1160,
        status: 'active'
      },
      {
        name: 'Sodic East',
        location: 'New Cairo',
        units: 410,
        occupancy: 89,
        activeResidents: 1120,
        vehicles: 690,
        parkingSlots: 820,
        status: 'active'
      },
    ],
    totalUnits: 990,
    totalCompounds: 2,
  },
  'Hyde Park': {
    compounds: [
      {
        name: 'Hyde Park',
        location: 'New Cairo',
        units: 650,
        occupancy: 94,
        activeResidents: 1820,
        vehicles: 1100,
        parkingSlots: 1300,
        status: 'active'
      },
      {
        name: 'Hyde Park New Cairo',
        location: 'New Cairo East',
        units: 480,
        occupancy: 91,
        activeResidents: 1340,
        vehicles: 810,
        parkingSlots: 960,
        status: 'active'
      },
    ],
    totalUnits: 1130,
    totalCompounds: 2,
  },
  'New Zayed': {
    compounds: [
      {
        name: 'New Zayed Phase II',
        location: 'Sheikh Zayed',
        units: 380,
        occupancy: 78,
        activeResidents: 950,
        vehicles: 580,
        parkingSlots: 760,
        status: 'active'
      },
      {
        name: 'New Zayed Phase III',
        location: 'Sheikh Zayed',
        units: 290,
        occupancy: 72,
        activeResidents: 680,
        vehicles: 410,
        parkingSlots: 580,
        status: 'construction'
      },
    ],
    totalUnits: 670,
    totalCompounds: 2,
  },
};

export function DevelopersOverview() {
  const [search, setSearch] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null);
  const [showAddDeveloperModal, setShowAddDeveloperModal] = useState(false);

  const developers = Object.keys(PROPERTY_DEVELOPERS);
  const totalCompounds = developers.reduce((sum, dev) => sum + PROPERTY_DEVELOPERS[dev as keyof typeof PROPERTY_DEVELOPERS].totalCompounds, 0);
  const totalUnits = developers.reduce((sum, dev) => sum + PROPERTY_DEVELOPERS[dev as keyof typeof PROPERTY_DEVELOPERS].totalUnits, 0);

  const filteredDevelopers = developers.filter((dev) => {
    const matchSearch = !search || dev.toLowerCase().includes(search.toLowerCase()) ||
      PROPERTY_DEVELOPERS[dev as keyof typeof PROPERTY_DEVELOPERS].compounds.some(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    return matchSearch;
  });

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>
            Property Developers
          </h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {developers.length} developers · {totalCompounds} compounds · {totalUnits} total units
          </p>
        </div>
        <button
          onClick={() => setShowAddDeveloperModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Developer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Developers', value: developers.length, icon: Building2, color: '#1B4FD8', bg: '#EEF2FF' },
          { label: 'Total Compounds', value: totalCompounds, icon: MapPin, color: '#10B981', bg: '#DCFCE7' },
          { label: 'Total Units', value: totalUnits.toLocaleString(), icon: Home, color: '#F59E0B', bg: '#FEF3C7' },
          { label: 'Avg Occupancy', value: '88%', icon: TrendingUp, color: '#8B5CF6', bg: '#F3E8FF' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="p-4 rounded-[10px]"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-[6px]" style={{ background: bg }}>
                <Icon size={18} color={color} strokeWidth={1.5} />
              </div>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', fontFamily: "'Sora', sans-serif" }}>
              {value}
            </p>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div
        className="flex items-center gap-2 p-4 rounded-[10px] mb-5"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div
          className="flex items-center gap-2 flex-1 max-w-[400px] rounded-[6px] px-3"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}
        >
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search developers or compounds..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>
      </div>

      {/* Developers Grid */}
      <div className="space-y-5">
        {filteredDevelopers.map((developerName) => {
          const developer = PROPERTY_DEVELOPERS[developerName as keyof typeof PROPERTY_DEVELOPERS];
          const isExpanded = selectedDeveloper === developerName;

          return (
            <div
              key={developerName}
              className="rounded-[10px] overflow-hidden"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              {/* Developer Header */}
              <div
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedDeveloper(isExpanded ? null : developerName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                      <Building2 size={24} color="#1B4FD8" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: '#111827' }}>
                        {developerName}
                      </h3>
                      <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        {developer.totalCompounds} compounds · {developer.totalUnits} units
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>COMPOUNDS</p>
                        <p style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 2 }}>
                          {developer.totalCompounds}
                        </p>
                      </div>
                      <div className="text-center">
                        <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>UNITS</p>
                        <p style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 2 }}>
                          {developer.totalUnits}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      color="#9CA3AF"
                      className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Compounds List */}
              {isExpanded && (
                <div className="border-t" style={{ borderColor: '#E5E7EB' }}>
                  {developer.compounds.map((compound, idx) => (
                    <div
                      key={compound.name}
                      className="p-5 hover:bg-blue-50/30 transition-colors"
                      style={{ borderTop: idx > 0 ? '1px solid #F3F4F6' : 'none' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>
                              {compound.name}
                            </h4>
                            <span
                              className="px-2 py-0.5 rounded-[4px]"
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                background: compound.status === 'active' ? '#DCFCE7' : '#FEF3C7',
                                color: compound.status === 'active' ? '#16A34A' : '#D97706',
                              }}
                            >
                              {compound.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin size={13} color="#6B7280" strokeWidth={1.5} />
                            <span style={{ fontSize: 12, color: '#6B7280' }}>{compound.location}</span>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-5 gap-4">
                            {[
                              { label: 'Units', value: compound.units, icon: Home },
                              { label: 'Occupancy', value: `${compound.occupancy}%`, icon: TrendingUp },
                              { label: 'Residents', value: compound.activeResidents, icon: Users },
                              { label: 'Vehicles', value: compound.vehicles, icon: Car },
                              { label: 'Parking Slots', value: compound.parkingSlots, icon: MapPin },
                            ].map(({ label, value, icon: Icon }) => (
                              <div
                                key={label}
                                className="p-3 rounded-[6px]"
                                style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <Icon size={12} color="#6B7280" strokeWidth={1.5} />
                                  <p style={{ fontSize: 10, color: '#6B7280', fontWeight: 500, textTransform: 'uppercase' }}>
                                    {label}
                                  </p>
                                </div>
                                <p style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>
                                  {typeof value === 'number' ? value.toLocaleString() : value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Developer Modal */}
      {showAddDeveloperModal && (
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
                  Add New Developer
                </h2>
              </div>
              <button
                onClick={() => setShowAddDeveloperModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Developer Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Palm Hills Developments"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                      Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="contact@developer.com"
                      className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+20 100 234 5678"
                      className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description of the property developer..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>

                <div
                  className="p-3 rounded-[6px]"
                  style={{ background: '#FEF3C7', border: '1px solid #FDE047' }}
                >
                  <p style={{ fontSize: 11, color: '#92400E' }}>
                    ℹ️ After creating the developer, you can add compounds to it.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowAddDeveloperModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Developer created successfully! In a real application, this would save to your database.');
                  setShowAddDeveloperModal(false);
                }}
                className="px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
              >
                Add Developer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
