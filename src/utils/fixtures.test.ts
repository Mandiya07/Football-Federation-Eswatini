import { describe, expect, it } from 'vitest';
import { sortFixturesChronologically, validateFixtureInput } from './fixtures';

describe('validateFixtureInput', () => {
  it('accepts a valid upcoming fixture between two distinct registered clubs', () => {
    const error = validateFixtureInput({
      homeClubId: 1,
      awayClubId: 2,
      matchDate: '2026-12-05',
      kickoffTime: '15:00',
      matchday: 1,
      venue: 'Somhlolo National Stadium',
    });
    expect(error).toBeNull();
  });

  it('rejects scheduling a club against itself', () => {
    const error = validateFixtureInput({
      homeClubId: 3,
      awayClubId: 3,
      matchDate: '2026-12-05',
      kickoffTime: '15:00',
      matchday: 1,
      venue: 'Qomintaba Arena',
    });
    expect(error).toContain('different teams');
  });

  it('rejects out-of-range matchdays and empty venue', () => {
    expect(
      validateFixtureInput({
        homeClubId: 1,
        awayClubId: 2,
        matchDate: '2026-12-05',
        kickoffTime: '15:00',
        matchday: 0,
        venue: 'Somhlolo Stadium',
      })
    ).toContain('Matchday');

    expect(
      validateFixtureInput({
        homeClubId: 1,
        awayClubId: 2,
        matchDate: '2026-12-05',
        kickoffTime: '15:00',
        matchday: 1,
        venue: '   ',
      })
    ).toContain('venue');
  });

  it('rejects missing date or kickoff time', () => {
    expect(
      validateFixtureInput({
        homeClubId: 1,
        awayClubId: 2,
        matchDate: '',
        kickoffTime: '15:00',
        matchday: 1,
        venue: 'Somhlolo Stadium',
      })
    ).toContain('date');

    expect(
      validateFixtureInput({
        homeClubId: 1,
        awayClubId: 2,
        matchDate: '2026-12-05',
        kickoffTime: '',
        matchday: 1,
        venue: 'Somhlolo Stadium',
      })
    ).toContain('kickoff time');
  });
});

describe('sortFixturesChronologically', () => {
  it('orders fixtures by date, then kickoff time, then matchday ascending', () => {
    const sorted = sortFixturesChronologically([
      { matchDate: '2026-12-12', kickoffTime: '15:00', matchday: 2 },
      { matchDate: '2026-12-05', kickoffTime: '18:30', matchday: 1 },
      { matchDate: '2026-12-05', kickoffTime: '15:00', matchday: 1 },
    ]);

    expect(sorted.map((f) => `${f.matchDate} ${f.kickoffTime}`)).toEqual([
      '2026-12-05 15:00',
      '2026-12-05 18:30',
      '2026-12-12 15:00',
    ]);
  });
});
