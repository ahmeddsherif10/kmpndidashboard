import { useState } from 'react';
import { Search, ChevronRight, Plus, Layers, MapPin, Shield, Cpu, DoorOpen, X } from 'lucide-react';

type Zone = { id: string; name: string; description: string; gates: number; units: number };
type Gate = { id: string; name: string; zone: string; type: 'vehicle' | 'pedestrian' | 'service'; status: 'online' | 'offline' };
type HardwareSummary = { total: number; online: number; offline: number };

type Compound = {
  id: string;
  name: string;
  developer: string;
  location: string;
  status: 'active' | 'construction';
  units: number;
  residents: number;
  zones: Zone[];
  gates: Gate[];
  hardware: HardwareSummary;
};

const COMPOUNDS: Compound[] = [
  {
    id: 'C001', name: 'Palm Hills Katameya', developer: 'Palm Hills', location: 'New Cairo',
    status: 'active', units: 450, residents: 1240,
    zones: [
      { id: 'Z001', name: 'Zone A', description: 'North residential cluster', gates: 2, units: 120 },
      { id: 'Z002', name: 'Zone B', description: 'South residential cluster', gates: 1, units: 95 },
      { id: 'Z003', name: 'Zone C', description: 'East residential cluster', gates: 2, units: 110 },
      { id: 'Z004', name: 'Zone D', description: 'West residential cluster', gates: 1, units: 125 },
    ],
    gates: [
      { id: 'G001', name: 'Main Gate', zone: 'Zone A', type: 'vehicle', status: 'online' },
      { id: 'G002', name: 'East Gate', zone: 'Zone C', type: 'vehicle', status: 'online' },
      { id: 'G003', name: 'South Gate', zone: 'Zone B', type: 'pedestrian', status: 'online' },
      { id: 'G004', name: 'West Gate', zone: 'Zone D', type: 'vehicle', status: 'offline' },
      { id: 'G005', name: 'North Entrance', zone: 'Zone A', type: 'pedestrian', status: 'online' },
      { id: 'G006', name: 'Service Gate', zone: 'Zone D', type: 'service', status: 'online' },
    ],
    hardware: { total: 18, online: 17, offline: 1 },
  },
  {
    id: 'C002', name: 'Palm Hills October', developer: 'Palm Hills', location: '6th of October',
    status: 'active', units: 320, residents: 890,
    zones: [
      { id: 'Z005', name: 'Zone A', description: 'Main residential sector', gates: 2, units: 160 },
      { id: 'Z006', name: 'Zone B', description: 'Commercial & residential mix', gates: 2, units: 160 },
    ],
    gates: [
      { id: 'G007', name: 'Main Gate', zone: 'Zone A', type: 'vehicle', status: 'online' },
      { id: 'G008', name: 'West Gate', zone: 'Zone A', type: 'pedestrian', status: 'online' },
      { id: 'G009', name: 'South Gate', zone: 'Zone B', type: 'vehicle', status: 'online' },
      { id: 'G010', name: 'Service Gate', zone: 'Zone B', type: 'service', status: 'online' },
    ],
    hardware: { total: 12, online: 12, offline: 0 },
  },
  {
    id: 'C003', name: 'Sodic West', developer: 'Sodic', location: 'Sheikh Zayed',
    status: 'active', units: 580, residents: 1650,
    zones: [
      { id: 'Z007', name: 'Zone 1', description: 'Premium villas cluster', gates: 2, units: 140 },
      { id: 'Z008', name: 'Zone 2', description: 'Apartment towers east', gates: 1, units: 180 },
      { id: 'Z009', name: 'Zone 3', description: 'Apartment towers west', gates: 2, units: 170 },
      { id: 'Z010', name: 'Zone 4', description: 'Town houses', gates: 1, units: 90 },
    ],
    gates: [
      { id: 'G011', name: 'Main Entrance', zone: 'Zone 1', type: 'vehicle', status: 'online' },
      { id: 'G012', name: 'East Gate', zone: 'Zone 2', type: 'vehicle', status: 'online' },
      { id: 'G013', name: 'West Gate', zone: 'Zone 3', type: 'vehicle', status: 'online' },
      { id: 'G014', name: 'Pedestrian North', zone: 'Zone 1', type: 'pedestrian', status: 'online' },
      { id: 'G015', name: 'Service Entrance', zone: 'Zone 4', type: 'service', status: 'offline' },
    ],
    hardware: { total: 22, online: 20, offline: 2 },
  },
  {
    id: 'C004', name: 'Sodic East', developer: 'Sodic', location: 'New Cairo',
    status: 'active', units: 410, residents: 1120,
    zones: [
      { id: 'Z011', name: 'Zone A', description: 'North sector', gates: 2, units: 210 },
      { id: 'Z012', name: 'Zone B', description: 'South sector', gates: 2, units: 200 },
    ],
    gates: [
      { id: 'G016', name: 'Main Gate', zone: 'Zone A', type: 'vehicle', status: 'online' },
      { id: 'G017', name: 'North Gate', zone: 'Zone A', type: 'pedestrian', status: 'online' },
      { id: 'G018', name: 'South Gate', zone: 'Zone B', type: 'vehicle', status: 'online' },
      { id: 'G019', name: 'Service Gate', zone: 'Zone B', type: 'service', status: 'online' },
    ],
    hardware: { total: 14, online: 14, offline: 0 },
  },
  {
    id: 'C005', name: 'Hyde Park', developer: 'Hyde Park', location: 'New Cairo',
    status: 'active', units: 650, residents: 1820,
    zones: [
      { id: 'Z013', name: 'District 1', description: 'Premium villas', gates: 2, units: 130 },
      { id: 'Z014', name: 'District 2', description: 'Mid-rise apartments', gates: 2, units: 200 },
      { id: 'Z015', name: 'District 3', description: 'Town houses', gates: 1, units: 180 },
      { id: 'Z016', name: 'District 4', description: 'High-rise towers', gates: 2, units: 140 },
    ],
    gates: [
      { id: 'G020', name: 'Grand Entrance', zone: 'District 1', type: 'vehicle', status: 'online' },
      { id: 'G021', name: 'Gate 2', zone: 'District 2', type: 'vehicle', status: 'online' },
      { id: 'G022', name: 'Gate 3', zone: 'District 3', type: 'vehicle', status: 'online' },
      { id: 'G023', name: 'Gate 4', zone: 'District 4', type: 'vehicle', status: 'online' },
      { id: 'G024', name: 'Pedestrian East', zone: 'District 2', type: 'pedestrian', status: 'online' },
      { id: 'G025', name: 'Service Gate', zone: 'District 4', type: 'service', status: 'online' },
    ],
    hardware: { total: 28, online: 28, offline: 0 },
  },
  {
    id: 'C006', name: 'Hyde Park New Cairo', developer: 'Hyde Park', location: 'New Cairo East',
    status: 'active', units: 480, residents: 1340,
    zones: [
      { id: 'Z017', name: 'Phase 1', description: 'Original residential zone', gates: 2, units: 250 },
      { id: 'Z018', name: 'Phase 2', description: 'Extended residential zone', gates: 2, units: 230 },
    ],
    gates: [
      { id: 'G026', name: 'Main Gate', zone: 'Phase 1', type: 'vehicle', status: 'online' },
      { id: 'G027', name: 'South Gate', zone: 'Phase 1', type: 'pedestrian', status: 'online' },
      { id: 'G028', name: 'Phase 2 Gate', zone: 'Phase 2', type: 'vehicle', status: 'online' },
      { id: 'G029', name: 'Service Gate', zone: 'Phase 2', type: 'service', status: 'offline' },
    ],
    hardware: { total: 16, online: 15, offline: 1 },
  },
  {
    id: 'C007', name: 'New Zayed Phase II', developer: 'New Zayed', location: 'Sheikh Zayed',
    status: 'active', units: 380, residents: 950,
    zones: [
      { id: 'Z019', name: 'Block A', description: 'Residential villas', gates: 1, units: 120 },
      { id: 'Z020', name: 'Block B', description: 'Residential apartments', gates: 2, units: 140 },
      { id: 'Z021', name: 'Block C', description: 'Mixed residential', gates: 1, units: 120 },
    ],
    gates: [
      { id: 'G030', name: 'Main Gate', zone: 'Block A', type: 'vehicle', status: 'online' },
      { id: 'G031', name: 'East Gate', zone: 'Block B', type: 'vehicle', status: 'online' },
      { id: 'G032', name: 'West Gate', zone: 'Block B', type: 'pedestrian', status: 'online' },
      { id: 'G033', name: 'Service Gate', zone: 'Block C', type: 'service', status: 'online' },
    ],
    hardware: { total: 13, online: 13, offline: 0 },
  },
  {
    id: 'C008', name: 'New Zayed Phase III', developer: 'New Zayed', location: 'Sheikh Zayed',
    status: 'construction', units: 290, residents: 680,
    zones: [
      { id: 'Z022', name: 'Sector 1', description: 'First residential cluster', gates: 2, units: 150 },
      { id: 'Z023', name: 'Sector 2', description: 'Second residential cluster', gates: 1, units: 140 },
    ],
    gates: [
      { id: 'G034', name: 'Main Gate', zone: 'Sector 1', type: 'vehicle', status: 'online' },
      { id: 'G035', name: 'North Gate', zone: 'Sector 1', type: 'pedestrian', status: 'online' },
      { id: 'G036', name: 'Sector 2 Gate', zone: 'Sector 2', type: 'vehicle', status: 'offline' },
    ],
    hardware: { total: 9, online: 7, offline: 2 },
  },
];

const GATE_TYPE_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  vehicle:    { bg: '#EEF2FF', color: '#1B4FD8', label: 'Vehicle' },
  pedestrian: { bg: '#DCFCE7', color: '#16A34A', label: 'Pedestrian' },
  service:    { bg: '#FEF3C7', color: '#D97706', label: 'Service' },
};

type Tab = 'zones' | 'gates' | 'hardware';

export function Compounds() {
  const [compounds, setCompounds] = useState<Compound[]>(COMPOUNDS);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, Tab>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Zone modal
  const [addZoneForId, setAddZoneForId] = useState<string | null>(null);
  const [zoneForm, setZoneForm] = useState({ name: '', description: '' });

  // Add Gate modal
  const [addGateForId, setAddGateForId] = useState<string | null>(null);
  const [gateForm, setGateForm] = useState({ name: '', zone: '', type: 'vehicle' as Gate['type'] });

  function handleAddZone() {
    if (!zoneForm.name || !addZoneForId) return;
    const newZone: Zone = {
      id: `Z${Date.now()}`,
      name: zoneForm.name,
      description: zoneForm.description,
      gates: 0,
      units: 0,
    };
    setCompounds((prev) =>
      prev.map((c) =>
        c.id === addZoneForId ? { ...c, zones: [...c.zones, newZone] } : c
      )
    );
    setZoneForm({ name: '', description: '' });
    setAddZoneForId(null);
  }

  function handleAddGate() {
    if (!gateForm.name || !gateForm.zone || !addGateForId) return;
    const newGate: Gate = {
      id: `G${Date.now()}`,
      name: gateForm.name,
      zone: gateForm.zone,
      type: gateForm.type,
      status: 'online',
    };
    setCompounds((prev) =>
      prev.map((c) =>
        c.id === addGateForId ? { ...c, gates: [...c.gates, newGate] } : c
      )
    );
    setGateForm({ name: '', zone: '', type: 'vehicle' });
    setAddGateForId(null);
  }

  const filtered = compounds.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.developer.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()),
  );

  const totalOnline = compounds.reduce((s, c) => s + c.hardware.online, 0);
  const totalHardware = compounds.reduce((s, c) => s + c.hardware.total, 0);
  const totalGates = compounds.reduce((s, c) => s + c.gates.length, 0);
  const totalZones = compounds.reduce((s, c) => s + c.zones.length, 0);

  return (
    <div className="p-6 max-w-[1376px] mx-auto" onClick={() => {}}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>
            Compounds
          </h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {COMPOUNDS.length} compounds · {totalZones} zones · {totalGates} gates
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Compound
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Compounds', value: COMPOUNDS.length, icon: Layers, color: '#1B4FD8', bg: '#EEF2FF' },
          { label: 'Total Zones', value: totalZones, icon: Shield, color: '#10B981', bg: '#DCFCE7' },
          { label: 'Total Gates', value: totalGates, icon: DoorOpen, color: '#F59E0B', bg: '#FEF3C7' },
          { label: 'Hardware Online', value: `${totalOnline}/${totalHardware}`, icon: Cpu, color: '#8B5CF6', bg: '#F3E8FF' },
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

      {/* Search */}
      <div className="flex items-center gap-2 p-4 rounded-[10px] mb-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 flex-1 max-w-[400px] rounded-[6px] px-3" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}>
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search compounds, developers, locations..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>
      </div>

      {/* Compounds List */}
      <div className="space-y-3">
        {filtered.map((compound) => {
          const isExpanded = expanded === compound.id;
          const tab = activeTab[compound.id] ?? 'zones';

          return (
            <div key={compound.id} className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {/* Row */}
              <div
                className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(isExpanded ? null : compound.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                      <Layers size={20} color="#1B4FD8" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{compound.name}</h3>
                        <span
                          className="px-2 py-0.5 rounded-[4px]"
                          style={{
                            fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                            background: compound.status === 'active' ? '#DCFCE7' : '#FEF3C7',
                            color: compound.status === 'active' ? '#16A34A' : '#D97706',
                          }}
                        >
                          {compound.status === 'construction' ? 'Under Construction' : compound.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={12} color="#9CA3AF" strokeWidth={1.5} />
                        <span style={{ fontSize: 12, color: '#6B7280' }}>{compound.developer} · {compound.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    {[
                      { label: 'ZONES', value: compound.zones.length },
                      { label: 'GATES', value: compound.gates.length },
                      { label: 'HARDWARE', value: `${compound.hardware.online}/${compound.hardware.total}` },
                      { label: 'UNITS', value: compound.units.toLocaleString() },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.05em' }}>{label}</p>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 1 }}>{value}</p>
                      </div>
                    ))}
                    <ChevronRight size={18} color="#9CA3AF" className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t" style={{ borderColor: '#E5E7EB' }}>
                  {/* Tabs */}
                  <div className="flex gap-1 px-5 pt-3 pb-0 border-b" style={{ borderColor: '#E5E7EB' }}>
                    {(['zones', 'gates', 'hardware'] as Tab[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveTab((prev) => ({ ...prev, [compound.id]: t }))}
                        className="px-4 py-2 rounded-t-[6px] capitalize transition-colors"
                        style={{
                          fontSize: 13,
                          fontWeight: tab === t ? 600 : 400,
                          color: tab === t ? '#1B4FD8' : '#6B7280',
                          borderBottom: tab === t ? '2px solid #1B4FD8' : '2px solid transparent',
                          marginBottom: -1,
                        }}
                      >
                        {t === 'zones' ? `Zones (${compound.zones.length})` : t === 'gates' ? `Gates (${compound.gates.length})` : `Hardware (${compound.hardware.total})`}
                      </button>
                    ))}
                  </div>

                  <div className="p-5">
                    {/* Zones Tab */}
                    {tab === 'zones' && (
                      <div className="grid grid-cols-2 gap-3">
                        {compound.zones.map((zone) => (
                          <div key={zone.id} className="p-4 rounded-[8px]" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-[6px]" style={{ background: '#EEF2FF' }}>
                                  <Shield size={14} color="#1B4FD8" strokeWidth={1.5} />
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{zone.name}</span>
                              </div>
                              <button className="text-xs px-2 py-1 rounded-[4px] hover:bg-gray-200 transition-colors" style={{ fontSize: 11, color: '#6B7280', background: '#E5E7EB' }}>
                                Edit
                              </button>
                            </div>
                            <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>{zone.description}</p>
                            <div className="flex gap-4">
                              <div>
                                <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>GATES</p>
                                <p style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{zone.gates}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>UNITS</p>
                                <p style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{zone.units}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => { setAddZoneForId(compound.id); setZoneForm({ name: '', description: '' }); }}
                          className="p-4 rounded-[8px] flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                          style={{ border: '1.5px dashed #C7D2FE', color: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
                        >
                          <Plus size={16} strokeWidth={2} />
                          Add Zone
                        </button>
                      </div>
                    )}

                    {/* Gates Tab */}
                    {tab === 'gates' && (
                      <div className="space-y-2">
                        {compound.gates.map((gate) => {
                          const typeStyle = GATE_TYPE_COLORS[gate.type];
                          return (
                            <div key={gate.id} className="flex items-center justify-between px-4 py-3 rounded-[8px]" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-[6px]" style={{ background: typeStyle.bg }}>
                                  <DoorOpen size={16} color={typeStyle.color} strokeWidth={1.5} />
                                </div>
                                <div>
                                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{gate.name}</p>
                                  <p style={{ fontSize: 11, color: '#6B7280' }}>{gate.zone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 10, fontWeight: 600, background: typeStyle.bg, color: typeStyle.color }}>
                                  {typeStyle.label}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="rounded-full"
                                    style={{ width: 7, height: 7, background: gate.status === 'online' ? '#16A34A' : '#DC2626', display: 'inline-block' }}
                                  />
                                  <span style={{ fontSize: 12, color: gate.status === 'online' ? '#16A34A' : '#DC2626', fontWeight: 500 }}>
                                    {gate.status}
                                  </span>
                                </div>
                                <button className="px-3 py-1 rounded-[4px] hover:bg-gray-200 transition-colors" style={{ fontSize: 11, color: '#6B7280', background: '#E5E7EB' }}>
                                  Edit
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          onClick={() => { setAddGateForId(compound.id); setGateForm({ name: '', zone: compound.zones[0]?.name ?? '', type: 'vehicle' }); }}
                          className="w-full py-3 rounded-[8px] flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                          style={{ border: '1.5px dashed #C7D2FE', color: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
                        >
                          <Plus size={16} strokeWidth={2} />
                          Add Gate
                        </button>
                      </div>
                    )}

                    {/* Hardware Tab */}
                    {tab === 'hardware' && (
                      <div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {[
                            { label: 'Total Devices', value: compound.hardware.total, color: '#1B4FD8', bg: '#EEF2FF' },
                            { label: 'Online', value: compound.hardware.online, color: '#16A34A', bg: '#DCFCE7' },
                            { label: 'Offline', value: compound.hardware.offline, color: '#DC2626', bg: '#FEE2E2' },
                          ].map(({ label, value, color, bg }) => (
                            <div key={label} className="p-4 rounded-[8px] text-center" style={{ background: bg }}>
                              <p style={{ fontSize: 26, fontWeight: 700, color }}>{value}</p>
                              <p style={{ fontSize: 12, color, fontWeight: 500, marginTop: 2 }}>{label}</p>
                            </div>
                          ))}
                        </div>
                        <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
                          Navigate to the Hardware page for device-level management.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Zone Modal */}
      {addZoneForId && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-md overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Shield size={18} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: '#111827' }}>Add Zone</h2>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{compounds.find(c => c.id === addZoneForId)?.name}</p>
                </div>
              </div>
              <button onClick={() => setAddZoneForId(null)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={17} color="#6B7280" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Zone Name *</label>
                <input
                  type="text"
                  value={zoneForm.name}
                  onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })}
                  placeholder="e.g., Zone A, Block 1, District North"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Description</label>
                <input
                  type="text"
                  value={zoneForm.description}
                  onChange={(e) => setZoneForm({ ...zoneForm, description: e.target.value })}
                  placeholder="e.g., North residential cluster"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setAddZoneForId(null)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>
                Cancel
              </button>
              <button
                onClick={handleAddZone}
                disabled={!zoneForm.name}
                className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity"
                style={{ background: zoneForm.name ? '#1B4FD8' : '#9CA3AF', color: '#FFFFFF', fontSize: 13, fontWeight: 500, cursor: zoneForm.name ? 'pointer' : 'not-allowed' }}
              >
                Add Zone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Gate Modal */}
      {addGateForId && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-md overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#FEF3C7' }}>
                  <DoorOpen size={18} color="#D97706" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: '#111827' }}>Add Gate</h2>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{compounds.find(c => c.id === addGateForId)?.name}</p>
                </div>
              </div>
              <button onClick={() => setAddGateForId(null)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={17} color="#6B7280" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Gate Name *</label>
                <input
                  type="text"
                  value={gateForm.name}
                  onChange={(e) => setGateForm({ ...gateForm, name: e.target.value })}
                  placeholder="e.g., Main Gate, North Entrance"
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Zone *</label>
                <select
                  value={gateForm.zone}
                  onChange={(e) => setGateForm({ ...gateForm, zone: e.target.value })}
                  className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                >
                  {compounds.find(c => c.id === addGateForId)?.zones.map((z) => (
                    <option key={z.id} value={z.name}>{z.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Gate Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['vehicle', 'pedestrian', 'service'] as Gate['type'][]).map((type) => {
                    const s = GATE_TYPE_COLORS[type];
                    const isSelected = gateForm.type === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setGateForm({ ...gateForm, type })}
                        className="py-2 rounded-[6px] capitalize transition-all"
                        style={{
                          fontSize: 13, fontWeight: 500,
                          background: isSelected ? s.bg : '#F4F5F7',
                          color: isSelected ? s.color : '#6B7280',
                          border: isSelected ? `1.5px solid ${s.color}` : '1.5px solid #E5E7EB',
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setAddGateForId(null)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>
                Cancel
              </button>
              <button
                onClick={handleAddGate}
                disabled={!gateForm.name || !gateForm.zone}
                className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity"
                style={{ background: gateForm.name && gateForm.zone ? '#1B4FD8' : '#9CA3AF', color: '#FFFFFF', fontSize: 13, fontWeight: 500, cursor: gateForm.name && gateForm.zone ? 'pointer' : 'not-allowed' }}
              >
                Add Gate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Compound Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-lg overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Layers size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Add New Compound
                </h2>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Property Developer *</label>
                <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                  <option>Palm Hills</option>
                  <option>Sodic</option>
                  <option>Hyde Park</option>
                  <option>New Zayed</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Compound Name *</label>
                <input type="text" placeholder="e.g., Palm Hills Extension" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Location *</label>
                <input type="text" placeholder="e.g., New Cairo" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Total Units</label>
                  <input type="number" placeholder="450" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Status</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    <option>Active</option>
                    <option>Under Construction</option>
                    <option>Planning</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity" style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>
                Add Compound
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
