---
name: Dashboard Purpose & User Roles
description: Core purpose of the KMPNDI dashboard and the two user roles with different access scopes
type: project
---

This dashboard is built for a **residents gated community app**.

## Two User Types

### 1. KMPNDI Staff (us)
- Full access to everything
- Can see all property developers and all their compounds
- Manages the entire platform

### 2. Property / Compound Developers
- Scoped access — can only see their own compounds
- See their own compounds overview, residents, units, access logs, etc.
- Cannot see other developers' data

## Key Implication
Role-Based Access Control (RBAC) is a core requirement:
- The sidebar, overview filters, and all data must respect the logged-in user's role
- Property developers should never see data outside their own compounds
- KMPNDI staff see everything (the "All Compounds" + cross-developer view)

**Why:** Multi-tenant platform — each developer is essentially a separate client managing their gated community, but KMPNDI operates across all of them.
