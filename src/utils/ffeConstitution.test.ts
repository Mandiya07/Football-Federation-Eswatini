import { describe, it, expect } from 'vitest';
import {
  isVotingMember,
  canAttendConferenceAndDeliberate,
  canMakeRepresentations,
  requiresIndependentEligibilityTest,
  isNominationEligible,
  isValidLeagueBoardSize,
  isRegionalLocalEquivalentPlayer,
  getDevelopmentTierForAge,
  FFE_HONORARY_FOUNDERS_CAP,
  IMFL_CLUB_SHAREHOLDER_COUNT,
} from './ffeConstitution';

describe('FFE Constitutional Domain Invariants', () => {
  describe('Articles I & II: Membership & Voting Sovereignty', () => {
    it('grants voting rights exclusively to affiliated football clubs', () => {
      expect(isVotingMember('football_club')).toBe(true);
      expect(isVotingMember('honorary_founder')).toBe(false);
      expect(isVotingMember('players_union')).toBe(false);
      expect(isVotingMember('referees_union')).toBe(false);
      expect(isVotingMember('coaches_union')).toBe(false);
      expect(isVotingMember('supporters_union')).toBe(false);
      expect(isVotingMember('regional_association')).toBe(false);
    });

    it('permits the 5 honorary founders to attend and deliberate without voting', () => {
      expect(FFE_HONORARY_FOUNDERS_CAP).toBe(5);
      expect(canAttendConferenceAndDeliberate('honorary_founder')).toBe(true);
      expect(isVotingMember('honorary_founder')).toBe(false);
    });

    it('permits unions and regional associations to make representations', () => {
      expect(canMakeRepresentations('players_union')).toBe(true);
      expect(canMakeRepresentations('regional_association')).toBe(true);
    });
  });

  describe('Article III: Independent Incorruptible Eligibility Committee', () => {
    it('mandates eligibility vetting for presidential, executive, committee, and staff roles', () => {
      expect(requiresIndependentEligibilityTest('president')).toBe(true);
      expect(requiresIndependentEligibilityTest('executive_member')).toBe(true);
      expect(requiresIndependentEligibilityTest('committee_appointee')).toBe(true);
      expect(requiresIndependentEligibilityTest('federation_employee')).toBe(true);
    });

    it('blocks candidates who have not passed the independent eligibility test', () => {
      expect(isNominationEligible('president', false)).toBe(false);
      expect(isNominationEligible('committee_appointee', false)).toBe(false);
      expect(isNominationEligible('federation_employee', false)).toBe(false);
      expect(isNominationEligible('president', true)).toBe(true);
    });
  });

  describe('Article IV: Indvundvundvwane Major Football League & Regional Quota', () => {
    it('enforces 16 club shareholders and 5-7 league board directors', () => {
      expect(IMFL_CLUB_SHAREHOLDER_COUNT).toBe(16);
      expect(isValidLeagueBoardSize(4)).toBe(false);
      expect(isValidLeagueBoardSize(5)).toBe(true);
      expect(isValidLeagueBoardSize(6)).toBe(true);
      expect(isValidLeagueBoardSize(7)).toBe(true);
      expect(isValidLeagueBoardSize(8)).toBe(false);
    });

    it('treats regional neighbours as local players for the first 5 seasons', () => {
      const neighbours = [
        'Mozambique',
        'South Africa',
        'Lesotho',
        'Namibia',
        'Botswana',
        'Zimbabwe',
      ];
      for (const country of neighbours) {
        expect(isRegionalLocalEquivalentPlayer(country, 1)).toBe(true);
        expect(isRegionalLocalEquivalentPlayer(country, 5)).toBe(true);
        expect(isRegionalLocalEquivalentPlayer(country, 6)).toBe(false);
      }
      expect(isRegionalLocalEquivalentPlayer('Eswatini', 6)).toBe(true);
      expect(isRegionalLocalEquivalentPlayer('Brazil', 1)).toBe(false);
    });
  });

  describe("Article V: Three-Tier Youth & Women's Development Structure", () => {
    it('places 1-2 year olds in coed unstructured nursery play', () => {
      expect(getDevelopmentTierForAge(1, 'male')).toBe('Nursery (Coed Unstructured Play)');
      expect(getDevelopmentTierForAge(2, 'female')).toBe('Nursery (Coed Unstructured Play)');
    });

    it('places 3-10 year olds in coed foundational coaching nursery', () => {
      expect(getDevelopmentTierForAge(3, 'female')).toBe('Nursery (Coed Foundational Coaching)');
      expect(getDevelopmentTierForAge(10, 'male')).toBe('Nursery (Coed Foundational Coaching)');
    });

    it('separates 11-17 year olds into Boys and Girls Academies', () => {
      expect(getDevelopmentTierForAge(11, 'male')).toBe('Boys Academy');
      expect(getDevelopmentTierForAge(17, 'male')).toBe('Boys Academy');
      expect(getDevelopmentTierForAge(11, 'female')).toBe('Girls Academy');
      expect(getDevelopmentTierForAge(17, 'female')).toBe('Girls Academy');
    });

    it('graduates 18+ year olds to Senior Men and Senior Women teams', () => {
      expect(getDevelopmentTierForAge(18, 'male')).toBe('Senior Men Team');
      expect(getDevelopmentTierForAge(18, 'female')).toBe('Senior Women Team');
    });
  });
});
