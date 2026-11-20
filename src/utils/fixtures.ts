export type FixtureStatus = 'Scheduled' | 'Postponed' | 'Completed';

export interface FixtureRecord {
  id: string;
  homeClubId: number;
  awayClubId: number;
  homeClubName: string;
  awayClubName: string;
  matchDate: string;
  kickoffTime: string;
  matchday: number;
  venue: string;
  status: FixtureStatus;
  scheduledBy?: string;
}

export interface FixtureDraftInput {
  homeClubId: number;
  awayClubId: number;
  matchDate: string;
  kickoffTime: string;
  matchday: number;
  venue: string;
}

export function validateFixtureInput(input: FixtureDraftInput): string | null {
  if (!Number.isInteger(input.homeClubId) || input.homeClubId <= 0) {
    return 'Please select a valid registered Home Club.';
  }
  if (!Number.isInteger(input.awayClubId) || input.awayClubId <= 0) {
    return 'Please select a valid registered Away Club.';
  }
  if (input.homeClubId === input.awayClubId) {
    return 'Home club and Away club must be different teams.';
  }

  const trimmedDate = input.matchDate.trim();
  if (trimmedDate.length < 8 || trimmedDate.length > 32) {
    return 'Please choose a valid match date.';
  }

  const trimmedTime = input.kickoffTime.trim();
  if (trimmedTime.length < 4 || trimmedTime.length > 16) {
    return 'Please choose a valid kickoff time.';
  }

  if (!Number.isInteger(input.matchday) || input.matchday < 1 || input.matchday > 50) {
    return 'Matchday must be a whole number between 1 and 50.';
  }

  const trimmedVenue = input.venue.trim();
  if (trimmedVenue.length === 0 || trimmedVenue.length > 200) {
    return 'Please enter a stadium or venue name (up to 200 characters).';
  }

  return null;
}

export function sortFixturesChronologically<T extends Pick<FixtureRecord, 'matchDate' | 'kickoffTime' | 'matchday'>>(
  fixtures: T[]
): T[] {
  return [...fixtures].sort((a, b) => {
    const dateCmp = a.matchDate.localeCompare(b.matchDate);
    if (dateCmp !== 0) return dateCmp;

    const timeCmp = a.kickoffTime.localeCompare(b.kickoffTime);
    if (timeCmp !== 0) return timeCmp;

    return a.matchday - b.matchday;
  });
}
