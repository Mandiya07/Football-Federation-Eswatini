# SECURITY & AUDIT STATUS

## Authentication Model
- **Provider**: Firebase Authentication (Google OAuth provider).
- **Session**: Client-persisted token state via Firebase Web SDK.
- **Vercel / External Domain Whitelist**: Requires `authDomain` and authorized domains configured in the Firebase Console (e.g. `football-federation-eswatini.firebaseapp.com`, `ais-dev-*.run.app`, and custom Vercel domains).

## Security Rules
- Target: `/firestore.rules` (Security Rules Version 2).
- Default stance: `match /{document=**} { allow read, write: if false; }`.
- Collections governed:
  - `/users/{userId}`: Strict owner read, validated schema writes, role escalation protection.
  - `/applications/{applicationId}`: Owner and Admin read/list, status lockdown, rate/field constraints.
