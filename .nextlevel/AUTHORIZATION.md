# AUTHORIZATION & RBAC MATRIX

## 1. Identity Verification Model
- **Authentication Provider**: Google OAuth via Firebase Authentication.
- **Session Boundary**: Client-side tokens verified automatically against Google Auth infrastructure; security rules execute server-side verification using `request.auth`.
- **Identity Invariant**: `request.auth != null` establishes authenticated identity; `request.auth.uid` is the immutable primary subject identifier.

---

## 2. Role Hierarchy & Authority Boundaries

| Role | Hierarchy Level | Capabilities & Access Scope | Assignment Protocol |
|---|---|---|---|
| `super_admin` | 4 (Highest) | Unrestricted system oversight, application approvals/rejections, role elevation of other users, whistleblower investigation, emergency broadcast. | Hardcoded bootstrap for `siphom.yati@gmail.com` via `firestore.rules` and `AuthContext.tsx`. |
| `admin` | 3 | Access to `AdminDashboard`, licensing application review, club directory audit, committee oversight. | Explicitly assigned by `super_admin`. |
| `club_admin` | 2 | Access to `ClubDashboard`, club infrastructure management, player registration submission, compliance checklists. | Assigned upon verification of club ownership / application approval. |
| `user` | 1 | Access to `UserDashboard`, match ticket viewing, club application submission (`/apply`), newsletter subscriptions. | Default role assigned to all newly registered users. |
| `anonymous` | 0 | Public access to informational pages, leagues, standings, fixtures, GIS map, constitutional pillars, and contact forms. | Unauthenticated visitors. |

---

## 3. Enforcement Mechanisms & Rule Mapping

### Client-Side Guarding (`src/App.tsx` & Dashboard Views)
- Conditional view rendering based on `role`:
  - `role === 'super_admin' || role === 'admin'` -> Renders `AdminDashboard.tsx`.
  - `role === 'club_admin'` -> Renders `ClubDashboard.tsx`.
  - `role === 'user'` -> Renders `UserDashboard.tsx`.
  - Unauthenticated users -> Redirects to sign-in modal with explanatory callout.

### Server-Side Data Guarding (`firestore.rules`)
- **Self-Creation Rule**:
  ```cel
  allow create: if isSignedIn() &&
                request.auth.uid == userId &&
                isValidUser(incoming()) &&
                (incoming().role == 'user' || isAdmin() || request.auth.token.email == 'siphom.yati@gmail.com');
  ```
- **Self-Elevation Prevention**: Standard users cannot modify their own `role` field; updates are strictly restricted to `{ name, updatedAt }`.
- **Licensing Access Isolation**:
  ```cel
  allow read: if isSignedIn() && (resource.data.userId == request.auth.uid || isAdmin());
  allow list: if isAdmin();
  ```
  Standard users may only query their own application document; full application queues can only be listed by administrative roles.

---

## 4. Constitutional Integrity & Anti-Nepotism Protections
- **Founder Separation**: Founders retain lifetime honorary presence to deliberate at general conferences, but are constitutionally barred from voting franchise.
- **Independent Vetting Barrier**: Any user seeking committee or executive appointment must be cleared through the independent Eligibility Committee protocol prior to role elevation in the database.
