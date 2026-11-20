/**
 * Football Federation Eswatini (FFE) & Indvundvundvwane Major Football League
 * Canonical Constitutional Domain Invariants Engine (Articles I - V)
 */

export type FederationEntityType =
  | 'football_club'
  | 'honorary_founder'
  | 'players_union'
  | 'referees_union'
  | 'coaches_union'
  | 'supporters_union'
  | 'regional_association';

export type GovernancePositionType =
  | 'president'
  | 'executive_member'
  | 'committee_appointee'
  | 'federation_employee'
  | 'club_delegate';

export type PlayerGender = 'male' | 'female';

export type DevelopmentTier =
  | 'Nursery (Coed Unstructured Play)'
  | 'Nursery (Coed Foundational Coaching)'
  | 'Boys Academy'
  | 'Girls Academy'
  | 'Senior Men Team'
  | 'Senior Women Team';

export const FFE_HONORARY_FOUNDERS_CAP = 5;
export const IMFL_CLUB_SHAREHOLDER_COUNT = 16;
export const IMFL_BOARD_MIN = 5;
export const IMFL_BOARD_MAX = 7;
export const SADC_EXEMPTION_SEASONS = 5;

export const SADC_NEIGHBOUR_COUNTRIES = [
  'Eswatini',
  'Mozambique',
  'South Africa',
  'Lesotho',
  'Namibia',
  'Botswana',
  'Zimbabwe',
] as const;

/**
 * Article I & II: Only affiliated football clubs hold FFE voting membership.
 * Associations (players/referees/coaches/supporters unions, regional associations)
 * may organize and make representations, and the 5 founders are lifetime honorary members,
 * but neither associations nor honorary founders hold voting rights.
 */
export function isVotingMember(entityType: FederationEntityType): boolean {
  return entityType === 'football_club';
}

export function canMakeRepresentations(entityType: FederationEntityType): boolean {
  return entityType !== 'honorary_founder';
}

export function canAttendConferenceAndDeliberate(entityType: FederationEntityType): boolean {
  return entityType === 'football_club' || entityType === 'honorary_founder';
}

/**
 * Article III: Independent Incorruptible Eligibility Committee vetting.
 * All presidential candidates, committee appointees, executive nominees,
 * and federation employees must pass independent vetting beforehand to prevent nepotism.
 */
export function requiresIndependentEligibilityTest(position: GovernancePositionType): boolean {
  return (
    position === 'president' ||
    position === 'executive_member' ||
    position === 'committee_appointee' ||
    position === 'federation_employee'
  );
}

export function isNominationEligible(
  position: GovernancePositionType,
  passedIndependentEligibilityTest: boolean
): boolean {
  if (!requiresIndependentEligibilityTest(position)) {
    return true;
  }
  return passedIndependentEligibilityTest === true;
}

/**
 * Article IV: Indvundvundvwane Major Football League (IMFL)
 * - Private company whose 16 shareholders are exclusively the competing clubs.
 * - Board size must be between 5 and 7 inclusive.
 * - Plays outside FIFA (no national team obligation).
 * - First 5 seasons: players from Eswatini + 6 neighbouring countries are treated as local
 *   (exempt from foreign quota while holding government work permits).
 */
export function isValidLeagueBoardSize(boardMemberCount: number): boolean {
  return Number.isInteger(boardMemberCount) && boardMemberCount >= IMFL_BOARD_MIN && boardMemberCount <= IMFL_BOARD_MAX;
}

export function isRegionalLocalEquivalentPlayer(nationality: string, seasonNumber: number): boolean {
  const normalized = nationality.trim().toLowerCase();
  if (normalized === 'eswatini' || normalized === 'swaziland') {
    return true;
  }
  if (seasonNumber < 1 || seasonNumber > SADC_EXEMPTION_SEASONS) {
    return false;
  }
  return SADC_NEIGHBOUR_COUNTRIES.some((c) => c.toLowerCase() === normalized);
}

/**
 * Article V: Three-Tier Youth & Women's Football Development Structure
 * - Ages 1-2: Nursery (Boys & Girls play together Saturday mornings)
 * - Ages 3-10: Nursery (Boys & Girls coached together)
 * - Ages 11-17: Academy (Separated into Boys Academy & Girls Academy)
 * - Ages 18+: Senior Men Team / Senior Women Team
 */
export function getDevelopmentTierForAge(age: number, gender: PlayerGender): DevelopmentTier | null {
  if (!Number.isFinite(age) || age < 1) {
    return null;
  }
  if (age >= 1 && age < 3) {
    return 'Nursery (Coed Unstructured Play)';
  }
  if (age >= 3 && age <= 10) {
    return 'Nursery (Coed Foundational Coaching)';
  }
  if (age >= 11 && age <= 17) {
    return gender === 'female' ? 'Girls Academy' : 'Boys Academy';
  }
  return gender === 'female' ? 'Senior Women Team' : 'Senior Men Team';
}
