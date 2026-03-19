import { useState } from 'react';
import type React from 'react';
import {
  Plus, X,
  Sparkles, Leaf, Baby, Wrench, Droplets, ShieldCheck,
} from 'lucide-react';

type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  priceFrom: number;
  unit: string;
  active: boolean;
  totalRequests: number;
};

const SERVICE_CATALOGUE: ServiceCategory[] = [
  { id: 'SVC-001', name: 'Cleaning',          description: 'Home cleaning, deep-clean, and move-in/out cleaning',     icon: Sparkles,    color: '#1B4FD8', bg: '#EEF2FF', priceFrom: 150,  unit: 'session', active: true,  totalRequests: 184 },
  { id: 'SVC-002', name: 'Gardening',          description: 'Lawn mowing, pruning, planting, and garden maintenance',  icon: Leaf,        color: '#16A34A', bg: '#DCFCE7', priceFrom: 120,  unit: 'session', active: true,  totalRequests: 97  },
  { id: 'SVC-003', name: 'Nanny / Babysitter', description: 'Childcare services, babysitting, and after-school care',  icon: Baby,        color: '#D97706', bg: '#FEF3C7', priceFrom: 80,   unit: 'hour',    active: true,  totalRequests: 143 },
  { id: 'SVC-004', name: 'Home Maintenance',   description: 'Plumbing, electrical, painting, and general repairs',     icon: Wrench,      color: '#7C3AED', bg: '#F3E8FF', priceFrom: 200,  unit: 'job',     active: true,  totalRequests: 211 },
  { id: 'SVC-005', name: 'Pool Cleaning',      description: 'Private pool maintenance, chemical balancing, and filters', icon: Droplets,  color: '#0EA5E9', bg: '#E0F2FE', priceFrom: 250,  unit: 'session', active: true,  totalRequests: 62  },
  { id: 'SVC-006', name: 'Security Guard',     description: 'Personal security detail for events and private use',     icon: ShieldCheck, color: '#DC2626', bg: '#FEE2E2', priceFrom: 300,  unit: 'shift',   active: false, totalRequests: 18  },
];

export function Services() {
  const [showAddService, setShowAddService] = useState(false);

  return (
    <div className="p-6 max-w-[1376px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Service Catalogue</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {SERVICE_CATALOGUE.filter((s) => s.active).length} active service types · {SERVICE_CATALOGUE.length} total
          </p>
        </div>
        <button
          onClick={() => setShowAddService(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white hover:opacity-90 transition-opacity"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Service Type
        </button>
      </div>

      {/* Service Catalogue List */}
      <div className="space-y-2">
        {SERVICE_CATALOGUE.map((svc) => (
          <div
            key={svc.id}
            className="flex items-center px-5 py-4 rounded-[10px] hover:bg-gray-50 transition-colors"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            {/* Left: icon + name + description */}
            <div className="flex items-center gap-4 min-w-0" style={{ flex: '0 0 340px' }}>
              <div className="p-2.5 rounded-[8px] shrink-0" style={{ background: svc.bg }}>
                <svc.icon size={20} color={svc.color} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{svc.name}</p>
                <p style={{ fontSize: 12, color: '#6B7280', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {svc.description}
                </p>
              </div>
            </div>

            {/* Center stats: spread evenly */}
            <div className="flex flex-1 justify-around items-center mx-6">
              <div className="text-center">
                <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.05em' }}>PRICE FROM</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 1 }}>
                  EGP {svc.priceFrom}
                  <span style={{ fontSize: 11, fontWeight: 400, color: '#9CA3AF' }}>/{svc.unit}</span>
                </p>
              </div>
              <div className="text-center">
                <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.05em' }}>REQUESTS</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 1 }}>{svc.totalRequests}</p>
              </div>
            </div>

            {/* Right: status + actions */}
            <div className="flex items-center gap-3 shrink-0">
              <span
                className="px-2 py-0.5 rounded-[4px]"
                style={{
                  fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                  background: svc.active ? '#DCFCE7' : '#F3F4F6',
                  color: svc.active ? '#16A34A' : '#6B7280',
                }}
              >
                {svc.active ? 'Active' : 'Inactive'}
              </span>
              <button
                className="px-3 py-1.5 rounded-[6px] hover:bg-blue-50 transition-colors"
                style={{ border: '1px solid #C7D2FE', fontSize: 12, fontWeight: 500, color: '#1B4FD8' }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1.5 rounded-[6px] hover:bg-gray-100 transition-colors"
                style={{ border: '1px solid #E5E7EB', fontSize: 12, fontWeight: 500, color: '#6B7280' }}
              >
                {svc.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}

        {/* Add new service type row */}
        <button
          onClick={() => setShowAddService(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[10px] hover:bg-blue-50 transition-colors"
          style={{ border: '1.5px dashed #C7D2FE', color: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Service Type
        </button>
      </div>

      {/* ── Add Service Type Modal ── */}
      {showAddService && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="rounded-[12px] w-full max-w-md overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>Add Service Type</h2>
              <button onClick={() => setShowAddService(false)} className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors">
                <X size={18} color="#6B7280" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4" style={{ maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Service Name *</label>
                <input type="text" placeholder="e.g., Car Washing" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea rows={3} placeholder="Brief description of the service..." className="w-full px-3 py-2 rounded-[6px] outline-none resize-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Starting Price (EGP)</label>
                  <input type="number" placeholder="150" className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Price Unit</label>
                  <select className="w-full px-3 py-2 rounded-[6px] outline-none" style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}>
                    <option>session</option>
                    <option>hour</option>
                    <option>job</option>
                    <option>shift</option>
                    <option>day</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button onClick={() => setShowAddService(false)} className="px-4 py-2 rounded-[8px] hover:bg-gray-100 transition-colors" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Cancel</button>
              <button onClick={() => setShowAddService(false)} className="px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity" style={{ background: '#1B4FD8', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>Add Service</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
