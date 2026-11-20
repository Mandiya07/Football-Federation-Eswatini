# TENANCY ARCHITECTURE & CLUB BOUNDARIES
**System**: Football Federation Eswatini (FFE) & Indvundvundvwane Major Football League  
**Standard**: Next Level Production Engineering OS v1.0  
**Status**: APPROVED & ENFORCED  

---

## 1. Tenancy Model: Club-Federation Federation Model

The Football Federation Eswatini adheres to a decentralized club-federation tenancy structure, strictly codified according to the 5 Constitutional Pillars:

### 1.1 Inviolable Constitutional Rules
1. **Club Exclusivity (Article I)**:
   - Regional associations, player unions, referee associations, coaches unions, and supporter associations are **NOT** members of the Federation.
   - Only individual affiliated football clubs hold institutional membership and voting rights.
2. **Honorary Founders Non-Voting Boundary (Article II)**:
   - The 5 Founders are lifetime Honorary Members. They hold deliberative and consultative rights in General Conferences, but **SHALL NOT VOTE**.
   - Tenancy boundaries strictly prevent individual user accounts from casting federation ballots.
3. **League Company Shareholding (Article IV)**:
   - The Indvundvundvwane Major Football League Eswatini is a private corporate entity whose equity is owned 100% and exclusively by the 16 participating clubs.
   - **Relegation Equity Transfer**: When a club is relegated at the end of a sporting season, its shareholding in the league company is automatically transferred to the promoted replacement club.

---

## 2. Tenant Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                       FEDERATION LEVEL                      │
│                  Football Federation Eswatini               │
│             (Constitutional Governance & Oversight)          │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌─────────────────────────────┐         ┌─────────────────────────────┐
│  INDVUNDVUNDVWANE LEAGUE    │         │      REGIONAL BODIES        │
│    (Private Company)        │         │   (Non-Member Affiliates)   │
│   16 Club Shareholders      │         │   Consultative Only         │
└──────────────┬──────────────┘         └──────────────┬──────────────┘
               │                                       │
       ┌───────┴───────────────────────────────────────┤
       ▼                                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      CLUB TENANTS (16)                      │
│   Each club is an isolated operational & administrative     │
│   tenant with dedicated licensing dossiers & player rosters │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Data Isolation Matrix

| Entity | Scope | Access Restrictions | Isolation Mechanism |
|---|---|---|---|
| **Club Profile** | Club Tenant | Club Admin can update only their assigned club profile. Super Admin has global write. | `clubId` claim validation |
| **Licensing Dossier** | Club Tenant | Restricted to applying club officers and Federation Licensing Committee. | Firestore Security Rules |
| **League Shares** | League Company | 16 discrete shares (1 share per top-flight club). | Ledger state machine |
| **Ballots & Votes** | Federation Assembly | Only verified club delegates can vote. Honorary Founders can deliberate only. | RBAC voting assertion |
| **Whistleblower Reports**| Federation Ethics | Encrypted and restricted to Independent Incorruptible Eligibility Committee. | Role-locked collection |
