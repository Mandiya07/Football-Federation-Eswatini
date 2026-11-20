import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CLUBS } from '@/data/clubs';
import { computeLeagueStandings, MatchResult } from '@/utils/standings';
import { IMFL_CLUB_SHAREHOLDER_COUNT } from '@/utils/ffeConstitution';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalendarClock, Search, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface RecordedMatch extends MatchResult {
  id: string;
  homeClubName: string;
  awayClubName: string;
  matchDate: string;
  matchday: number;
  venue: string;
}

interface LeagueStandingsProps {
  fixtures?: MatchResult[];
  showAllColumns?: boolean;
}

export function LeagueStandings({ fixtures, showAllColumns = true }: LeagueStandingsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveMatches, setLiveMatches] = useState<RecordedMatch[]>([]);

  useEffect(() => {
    if (fixtures !== undefined) return;

    const q = query(collection(db, 'matches'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows: RecordedMatch[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            homeClubId: Number(data.homeClubId),
            awayClubId: Number(data.awayClubId),
            homeClubName: String(data.homeClubName || ''),
            awayClubName: String(data.awayClubName || ''),
            homeGoals: Number(data.homeGoals || 0),
            awayGoals: Number(data.awayGoals || 0),
            matchDate: String(data.matchDate || ''),
            matchday: Number(data.matchday || 1),
            venue: String(data.venue || ''),
          };
        });
        setLiveMatches(rows);
      },
      (err) => {
        console.warn('Could not subscribe to live league match results:', err);
      }
    );

    return () => unsubscribe();
  }, [fixtures]);

  const activeResults: MatchResult[] = fixtures !== undefined ? fixtures : liveMatches;
  const standings = useMemo(() => computeLeagueStandings(CLUBS, activeResults), [activeResults]);

  const filteredStandings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return standings;
    return standings.filter(
      (row) =>
        row.club.name.toLowerCase().includes(q) ||
        row.club.city.toLowerCase().includes(q) ||
        row.club.stadium.toLowerCase().includes(q)
    );
  }, [standings, searchQuery]);

  const openSeats = Math.max(0, IMFL_CLUB_SHAREHOLDER_COUNT - CLUBS.length);
  const totalGamesPlayed = activeResults.length;

  return (
    <Card id="standings" className="border-zinc-200 shadow-lg bg-white overflow-hidden">
      <CardHeader className="bg-zinc-950 text-white border-b border-zinc-800 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
              alt="Indvundvundvwane Major League Logo"
              className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-secondary shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <CardTitle className="text-xl md:text-2xl font-black tracking-tight text-white">
                  League Standings
                </CardTitle>
                <Badge className="bg-secondary text-black font-bold text-xs">
                  {CLUBS.length} / {IMFL_CLUB_SHAREHOLDER_COUNT} Clubs
                </Badge>
              </div>
              <CardDescription className="text-zinc-400 text-sm">
                Indvundvundvwane Major Football League • Official Club Table
              </CardDescription>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search club or city..."
              aria-label="Filter league standings by club or city"
              className="pl-9 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-9 text-sm"
            />
          </div>
        </div>

        {totalGamesPlayed === 0 ? (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-amber-500/10 border border-amber-400/30 px-4 py-3 text-xs text-amber-200">
            <div className="flex items-start sm:items-center gap-2.5">
              <CalendarClock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="text-amber-300">Pre-Season Stage:</strong> No games or fixtures have been played yet. All registered clubs currently start at 0 GP, 0 GD, and 0 PTS.
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 shrink-0">
              Fixtures Pending
            </span>
          </div>
        ) : (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 px-4 py-3 text-xs text-emerald-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-emerald-300">Live Table Active:</strong> Automatically updated from {totalGamesPlayed} official match {totalGamesPlayed === 1 ? 'result' : 'results'}.
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-300 shrink-0">
              {totalGamesPlayed} {totalGamesPlayed === 1 ? 'Match' : 'Matches'} Recorded
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-zinc-50 border-b border-zinc-200">
            <TableRow className="hover:bg-zinc-50">
              <TableHead className="w-14 text-center font-bold text-zinc-700">Rank</TableHead>
              <TableHead className="font-bold text-zinc-700">Club</TableHead>
              <TableHead className="w-14 text-center font-bold text-zinc-700" title="Games Played">
                GP
              </TableHead>
              {showAllColumns && (
                <>
                  <TableHead className="hidden sm:table-cell w-12 text-center font-bold text-zinc-700" title="Wins">
                    W
                  </TableHead>
                  <TableHead className="hidden sm:table-cell w-12 text-center font-bold text-zinc-700" title="Draws">
                    D
                  </TableHead>
                  <TableHead className="hidden sm:table-cell w-12 text-center font-bold text-zinc-700" title="Losses">
                    L
                  </TableHead>
                  <TableHead className="hidden md:table-cell w-14 text-center font-bold text-zinc-700" title="Goals For">
                    GF
                  </TableHead>
                  <TableHead className="hidden md:table-cell w-14 text-center font-bold text-zinc-700" title="Goals Against">
                    GA
                  </TableHead>
                </>
              )}
              <TableHead className="w-16 text-center font-bold text-zinc-700" title="Goal Difference">
                GD
              </TableHead>
              <TableHead className="w-16 text-center font-black text-zinc-900" title="Points">
                PTS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStandings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showAllColumns ? 10 : 5} className="text-center py-10 text-zinc-500">
                  No registered clubs match &ldquo;{searchQuery}&rdquo;.
                </TableCell>
              </TableRow>
            ) : (
              filteredStandings.map((row) => {
                const primaryColor = (row.club as any).kits?.home?.primaryColor;
                const formattedGD =
                  row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`;

                return (
                  <TableRow key={row.club.id} className="hover:bg-zinc-50/80 transition-colors">
                    <TableCell className="text-center font-mono font-bold text-zinc-800">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs ${
                          row.rank <= 4 && totalGamesPlayed > 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        {row.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/clubs/${row.club.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-900 shrink-0">
                          <img
                            src={row.club.image}
                            alt={row.club.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 group-hover:text-primary transition-colors truncate">
                              {row.club.name}
                            </span>
                            {primaryColor && (
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-zinc-300 shrink-0"
                                style={{ backgroundColor: primaryColor }}
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="text-xs text-zinc-500 truncate">
                            {row.club.city} • {row.club.stadium}
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center font-mono text-zinc-700">
                      {row.gamesPlayed}
                    </TableCell>
                    {showAllColumns && (
                      <>
                        <TableCell className="hidden sm:table-cell text-center font-mono text-zinc-600">
                          {row.wins}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-center font-mono text-zinc-600">
                          {row.draws}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-center font-mono text-zinc-600">
                          {row.losses}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-center font-mono text-zinc-600">
                          {row.goalsFor}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-center font-mono text-zinc-600">
                          {row.goalsAgainst}
                        </TableCell>
                      </>
                    )}
                    <TableCell className="text-center font-mono font-medium text-zinc-700">
                      {formattedGD}
                    </TableCell>
                    <TableCell className="text-center font-mono font-black text-zinc-950 text-base">
                      {row.points}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {fixtures === undefined && liveMatches.length > 0 && (
          <div className="border-t border-zinc-200 bg-white px-6 py-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
              Latest Recorded Match Results
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {liveMatches.slice(0, 6).map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-semibold">Matchday {m.matchday}</span>
                    <span>{m.matchDate}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 font-bold text-zinc-900 text-sm">
                    <span className="truncate">{m.homeClubName}</span>
                    <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-xs shrink-0">
                      {m.homeGoals} - {m.awayGoals}
                    </span>
                    <span className="truncate text-right">{m.awayClubName}</span>
                  </div>
                  {m.venue && <div className="text-[11px] text-zinc-500 truncate">{m.venue}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-zinc-50 border-t border-zinc-200 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-secondary shrink-0" />
            <span>
              {openSeats > 0
                ? `${CLUBS.length} clubs registered • ${openSeats} Founding 16 shareholder ${openSeats === 1 ? 'spot' : 'spots'} remaining.`
                : `All ${IMFL_CLUB_SHAREHOLDER_COUNT} Founding Shareholder spots filled.`}
            </span>
          </div>
          {openSeats > 0 && (
            <Button size="sm" variant="outline" className="border-zinc-300 text-zinc-900 h-8 text-xs" asChild>
              <Link to="/apply">
                Apply for Seat #{CLUBS.length + 1} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
