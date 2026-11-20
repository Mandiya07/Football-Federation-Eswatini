import { describe, it, expect } from 'vitest';
import { CLUBS } from '@/data/clubs';
import { computeLeagueStandings } from './standings';

describe('computeLeagueStandings', () => {
  it('pulls all registered clubs with 0 GP, 0 GD, 0 PTS and sequential ranks when no fixtures are played', () => {
    const standings = computeLeagueStandings(CLUBS, []);
    expect(standings.length).toBe(CLUBS.length);

    standings.forEach((row, idx) => {
      expect(row.rank).toBe(idx + 1);
      expect(row.gamesPlayed).toBe(0);
      expect(row.wins).toBe(0);
      expect(row.draws).toBe(0);
      expect(row.losses).toBe(0);
      expect(row.goalDifference).toBe(0);
      expect(row.points).toBe(0);
    });
  });

  it('calculates points, games played, goal difference, and rankings when match results exist', () => {
    const sampleClubs = CLUBS.slice(0, 3);
    const standings = computeLeagueStandings(sampleClubs, [
      { homeClubId: sampleClubs[0].id, awayClubId: sampleClubs[1].id, homeGoals: 3, awayGoals: 1 },
      { homeClubId: sampleClubs[1].id, awayClubId: sampleClubs[2].id, homeGoals: 1, awayGoals: 1 },
    ]);

    expect(standings[0].club.id).toBe(sampleClubs[0].id);
    expect(standings[0].rank).toBe(1);
    expect(standings[0].gamesPlayed).toBe(1);
    expect(standings[0].goalDifference).toBe(2);
    expect(standings[0].points).toBe(3);

    expect(standings[1].club.id).toBe(sampleClubs[2].id);
    expect(standings[1].rank).toBe(2);
    expect(standings[1].gamesPlayed).toBe(1);
    expect(standings[1].goalDifference).toBe(0);
    expect(standings[1].points).toBe(1);

    expect(standings[2].club.id).toBe(sampleClubs[1].id);
    expect(standings[2].rank).toBe(3);
    expect(standings[2].gamesPlayed).toBe(2);
    expect(standings[2].goalDifference).toBe(-2);
    expect(standings[2].points).toBe(1);
  });
});
