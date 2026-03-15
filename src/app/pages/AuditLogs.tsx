import { useState } from 'react';
import { Search, ChevronDown, X, Filter } from 'lucide-react';

type ActionType = 'ALLOW' | 'DENY' | 'OVERRIDE' | 'CREATE' | 'UPDATE' | 'DELETE';

interface LogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'System' | 'Admin' | 'Resident' | 'Guard';
  action: ActionType;
  entity: string;
  details: string;
  source: string;
}

const LOGS: LogEntry[] = [
  { id: 'LOG-0921', timestamp: '2026-03-07 09:54:32', actor: 'LPR System', actorType: 'System', action: 'ALLOW', entity: 'Vehicle QAB-2841', details: 'Resident vehicle — Unit A-101 — Main Gate', source: 'LPR Camera CAM-001' },
  { id: 'LOG-0920', timestamp: '2026-03-07 09:51:18', actor: 'QR Scanner', actorType: 'System', action: 'ALLOW', entity: 'Visitor Pass VIS-0921', details: 'Guest of Unit C-302 — Duration 4h', source: 'QR Scanner QRS-001' },
  { id: 'LOG-0919', timestamp: '2026-03-07 09:49:55', actor: 'LPR System', actorType: 'System', action: 'ALLOW', entity: 'Vehicle HMN-5503', details: 'Delivery — Madar Express — Side Gate', source: 'LPR Camera CAM-005' },
  { id: 'LOG-0918', timestamp: '2026-03-07 09:46:41', actor: 'LPR System', actorType: 'System', action: 'DENY', entity: 'Vehicle XPT-1190', details: 'Unregistered vehicle — No match in registry', source: 'LPR Camera CAM-001' },
  { id: 'LOG-0917', timestamp: '2026-03-07 09:43:12', actor: 'Ahmed Hassan', actorType: 'Admin', action: 'OVERRIDE', entity: 'Vehicle XPT-1190', details: 'Manual override — Temporary visitor approval', source: 'Admin Panel' },
  { id: 'LOG-0916', timestamp: '2026-03-07 09:40:09', actor: 'Ahmed Hassan', actorType: 'Admin', action: 'CREATE', entity: 'Vehicle MNR-7721', details: 'New vehicle registered — Unit D-410 — Owner: Mona Fathi', source: 'Admin Panel' },
  { id: 'LOG-0915', timestamp: '2026-03-07 09:35:22', actor: 'LPR System', actorType: 'System', action: 'ALLOW', entity: 'Vehicle BNQ-4471', details: 'Resident vehicle — Unit E-501', source: 'LPR Camera CAM-001' },
  { id: 'LOG-0914', timestamp: '2026-03-07 09:30:44', actor: 'Ahmed Hassan', actorType: 'Admin', action: 'UPDATE', entity: 'Gate: Side Gate A', details: 'Visitor access disabled — Operating hours updated 07:00–22:00', source: 'Admin Panel' },
  { id: 'LOG-0913', timestamp: '2026-03-07 09:28:11', actor: 'NFC Reader', actorType: 'System', action: 'ALLOW', entity: 'Resident Tag NFC-7721', details: 'Resident: Omar Al-Rashidi — Unit A-101', source: 'NFC Reader NFC-002' },
  { id: 'LOG-0912', timestamp: '2026-03-07 09:22:05', actor: 'LPR System', actorType: 'System', action: 'DENY', entity: 'Vehicle TYU-6654', details: 'Vehicle on suspension list — Unit D-401 suspended', source: 'LPR Camera CAM-001' },
  { id: 'LOG-0911', timestamp: '2026-03-07 09:18:33', actor: 'Ahmed Hassan', actorType: 'Admin', action: 'CREATE', entity: 'Visitor Rule: Daily Limit', details: 'Changed from 3 to 5 visitors per unit per day', source: 'Admin Panel' },
  { id: 'LOG-0910', timestamp: '2026-03-07 09:12:49', actor: 'System Monitor', actorType: 'System', action: 'DENY', entity: 'Device CAM-006', details: 'Service Gate Camera went offline — Alert generated', source: 'Health Monitor' },
];

const ACTION_CONFIG: Record<ActionType, { bg: string; color: string }> = {
  ALLOW: { bg: '#DCFCE7', color: '#16A34A' },
  DENY: { bg: '#FEE2E2', color: '#DC2626' },
  OVERRIDE: { bg: '#FEF3C7', color: '#D97706' },
  CREATE: { bg: '#DBEAFE', color: '#1B4FD8' },
  UPDATE: { bg: '#EDE9FE', color: '#7C3AED' },
  DELETE: { bg: '#FFE4E6', color: '#BE123C' },
};

export function AuditLogs() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [actorFilter, setActorFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const filtered = LOGS.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.actor.toLowerCase().includes(q) || l.entity.toLowerCase().includes(q) || l.details.toLowerCase().includes(q);
    const matchAction = actionFilter === 'All' || l.action === actionFilter;
    const matchActor = actorFilter === 'All' || l.actorType === actorFilter;
    return matchSearch && matchAction && matchActor;
  });

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>Audit Logs</h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{LOGS.length} log entries today — Palm Hills Katameya</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="flex items-center gap-3 flex-wrap p-4 rounded-[10px] mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-1.5" style={{ color: '#6B7280' }}>
          <Filter size={14} strokeWidth={1.5} />
          <span style={{ fontSize: 12, fontWeight: 500 }}>Filters</span>
        </div>
        <div
          className="flex items-center gap-2 rounded-[6px] px-3"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36, minWidth: 260 }}
        >
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actor, entity, or details…"
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>

        {/* Action Filter */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>Action:</span>
          <div className="flex items-center gap-1">
            {(['All', 'ALLOW', 'DENY', 'OVERRIDE', 'CREATE', 'UPDATE'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setActionFilter(a)}
                className="px-2.5 py-1 rounded-[4px] transition-all"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: actionFilter === a ? (a === 'All' ? '#1B4FD8' : ACTION_CONFIG[a as ActionType]?.bg ?? '#EEF2FF') : '#F4F5F7',
                  color: actionFilter === a ? (a === 'All' ? '#FFFFFF' : ACTION_CONFIG[a as ActionType]?.color ?? '#1B4FD8') : '#6B7280',
                  border: '1px solid',
                  borderColor: actionFilter === a ? (a === 'All' ? '#1B4FD8' : ACTION_CONFIG[a as ActionType]?.color ?? '#1B4FD8') + '40' : '#E5E7EB',
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Actor Type */}
        <div className="relative ml-auto">
          <select
            value={actorFilter}
            onChange={(e) => setActorFilter(e.target.value)}
            className="appearance-none rounded-[6px] px-3 pr-8 outline-none cursor-pointer"
            style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 34, fontSize: 13, color: '#374151' }}
          >
            <option>All</option>
            {['System', 'Admin', 'Resident', 'Guard'].map((t) => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown size={12} color="#9CA3AF" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Log Table */}
      <div
        className="rounded-[10px] overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
              {['Timestamp', 'Actor', 'Action', 'Entity', 'Details', 'Source'].map((h) => (
                <th key={h} className="text-left px-4 py-3" style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const ac = ACTION_CONFIG[log.action];
              return (
                <tr
                  key={log.id}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none' }}
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="px-4 py-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6B7280', whiteSpace: 'nowrap' }}>
                      {log.timestamp}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{log.actor}</p>
                      <span
                        className="px-1.5 py-0.5 rounded-[3px]"
                        style={{ fontSize: 10, fontWeight: 500, background: '#F3F4F6', color: '#6B7280' }}
                      >
                        {log.actorType}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-[4px]"
                      style={{ fontSize: 11, fontWeight: 700, background: ac.bg, color: ac.color, letterSpacing: '0.04em' }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: 13, color: '#374151', fontWeight: 500, maxWidth: 160 }}>
                    <span className="line-clamp-1">{log.entity}</span>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: 12, color: '#6B7280', maxWidth: 240 }}>
                    <span className="line-clamp-2">{log.details}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#9CA3AF' }}>{log.source}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p style={{ fontSize: 14, color: '#6B7280' }}>No log entries match your filters.</p>
          </div>
        )}
      </div>

      {/* Log Detail Drawer */}
      {selectedLog && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.2)' }} onClick={() => setSelectedLog(null)} />
          <div
            className="fixed right-0 top-0 h-full z-50 overflow-y-auto"
            style={{ width: 380, background: '#FFFFFF', borderLeft: '1px solid #E5E7EB', boxShadow: '-4px 0 24px rgba(0,0,0,0.08)' }}
          >
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827' }}>Log Entry</h2>
              <button onClick={() => setSelectedLog(null)} className="p-1.5 rounded-[4px] hover:bg-gray-100">
                <X size={16} color="#6B7280" strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-5">
              {/* Action Badge */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="px-3 py-1.5 rounded-[6px]"
                  style={{
                    fontSize: 14, fontWeight: 700,
                    background: ACTION_CONFIG[selectedLog.action].bg,
                    color: ACTION_CONFIG[selectedLog.action].color,
                    letterSpacing: '0.06em',
                  }}
                >
                  {selectedLog.action}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#9CA3AF' }}>{selectedLog.id}</span>
              </div>

              {[
                { label: 'Timestamp', value: selectedLog.timestamp, mono: true },
                { label: 'Actor', value: selectedLog.actor },
                { label: 'Actor Type', value: selectedLog.actorType },
                { label: 'Entity', value: selectedLog.entity },
                { label: 'Source', value: selectedLog.source, mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label} className="py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 13, color: '#111827', fontFamily: mono ? "'JetBrains Mono', monospace" : undefined, fontWeight: 500 }}>{value}</p>
                </div>
              ))}
              <div className="py-3">
                <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Details</p>
                <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{selectedLog.details}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
