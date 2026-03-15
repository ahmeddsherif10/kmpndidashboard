import { useState } from 'react';
import { Pencil, Info, Users, Clock, Moon, Truck } from 'lucide-react';

type RuleCard = {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  value: string;
  unit: string;
  enabled: boolean;
  editType: 'number' | 'time' | 'toggle' | 'select';
  options?: string[];
};

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

export function VisitorRules() {
  const [rules, setRules] = useState<RuleCard[]>([
    {
      id: 'daily-limit', icon: Users, iconColor: '#1B4FD8', iconBg: '#EEF2FF',
      title: 'Daily Visitor Limit',
      description: 'Maximum number of visitors allowed per unit per day',
      value: '5', unit: 'visitors / unit / day',
      enabled: true, editType: 'number',
    },
    {
      id: 'max-duration', icon: Clock, iconColor: '#16A34A', iconBg: '#DCFCE7',
      title: 'Max Pass Duration',
      description: 'Maximum hours a single visitor pass remains valid',
      value: '8', unit: 'hours',
      enabled: true, editType: 'number',
    },
    {
      id: 'overnight', icon: Moon, iconColor: '#7C3AED', iconBg: '#EDE9FE',
      title: 'Overnight Visitor Policy',
      description: 'Allow visitors to stay overnight (pass valid until 8 AM next day)',
      value: 'Allowed with prior notice', unit: '',
      enabled: true, editType: 'select',
      options: ['Not Allowed', 'Allowed with prior notice', 'Allowed freely'],
    },
    {
      id: 'delivery-window', icon: Truck, iconColor: '#D97706', iconBg: '#FEF3C7',
      title: 'Delivery Window Hours',
      description: 'Time window when delivery personnel may enter the compound',
      value: '08:00 – 21:00', unit: 'daily window',
      enabled: true, editType: 'time',
    },
    {
      id: 'repeat-visitor', icon: Users, iconColor: '#0891B2', iconBg: '#CFFAFE',
      title: 'Repeat Visitor Auto-Approve',
      description: 'Auto-approve visitors who have been approved 3+ times before',
      value: 'Enabled', unit: '',
      enabled: true, editType: 'toggle',
    },
    {
      id: 'blacklist-auto', icon: Users, iconColor: '#DC2626', iconBg: '#FEE2E2',
      title: 'Auto-Block After Rejection',
      description: 'Automatically flag visitors who are denied 3 times in 30 days',
      value: '3 denials / 30 days', unit: '',
      enabled: false, editType: 'number',
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (rule: RuleCard) => {
    setEditingId(rule.id);
    setEditValue(rule.value);
  };

  const saveEdit = (id: string) => {
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, value: editValue } : r));
    setEditingId(null);
  };

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Visitor Pass Rules</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Configure visitor access policies for Palm Hills Katameya</p>
      </div>

      {/* Banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-[10px] mb-6"
        style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
      >
        <Info size={16} color="#1B4FD8" strokeWidth={1.5} style={{ marginTop: 1, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1B4FD8' }}>Compound-level Rules</p>
          <p style={{ fontSize: 13, color: '#374151', marginTop: 2 }}>
            These rules apply to all units unless overridden at the individual unit level. Changes take effect immediately.
          </p>
        </div>
      </div>

      {/* Rule Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {rules.map((rule) => {
          const Icon = rule.icon;
          const isEditing = editingId === rule.id;
          return (
            <div
              key={rule.id}
              className="rounded-[10px] p-5 flex flex-col gap-4"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${rule.enabled ? '#E5E7EB' : '#F3F4F6'}`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                opacity: rule.enabled ? 1 : 0.65,
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-[8px] flex-shrink-0"
                    style={{ width: 36, height: 36, background: rule.iconBg }}
                  >
                    <Icon size={18} color={rule.iconColor} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#111827' }}>{rule.title}</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, lineHeight: 1.4 }}>{rule.description}</p>
                  </div>
                </div>
                <Toggle checked={rule.enabled} onChange={() => toggleRule(rule.id)} />
              </div>

              {/* Value */}
              <div
                className="rounded-[8px] p-3"
                style={{ background: '#F4F5F7', border: '1px solid #E5E7EB' }}
              >
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    {rule.editType === 'select' ? (
                      <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 bg-transparent outline-none"
                        style={{ fontSize: 14, color: '#111827', fontWeight: 600 }}
                      >
                        {rule.options?.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        type={rule.editType === 'number' ? 'number' : 'text'}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 bg-transparent outline-none"
                        style={{ fontSize: 14, color: '#111827', fontWeight: 600 }}
                        autoFocus
                      />
                    )}
                    <button
                      onClick={() => saveEdit(rule.id)}
                      className="px-2.5 py-1 rounded-[4px] text-white"
                      style={{ background: '#1B4FD8', fontSize: 11, fontWeight: 600 }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2 py-1 rounded-[4px] hover:bg-gray-200 transition-colors"
                      style={{ fontSize: 11, color: '#6B7280' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: '#111827' }}>{rule.value}</p>
                      {rule.unit && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{rule.unit}</p>}
                    </div>
                    <button
                      onClick={() => startEdit(rule)}
                      disabled={!rule.enabled}
                      className="p-1.5 rounded-[4px] hover:bg-white transition-colors disabled:opacity-30"
                    >
                      <Pencil size={14} color="#6B7280" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </div>

              {/* Status Label */}
              <div className="flex items-center justify-between">
                <span
                  className="px-2 py-0.5 rounded-[4px]"
                  style={{
                    fontSize: 11, fontWeight: 600,
                    background: rule.enabled ? '#DCFCE7' : '#F3F4F6',
                    color: rule.enabled ? '#16A34A' : '#9CA3AF',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}
                >
                  {rule.enabled ? 'Active' : 'Disabled'}
                </span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>Applied to all units</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Banner */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <p style={{ fontSize: 13, color: '#6B7280' }}>Changes auto-save when you close the editor.</p>
        <button
          className="px-5 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          Publish Changes
        </button>
      </div>
    </div>
  );
}
