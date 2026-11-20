import { CLUBS } from '@/data/clubs';

export type RegisteredClub = (typeof CLUBS)[number];

export interface MatchResult {
  homeClubId: number;
  awayClubId: number;
  homeGoals: number;
  awayGoals: number;
  homeClubName?: string;
  awayClubName?: string;
}

export interface ClubStandingRow {
  rank: number;
  club: RegisteredClub;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export function computeLeagueStandings(
  clubs: RegisteredClub[] = CLUBS,
  results: MatchResult[] = []
): ClubStandingRow[] {
  const tableMap = new Map<number, Omit<ClubStandingRow, 'rank'>>();
  const nameMap = new Map<string, Omit<ClubStandingRow, 'rank'>>();

  for (const club of clubs) {
    const row = {
      club,
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
    tableMap.set(club.id, row);
    nameMap.set(club.name.toLowerCase().trim(), row);
  }

  for (const match of results) {
    const home =
      tableMap.get(match.homeClubId) ||
      (match.homeClubName ? nameMap.get(match.homeClubName.toLowerCase().trim()) : undefined);
    const away =
      tableMap.get(match.awayClubId) ||
      (match.awayClubName ? nameMap.get(match.awayClubName.toLowerCase().trim()) : undefined);
    if (!home || !away) continue;

    home.gamesPlayed += 1;
    away.gamesPlayed += 1;

    home.goalsFor += match.homeGoals;
    home.goalsAgainst += match.awayGoals;
    away.goalsFor += match.awayGoals;
    away.goalsAgainst += match.homeGoals;

    if (match.homeGoals > match.awayGoals) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (match.homeGoals < match.awayGoals) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;
  }

  const sorted = Array.from(tableMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.club.name.localeCompare(b.club.name);
  });

  return sorted.map((row, index) => ({
    ...row,
    rank: index + 1,
  }));
}
