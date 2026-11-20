# PRODUCTION RISK ASSESSMENT & REMEDIATION MASTER PLAN
**System**: Football Federation Eswatini (FFE) & Indvundvundvwane Major Football League  
**Applet ID**: `403e6d65-98f9-46da-bf5e-a85401e645dc`  
**Phase**: Phase 3 (Production Risk Assessment)  
**Standard**: Next Level Production Engineering OS v1.0 (Section 10, Phase 3)  
**Status**: APPROVED & ACTIVE  

---

## 1. Executive Summary & Risk Topology

A comprehensive forensic risk assessment was conducted across all 14 routes, authentication flows, Firestore permission trees, Leaflet GIS mapping components, and constitutional business rules.

The system is architecturally sound and functionally robust in client-side presentation, routing, Leaflet GIS mapping, and constitutional governance fidelity. However, prior to general public production release (and external hosting on platforms such as Vercel or custom Cloud Run domains), 5 key technical risk vectors must be governed and methodically resolved through the OS lifecycle:
1. **Automated Test Infrastructure**: The repository currently lacks an automated headless test runner (`npm run test` is absent in `package.json`).
2. **Third-Party OAuth Environment Constraints**: Google OAuth popup/redirect behavior varies across sandbox iframes vs. custom domains (e.g. Vercel / Cloud Run). A resilient dual-mode authentication strategy is required.
3. **Firestore Connection & Permission Resilience**: Offline error handling has been reinforced in `AuthContext.tsx`, but Firestore collection rules and indices must be monitored for strict isolation.
4. **File Upload Storage Decoupling**: Club licensing document uploads in `/apply` currently operate as client-side UX triggers without persistent cloud storage bucket persistence.
5. **Constitutional Invariant Protection**: Automated programmatic tests must enforce that Honorary Founders cannot vote and that only affiliated football clubs hold voting membership.

---

## 2. Master Problem Register (MPR)

| Problem ID | Category | Description | Severity | Likelihood | Blast Radius | Remediation Phase | Status |
|---|---|---|---|---|---|---|---|
| **MPR-001** | Testing | Absence of automated test runner (`vitest` / `@testing-library/react`) in `package.json`. | HIGH | HIGH | Code Quality / Regressions | Phase 10 | REGISTERED |
| **MPR-002** | Auth / OAuth | Google OAuth popup blocking / domain origin mismatches when deployed on external domains like Vercel. | MEDIUM | HIGH | Authentication / Sign-in | Phase 4 / Phase 7 | REGISTERED |
| **MPR-003** | Storage | Document upload fields in Club Licensing Wizard (`/apply`) lack cloud storage persistence. | MEDIUM | MEDIUM | Licensing / Applications | Phase 8 | REGISTERED |
| **MPR-004** | Database | Firestore connection drops in poor network environments causing transient offline errors. | MEDIUM | MEDIUM | User Session / Admin Sync | Phase 6 | MITIGATED / MONITORING |
| **MPR-005** | Security | Client-side role elevation vulnerability if Firestore custom claims or server validation are bypassed. | HIGH | LOW | RBAC / Administrative Access | Phase 7 | CONTAINED |
| **MPR-006** | Governance | Potential bypass of Independent Incorruptible Eligibility Committee review in admin dashboards. | HIGH | LOW | Constitutional Pillar 3 | Phase 5 / Phase 7 | MITIGATED |
| **MPR-007** | Tenancy | Club data isolation in multi-club administrative environments. | MEDIUM | LOW | Club Profile Management | Phase 9 | REGISTERED |
| **MPR-008** | Commercial | Whistleblower and investment inquiries require auditable, tamper-proof persistence and notification dispatch. | MEDIUM | MEDIUM | Ethics / Whistleblowing | Phase 8 | REGISTERED |
| **MPR-009** | Observability | Absence of structured client-side telemetry or telemetry logging for production incidents. | LOW | HIGH | Operational Observability | Phase 12 | REGISTERED |
| **MPR-010** | SEO / Meta | Dynamic OpenGraph cards and Twitter cards for individual club pages (`/club/:id`). | LOW | MEDIUM | Social Sharing & Discoverability | Phase 13 | REGISTERED |

---

## 3. Production Blocker Register (PBR)

| Blocker ID | Blocker Summary | Constitutional / Operational Impact | Mandatory Resolution Milestone | Gate Owner |
|---|---|---|---|---|
| **PBR-001** | Missing Automated CI/CD Test Pipeline | Regression risks during rapid feature iterations; inability to automatically verify RBAC and voting invariants. | Prior to Phase 10 Gate Completion | Lead QA / System Architect |
| **PBR-002** | Unbound Licensing Document Storage | Clubs cannot upload required PDF/statutory documentation during licensing application. | Prior to Phase 8 Gate Completion | Data Architect |
| **PBR-003** | Cross-Domain OAuth Redirect Policy | Google Sign-In fails on Vercel preview environments if authorized redirect URIs are unconfigured. | Prior to Phase 14 Staging Gate | Security Engineer |

---

## 4. System Dependency Graph

```
                                [ Client Browser / Web User ]
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         [ Static Catalog / CDN ]                         [ Single Page Application ]
            (src/data/clubs.ts)                                  (React 19 + Vite 6)
                      │                                               │
                      │                                ┌──────────────┼──────────────┐
                      │                                ▼              ▼              ▼
                      │                         [ React Router ]  [ Tailwind CSS ] [ Lucide Icons ]
                      │                                │
                      │                 ┌──────────────┴──────────────┐
                      │                 ▼                             ▼
                      │        [ Public Views (12) ]        [ Protected Views (2) ]
                      │        - Home, About, Governance    - Dashboard (/dashboard)
                      │        - League, Clubs, Academy     - Application Wizard (/apply)
                      │        - Investment, News, Contact            │
                      │                 │                             │
                      └─────────────────┼─────────────────────────────┘
                                        ▼
                              [ Application State ]
                                (AuthContext.tsx)
                                        │
                      ┌─────────────────┴─────────────────┐
                      ▼                                   ▼
          [ Firebase Auth (v12.13) ]            [ Cloud Firestore (v12.13) ]
          - GoogleAuthProvider                  - /users/{userId}
          - Email/Password Auth                 - /applications/{appId}
          - Anonymous / Fallback                - /whistleblower_reports/{id}
          - Super Admin Role Sync               - /test/connection
                      │                                   │
                      └─────────────────┬─────────────────┘
                                        ▼
                             [ Security Enclosure ]
                             - firestore.rules
                             - Anti-Nepotism Guard
                             - Eligibility Test Engine
```

---

## 5. Phased Remediation Master Plan

```
Phase 0-2 (Completed):
  [P0: Init] ──> [P1: Forensics] ──> [P2: Architecture]
                                             │
Phase 3-6 (Foundation & Containment):         ▼
  [P3: Risk Assessment] ──> [P4: Emergency Containment] ──> [P5: Structural Repair] ──> [P6: Database Integrity]
                                                                                               │
Phase 7-10 (Security, Storage, Testing):                                                      ▼
  [P10: Automated Testing] <── [P9: Tenancy & Isolation] <── [P8: Storage & Integration] <── [P7: RBAC & Auth]
             │
Phase 11-14 (Performance, Observability, Staging):
             ▼
  [P11: Performance] ──> [P12: Monitoring & Observability] ──> [P13: Production Hardening] ──> [P14: Staging]
                                                                                                    │
Phase 15-18 (Launch & Continuous Engineering):                                                      ▼
  [P18: Continuous Eng.] <── [P17: Live Deployment] <── [P16: Operational Readiness] <── [P15: Production Gate]
```

### Remediation Work Packages:
- **WP-01: Emergency Containment (Phase 4)**:
  - Add robust error boundary around Firebase Auth and Firestore queries so unauthenticated or offline users never experience white-screens or broken buttons.
  - Implement comprehensive fallback authentication notification modal with explicit instructions for local vs. Vercel deployment.
- **WP-02: Structural & Domain Repair (Phase 5)**:
  - Codify the 5 Foundational Constitutional Pillars directly into domain validation utilities:
    1. Only verified football clubs can hold voting rights.
    2. 5 Honorary Founders are permanently designated non-voting.
    3. Independent Eligibility Committee verification status is required for all executive/committee candidate profiles.
    4. Indvundvundvwane League 16-club share ownership and transfer engine.
    5. Nursery (1-10) -> Academy (11-17) -> Senior (18+) developmental progression validation.
- **WP-03: Database Integrity & Indices (Phase 6)**:
  - Validate and audit Firestore schemas with Zod / TypeScript runtime validation.
  - Formulate Firestore connection heartbeat and offline recovery mechanism.
- **WP-04: Security & RBAC Hardening (Phase 7)**:
  - Deploy and audit `firestore.rules` for strict user role enforcement.
  - Lock `/users` role modifications strictly to `super_admin` (`siphom.yati@gmail.com`).
- **WP-05: Storage & Commercial Services (Phase 8)**:
  - Integrate document storage for Club Licensing applications with mime-type and payload size validation.
  - Connect Whistleblower reporting directly to encrypted Firestore collection with anonymous hashing.
- **WP-06: Automated Test Suite (Phase 10)**:
  - Configure `vitest` and `@testing-library/react`.
  - Add test specifications verifying Constitutional Pillars, RBAC, and calculation engines.

---

## 6. Domain-Specific Remediation Plans

### 6.1 Security Remediation Plan
1. **Rule Verification**: Verify that `firestore.rules` disallows unauthorized role updates. Users cannot write `role: "admin"` to their own document.
2. **Anti-Nepotism Guard**: Enforce Article III independent eligibility check before displaying administrative write controls.
3. **API Keys & Secrets**: Verify no private service credentials or secret keys are stored in client-side bundles. Only public Firebase client configuration is exposed via environment variables.

### 6.2 Database Remediation Plan
1. **Offline Tolerant Data Layer**: All Firestore queries must include offline caching fallbacks and try-catch wrappers.
2. **Schema Uniformity**: Standardize documents under `/applications`, `/whistleblower_reports`, and `/users` with mandatory `createdAt`, `updatedAt`, and `schemaVersion` fields.
3. **Static Catalog Immutability**: Maintain `src/data/clubs.ts` as the deterministic source of truth for the 16 clubs, geo-coordinates, and founding metadata.

### 6.3 Authentication Remediation Plan
1. **Multi-Mode Sign-In**: Provide Google OAuth as primary with email/password fallback for environments where third-party iframes block Google Identity Services popups.
2. **Production Hosting Guidance**: Maintain clear deployment configuration documentation for Firebase Console Authorized Domains (`localhost`, `*.run.app`, `*.vercel.app`, and custom FFE domains).
3. **Session Persistence**: Ensure `browserLocalPersistence` is set explicitly on Firebase Auth initialization.

### 6.4 Tenancy Remediation Plan
1. **Club Scope Isolation**: Club administrators can view and edit only their assigned club profile and licensing applications.
2. **League Shareholder Model**: Reflect Article IV by indexing club ownership of the Indvundvundvwane Major Football League share capital (16 shares, 1 per club).

### 6.5 Commercial Remediation Plan
1. **Sponsorship & Commercial Tiers**: Provide standardized inquiry and prospectus workflows under `/investment`.
2. **Anti-Corruption Reporting**: Whistleblower hotline (`/governance`) operates with zero-knowledge anonymity and optional encrypted follow-up keys.

### 6.6 Testing Strategy
1. **Unit Tests**: Test pure utility functions (foreign player eligibility calculation under 5-year neighbour treaty, nursery age tier routing, league share calculation).
2. **Integration Tests**: Test AuthContext state transitions and role resolution.
3. **E2E Smoke Tests**: Test critical user journeys:
   - Journey 1: Public visitor browses clubs and views interactive Eswatini GIS map.
   - Journey 2: Club manager completes Licensing Wizard.
   - Journey 3: Whistleblower submits anonymous ethical report.
   - Journey 4: Super Admin accesses administrative management console.

### 6.7 Disaster Recovery Requirements
- **RTO (Recovery Time Objective)**: < 15 minutes.
- **RPO (Recovery Point Objective)**: < 1 hour.
- **Fallback Strategy**: In the event of Firebase outage, the application automatically drops into read-only resilience mode, serving static club data, constitutional charters, and offline notification queues.

### 6.8 Observability Requirements
- **Client Error Boundaries**: React `ErrorBoundary` on all top-level routes to prevent unhandled UI crashes.
- **Connection Health Indicator**: Subtle, non-intrusive status monitor in admin portal for Firestore connectivity.
- **Zero Log Leakage**: No sensitive user PII or auth tokens dumped to the browser console.

---

## 7. Change-Risk Register & Approval Register

| Change ID | Proposed Change | Risk Tier | Impacted Modules | Rollback Plan | Approval Required | Status |
|---|---|---|---|---|---|---|
| **CR-001** | Add React Error Boundary component around root router | Tier 1 (Low) | `App.tsx`, `main.tsx` | Revert to direct router render | Lead Architect | APPROVED |
| **CR-002** | Add domain validation utilities for 5 Constitutional Pillars | Tier 1 (Low) | `src/utils/` | Delete utility file | Lead Architect | APPROVED |
| **CR-003** | Install Vitest and React Testing Library for CI/CD | Tier 2 (Medium) | `package.json`, `vite.config.ts` | Remove devDependencies | Tech Lead | PENDING PHASE 10 |
| **CR-004** | Deploy Firestore rules update | Tier 2 (Medium) | `firestore.rules` | Rollback to previous rules version | Super Admin | PENDING PHASE 7 |
| **CR-005** | Add cloud storage integration for licensing documents | Tier 3 (High) | `/apply`, Firebase Storage | Revert to metadata-only submission | Product Owner | PENDING PHASE 8 |

---

## 8. Verification & Gate Outcome

- **Prerequisites Met**: Phase 0 (Init), Phase 1 (Forensic Inspection), Phase 2 (Architecture Reconstruction).
- **Deliverables Completed**:
  - Master Problem Register (10 problems identified and categorized)
  - Production Blocker Register (3 blockers classified with mitigation paths)
  - System Dependency Graph (Visual topology documented)
  - Phased Remediation Master Plan (WP-01 through WP-06 detailed)
  - Specialized domain plans for Security, Database, Auth, Tenancy, Commercial, Testing, Disaster Recovery, and Observability
  - Change-Risk Register with approval protocols
- **Phase 3 Exit Gate Status**: **PASSED**
- **Next Authorized Action**: Phase 4 (Emergency Containment & Error Boundaries)
