import { useState } from 'react';
import { Search, Plus, X, Eye, Building2, Home, LayoutGrid, List, BedDouble, Bath, Trees, Car, Layers, Ruler, MapPin } from 'lucide-react';
import type React from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type BuildingType = 'MUB' | 'Villa' | 'Townhouse' | 'Duplex';
type BuildingStatus = 'active' | 'construction' | 'planning';

type Building = {
  id: string;
  name: string;
  type: BuildingType;
  compound: string;
  zone: string;
  floors: number;
  units: number;
  builtArea: number;       // sqm per unit (villa/townhouse) or total floor plate (MUB)
  plotArea: number | null; // sqm — land plot (villas/townhouses only)
  bedrooms: number | string;
  bathrooms: number;
  hasGarden: boolean;
  gardenArea: number | null; // sqm
  parkingSpots: number;
  yearBuilt: number;
  status: BuildingStatus;
  notes: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const BUILDINGS: Building[] = [
  // ── Palm Hills Katameya
  { id: 'BLD-001', name: 'Block A',        type: 'MUB',      compound: 'Palm Hills Katameya', zone: 'Zone A', floors: 5,  units: 40,  builtArea: 1800, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 40, yearBuilt: 2018, status: 'active',       notes: 'Ground-floor units have private terraces.' },
  { id: 'BLD-002', name: 'Block B',        type: 'MUB',      compound: 'Palm Hills Katameya', zone: 'Zone A', floors: 5,  units: 40,  builtArea: 1800, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 40, yearBuilt: 2018, status: 'active',       notes: '' },
  { id: 'BLD-003', name: 'Block C',        type: 'MUB',      compound: 'Palm Hills Katameya', zone: 'Zone B', floors: 6,  units: 48,  builtArea: 2100, plotArea: null, bedrooms: '3',   bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 48, yearBuilt: 2019, status: 'active',       notes: '' },
  { id: 'BLD-004', name: 'Villa V-01',     type: 'Villa',    compound: 'Palm Hills Katameya', zone: 'Zone C', floors: 2,  units: 1,   builtArea: 380,  plotArea: 620,  bedrooms: 4,     bathrooms: 4, hasGarden: true,  gardenArea: 240,  parkingSpots: 2,  yearBuilt: 2017, status: 'active',       notes: 'Private pool. Corner plot.' },
  { id: 'BLD-005', name: 'Villa V-02',     type: 'Villa',    compound: 'Palm Hills Katameya', zone: 'Zone C', floors: 2,  units: 1,   builtArea: 350,  plotArea: 580,  bedrooms: 4,     bathrooms: 3, hasGarden: true,  gardenArea: 200,  parkingSpots: 2,  yearBuilt: 2017, status: 'active',       notes: '' },
  { id: 'BLD-006', name: 'Villa V-03',     type: 'Villa',    compound: 'Palm Hills Katameya', zone: 'Zone C', floors: 2,  units: 1,   builtArea: 410,  plotArea: 650,  bedrooms: 5,     bathrooms: 4, hasGarden: true,  gardenArea: 280,  parkingSpots: 3,  yearBuilt: 2018, status: 'active',       notes: 'Extended family layout.' },

  // ── Palm Hills October
  { id: 'BLD-007', name: 'Tower 1',        type: 'MUB',      compound: 'Palm Hills October',  zone: 'Zone A', floors: 8,  units: 64,  builtArea: 2800, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 64, yearBuilt: 2020, status: 'active',       notes: '' },
  { id: 'BLD-008', name: 'Tower 2',        type: 'MUB',      compound: 'Palm Hills October',  zone: 'Zone A', floors: 8,  units: 64,  builtArea: 2800, plotArea: null, bedrooms: '3',   bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 64, yearBuilt: 2020, status: 'active',       notes: '' },
  { id: 'BLD-009', name: 'TH Row 1',       type: 'Townhouse', compound: 'Palm Hills October', zone: 'Zone B', floors: 3,  units: 12,  builtArea: 260,  plotArea: 320,  bedrooms: 3,     bathrooms: 3, hasGarden: true,  gardenArea: 60,   parkingSpots: 1,  yearBuilt: 2021, status: 'active',       notes: 'Roof terrace on all units.' },
  { id: 'BLD-010', name: 'TH Row 2',       type: 'Townhouse', compound: 'Palm Hills October', zone: 'Zone B', floors: 3,  units: 10,  builtArea: 280,  plotArea: 350,  bedrooms: 3,     bathrooms: 3, hasGarden: true,  gardenArea: 70,   parkingSpots: 1,  yearBuilt: 2021, status: 'active',       notes: '' },

  // ── Sodic West
  { id: 'BLD-011', name: 'Residence A',    type: 'MUB',      compound: 'Sodic West',          zone: 'Zone 2', floors: 7,  units: 56,  builtArea: 2400, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 56, yearBuilt: 2019, status: 'active',       notes: '' },
  { id: 'BLD-012', name: 'Residence B',    type: 'MUB',      compound: 'Sodic West',          zone: 'Zone 2', floors: 7,  units: 56,  builtArea: 2400, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 56, yearBuilt: 2019, status: 'active',       notes: '' },
  { id: 'BLD-013', name: 'Villa Cluster A',type: 'Villa',    compound: 'Sodic West',          zone: 'Zone 1', floors: 2,  units: 1,   builtArea: 450,  plotArea: 700,  bedrooms: 5,     bathrooms: 5, hasGarden: true,  gardenArea: 320,  parkingSpots: 3,  yearBuilt: 2018, status: 'active',       notes: 'Private pool. Smart home system.' },
  { id: 'BLD-014', name: 'Duplex D-1',     type: 'Duplex',   compound: 'Sodic West',          zone: 'Zone 4', floors: 2,  units: 2,   builtArea: 300,  plotArea: 400,  bedrooms: 3,     bathrooms: 3, hasGarden: true,  gardenArea: 100,  parkingSpots: 2,  yearBuilt: 2020, status: 'active',       notes: '' },
  { id: 'BLD-015', name: 'Duplex D-2',     type: 'Duplex',   compound: 'Sodic West',          zone: 'Zone 4', floors: 2,  units: 2,   builtArea: 300,  plotArea: 400,  bedrooms: 3,     bathrooms: 3, hasGarden: true,  gardenArea: 100,  parkingSpots: 2,  yearBuilt: 2020, status: 'active',       notes: '' },

  // ── Sodic East
  { id: 'BLD-016', name: 'East Block 1',   type: 'MUB',      compound: 'Sodic East',          zone: 'Zone A', floors: 6,  units: 48,  builtArea: 2100, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 48, yearBuilt: 2021, status: 'active',       notes: '' },
  { id: 'BLD-017', name: 'East Block 2',   type: 'MUB',      compound: 'Sodic East',          zone: 'Zone B', floors: 6,  units: 48,  builtArea: 2100, plotArea: null, bedrooms: '3',   bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 48, yearBuilt: 2021, status: 'active',       notes: '' },

  // ── Hyde Park
  { id: 'BLD-018', name: 'Signature Tower',type: 'MUB',      compound: 'Hyde Park',           zone: 'District 4', floors: 12, units: 96, builtArea: 4200, plotArea: null, bedrooms: '2–4', bathrooms: 3, hasGarden: false, gardenArea: null, parkingSpots: 96, yearBuilt: 2020, status: 'active',       notes: 'Highest building in compound. Panoramic views.' },
  { id: 'BLD-019', name: 'Garden Villa 01',type: 'Villa',    compound: 'Hyde Park',           zone: 'District 1', floors: 2,  units: 1,  builtArea: 500,  plotArea: 800,  bedrooms: 5,     bathrooms: 5, hasGarden: true,  gardenArea: 380,  parkingSpots: 4,  yearBuilt: 2017, status: 'active',       notes: 'Largest plot in the compound.' },
  { id: 'BLD-020', name: 'Mid-Rise M1',    type: 'MUB',      compound: 'Hyde Park',           zone: 'District 2', floors: 5,  units: 40, builtArea: 1600, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 40, yearBuilt: 2019, status: 'active',       notes: '' },
  { id: 'BLD-021', name: 'TH Cluster B',   type: 'Townhouse', compound: 'Hyde Park',          zone: 'District 3', floors: 3,  units: 16, builtArea: 240,  plotArea: 290,  bedrooms: 3,     bathrooms: 3, hasGarden: true,  gardenArea: 50,   parkingSpots: 1,  yearBuilt: 2020, status: 'active',       notes: '' },

  // ── Hyde Park New Cairo
  { id: 'BLD-022', name: 'Phase 1 Block A',type: 'MUB',      compound: 'Hyde Park New Cairo', zone: 'Phase 1', floors: 5,  units: 40,  builtArea: 1700, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 40, yearBuilt: 2019, status: 'active',       notes: '' },
  { id: 'BLD-023', name: 'Phase 2 Block A',type: 'MUB',      compound: 'Hyde Park New Cairo', zone: 'Phase 2', floors: 6,  units: 48,  builtArea: 2000, plotArea: null, bedrooms: '3',   bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 48, yearBuilt: 2022, status: 'active',       notes: '' },

  // ── New Zayed Phase II
  { id: 'BLD-024', name: 'Block A1',       type: 'MUB',      compound: 'New Zayed Phase II',  zone: 'Block B', floors: 4,  units: 32,  builtArea: 1400, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 32, yearBuilt: 2021, status: 'active',       notes: '' },
  { id: 'BLD-025', name: 'Villa NZ-01',    type: 'Villa',    compound: 'New Zayed Phase II',  zone: 'Block A', floors: 2,  units: 1,   builtArea: 320,  plotArea: 500,  bedrooms: 4,     bathrooms: 3, hasGarden: true,  gardenArea: 180,  parkingSpots: 2,  yearBuilt: 2021, status: 'active',       notes: '' },

  // ── New Zayed Phase III
  { id: 'BLD-026', name: 'Sector 1 Block', type: 'MUB',      compound: 'New Zayed Phase III', zone: 'Sector 1', floors: 5, units: 40,  builtArea: 1600, plotArea: null, bedrooms: '2–3', bathrooms: 2, hasGarden: false, gardenArea: null, parkingSpots: 40, yearBuilt: 2024, status: 'construction', notes: 'Expected handover Q3 2026.' },
  { id: 'BLD-027', name: 'Villa NZ3-01',   type: 'Villa',    compound: 'New Zayed Phase III', zone: 'Sector 2', floors: 2, units: 1,   builtArea: 360,  plotArea: 560,  bedrooms: 4,     bathrooms: 4, hasGarden: true,  gardenArea: 200,  parkingSpots: 2,  yearBuilt: 2025, status: 'construction', notes: 'Structural work complete, finishing in progress.' },
  { id: 'BLD-028', name: 'TH Cluster S2',  type: 'Townhouse', compound: 'New Zayed Phase III', zone: 'Sector 2', floors: 3, units: 14,  builtArea: 220,  plotArea: 270,  bedrooms: 3,     bathrooms: 3, hasGarden: true,  gardenArea: 50,   parkingSpots: 1,  yearBuilt: 2026, status: 'planning',     notes: 'Permits approved. Groundwork not yet started.' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_META: Record<BuildingType, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  MUB:       { label: 'MUB',       icon: Building2,   color: '#1B4FD8', bg: '#EEF2FF' },
  Villa:     { label: 'Villa',     icon: Home,        color: '#16A34A', bg: '#DCFCE7' },
  Townhouse: { label: 'Townhouse', icon: LayoutGrid,  color: '#D97706', bg: '#FEF3C7' },
  Duplex:    { label: 'Duplex',    icon: Layers,      color: '#7C3AED', bg: '#F3E8FF' },
};

const STATUS_META: Record<BuildingStatus, { label: string; bg: string; color: string }> = {
  active:       { label: 'Active',            bg: '#DCFCE7', color: '#16A34A' },
  construction: { label: 'Under Construction',bg: '#FEF3C7', color: '#D97706' },
  planning:     { label: 'Planning',          bg: '#F3E8FF', color: '#7C3AED' },
};

const COMPOUNDS = ['All Compounds', 'Palm Hills Katameya', 'Palm Hills October', 'Sodic West', 'Sodic East', 'Hyde Park', 'Hyde Park New Cairo', 'New Zayed Phase II', 'New Zayed Phase III'];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 2 }}>{value}</p>
    </div>
  );
}

export function Buildings() {
  const [search, setSearch]               = useState('');
  const [typeFilter, setTypeFilter]       = useState<string>('all');
  const [compoundFilter, setCompound]     = useState('All Compounds');
  const [statusFilter, setStatusFilter]   = useState<string>('all');
  const [viewMode, setViewMode]           = useState<'grid' | 'list'>('grid');
  const [selected, setSelected]           = useState<Building | null>(null);
  const [showAddModal, setShowAddModal]   = useState(false);

  const filtered = BUILDINGS.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = !search || b.name.toLowerCase().includes(q) || b.compound.toLowerCase().includes(q) || b.zone.toLowerCase().includes(q);
    const matchType     = typeFilter     === 'all'           || b.type     === typeFilter;
    const matchCompound = compoundFilter === 'All Compounds' || b.compound === compoundFilter;
    const matchStatus   = statusFilter   === 'all'           || b.status   === statusFilter;
    return matchSearch && matchType && matchCompound && matchStatus;
  });

  const totalUnits  = BUILDINGS.reduce((s, b) => s + b.units, 0);
  const mubCount    = BUILDINGS.filter((b) => b.type === 'MUB').length;
  const villaCount  = BUILDINGS.filter((b) => b.type === 'Villa').length;
  const otherCount  = BUILDINGS.filter((b) => b.type === 'Townhouse' || b.type === 'Duplex').length;

  return (
    <div className="p-6 max-w-[1376px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Buildings</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {BUILDINGS.length} buildings · {totalUnits} total units · structural registry
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white hover:opacity-90 transition-opacity"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Building
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Buildings', value: BUILDINGS.length, icon: Building2,  color: '#1B4FD8', bg: '#EEF2FF' },
          { label: 'MUBs',            value: mubCount,         icon: Layers,     color: '#0284C7', bg: '#E0F2FE' },
          { label: 'Villas',          value: villaCount,       icon: Home,       color: '#16A34A', bg: '#DCFCE7' },
          { label: 'TH / Duplex',     value: otherCount,       icon: LayoutGrid, color: '#D97706', bg: '#FEF3C7' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="p-4 rounded-[10px]" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="p-2 rounded-[6px] w-fit mb-2" style={{ background: bg }}>
              <Icon size={18} color={color} strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', fontFamily: "'Sora', sans-serif" }}>{value}</p>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters + View Toggle */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[10px] mb-5" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 rounded-[6px] px-3" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, flex: '1 1 200px', maxWidth: 300 }}>
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, compound, zone..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>

        <select value={compoundFilter} onChange={(e) => setCompound(e.target.value)} className="rounded-[6px] px-3 outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}>
          {COMPOUNDS.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-[6px] px-3 outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}>
          <option value="all">All Types</option>
          <option value="MUB">MUB</option>
          <option value="Villa">Villa</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Duplex">Duplex</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-[6px] px-3 outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, fontSize: 13, color: '#374151' }}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="construction">Under Construction</option>
          <option value="planning">Planning</option>
        </select>

        <span style={{ fontSize: 12, color: '#9CA3AF' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>

        {/* View toggle */}
        <div className="ml-auto flex items-center gap-1 p-1 rounded-[6px]" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}>
          {(['grid', 'list'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className="p-1.5 rounded-[4px] transition-colors"
              style={{ background: viewMode === m ? '#FFFFFF' : 'transparent', boxShadow: viewMode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}
            >
              {m === 'grid' ? <LayoutGrid size={15} color={viewMode === m ? '#111827' : '#9CA3AF'} /> : <List size={15} color={viewMode === m ? '#111827' : '#9CA3AF'} />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid View ── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((b) => {
            const tm = TYPE_META[b.type];
            const sm = STATUS_META[b.status];
            return (
              <div
                key={b.id}
                className="rounded-[10px] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                onClick={() => setSelected(b)}
              >
                {/* Card header strip */}
                <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-[8px]" style={{ background: tm.bg }}>
                      <tm.icon size={20} color={tm.color} strokeWidth={1.5} />
                    </div>
                    <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 10, fontWeight: 600, background: sm.bg, color: sm.color }}>
                      {sm.label}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{b.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} color="#9CA3AF" strokeWidth={1.5} />
                    <p style={{ fontSize: 12, color: '#6B7280' }}>{b.compound} · {b.zone}</p>
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-[4px]" style={{ fontSize: 10, fontWeight: 600, background: tm.bg, color: tm.color }}>
                    {tm.label}
                  </span>
                </div>

                {/* Specs grid */}
                <div className="px-5 py-4 grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <Layers size={14} color="#9CA3AF" strokeWidth={1.5} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{b.floors}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>Floors</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Home size={14} color="#9CA3AF" strokeWidth={1.5} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{b.units}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>Units</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <BedDouble size={14} color="#9CA3AF" strokeWidth={1.5} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{b.bedrooms}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>Beds</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Ruler size={14} color="#9CA3AF" strokeWidth={1.5} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{b.builtArea}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>Built m²</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Car size={14} color="#9CA3AF" strokeWidth={1.5} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{b.parkingSpots}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>Parking</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Trees size={14} color={b.hasGarden ? '#16A34A' : '#D1D5DB'} strokeWidth={1.5} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: b.hasGarden ? '#16A34A' : '#9CA3AF' }}>
                      {b.hasGarden ? `${b.gardenArea}m²` : '—'}
                    </p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>Garden</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── List View ── */}
      {viewMode === 'list' && (
        <div className="rounded-[10px] overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                {['Building', 'Type', 'Compound / Zone', 'Floors', 'Units', 'Built Area', 'Bedrooms', 'Parking', 'Garden', 'Year', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => {
                const tm = TYPE_META[b.type];
                const sm = STATUS_META[b.status];
                return (
                  <tr key={b.id} style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #F3F4F6' : 'none' }} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{b.name}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF' }}>{b.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded-[4px]" style={{ background: tm.bg }}>
                          <tm.icon size={12} color={tm.color} strokeWidth={1.5} />
                        </div>
                        <span style={{ fontSize: 12, color: tm.color, fontWeight: 500 }}>{tm.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p style={{ fontSize: 13, color: '#374151' }}>{b.compound}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF' }}>{b.zone}</p>
                    </td>
                    <td className="px-4 py-3 text-center" style={{ fontSize: 13, color: '#374151' }}>{b.floors}</td>
                    <td className="px-4 py-3 text-center" style={{ fontSize: 13, color: '#374151' }}>{b.units}</td>
                    <td className="px-4 py-3" style={{ fontSize: 13, color: '#374151' }}>{b.builtArea} m²</td>
                    <td className="px-4 py-3 text-center" style={{ fontSize: 13, color: '#374151' }}>{b.bedrooms}</td>
                    <td className="px-4 py-3 text-center" style={{ fontSize: 13, color: '#374151' }}>{b.parkingSpots}</td>
                    <td className="px-4 py-3 text-center">
                      {b.hasGarden
                        ? <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 500 }}>{b.gardenArea} m²</span>
                        : <span style={{ fontSize: 12, color: '#D1D5DB' }}>—</span>}
                    </td>
                    <td className="px-4 py-3 text-center" style={{ fontSize: 13, color: '#374151' }}>{b.yearBuilt}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: 10, fontWeight: 600, background: sm.bg, color: sm.color }}>{sm.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(b)} className="p-1.5 rounded-[4px] hover:bg-blue-50 transition-colors">
                        <Eye size={14} color="#1B4FD8" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Detail Panel ── */}
      {selected && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-end z-50">
          <div className="h-full w-full max-w-md overflow-y-auto" style={{ background: '#FFFFFF', borderLeft: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 600, color: '#111827' }}>{selected.name}</h2>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Type + status badges */}
              <div className="flex items-center gap-2">
                {(() => { const tm = TYPE_META[selected.type]; return (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-[6px]" style={{ background: tm.bg, color: tm.color, fontSize: 12, fontWeight: 600 }}>
                    <tm.icon size={13} strokeWidth={1.5} />{tm.label}
                  </span>
                ); })()}
                {(() => { const sm = STATUS_META[selected.status]; return (
                  <span className="px-3 py-1 rounded-[6px]" style={{ background: sm.bg, color: sm.color, fontSize: 12, fontWeight: 600 }}>{sm.label}</span>
                ); })()}
              </div>

              {/* Location */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Location</p>
                <div className="space-y-2">
                  {[
                    { label: 'Compound', value: selected.compound },
                    { label: 'Zone',     value: selected.zone },
                    { label: 'Year Built', value: selected.yearBuilt.toString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b" style={{ borderColor: '#F3F4F6' }}>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structure */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Structure</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Layers,   label: 'Floors',      value: `${selected.floors}` },
                    { icon: Home,     label: 'Units',       value: `${selected.units}` },
                    { icon: Ruler,    label: 'Built Area',  value: `${selected.builtArea} m²` },
                    { icon: Ruler,    label: 'Plot Area',   value: selected.plotArea ? `${selected.plotArea} m²` : 'N/A' },
                    { icon: BedDouble,label: 'Bedrooms',    value: `${selected.bedrooms}` },
                    { icon: Bath,     label: 'Bathrooms',   value: `${selected.bathrooms}` },
                    { icon: Car,      label: 'Parking',     value: `${selected.parkingSpots} spots` },
                    { icon: Trees,    label: 'Garden',      value: selected.hasGarden ? `${selected.gardenArea} m²` : 'No' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="p-3 rounded-[8px] flex items-center gap-3" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                      <Icon size={15} color="#6B7280" strokeWidth={1.5} />
                      <div>
                        <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>{label}</p>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Notes</p>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, padding: 12, background: '#F9FAFB', borderRadius: 6, border: '1px solid #E5E7EB' }}>
                    {selected.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-2 rounded-[8px] hover:opacity-90 transition-opacity text-white" style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}>
                  Edit Building
                </button>
                <button className="py-2 px-4 rounded-[8px] hover:bg-red-50 transition-colors" style={{ border: '1px solid #FCA5A5', color: '#DC2626', fontSize: 13, fontWeight: 500 }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Building Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Building2 size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>Add Building</h2>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Building Name *</label>
                  <input type="text" placeholder="e.g., Block A" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Type *</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    <option>MUB</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                    <option>Duplex</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Compound *</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    {COMPOUNDS.slice(1).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Zone</label>
                  <input type="text" placeholder="e.g., Zone A" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Floors *</label>
                  <input type="number" placeholder="5" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Units *</label>
                  <input type="number" placeholder="40" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Year Built</label>
                  <input type="number" placeholder="2021" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Built Area (m²) *</label>
                  <input type="number" placeholder="1800" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Plot Area (m²)</label>
                  <input type="number" placeholder="Villas & TH only" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Bedrooms</label>
                  <input type="text" placeholder="3 or 2–4" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Bathrooms</label>
                  <input type="number" placeholder="2" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Parking Spots</label>
                  <input type="number" placeholder="40" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Garden</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Garden Area (m²)</label>
                  <input type="number" placeholder="If applicable" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Status</label>
                <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                  <option value="active">Active</option>
                  <option value="construction">Under Construction</option>
                  <option value="planning">Planning</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Notes</label>
                <textarea rows={2} placeholder="Any structural notes..." className="w-full px-3 py-2 rounded-[6px] outline-none resize-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity" style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>Add Building</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
