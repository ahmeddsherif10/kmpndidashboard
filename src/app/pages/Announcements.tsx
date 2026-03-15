import { useState } from 'react';
import { Megaphone, Plus, Search, Send, X, Calendar, Users, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: 'info' | 'important' | 'urgent';
  targetAudience: string;
  compounds: string[];
  createdBy: string;
  createdAt: string;
  scheduledFor: string | null;
  status: 'draft' | 'scheduled' | 'sent';
  recipientCount: number;
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'A001',
    title: 'Scheduled Maintenance - Water System',
    message: 'We will be conducting routine maintenance on the water system on Sunday, March 20th from 9 AM to 2 PM. Please ensure you have adequate water stored.',
    priority: 'important',
    targetAudience: 'All Residents',
    compounds: ['Palm Hills Katameya', 'Palm Hills October'],
    createdBy: 'Ahmed Hassan',
    createdAt: '2024-03-15 10:30 AM',
    scheduledFor: '2024-03-18 08:00 AM',
    status: 'scheduled',
    recipientCount: 1240,
  },
  {
    id: 'A002',
    title: 'Emergency: Gate 3 Temporarily Closed',
    message: 'Gate 3 is temporarily closed due to technical issues. Please use Gate 1 or Gate 2. We apologize for any inconvenience.',
    priority: 'urgent',
    targetAudience: 'All Residents',
    compounds: ['Palm Hills Katameya'],
    createdBy: 'Sarah Mohamed',
    createdAt: '2024-03-14 02:15 PM',
    scheduledFor: null,
    status: 'sent',
    recipientCount: 650,
  },
  {
    id: 'A003',
    title: 'Community Event - Spring Festival',
    message: 'Join us for our annual Spring Festival on Saturday, March 25th at the Community Center. Family-friendly activities, food, and entertainment!',
    priority: 'info',
    targetAudience: 'All Residents',
    compounds: ['All Compounds'],
    createdBy: 'Omar Ibrahim',
    createdAt: '2024-03-12 11:00 AM',
    scheduledFor: null,
    status: 'sent',
    recipientCount: 2840,
  },
  {
    id: 'A004',
    title: 'Parking Policy Update',
    message: 'Starting April 1st, visitor parking will be limited to 4 hours. Please inform your guests accordingly.',
    priority: 'important',
    targetAudience: 'All Residents',
    compounds: ['Sodic West', 'Sodic East'],
    createdBy: 'Ahmed Hassan',
    createdAt: '2024-03-10 09:45 AM',
    scheduledFor: null,
    status: 'sent',
    recipientCount: 1890,
  },
];

const PRIORITY_CONFIG = {
  info: { bg: '#EEF2FF', color: '#4F46E5', label: 'Info', icon: Info },
  important: { bg: '#FEF3C7', color: '#D97706', label: 'Important', icon: AlertCircle },
  urgent: { bg: '#FEE2E2', color: '#DC2626', label: 'Urgent', icon: AlertTriangle },
};

const STATUS_CONFIG = {
  draft: { bg: '#F3F4F6', color: '#6B7280', label: 'Draft' },
  scheduled: { bg: '#DBEAFE', color: '#2563EB', label: 'Scheduled' },
  sent: { bg: '#DCFCE7', color: '#16A34A', label: 'Sent' },
};

export function Announcements() {
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const filtered = announcements.filter((a) => {
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter.toLowerCase();
    const matchPriority = priorityFilter === 'All' || a.priority === priorityFilter.toLowerCase();
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="p-6 max-w-[1376px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#111827' }}>
            Announcements
          </h1>
          <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
            {announcements.length} total announcements · {announcements.filter(a => a.status === 'sent').length} sent
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#1B4FD8', fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={16} strokeWidth={2} />
          Create Announcement
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Sent', value: announcements.filter(a => a.status === 'sent').length, color: '#10B981', bg: '#DCFCE7' },
          { label: 'Scheduled', value: announcements.filter(a => a.status === 'scheduled').length, color: '#2563EB', bg: '#DBEAFE' },
          { label: 'Drafts', value: announcements.filter(a => a.status === 'draft').length, color: '#6B7280', bg: '#F3F4F6' },
          { label: 'Total Recipients', value: '6.6K', color: '#8B5CF6', bg: '#F3E8FF' },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            className="p-4 rounded-[10px]"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', fontFamily: "'Sora', sans-serif", marginBottom: 4 }}>
              {value}
            </p>
            <p style={{ fontSize: 12, color: '#6B7280' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div
        className="flex items-center gap-3 p-4 rounded-[10px] mb-4"
        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div
          className="flex items-center gap-2 flex-1 max-w-[300px] rounded-[6px] px-3"
          style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', height: 36 }}
        >
          <Search size={14} color="#9CA3AF" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#374151' }}
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Sent', 'Scheduled', 'Draft'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1 rounded-full transition-all"
              style={{
                fontSize: 12,
                fontWeight: 500,
                background: statusFilter === s ? '#1B4FD8' : '#F4F5F7',
                color: statusFilter === s ? '#FFFFFF' : '#6B7280',
                border: '1px solid',
                borderColor: statusFilter === s ? '#1B4FD8' : '#E5E7EB',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-2">
          {['All', 'Info', 'Important', 'Urgent'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className="px-3 py-1 rounded-full transition-all"
              style={{
                fontSize: 12,
                fontWeight: 500,
                background: priorityFilter === p ? '#1B4FD8' : '#F4F5F7',
                color: priorityFilter === p ? '#FFFFFF' : '#6B7280',
                border: '1px solid',
                borderColor: priorityFilter === p ? '#1B4FD8' : '#E5E7EB',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {filtered.map((announcement) => {
          const priorityConfig = PRIORITY_CONFIG[announcement.priority];
          const statusConfig = STATUS_CONFIG[announcement.status];
          const PriorityIcon = priorityConfig.icon;

          return (
            <div
              key={announcement.id}
              className="rounded-[10px] p-5 cursor-pointer hover:shadow-md transition-all"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              onClick={() => setSelectedAnnouncement(announcement)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                      {announcement.title}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-[4px] flex items-center gap-1"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: priorityConfig.bg,
                        color: priorityConfig.color,
                        textTransform: 'uppercase',
                      }}
                    >
                      <PriorityIcon size={12} strokeWidth={2} />
                      {priorityConfig.label}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-[4px]"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: statusConfig.bg,
                        color: statusConfig.color,
                        textTransform: 'uppercase',
                      }}
                    >
                      {statusConfig.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 12, lineHeight: 1.6 }}>
                    {announcement.message.length > 150
                      ? `${announcement.message.substring(0, 150)}...`
                      : announcement.message}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} color="#6B7280" strokeWidth={1.5} />
                      <span style={{ fontSize: 12, color: '#6B7280' }}>
                        {announcement.recipientCount} recipients
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} color="#6B7280" strokeWidth={1.5} />
                      <span style={{ fontSize: 12, color: '#6B7280' }}>
                        {announcement.scheduledFor || announcement.createdAt}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                      By {announcement.createdBy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[8px]" style={{ background: '#EEF2FF' }}>
                  <Megaphone size={20} color="#1B4FD8" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                  Create New Announcement
                </h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Announcement Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Scheduled Maintenance Notice"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Message *
                  </label>
                  <textarea
                    placeholder="Type your announcement message here..."
                    rows={5}
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                    Keep it clear and concise. Residents will see this on their mobile app.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                      Priority Level *
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                    >
                      <option value="info">Info</option>
                      <option value="important">Important</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                      Target Audience *
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                    >
                      <option>All Residents</option>
                      <option>Specific Compounds</option>
                      <option>Specific Units</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Select Compounds *
                  </label>
                  <select
                    multiple
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827', minHeight: 100 }}
                  >
                    <option>Palm Hills Katameya</option>
                    <option>Palm Hills October</option>
                    <option>Sodic West</option>
                    <option>Sodic East</option>
                    <option>Hyde Park</option>
                    <option>Hyde Park New Cairo</option>
                  </select>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                    Hold Ctrl/Cmd to select multiple compounds
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Schedule For (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 rounded-[6px] outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F4F5F7', border: '1px solid #E5E7EB', fontSize: 14, color: '#111827' }}
                  />
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                    Leave empty to send immediately
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Save as Draft
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                  style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Announcement sent successfully! Residents will receive a push notification.');
                    setShowCreateModal(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-[8px] transition-colors hover:opacity-90"
                  style={{ background: '#10B981', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
                >
                  <Send size={16} strokeWidth={2} />
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="rounded-[12px] w-full max-w-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, color: '#111827' }}>
                Announcement Details
              </h2>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1 rounded-[6px] hover:bg-gray-100 transition-colors"
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-2 py-0.5 rounded-[4px]"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: PRIORITY_CONFIG[selectedAnnouncement.priority].bg,
                        color: PRIORITY_CONFIG[selectedAnnouncement.priority].color,
                        textTransform: 'uppercase',
                      }}
                    >
                      {PRIORITY_CONFIG[selectedAnnouncement.priority].label}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-[4px]"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: STATUS_CONFIG[selectedAnnouncement.status].bg,
                        color: STATUS_CONFIG[selectedAnnouncement.status].color,
                        textTransform: 'uppercase',
                      }}
                    >
                      {STATUS_CONFIG[selectedAnnouncement.status].label}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginBottom: 8 }}>
                    {selectedAnnouncement.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
                    {selectedAnnouncement.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>CREATED BY</p>
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{selectedAnnouncement.createdBy}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>CREATED AT</p>
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{selectedAnnouncement.createdAt}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>RECIPIENTS</p>
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{selectedAnnouncement.recipientCount}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>COMPOUNDS</p>
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>
                      {selectedAnnouncement.compounds.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 rounded-[8px] transition-colors hover:bg-gray-100"
                style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
