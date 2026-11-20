# CHANGELOG

## [1.13.0] - Mpolonjeni Young Zebras F.C. Logo & Kits Integration
- Added **Mpolonjeni Young Zebras F.C.** (Mpolonjeni, est. 1984) to the FFE Major League clubs dataset (`src/data/clubs.ts`).
- Embedded official club crest (`/public/assets/aistudio/mpolonjeni_young_zebras_fc_logo_7f0dad02.jpg`) and kit presentation (`/public/assets/aistudio/mpolonjeni_young_zebras_fc_kit_0c3695d7.jpg`) into `ClubProfile.tsx`.
- Formulated detailed match kit specifications with color swatches for:
  - **Home Kit (Black & White)**: Classic black & white vertical zebra stripes jersey, solid black shorts with white trim, and black socks with white hoops.
  - **First Away Kit (Royal Blue & Gold)**: Royal blue jersey with gold V-neck & trim, royal blue shorts with gold trim, and royal blue socks with gold hoops.
  - **Second Away Kit (Gold & Black)**: Vibrant gold/yellow jersey with black trim, gold shorts with black trim, and gold socks with black hoops.
- Verified compilation and type integrity (`tsc --noEmit` and Vite build: SUCCESS).

## [1.12.0] - Nhlangano Seven Stars FC Logo & Kits Integration
- Added **Nhlangano Seven Stars FC** (Nhlangano, Shiselweni region) to the FFE Major League clubs dataset (`src/data/clubs.ts`).
- Embedded official club crest (`/public/assets/aistudio/nhlangano_seven_sars_fc_logo_4e77c008.jpg`) and kit presentation (`/public/assets/aistudio/nhlangano_seven_stars_fc_kit_af398824.jpg`) into `ClubProfile.tsx`.
- Formulated detailed match kit specifications with color swatches for:
  - **Home Strip (Orange)**: Vibrant orange jersey with white V-neck collar & trim, orange shorts with white trim, and white socks.
  - **First Away Strip (Black & Pink)**: Black jersey with pink V-neck collar & pink diagonal accent slashes, black shorts with pink trim, and white/pink socks.
  - **Second Away Strip (White & Orange)**: White jersey with vibrant orange V-neck collar & trim, orange shorts with white trim, and orange socks.
- Verified compilation and type integrity (`tsc --noEmit` and Vite build: SUCCESS).

## [1.11.0] - Mbabane United FC Official Kits Integration
- Added complete official match kits for **Mbabane United FC** (`src/data/clubs.ts`), incorporating Brown & Gold Home strip, White & Gold First Away strip, and Gold & Brown Second Away strip with mountain watermarks.
- Embedded official kit presentation graphics (`/public/assets/aistudio/mbabane_united_kit_2ca7597c.jpg`, `mbabane_united_kit1_92ef9c51.jpg`, `mbabane_united_kit2_6059d53e.jpg`) into `ClubProfile.tsx`.
- Verified compilation and type integrity (`tsc --noEmit` and Vite build: SUCCESS).

## [1.10.0] - Qomintaba Warriors FC Kits & Colors Integration
- Added **Qomintaba Warriors FC** (Siteki, est. 1970 "Baick Mashuba") to the FFE Major League clubs dataset (`src/data/clubs.ts`).
- Embedded official kit presentation and crest attachment (`/assets/aistudio/Qomintaba_Warriors_FC_cd502241.jpg`) into `ClubProfile.tsx`.
- Formulated detailed match kit specifications with color swatches for:
  - **Home Strip**: Royal Blue jersey (with white V-neck collar & sleeve trim), Royal Blue shorts, Royal Blue socks with white stripes.
  - **First Away Strip**: White jersey (with royal blue V-neck collar & sleeve trim), White shorts with blue trim, White socks with blue stripes.
  - **Second Away Strip**: Black jersey (with neon lime/yellow-green V-neck & stripe accents), Black shorts with lime trim, Black socks with lime stripes.
- Verified compilation and type integrity (`tsc --noEmit` and Vite build: SUCCESS).

## [1.9.0] - Interactive Constitutional Calculators & Metadata/SEO Sync
- Added interactive **Article IV Regional Quota Eligibility Checker** to `src/pages/Leagues.tsx`, powered by `isRegionalLocalEquivalentPlayer`, letting clubs test player nationality and season number (Seasons 1–10).
- Added interactive **Article V Constitutional Development Placement Checker** to `src/pages/Academy.tsx`, powered by `getDevelopmentTierForAge`, mapping player age and gender across Nursery, Boys/Girls Academy, and Senior tiers.
- Synced `index.html` (`<meta name="description">`, `og:title`, `og:description`, `og:type`) with `metadata.json`.
- Wired `src/pages/UserDashboard.tsx` portal CTAs directly to `/leagues`, `/clubs`, `/investment`, and `/apply`.

## [1.8.0] - Domain Validation Engine, Cross-Domain OAuth Resilience & Automated Testing
- Codified all 5 Constitutional Articles programmatically in `src/utils/ffeConstitution.ts` and installed `vitest` (`npm run test`) with 11 passing unit tests in `src/utils/ffeConstitution.test.ts` (resolves MPR-001).
- Hardened `src/lib/firebase.ts` and `src/components/Navbar.tsx` with `browserLocalPersistence`, `signInWithRedirect` popup fallback, and an interactive `AuthDomainError` modal displaying the exact hostname to authorize in Firebase Console for Vercel/external deployments (resolves MPR-002 / PBR-003).
- Upgraded `src/pages/Apply.tsx` with complete controlled form inputs, real file pickers with 10MB validation and metadata attachment persistence, inline sign-in support, and clean status tracking (resolves MPR-003).
- Eliminated all `window.alert` calls across `AdminDashboard.tsx`, `Apply.tsx`, and `ClubProfile.tsx`, replacing them with inline status banners and clipboard copy badges.
- Hardened and synced `firebase-blueprint.json` and `firestore.rules` (eliminating O(n) `get()` calls inside `allow list`, enforcing `email_verified`, and allowing `test/connection` health checks).

## [1.7.0] - Squad & Regional Player Quota Integration
- Codified Article IV Regional Exemption Notice on individual club profiles (`src/pages/ClubProfile.tsx`), detailing that players from Mozambique, South Africa, Lesotho, Namibia, Botswana, and Zimbabwe hold local status for the first 5 seasons under FFE work permit sponsorship.
- Validated all 14 routes, Leaflet interactive map, and dynamic tabs.
- Build and lint checks passed with zero errors (`tsc --noEmit`: 0, Vite bundle: SUCCESS).

## [1.6.0] - Phase 6 System Verification & Release Consolidation
- Built dual-tab Administration Dashboard (`src/pages/AdminDashboard.tsx`) with simultaneous management of Club Licensing Applications and Whistleblower & Misconduct Reports.
- Connected the Super Admin interface (`siphom.yati@gmail.com`) to live Firestore query and state handlers for integrity reviews.
- Formulated and verified `.nextlevel/SYSTEM_VERIFICATION.md` certifying adherence to all 5 FFE Constitutional Invariants and 14 live application routes.
- Advanced Project State in `.nextlevel/PROJECT_STATE.md` to **State A (Production Ready)**.
- Full verification complete: `tsc --noEmit` passed with 0 errors; Vite bundle built cleanly.

## [1.5.0] - Phase 5 Core Engine & Governance Hardening
- Integrated end-to-end Whistleblower Reporting pipeline in `src/pages/Governance.tsx` with direct Firestore dispatch to `whistleblower_reports`.
- Formulated strict Firestore security rules for `whistleblower_reports`: public/authenticated write access with payload schema validation (type, details max 5000 chars, server timestamp), read/list locked strictly to `admin` / `super_admin`.
- Implemented real-time form feedback and confidential submission confirmation modal for integrity reports.
- Verified build stability with `lint_applet` (`tsc --noEmit`: 0 errors) and `compile_applet` (Vite build: SUCCESS).

## [1.4.0] - Phase 4 Emergency Containment
- Installed `@types/react` and `@types/react-dom` dev dependencies for complete React 19 type safety.
- Implemented top-level `ErrorBoundary` component (`src/components/ErrorBoundary.tsx`) with brand-aligned FFE fallback UI (emerald/amber styling), error detail display, and instant app reload/reset options.
- Wrapped entire route tree in `src/App.tsx` with `<ErrorBoundary>`.
- Hardened `AuthContext.tsx` with try/catch guards and fallback state handling for Firestore network timeouts or permission restrictions, ensuring uninterrupted user navigation even when offline.
- Verified build stability with `lint_applet` (`tsc --noEmit`: 0 errors) and `compile_applet` (Vite build: SUCCESS).

## [1.3.0] - Phase 3 Production Risk Assessment & Remediation Master Plan
- Authored `.nextlevel/RISK_ASSESSMENT.md` detailing the Master Problem Register (10 problems categorized), Production Blocker Register (3 blockers), System Dependency Graph, and Phased Remediation Master Plan (WP-01 to WP-06).
- Completed domain-specific remediation architectures for Security, Database, Authentication, Tenancy, Commercial, Testing Strategy, Disaster Recovery, and Observability.
- Established Change-Risk Register and Approval Register governing all forward engineering modifications.
- Completed control pack governance suite: `.nextlevel/TENANCY.md`, `.nextlevel/PAYMENTS.md`, `.nextlevel/SUBSCRIPTIONS.md`, `.nextlevel/MONITORING.md`, `.nextlevel/DISASTER_RECOVERY.md`, and `.nextlevel/INCIDENTS.md`.
- Phase 3 Exit Criteria PASSED; zero application code regressions.

## [1.2.0] - Phase 2 System Understanding & Architecture Reconstruction
- Formalized multi-layered system architecture in `.nextlevel/ARCHITECTURE.md` spanning Presentation, Routing, Auth Context, Domain Services, and Cloud Firestore.
- Codified FFE Domain Invariants across all 5 Articles: Club-only membership, Founders non-voting advisory status, Independent Incorruptible Eligibility Committee, Indvundvundvwane Major Football League (100% club private company, 5-year foreign quota exemption for regional neighbours, non-FIFA jurisdiction), and 3-Tier Youth & Women's development structure.
- Codified exhaustive Firestore schemas in `.nextlevel/DATABASE.md` for `users`, `applications`, `whistleblower_reports`, and `test/connection`.
- Documented RBAC hierarchy and server-side rule mapping in `.nextlevel/AUTHORIZATION.md` ensuring anti-nepotism and privilege escalation safeguards.
- Preserved 100% existing functionality, routes, UI components, and build stability.

## [1.1.0] - Phase 1 Deep Forensic & Boundary Inspection
- Executed exhaustive forensic audit across all 14 routes and 3 dynamic dashboard sub-views.
- Verified strict enforcement of the 5 Foundational Constitutional Pillars across `Home`, `About`, `Structure`, `Leagues`, `Membership`, `Governance`, `Academy`, and `ConstitutionalPillars`.
- Audited `AuthContext.tsx` and `firestore.rules` for RBAC enforcement, `siphom.yati@gmail.com` super_admin bootstrapping, and server-timestamp validation.
- Validated Leaflet interactive map, custom marker rendering, and club search in `src/pages/Clubs.tsx` and `src/pages/ClubProfile.tsx`.
- Updated `.nextlevel/SYSTEM_INVENTORY.md` with evidence tags and component classifications (`VERIFIED`, `WORKING`).
- Updated `.nextlevel/TECHNICAL_DEBT.md` with identified items (test suite automation, storage upload integration).
- Build validation passed (`tsc --noEmit` 0 errors, Vite production bundle compiled cleanly).

## [1.0.0] - Phase 0 Initialization
- Established `.nextlevel/` Engineering Control Plane under Next Level Production Engineering OS v1.0.
- Codified FFE Engineering Constitution, Project Charter, and 5 Foundational Constitutional Pillars.
- Cataloged system inventory across all 14 routes, components, and Firebase services.
- Verified TypeScript type integrity (`tsc --noEmit`) and Vite compilation.
