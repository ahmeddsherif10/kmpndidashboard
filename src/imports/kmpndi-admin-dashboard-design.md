Design a professional, high-fidelity web admin dashboard called KMPNDI — 
a B2B SaaS platform for managing access control in gated communities in Egypt.

---

PRODUCT CONTEXT

KMPNDI integrates with physical gates, barriers, QR scanners, license plate 
recognition cameras, and NFC readers. It controls entry of residents, vehicles, 
guests, and deliveries inside premium gated compounds.

Users of this panel: Property developers and compound administrators.

---

DESIGN DIRECTION

Style: Enterprise SaaS — refined, data-dense, confident.
References: Stripe Dashboard, Linear, Vercel, Notion, Retool.
Feel: Like a Bloomberg terminal crossed with Apple's design language — 
precise, minimal, powerful.

---

VISUAL SYSTEM

Canvas: Desktop web — 1440px wide layouts.
Grid: 12-column layout with 24px gutters and 64px side padding.
Sidebar: Fixed left navigation, 240px wide, dark (#0F1117) or neutral (#F7F8FA).
Top bar: 64px tall, contains breadcrumb, search, notifications, and user avatar.

Color Palette:
- Background: #F4F5F7 (light) or #0F1117 (dark variant)
- Surface cards: #FFFFFF with 1px border #E5E7EB and shadow: 0 1px 4px rgba(0,0,0,0.06)
- Primary: #1B4FD8 (deep blue) — used for CTAs, active states, badges
- Success: #16A34A
- Warning: #D97706
- Danger: #DC2626
- Text primary: #111827
- Text secondary: #6B7280
- Dividers: #E5E7EB

Typography:
- Headings: "Geist" or "Sora" — weight 600–700
- Body: "DM Sans" or "IBM Plex Sans" — weight 400–500
- Monospace (plate numbers, IDs): "JetBrains Mono"
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 40px

Radius: 10px cards, 6px buttons, 4px inputs
Shadows: Subtle elevation — no harsh shadows
Icons: Lucide or Phosphor icon set (24px, 1.5px stroke)
Spacing: 8px base unit — all spacing multiples of 8

---

NAVIGATION STRUCTURE

Left sidebar sections:
- Logo + compound selector (dropdown) at top
- Overview
- Units & Residents
- Parking Management
- Vehicle Registry
- Access Control
- Visitor Rules
- Hardware
- Reports & Analytics
- Audit Logs
- Settings

Active state: Left blue accent bar + filled icon + bold label
Inactive: Gray icon + regular label

---

SCREENS TO DESIGN

Design each as a full 1440px desktop layout:

1. COMMUNITY DASHBOARD (home)
   - Top KPI row: 4 large stat cards
     • Total Entries Today (number + sparkline)
     • Active Visitors (number + small avatar stack)
     • Parking Occupancy (percentage + donut)
     • Active Alerts (number + red badge)
   - Main area: Entry activity line chart (last 7 days) — full width
   - Bottom row:
     • Recent Activity feed (left, 60%) — plate + unit + time + allow/deny badge
     • System Health panel (right, 40%) — gate status, camera status, barrier status as 
       green/red status dots

2. UNIT MANAGEMENT
   - Full-width data table with sticky header
   - Columns: Unit No. | Building | Floor | Owner Name | Status | Vehicles | Actions
   - Filters row above table: Building dropdown, Floor dropdown, Status pills, Search bar
   - Row actions: View, Edit, Assign Parking
   - Pagination footer
   - Right side panel (slide-in): Unit detail view showing owner info, registered 
     vehicles, and parking slot

3. PARKING MANAGEMENT
   - Top: Zone selector tabs (Zone A, Zone B, Pool, Street)
   - Visual parking grid: numbered spaces rendered as rectangles
     • Green = available
     • Blue = occupied (show unit number on hover)
     • Orange = reserved
     • Gray = disabled
   - Right panel: Parking summary stats + overflow requests list with approve/reject 
     actions

4. VEHICLE REGISTRY
   - Table: Plate | Owner | Unit | Type | Parking | Status | Actions
   - Plate numbers in monospace font with gray pill background
   - Inline search and filter
   - Add Vehicle button opens modal:
     • Plate number input
     • Vehicle type
     • Owner search
     • Parking allocation
     • Submit button

5. ACCESS CONTROL
   - Left: Tree view of Zones → Gates → Access Points
   - Right: Selected gate config panel
     • Gate name and location
     • Access rules (resident / visitor / delivery toggles)
     • Operating hours
     • Linked hardware (camera ID, barrier ID, QR scanner ID) as chips
     • Enable / disable gate toggle

6. VISITOR PASS RULES
   - Card grid layout — one card per rule type
     • Daily visitor limit per unit
     • Max pass duration
     • Overnight visitor policy
     • Delivery window hours
   - Each card: title, current value, edit icon, toggle on/off
   - Banner at top: "Rules apply to all units unless overridden at unit level"

7. HARDWARE CONFIGURATION
   - Table: Device Name | Type | Zone | Gate | Status | Last Ping | Actions
   - Status: Online (green dot), Offline (red dot), Warning (orange dot)
   - Row expand: Shows device details — IP, firmware version, last scan result
   - Add Device button with modal form

8. REPORTS & ANALYTICS
   - Left sidebar sub-nav: Parking Utilization | Access Logs | Over Quota | Disputes
   - Main panel for Parking Utilization:
     • Date range picker
     • Occupancy bar chart by zone
     • Peak hours heatmap (7 days × 24 hours grid)
     • Export CSV button

9. AUDIT LOGS
   - Dense log table: Timestamp | Actor | Action | Entity | Details | Source
   - Timestamp in monospace
   - Action type badges: ALLOW (green), DENY (red), OVERRIDE (orange), CREATE (blue)
   - Advanced filter: date range, actor type, action type
   - Row click expands full log entry in right drawer

---

COMPONENT LIBRARY (design as a separate components page)

Build and document these reusable components:
- KPI Stat Card (with icon, value, label, sparkline, trend indicator)
- Data Table Row (default, hover, selected states)
- Status Badge (allow / deny / pending / expired / warning)
- Form Modal (title, body, cancel/confirm footer)
- Left Nav Item (default, hover, active states)
- Gate Status Widget (device name, type, status dot, last ping)
- Plate Number Chip (monospace, gray background)
- Filter Bar (search + dropdown filters + active filter pills)
- Notification Toast (success / error / info)
- Empty State Illustration placeholder

---

INTERACTION NOTES FOR FIGMA

- Use Auto Layout on all components
- Use Variants for interactive states (default, hover, active, disabled)
- Use Components for repeated elements (nav items, table rows, badges)
- Use Figma Variables for color tokens and spacing
- Link screens together with prototype flows:
  • Sidebar nav → correct screen
  • Table row click → right panel slide-in
  • Add button → modal overlay
  • Hardware row expand → inline detail
- Overlay modals should dim background (40% black overlay)
- Slide-in panels come from the right (320px wide)

---

DELIVERABLE

3 design directions, each as a full Figma page:

Direction 1 — "Minimal Corporate"
Light background (#F4F5F7), white cards, deep blue (#1B4FD8) primary, 
clean and structured, Sora + DM Sans fonts.

Direction 2 — "Smart City Dark"
Dark sidebar (#0F1117) + dark surface cards (#1A1D23), electric blue 
(#3B82F6) accents, subtle grid texture on background, JetBrains Mono 
for data, Geist for headings. Feels like mission control.

Direction 3 — "Premium Enterprise"
Warm off-white (#FAFAF8) background, sage green (#16A34A) primary, 
gold accent (#D97706) for warnings, editorial serif headings (Playfair 
Display) + IBM Plex Sans body. Feels like a Bloomberg terminal with 
luxury hotel aesthetics.

Each direction must cover all 9 screens + component library page.