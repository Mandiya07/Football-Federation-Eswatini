import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { CLUBS } from '@/data/clubs';
import { FixtureRecord, FixtureStatus, sortFixturesChronologically, validateFixtureInput } from '@/utils/fixtures';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, Clock, MapPin, Search, Shield, Trash2, Trophy } from 'lucide-react';

interface FixturesProps {
  canManage?: boolean;
  onRecordScore?: (fixture: FixtureRecord) => void;
  externalFixtures?: FixtureRecord[];
}

function ClubCrest({ clubId, clubName }: { clubId: number; clubName: string }) {
  const [imgError, setImgError] = useState(false);
  const club = CLUBS.find((c) => c.id === clubId);
  const src = club?.image;

  if (!src || imgError) {
    return (
      <div className="w-9 h-9 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-200 flex items-center justify-center shrink-0">
        <Shield className="w-4 h-4" />
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-900 shrink-0">
      <img
        src={src}
        alt={clubName}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function Fixtures({ canManage = false, onRecordScore, externalFixtures }: FixturesProps) {
  const { user } = useAuth();
  const [fixtures, setFixtures] = useState<FixtureRecord[]>(externalFixtures ?? []);
  const [loading, setLoading] = useState(externalFixtures === undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | FixtureStatus>('All');

  // Admin scheduling form state
  const [homeClubId, setHomeClubId] = useState<number>(CLUBS[0]?.id ?? 1);
  const [awayClubId, setAwayClubId] = useState<number>(CLUBS[1]?.id ?? 2);
  const [matchday, setMatchday] = useState<string>('1');
  const [matchDate, setMatchDate] = useState<string>(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().slice(0, 10);
  });
  const [kickoffTime, setKickoffTime] = useState<string>('15:00');
  const [venue, setVenue] = useState<string>(CLUBS[0]?.stadium ?? '');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (externalFixtures !== undefined) {
      setFixtures(sortFixturesChronologically(externalFixtures));
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'fixtures'), orderBy('matchDate', 'asc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows: FixtureRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const rawStatus = String(data.status || 'Scheduled');
          const status: FixtureStatus =
            rawStatus === 'Postponed' || rawStatus === 'Completed' ? rawStatus : 'Scheduled';

          return {
            id: docSnap.id,
            homeClubId: Number(data.homeClubId),
            awayClubId: Number(data.awayClubId),
            homeClubName: String(data.homeClubName || ''),
            awayClubName: String(data.awayClubName || ''),
            matchDate: String(data.matchDate || ''),
            kickoffTime: String(data.kickoffTime || '15:00'),
            matchday: Number(data.matchday || 1),
            venue: String(data.venue || ''),
            status,
            scheduledBy: data.scheduledBy ? String(data.scheduledBy) : undefined,
          };
        });
        setFixtures(sortFixturesChronologically(rows));
        setLoadError(null);
        setLoading(false);
      },
      (err) => {
        setLoadError('Unable to load fixtures right now.');
        setLoading(false);
        try {
          handleFirestoreError(err, OperationType.LIST, 'fixtures');
        } catch {
          // Structured error logged in handleFirestoreError
        }
      }
    );

    return () => unsubscribe();
  }, [externalFixtures]);

  const handleHomeClubChange = (newHomeId: number) => {
    setHomeClubId(newHomeId);
    const selectedHome = CLUBS.find((c) => c.id === newHomeId);
    if (selectedHome) {
      setVenue(selectedHome.stadium);
    }
  };

  const handleScheduleFixture = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!user) {
      setFeedback({ type: 'error', message: 'You must be signed in as an admin to schedule fixtures.' });
      return;
    }

    const parsedMatchday = Number.parseInt(matchday, 10);
    const validationError = validateFixtureInput({
      homeClubId,
      awayClubId,
      matchDate,
      kickoffTime,
      matchday: parsedMatchday,
      venue,
    });

    if (validationError) {
      setFeedback({ type: 'error', message: validationError });
      return;
    }

    const homeClub = CLUBS.find((c) => c.id === homeClubId);
    const awayClub = CLUBS.find((c) => c.id === awayClubId);
    if (!homeClub || !awayClub) {
      setFeedback({ type: 'error', message: 'Selected clubs could not be found in the official registry.' });
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, 'fixtures'), {
        homeClubId: homeClub.id,
        awayClubId: awayClub.id,
        homeClubName: homeClub.name.slice(0, 200),
        awayClubName: awayClub.name.slice(0, 200),
        matchDate: matchDate.trim().slice(0, 32),
        kickoffTime: kickoffTime.trim().slice(0, 16),
        matchday: parsedMatchday,
        venue: venue.trim().slice(0, 200),
        status: 'Scheduled',
        scheduledBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setFeedback({
        type: 'success',
        message: `Scheduled ${homeClub.name} vs ${awayClub.name} on ${matchDate} at ${kickoffTime}.`,
      });
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, 'fixtures');
      } catch {
        setFeedback({
          type: 'error',
          message: 'Could not save fixture. Verify admin permissions and network connection.',
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePostponed = async (fixture: FixtureRecord) => {
    setFeedback(null);
    const nextStatus: FixtureStatus = fixture.status === 'Postponed' ? 'Scheduled' : 'Postponed';
    try {
      await updateDoc(doc(db, 'fixtures', fixture.id), {
        homeClubId: fixture.homeClubId,
        awayClubId: fixture.awayClubId,
        homeClubName: fixture.homeClubName.slice(0, 200),
        awayClubName: fixture.awayClubName.slice(0, 200),
        matchDate: fixture.matchDate.slice(0, 32),
        kickoffTime: fixture.kickoffTime.slice(0, 16),
        matchday: fixture.matchday,
        venue: fixture.venue.slice(0, 200),
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
      setFeedback({
        type: 'success',
        message: `Updated ${fixture.homeClubName} vs ${fixture.awayClubName} status to ${nextStatus}.`,
      });
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, `fixtures/${fixture.id}`);
      } catch {
        setFeedback({ type: 'error', message: 'Could not update fixture status.' });
      }
    }
  };

  const handleDeleteFixture = async (fixture: FixtureRecord) => {
    setFeedback(null);
    try {
      await deleteDoc(doc(db, 'fixtures', fixture.id));
      setFeedback({
        type: 'success',
        message: `Removed fixture: ${fixture.homeClubName} vs ${fixture.awayClubName}.`,
      });
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.DELETE, `fixtures/${fixture.id}`);
      } catch {
        setFeedback({ type: 'error', message: 'Failed to remove fixture. Verify admin permissions.' });
      }
    }
  };

  const filteredFixtures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return fixtures.filter((f) => {
      if (statusFilter !== 'All' && f.status !== statusFilter) {
        return false;
      }
      if (!q) return true;
      return (
        f.homeClubName.toLowerCase().includes(q) ||
        f.awayClubName.toLowerCase().includes(q) ||
        f.venue.toLowerCase().includes(q)
      );
    });
  }, [fixtures, searchQuery, statusFilter]);

  const upcomingCount = fixtures.filter((f) => f.status === 'Scheduled').length;

  return (
    <div id="fixtures" className="space-y-6">
      {canManage && (
        <Card className="border border-zinc-200 bg-white">
          <CardHeader className="border-b border-zinc-100 pb-5">
            <CardTitle className="flex items-center gap-2.5 text-zinc-950 text-xl font-bold tracking-tight">
              <CalendarDays className="w-5 h-5 text-emerald-700 shrink-0" />
              Schedule Upcoming Fixture
            </CardTitle>
            <CardDescription className="text-zinc-600 text-sm">
              Assign a match between two registered clubs with date, kickoff time, and stadium venue.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {feedback && (
              <div
                className={`mb-5 px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-between gap-4 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                <span>{feedback.message}</span>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="text-xs underline shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleScheduleFixture} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fixture-home-club">Home Club</Label>
                  <select
                    id="fixture-home-club"
                    value={homeClubId}
                    onChange={(e) => handleHomeClubChange(Number(e.target.value))}
                    className="w-full h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  >
                    {CLUBS.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixture-away-club">Away Club</Label>
                  <select
                    id="fixture-away-club"
                    value={awayClubId}
                    onChange={(e) => setAwayClubId(Number(e.target.value))}
                    className="w-full h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  >
                    {CLUBS.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fixture-matchday">Matchday</Label>
                  <Input
                    id="fixture-matchday"
                    type="number"
                    min={1}
                    max={50}
                    value={matchday}
                    onChange={(e) => setMatchday(e.target.value)}
                    className="font-mono tabular-nums"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixture-date">Match Date</Label>
                  <Input
                    id="fixture-date"
                    type="date"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="font-mono tabular-nums"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixture-time">Kickoff Time</Label>
                  <Input
                    id="fixture-time"
                    type="time"
                    value={kickoffTime}
                    onChange={(e) => setKickoffTime(e.target.value)}
                    className="font-mono tabular-nums"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixture-venue">Venue / Stadium</Label>
                  <Input
                    id="fixture-venue"
                    type="text"
                    maxLength={200}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Stadium name"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-6 whitespace-nowrap shrink-0"
                >
                  {saving ? 'Scheduling...' : 'Schedule Fixture'}
                </Button>
                <span className="text-xs text-zinc-500">
                  Selecting a Home Club automatically suggests its registered stadium.
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border border-zinc-200 bg-white overflow-hidden">
        <CardHeader className="bg-zinc-950 text-white border-b border-zinc-800 pb-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Match Fixtures Calendar
              </CardTitle>
              <CardDescription className="text-zinc-400 text-sm mt-1">
                Indvundvundvwane Major League · {upcomingCount} upcoming{' '}
                {upcomingCount === 1 ? 'fixture' : 'fixtures'} scheduled
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
                {(['All', 'Scheduled', 'Postponed', 'Completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatusFilter(tab)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      statusFilter === tab
                        ? 'bg-white text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter club or stadium..."
                  aria-label="Filter fixtures by club or stadium"
                  className="pl-9 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-9 text-sm"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loadError && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-200 text-sm text-red-800">
              {loadError}
            </div>
          )}

          {loading ? (
            <div className="divide-y divide-zinc-200">
              {[0, 1, 2].map((rowIdx) => (
                <div key={rowIdx} className="px-6 py-5 flex items-center justify-between gap-4 animate-pulse">
                  <div className="h-4 w-32 bg-zinc-200 rounded" />
                  <div className="h-5 w-64 bg-zinc-200 rounded" />
                  <div className="h-4 w-40 bg-zinc-200 rounded" />
                </div>
              ))}
            </div>
          ) : filteredFixtures.length === 0 ? (
            <div className="px-6 py-12 text-center space-y-2">
              <CalendarDays className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-sm font-semibold text-zinc-900">
                {fixtures.length === 0
                  ? 'No upcoming fixtures scheduled yet'
                  : 'No fixtures match the selected filter'}
              </p>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                {fixtures.length === 0
                  ? canManage
                    ? 'Use the scheduling form above to set match dates, kickoff times, and venues between registered clubs.'
                    : 'Fixtures are in pre-season preparation. Scheduled matches published by the Federation will appear here automatically.'
                  : 'Try clearing the club search or selecting another fixture status.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-200">
              {filteredFixtures.map((fixture) => {
                const statusColor =
                  fixture.status === 'Completed'
                    ? 'text-emerald-700'
                    : fixture.status === 'Postponed'
                    ? 'text-amber-700'
                    : 'text-zinc-700';

                return (
                  <div
                    key={fixture.id}
                    className="px-6 py-4 hover:bg-zinc-50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 font-mono tabular-nums">
                        <span className="font-semibold text-zinc-800">Matchday {fixture.matchday}</span>
                        <span aria-hidden="true">·</span>
                        <span>{fixture.matchDate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          {fixture.kickoffTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={`font-sans font-semibold ${statusColor}`}>
                          {fixture.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-0.5">
                        <Link
                          to={`/clubs/${fixture.homeClubId}`}
                          className="flex items-center gap-2.5 min-w-0 group"
                        >
                          <ClubCrest clubId={fixture.homeClubId} clubName={fixture.homeClubName} />
                          <span className="font-bold text-zinc-950 group-hover:text-primary transition-colors truncate">
                            {fixture.homeClubName}
                          </span>
                        </Link>

                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 px-1.5">
                          vs
                        </span>

                        <Link
                          to={`/clubs/${fixture.awayClubId}`}
                          className="flex items-center gap-2.5 min-w-0 group"
                        >
                          <ClubCrest clubId={fixture.awayClubId} clubName={fixture.awayClubName} />
                          <span className="font-bold text-zinc-950 group-hover:text-primary transition-colors truncate">
                            {fixture.awayClubName}
                          </span>
                        </Link>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{fixture.venue}</span>
                      </div>
                    </div>

                    {canManage && (
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {onRecordScore && fixture.status !== 'Completed' && (
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => onRecordScore(fixture)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white whitespace-nowrap shrink-0"
                          >
                            <Trophy className="w-3.5 h-3.5 mr-1.5" />
                            Record Score
                          </Button>
                        )}
                        {fixture.status !== 'Completed' && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleTogglePostponed(fixture)}
                            className="border-zinc-300 text-zinc-800 whitespace-nowrap shrink-0"
                          >
                            {fixture.status === 'Postponed' ? 'Reinstate' : 'Postpone'}
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteFixture(fixture)}
                          aria-label={`Remove fixture ${fixture.homeClubName} vs ${fixture.awayClubName}`}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
