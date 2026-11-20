# SYSTEM ARCHITECTURE & DOMAIN MODEL

## 1. Architectural Paradigm & Topology
- **Topology**: Client-authoritative Single Page Application (SPA) interfacing directly with Google Cloud Managed Services (Firebase Authentication and Cloud Firestore).
- **Frontend Core**: React 19.0.0, TypeScript ~5.8.2, Vite 6.2.0.
- **Styling Architecture**: Tailwind CSS v4 with `@tailwindcss/vite` plugin, customized through theme utility tokens and Lucide React iconography.
- **Client Routing**: `react-router-dom` v7 with declarative route hierarchy, layout encapsulation, and role-guarded view rendering.
- **Geographic Information System (GIS)**: Leaflet 1.9.4 & React-Leaflet 5.0.0 utilizing OpenStreetMap tiles with custom SVG football markers for Eswatini regional club plotting.
- **Data & Auth Integration**: Firebase 12.13.0 modular client SDK (`firebase/app`, `firebase/auth`, `firebase/firestore`).

---

## 2. Layered Architectural Decomposition

```
+-----------------------------------------------------------------------------------+
|                           CLIENT PRESENTATION LAYER                               |
|   +-------------------+  +--------------------+  +----------------------------+   |
|   | Public Navigation |  | Public Showcase    |  | Protected Dashboards       |   |
|   | Navbar, Footer,   |  | Home, About, News, |  | AdminDashboard (RBAC)      |   |
|   | Constitutional    |  | Structure, Leagues,|  | ClubDashboard (Club admin) |   |
|   | Pillars Component |  | Academy, Contact   |  | UserDashboard (Citizen)    |   |
|   +-------------------+  +--------------------+  +----------------------------+   |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
|                               ROUTING LAYER (React Router v7)                     |
|   / (Home)  /about  /structure  /leagues  /membership  /governance  /academy      |
|   /investment  /clubs  /club/:id  /news  /contact  /apply  /dashboard             |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
|                      AUTHENTICATION & AMBIENT CONTEXT LAYER                       |
|   AuthContext: `useAuthState(auth)` -> Reactive Firestore Snapshot Listener       |
|   Role Resolution: /users/{uid} -> role ('super_admin'|'admin'|'club_admin'|'user')|
|   Super Admin Hardcoded Bootstrap: 'siphom.yati@gmail.com' -> 'super_admin'      |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
|                         APPLICATION DOMAIN & SERVICE LAYER                        |
|   +------------------------+  +----------------------+  +---------------------+   |
|   | Club Licensing Service |  | Integrity & Ethics   |  | GIS & Spatial Map   |   |
|   | 4-Stage Application    |  | Independent Vetting  |  | 16 Eswatini Clubs   |   |
|   | Workflow & Validation  |  | Whistleblower Intake |  | Geocoded Leaflet UI |   |
|   +------------------------+  +----------------------+  +---------------------+   |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
|                     AUTHORITATIVE SECURITY & DATA BOUNDARY                        |
|                               (Cloud Firestore)                                   |
|   Security Rules (`firestore.rules`): Server-timestamp & RBAC schema enforcement   |
|   Collections: /users/{userId}, /applications/{applicationId}, /test/connection   |
+-----------------------------------------------------------------------------------+
```

---

## 3. Domain Model & Constitutional Invariants

The Football Federation Eswatini (FFE) domain model is bound by the **5 Constitutional Pillars** established by its founders:

### Article I: Exclusive Club Federation
- **Federation Membership Model**: The FFE is exclusively constituted of affiliated football clubs.
- **Associate Non-Membership**: Referees, coaches, players' unions, supporters' associations, and regional bodies may organize representations to the FFE, but hold **zero** direct federation voting membership.

### Article II: Lifetime Honorary Founders & Voting Franchise
- **Founders**: Five (5) lifetime honorary founders who deliberate and advise at general conferences.
- **Inviolable Voting Invariant**: Founders **SHALL NOT VOTE**. Voting franchise is strictly limited to accredited football clubs on a "one club, one vote" basis.

### Article III: Independent Incorruptible Eligibility Committee
- **Integrity Boundary**: An autonomous vetting body established by the founders operates outside executive authority.
- **Scope**: Every candidate for federation elections (including Presidential candidates), committee appointees, and federation staff must pass mandatory background and anti-nepotism eligibility vetting.

### Article IV: Indvundvundvwane Major Football League Eswatini
- **Corporate Independence**: A private company owned 100% by the 16 participating clubs as shareholders.
- **Share Transfer Protocol**: Relegation immediately transfers the company share to the newly promoted club.
- **Governance**: Governed by 5–7 elected board members; operated daily by an Executive Officer, Accountant, Office Secretary, and Messenger.
- **Fixture Certainty**: Complete upcoming season fixtures must be published at the end of the current season (not pre-season) to facilitate pre-season training.
- **Regional Integration Protocol**: 5-year foreign quota exemption for players from Mozambique, South Africa, Lesotho, Namibia, Botswana, and Zimbabwe (treated as local players via government work permits) to accelerate professionalization; progressive transition toward quota over 10-year horizon.
- **Jurisdictional Sovereignty**: Operates independently outside FIFA constraints with no national team obligations.

### Article V: Three-Tier Development Structure & Women's Football
- **Nursery Tier**:
  - Ages 1–2: Co-ed free play and ball familiarization on Saturday mornings.
  - Ages 3–10: Co-ed structured developmental coaching.
- **Academy Tier**:
  - Ages 11–17: Segregated Boys' Academy and Girls' Academy for prime technical and tactical grooming.
- **Senior Tier**:
  - Age 18+: Professional senior Men's and Women's teams, supported by the dedicated Women's Football League.

---

## 4. Critical Data & Execution Paths

### Path 1: Authentication & Role Synchronization
1. User clicks **"Sign In with Google"** on Navbar or Auth modal.
2. Direct Firebase Auth popup resolves Google credential.
3. `AuthContext.tsx` detects `user` via `useAuthState(auth)`.
4. Reactive snapshot listener attaches to `/users/{uid}` in Firestore.
5. If user document exists:
   - Evaluates `email === 'siphom.yati@gmail.com'`. If role is not `super_admin`, updates Firestore document with `{ role: 'super_admin' }`.
   - Populates state with `role`.
6. If user document is missing:
   - Creates document with `{ email, role: isSuperAdmin ? 'super_admin' : 'user', createdAt, updatedAt }`.

### Path 2: Club Licensing Application Lifecycle
1. User navigates to `/apply`.
2. Wizard captures: Club Details, Infrastructure & Stadium Ownership, Financial Declarations, Constitution Compliance Check.
3. Client dispatches `addDoc(collection(db, 'applications'), ...)` with `status: 'Pending'`.
4. Firestore Security Rules enforce:
   - Valid user session matching `userId`.
   - Mandatory attributes (`clubName`, `status == 'Pending'`, `createdAt == request.time`).
5. Admin navigates to `/dashboard` -> `AdminDashboard.tsx`.
6. Admin queries `applications` collection and renders candidate submissions.
7. Admin mutates application state: `Pending` -> `Under Review` -> `Approved` | `Rejected`.

### Path 3: Spatial Map & Club Discovery
1. User navigates to `/clubs` or `/club/:id`.
2. Application loads static, immutable club registry (`src/data/clubs.ts`) representing the 16 founding and premier clubs across Hhohho, Manzini, Lubombo, and Shiselweni.
3. React-Leaflet initializes map centered at `[-26.5, 31.4]` (Eswatini geographic center).
4. Custom SVG football icon pins are projected onto coordinates with interactive popups and links to full club dossiers.

---

## 5. Failure Architecture & Graceful Degradation
- **Firestore Offline Handling**: When Cloud Firestore is in cold-start or unprovisioned state, `src/lib/firebase.ts` runs a non-blocking timeout check (`testConnection`), emitting scannable console diagnostics without unmounting or crashing the React application tree.
- **Session Failure Recovery**: In the event of network drop during OAuth or token expiry, `AuthContext` preserves existing state until reconnect and prevents infinite reload loops.
- **Static Domain Fallback**: Core club directories, fixtures, leagues, rules, and constitutional charters are statically pre-bundled in TypeScript modules to guarantee 100% uptime even during database outages.
