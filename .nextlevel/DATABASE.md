# DATABASE ARCHITECTURE & SCHEMAS

## 1. Engine & Topology
- **Database Engine**: Google Cloud Firestore (Document NoSQL).
- **Security Boundary**: `firestore.rules` enforced natively at the Google Cloud data tier.
- **Blueprint Mapping**: `firebase-blueprint.json`.
- **Indexing & Queries**: Default single-field indexes active; compound queries filtered by `userId` and `createdAt`.

---

## 2. Authoritative Firestore Collections

### Collection: `users`
- **Path**: `/users/{userId}`
- **Document ID**: Matches Firebase Auth UID (`request.auth.uid`).
- **Read Permissions**: Authenticated user matching document UID (`request.auth.uid == userId`) or admin/super_admin.
- **Write Permissions**: Authenticated user can create self with `role: 'user'` or `super_admin` (if `email == 'siphom.yati@gmail.com'`). Admin can elevate roles.
- **Schema**:
  | Field | Type | Required | Constraints | Description |
  |---|---|---|---|---|
  | `email` | string | Yes | max 200 chars, valid email format | User's authenticated email address |
  | `role` | string | Yes | `super_admin` \| `admin` \| `club_admin` \| `user` | System authorization role |
  | `name` | string | No | max 100 chars | Display name / contact person |
  | `createdAt` | timestamp | Yes | `request.time` on create | UTC timestamp of document creation |
  | `updatedAt` | timestamp | Yes | `request.time` on write | UTC timestamp of last document modification |

---

### Collection: `applications`
- **Path**: `/applications/{applicationId}`
- **Document ID**: Auto-generated or alphanumeric string (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
- **Read Permissions**: Document owner (`resource.data.userId == request.auth.uid`) or admin/super_admin.
- **List Permissions**: Restricted to admin and super_admin.
- **Create Permissions**: Authenticated user; status must be `'Pending'`; `userId` must match `request.auth.uid`.
- **Update Permissions**: Admin can update status and metadata; applicant can update basic profile while pending.
- **Schema**:
  | Field | Type | Required | Constraints | Description |
  |---|---|---|---|---|
  | `clubName` | string | Yes | max 200 chars | Official registered name of the football club |
  | `status` | string | Yes | `'Pending'` \| `'Under Review'` \| `'Approved'` \| `'Rejected'` | State-machine status of the licensing application |
  | `userId` | string | Yes | matches `auth.uid` | Submitting applicant's user identifier |
  | `applicantEmail` | string | Yes | valid email format | Submitting applicant's contact email |
  | `city` | string | No | max 100 chars | Club headquarters / municipality (e.g., Mbabane, Manzini) |
  | `stadiumName` | string | No | max 150 chars | Nominated home venue |
  | `stadiumOwnership`| string | No | `'Owned'` \| `'Leased'` \| `'Municipal'` | Facility tenancy structure |
  | `registrationNumber` | string | No | max 50 chars | Registrar of Companies registration number |
  | `infrastructureDetails` | map | No | key-value object | Floodlights, academy facilities, medical bay data |
  | `declarations` | map | No | key-value booleans | Adherence to FFE Constitution & anti-doping |
  | `createdAt` | timestamp | Yes | `request.time` on create | UTC timestamp of submission |
  | `updatedAt` | timestamp | Yes | `request.time` on write | UTC timestamp of last status or data update |

---

### Collection: `whistleblower_reports` (Integrity & Vetting)
- **Path**: `/whistleblower_reports/{reportId}`
- **Document ID**: Auto-generated string.
- **Read Permissions**: Restricted to super_admin and Independent Eligibility Committee.
- **Create Permissions**: Anonymous or authenticated submissions allowed.
- **Schema**:
  | Field | Type | Required | Constraints | Description |
  |---|---|---|---|---|
  | `reportType` | string | Yes | `'Nepotism'` \| `'Corruption'` \| `'MatchFixing'` \| `'General'` | Category of alleged misconduct |
  | `subjectName` | string | No | max 150 chars | Person or committee involved |
  | `details` | string | Yes | encrypted or plain text (max 5000 chars) | Narrative of incident |
  | `evidenceUrls` | array | No | array of strings | Document or screenshot attachments |
  | `status` | string | Yes | `'Received'` \| `'Under Investigation'` \| `'Resolved'` | Integrity case status |
  | `createdAt` | timestamp | Yes | server timestamp | UTC timestamp of report |

---

### Collection: `test` (Diagnostic Probe)
- **Path**: `/test/connection`
- **Purpose**: Health-check ping document verifying Firestore connectivity without loading production collections.

---

## 3. Static Catalogs & In-Memory Domain Data

### Catalog: `CLUBS` (`src/data/clubs.ts`)
- Contains the 16 primary Eswatini football clubs (Premier and First Division).
- Schema:
  - `id`: Unique slug (`mbabane-swallows`, `manzini-wanderers`, etc.).
  - `name`: Full club title.
  - `shortName`: Abbreviated title.
  - `tier`: `'Premier League'` | `'First Division'`.
  - `location`: Town/City name.
  - `stadium`: Home venue name.
  - `capacity`: Venue spectator capacity.
  - `founded`: Founding year.
  - `colors`: Primary club color scheme.
  - `badge`: Representative logo/insignia.
  - `coordinates`: Geographic `[latitude, longitude]` pair for Leaflet GIS plotting.
  - `trophies`: Historical achievements breakdown.
  - `bio`: Club history, community footprint, and leadership summary.
