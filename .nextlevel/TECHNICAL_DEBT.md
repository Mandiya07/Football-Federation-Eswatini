# TECHNICAL DEBT REGISTRY

Audit completed during Phase 1 Forensic Inspection under Next Level Production Engineering OS v1.0.

## High-Priority Items
1. **Automated Test Suite Absence**:
   - *Status*: BLOCKED / UNVERIFIED
   - *Detail*: `package.json` lacks an automated test framework (e.g. Vitest / Jest / Playwright). The command `npm run test` is currently missing.
   - *Remediation Plan*: Scheduled for Phase 10 (Quality Engineering) or Phase 4 Foundation Stabilization.

2. **Client-Side Document ID Query Optimization**:
   - *Status*: OBSERVED
   - *Detail*: In `src/pages/Apply.tsx`, the `handleCheckStatus` function queries `applications` by `userId == user.uid` and client-filters. For external/third-party lookup, an indexing strategy or dedicated reference code query will improve lookup performance.
   - *Remediation Plan*: Enhance querying in Phase 5 (Database & Data Integrity Hardening).

3. **Multi-File Upload to Storage**:
   - *Status*: OBSERVED
   - *Detail*: In `src/pages/Apply.tsx` and `src/pages/ClubDashboard.tsx`, file upload buttons provide UI triggers for PDFs and deeds, but documents are not yet persisted to Firebase Cloud Storage.
   - *Remediation Plan*: Integrate Firebase Cloud Storage in Phase 5/8 with signed upload capabilities.

## Medium-Priority Items
4. **Offline Connection Warning Diagnostics**:
   - *Status*: OBSERVED
   - *Detail*: When Firestore is unprovisioned in the Firebase console or if the browser environment drops offline, Firestore's 10-second timeout emits an informational warning in `src/lib/firebase.ts`. The error handler gracefully suppresses intrusive alerts, but an in-app banner for network status would improve user feedback.
   - *Remediation Plan*: Scheduled for Phase 13 (Observability & Monitoring).

5. **External Deployment Sync Guide**:
   - *Status*: DOCUMENTED
   - *Detail*: Vercel and external hosts require `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, etc., to be mapped from `firebase-applet-config.json`.
   - *Remediation Plan*: Comprehensive guide documented in `.nextlevel/DEPLOYMENT.md`.
