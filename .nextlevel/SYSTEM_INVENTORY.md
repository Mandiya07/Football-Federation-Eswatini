# SYSTEM INVENTORY & FORENSIC CLASSIFICATION

All system components, routes, data stores, and interfaces audited under Next Level Production Engineering OS v1.0 standards.

## 1. Routes (React Router v7)

| Route | File Path | Functional Status | Evidence Tag | Description & Forensic Notes |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/pages/Home.tsx` | WORKING | VERIFIED | Landing page with hero, live 12/16 major league equity tracker, 2-tier pyramid, 5 pillars teaser, and commercial benefits. |
| `/about` | `src/pages/About.tsx` | WORKING | VERIFIED | Foundational charter, exclusive club membership model, 5 constitutional pillars, and 365-day stadium business hub explanation. |
| `/structure` | `src/pages/Structure.tsx` | WORKING | VERIFIED | Interactive vertical hierarchy tree for FFE governance & member clubs, 5 honorary founders advisory node, independent eligibility committee, 3-tier youth structure. |
| `/leagues` | `src/pages/Leagues.tsx` | WORKING | VERIFIED | Indvundvundvwane Major Football League private co. specifications, 16 club equity model, 5-7 board members, 4 staff, end-of-season fixtures, 5-yr SADC domestic status, women's league. |
| `/membership` | `src/pages/Membership.tsx` | WORKING | VERIFIED | Club sovereignty mandate, union non-membership policy (representation only), Founding 16 rule, 5-step joining process, corporate/land/stadium criteria. |
| `/governance` | `src/pages/Governance.tsx` | WORKING | VERIFIED | Independent Incorruptible Eligibility Committee vetting, anti-nepotism shield, 5 lifetime honorary founders non-voting rule, encrypted whistleblower misconduct modal. |
| `/academy` | `src/pages/Academy.tsx` | WORKING | VERIFIED | 3-tier development (Nursery ages 1-10 co-ed, Academy 11-17 segregated, Senior 18+), women's pro pipeline, coaching licenses (D, C, B, A), referee certifications, club management diploma. |
| `/investment` | `src/pages/Investment.tsx` | WORKING | VERIFIED | Commercial marketplace, equity financing options for clubs, stadium development funding, investment inquiry forms. |
| `/clubs` | `src/pages/Clubs.tsx` | WORKING | VERIFIED | Leaflet interactive map, verified facilities marker clustering, search & filter by name, city, stadium. |
| `/clubs/:id` | `src/pages/ClubProfile.tsx` | WORKING | VERIFIED | Dynamic club profile, stadium verification data, 2026-2030 roadmap, season goals, community initiatives, match form filter with detailed stats accordion, first team roster, verified officials. |
| `/news` | `src/pages/News.tsx` | WORKING | VERIFIED | Federation circulars, commercial sponsorship guidelines, pre-season registration updates, press releases. |
| `/contact` | `src/pages/Contact.tsx` | WORKING | VERIFIED | Federation headquarters, compliance desk, inquiry dispatch forms. |
| `/apply` | `src/pages/Apply.tsx` | WORKING | VERIFIED | 5-step Digital Licensing Engine wizard (Identity, Officials, Corporate, Infrastructure, Review/Declarations) + Application Status Tracker. |
| `/dashboard` | `src/pages/Dashboard.tsx` | WORKING | VERIFIED | Dynamic RBAC router: renders `AdminDashboard` for `admin`/`super_admin`, `ClubDashboard` for `club_admin`/`club`, or `UserDashboard` for general fans. |

---

## 2. Core Dashboard Sub-Views & Workflows

| Component | File Path | Status | Evidence Tag | Audit Findings |
| :--- | :--- | :--- | :--- | :--- |
| `AdminDashboard` | `src/pages/AdminDashboard.tsx` | WORKING | VERIFIED | Real-time fetch of `applications` collection, individual & bulk status transitions ('Under Review', 'Approved', 'Rejected'), confirmation dialog, operational metric cards. |
| `ClubDashboard` | `src/pages/ClubDashboard.tsx` | WORKING | VERIFIED | 7 tabbed views (Overview, Licensing & Compliance, Infrastructure, Financials, Governance Docs, Funding Profile, Activity Logs). Queries club application by `userId`. |
| `UserDashboard` | `src/pages/UserDashboard.tsx` | WORKING | VERIFIED | Supporter fan portal: match tickets, club memberships, merchandise orders, club admin upgrade request CTA. |

---

## 3. Core Constitutional Components & Modals

| Component | File Path | Status | Evidence Tag | Description |
| :--- | :--- | :--- | :--- | :--- |
| `Navbar` | `src/components/Navbar.tsx` | WORKING | VERIFIED | Global responsive navigation, Google Auth popup trigger, user avatar, role badge, sign-out button, mobile drawer menu. |
| `ConstitutionalPillars` | `src/components/ConstitutionalPillars.tsx` | WORKING | VERIFIED | Interactive tabbed explorer for all 5 constitutional articles, verbatim founder text, key structural breakdown points, and sequential navigation. |
| `ui/*` | `src/components/ui/` | WORKING | VERIFIED | Complete Radix UI / Tailwind component suite (Button, Card, Dialog, Badge, Input, Tabs, Progress, Textarea, Label, Table). |

---

## 4. Contexts, Storage & Backend Boundaries

| Module | File Path | Status | Evidence Tag | Audit Findings |
| :--- | :--- | :--- | :--- | :--- |
| `AuthContext` | `src/contexts/AuthContext.tsx` | WORKING | VERIFIED | Manages Firebase Auth user state, listens to `/users/{uid}` via `onSnapshot`, enforces auto-elevation for `siphom.yati@gmail.com` to `super_admin`. |
| `firebase.ts` | `src/lib/firebase.ts` | WORKING | VERIFIED | Initializes Firebase App, Auth (`browserLocalPersistence`), Firestore, and diagnostic connection test `testConnection()`. Handles offline caching. |
| `firestore.rules` | `firestore.rules` | WORKING | VERIFIED | Production security rules: enforces authentication, timestamp checks (`request.time`), field validation, role enforcement (`super_admin`, `admin`, club user permissions). |

---

## 5. Mock vs. Production Data Status

| Data Source | Location | Type | Production Readiness |
| :--- | :--- | :--- | :--- |
| `CLUBS` | `src/data/clubs.ts` | Static Verified Catalog | Production Baseline (16 elite clubs with geographic coordinates, stadium metrics, verified capacity). |
| `applications` | Firestore `/applications` | Live Persistent Collection | Production Active (stores club licensing submissions, lifecycle statuses, user IDs, timestamps). |
| `users` | Firestore `/users` | Live Persistent Collection | Production Active (stores user identity, role, timestamps). |
