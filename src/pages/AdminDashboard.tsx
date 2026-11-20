import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { LeagueStandings, RecordedMatch } from '@/components/LeagueStandings';
import { Fixtures } from '@/components/Fixtures';
import { FixtureRecord } from '@/utils/fixtures';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Building, ShieldCheck, Activity, CheckCircle2, XCircle, Trophy, Trash2, ArrowRight, CalendarDays } from 'lucide-react';
import { collection, query, getDocs, updateDoc, addDoc, deleteDoc, doc, serverTimestamp, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { CLUBS } from '@/data/clubs';

export function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const { user } = useAuth();

  // Match reporting state
  const [matches, setMatches] = useState<RecordedMatch[]>([]);
  const [homeClubId, setHomeClubId] = useState<number>(CLUBS[0]?.id || 1);
  const [awayClubId, setAwayClubId] = useState<number>(CLUBS[1]?.id || 2);
  const [homeGoals, setHomeGoals] = useState<string>('0');
  const [awayGoals, setAwayGoals] = useState<string>('0');
  const [matchday, setMatchday] = useState<string>('1');
  const [matchDate, setMatchDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [venue, setVenue] = useState<string>(CLUBS[0]?.stadium || '');
  const [selectedFixtureId, setSelectedFixtureId] = useState<string | null>(null);
  const [savingMatch, setSavingMatch] = useState(false);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(collection(db, 'applications'));
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(apps);
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const updateStatus = async (id: string, newStatus: string) => {
    setFeedback(null);
    try {
      await updateDoc(doc(db, 'applications', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      setFeedback({ type: 'success', message: `Application status updated to "${newStatus}".` });
    } catch (err) {
      console.error("Error updating status", err);
      setFeedback({ type: 'error', message: 'Failed to update status. Verify your admin permissions or network connection.' });
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedApps(prev => 
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedApps(applications.map(app => app.id));
    } else {
      setSelectedApps([]);
    }
  };

  const handleBulkAction = (newStatus: string) => {
    if (selectedApps.length === 0) return;
    setPendingAction(newStatus);
    setIsDialogOpen(true);
  };

  const confirmBulkAction = async () => {
    if (selectedApps.length === 0 || !pendingAction) return;
    setFeedback(null);
    
    try {
      await Promise.all(selectedApps.map(id => 
        updateDoc(doc(db, 'applications', id), {
          status: pendingAction,
          updatedAt: serverTimestamp()
        })
      ));
      
      const updatedCount = selectedApps.length;
      const targetStatus = pendingAction;
      setApplications(prev => prev.map(app => 
        selectedApps.includes(app.id) ? { ...app, status: pendingAction } : app
      ));
      setSelectedApps([]);
      setIsDialogOpen(false);
      setPendingAction(null);
      setFeedback({ type: 'success', message: `Updated ${updatedCount} application(s) to "${targetStatus}".` });
    } catch (err) {
      console.error("Error with bulk update", err);
      setIsDialogOpen(false);
      setFeedback({ type: 'error', message: 'Failed to perform bulk update. Verify permissions and try again.' });
    }
  };

  const pendingCount = applications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
  const approvedCount = applications.filter(a => a.status === 'Approved').length;

  const [reports, setReports] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'licensing' | 'fixtures' | 'matches' | 'reports'>('licensing');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, 'whistleblower_reports'));
        const querySnapshot = await getDocs(q);
        const rep = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(rep);
      } catch (err) {
        console.warn("Notice: whistleblower_reports query notice", err);
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user]);

  useEffect(() => {
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
        setMatches(rows);
      },
      (err) => {
        console.warn('Notice: matches listener notice', err);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleHomeClubChange = (newHomeId: number) => {
    setHomeClubId(newHomeId);
    setSelectedFixtureId(null);
    const club = CLUBS.find((c) => c.id === newHomeId);
    if (club) {
      setVenue(club.stadium);
    }
  };

  const handlePrepareMatchFromFixture = (fixture: FixtureRecord) => {
    setHomeClubId(fixture.homeClubId);
    setAwayClubId(fixture.awayClubId);
    setMatchday(String(fixture.matchday));
    setMatchDate(fixture.matchDate);
    setVenue(fixture.venue);
    setHomeGoals('0');
    setAwayGoals('0');
    setSelectedFixtureId(fixture.id);
    setFeedback(null);
    setActiveTab('matches');
  };

  const handleRecordMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!user) {
      setFeedback({ type: 'error', message: 'You must be signed in as an admin to record match scores.' });
      return;
    }

    if (homeClubId === awayClubId) {
      setFeedback({ type: 'error', message: 'Home club and Away club must be different teams.' });
      return;
    }

    const homeClub = CLUBS.find((c) => c.id === homeClubId);
    const awayClub = CLUBS.find((c) => c.id === awayClubId);
    if (!homeClub || !awayClub) {
      setFeedback({ type: 'error', message: 'Please select valid registered clubs.' });
      return;
    }

    const parsedHomeGoals = Number.parseInt(homeGoals, 10);
    const parsedAwayGoals = Number.parseInt(awayGoals, 10);
    const parsedMatchday = Number.parseInt(matchday, 10);

    if (
      Number.isNaN(parsedHomeGoals) ||
      Number.isNaN(parsedAwayGoals) ||
      parsedHomeGoals < 0 ||
      parsedHomeGoals > 99 ||
      parsedAwayGoals < 0 ||
      parsedAwayGoals > 99
    ) {
      setFeedback({ type: 'error', message: 'Scores must be whole numbers between 0 and 99.' });
      return;
    }

    if (Number.isNaN(parsedMatchday) || parsedMatchday < 1 || parsedMatchday > 50) {
      setFeedback({ type: 'error', message: 'Matchday must be between 1 and 50.' });
      return;
    }

    setSavingMatch(true);
    try {
      await addDoc(collection(db, 'matches'), {
        homeClubId: homeClub.id,
        awayClubId: awayClub.id,
        homeClubName: homeClub.name.slice(0, 200),
        awayClubName: awayClub.name.slice(0, 200),
        homeGoals: parsedHomeGoals,
        awayGoals: parsedAwayGoals,
        matchDate: (matchDate || new Date().toISOString().slice(0, 10)).slice(0, 32),
        matchday: parsedMatchday,
        venue: (venue.trim() || homeClub.stadium).slice(0, 200),
        recordedBy: user.uid,
        createdAt: serverTimestamp(),
      });

      if (selectedFixtureId) {
        await updateDoc(doc(db, 'fixtures', selectedFixtureId), {
          status: 'Completed',
          updatedAt: serverTimestamp(),
        });
        setSelectedFixtureId(null);
      }

      setHomeGoals('0');
      setAwayGoals('0');
      setFeedback({
        type: 'success',
        message: `Recorded final score: ${homeClub.name} ${parsedHomeGoals} - ${parsedAwayGoals} ${awayClub.name}. League Standings updated automatically.`,
      });
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, 'matches');
      } catch (wrappedErr: any) {
        setFeedback({
          type: 'error',
          message: 'Could not save match score. Verify admin permissions and network connection.',
        });
      }
    } finally {
      setSavingMatch(false);
    }
  };

  const handleDeleteMatch = async (matchId: string) => {
    setFeedback(null);
    try {
      await deleteDoc(doc(db, 'matches', matchId));
      setFeedback({ type: 'success', message: 'Match result removed. League Standings updated automatically.' });
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.DELETE, `matches/${matchId}`);
      } catch {
        setFeedback({ type: 'error', message: 'Failed to delete match result. Verify admin permissions.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Navbar />
      <div className="bg-black text-white py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl font-bold">System Administration</h1>
            <p className="text-gray-400">Federation Management Portal • Super Admin: {user?.email}</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-t-4 border-t-primary">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Integrity Reports</p>
                  <h4 className="text-2xl font-bold">{reports.length}</h4>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Clubs Registered</p>
                  <h4 className="text-2xl font-bold">{approvedCount}</h4>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-yellow-500">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Licensing</p>
                  <h4 className="text-2xl font-bold">{pendingCount}</h4>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-green-500">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">System Status</p>
                  <h4 className="text-xl font-bold text-green-600">All Ops Normal</h4>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Selector */}
        {feedback && (
          <div className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between ${feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)} className="text-xs underline ml-4">Dismiss</button>
          </div>
        )}
        <div className="flex flex-wrap gap-3 border-b border-zinc-200 pb-2">
          <Button 
            variant={activeTab === 'licensing' ? 'default' : 'outline'}
            onClick={() => setActiveTab('licensing')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'licensing' ? 'bg-black text-white' : ''}`}
          >
            Licensing Applications ({applications.length})
          </Button>
          <Button
            variant={activeTab === 'fixtures' ? 'default' : 'outline'}
            onClick={() => setActiveTab('fixtures')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'fixtures' ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'text-zinc-900 border-zinc-300'}`}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            Fixtures
          </Button>
          <Button 
            variant={activeTab === 'matches' ? 'default' : 'outline'}
            onClick={() => setActiveTab('matches')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'matches' ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'text-emerald-800 border-emerald-300'}`}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Match Reporting ({matches.length})
          </Button>
          <Button 
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
            className={`whitespace-nowrap shrink-0 ${activeTab === 'reports' ? 'bg-red-700 text-white hover:bg-red-800' : 'text-red-700 border-red-300'}`}
          >
            Whistleblower & Misconduct Reports ({reports.length})
          </Button>
        </div>
        
        {activeTab === 'licensing' ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Licensing Applications</CardTitle>
                  <CardDescription>Manage and review club applications according to FFE Standards.</CardDescription>
                </div>
                {selectedApps.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('Under Review')}>
                      Review Selected
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleBulkAction('Approved')}>
                      Approve Selected
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleBulkAction('Rejected')}>
                      Reject Selected
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
               {loading ? <p>Loading applications...</p> : (
                 applications.length === 0 ? <p className="text-gray-500 text-sm">No applications found.</p> :
                 <div className="space-y-4">
                   <div className="flex items-center gap-2 px-4 pb-2 border-b">
                     <input 
                       type="checkbox" 
                       className="w-4 h-4 rounded border-gray-300"
                       checked={applications.length > 0 && selectedApps.length === applications.length}
                       onChange={handleSelectAll}
                     />
                     <span className="text-sm font-medium text-gray-700">Select All</span>
                   </div>
                   {applications.map(app => (
                     <div key={app.id} className="border rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                       <div className="flex gap-4 items-center">
                         <input 
                           type="checkbox" 
                           className="w-4 h-4 rounded border-gray-300 shrink-0"
                           checked={selectedApps.includes(app.id)}
                           onChange={() => toggleSelection(app.id)}
                         />
                         <div>
                           <h4 className="font-bold">{app.clubName}</h4>
                           <p className="text-sm text-gray-500">ID: {app.id} • User: {app.userId}</p>
                           <span className={`inline-block mt-2 px-2 py-1 text-xs font-bold rounded ${app.status === 'Approved' ? 'bg-green-100 text-green-800' : app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                             {app.status}
                           </span>
                         </div>
                       </div>
                       <div className="flex gap-2">
                         {app.status !== 'Under Review' && app.status !== 'Approved' && app.status !== 'Rejected' && (
                           <Button size="sm" onClick={() => updateStatus(app.id, 'Under Review')}>Review</Button>
                         )}
                         {app.status === 'Under Review' && (
                           <>
                             <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateStatus(app.id, 'Approved')}>Approve</Button>
                             <Button size="sm" variant="destructive" onClick={() => updateStatus(app.id, 'Rejected')}>Reject</Button>
                           </>
                         )}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
              </CardContent>
            </Card>
          ) : activeTab === 'fixtures' ? (
            <Fixtures canManage={true} onRecordScore={handlePrepareMatchFromFixture} />
          ) : activeTab === 'matches' ? (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-emerald-200 shadow-md">
                  <CardHeader className="bg-emerald-50/60 border-b border-emerald-100">
                    <CardTitle className="flex items-center gap-2 text-emerald-950">
                      <Trophy className="w-5 h-5 text-emerald-700" />
                      Record Final Match Score
                    </CardTitle>
                    <CardDescription>
                      Submit verified full-time scores. The League Standings table updates automatically.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleRecordMatch} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="home-club">Home Club</Label>
                          <select
                            id="home-club"
                            value={homeClubId}
                            onChange={(e) => handleHomeClubChange(Number(e.target.value))}
                            className="w-full h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900"
                          >
                            {CLUBS.map((club) => (
                              <option key={club.id} value={club.id}>
                                {club.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="away-club">Away Club</Label>
                          <select
                            id="away-club"
                            value={awayClubId}
                            onChange={(e) => setAwayClubId(Number(e.target.value))}
                            className="w-full h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900"
                          >
                            {CLUBS.map((club) => (
                              <option key={club.id} value={club.id}>
                                {club.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="home-goals">Home Goals</Label>
                          <Input
                            id="home-goals"
                            type="number"
                            min={0}
                            max={99}
                            value={homeGoals}
                            onChange={(e) => setHomeGoals(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="away-goals">Away Goals</Label>
                          <Input
                            id="away-goals"
                            type="number"
                            min={0}
                            max={99}
                            value={awayGoals}
                            onChange={(e) => setAwayGoals(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="matchday">Matchday</Label>
                          <Input
                            id="matchday"
                            type="number"
                            min={1}
                            max={50}
                            value={matchday}
                            onChange={(e) => setMatchday(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="match-date">Match Date</Label>
                          <Input
                            id="match-date"
                            type="date"
                            value={matchDate}
                            onChange={(e) => setMatchDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="match-venue">Venue</Label>
                          <Input
                            id="match-venue"
                            type="text"
                            maxLength={200}
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="Stadium name"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <Button type="submit" disabled={savingMatch} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold">
                          {savingMatch ? 'Recording Score...' : 'Record Final Score'}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/logs">
                            Public Logs &amp; Standings <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader className="border-b border-zinc-100">
                    <CardTitle>Recorded Matches ({matches.length})</CardTitle>
                    <CardDescription>
                      Official results feeding the live Indvundvundvwane Major League Standings table.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {matches.length === 0 ? (
                      <div className="text-center py-10 text-zinc-500 text-sm">
                        <p className="font-semibold text-zinc-700">No matches recorded yet.</p>
                        <p className="text-xs text-zinc-400 mt-1">
                          Use the form on the left to record a played match score.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                        {matches.map((m) => (
                          <div
                            key={m.id}
                            className="border border-zinc-200 rounded-xl p-3.5 bg-zinc-50 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] font-semibold text-zinc-500 mb-1">
                                Matchday {m.matchday} • {m.matchDate} • {m.venue}
                              </div>
                              <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                                <span className="truncate">{m.homeClubName}</span>
                                <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-xs shrink-0">
                                  {m.homeGoals} - {m.awayGoals}
                                </span>
                                <span className="truncate">{m.awayClubName}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteMatch(m.id)}
                              aria-label={`Remove ${m.homeClubName} vs ${m.awayClubName} result`}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <LeagueStandings fixtures={matches} />
            </div>
          ) : (
          <Card className="border-red-200">
            <CardHeader className="bg-red-50/50 rounded-t-xl border-b border-red-100">
              <CardTitle className="text-red-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                Whistleblower & Misconduct Submissions
              </CardTitle>
              <CardDescription>
                Confidential reports submitted to the Independent Incorruptible Judiciary Panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {reports.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">
                  <p className="font-medium">No misconduct reports currently on record.</p>
                  <p className="text-xs text-zinc-400 mt-1">All reports sent via the Governance portal appear here for judicial review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className="border border-red-100 bg-red-50/20 rounded-xl p-5 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-red-800 text-sm px-2.5 py-1 bg-red-100 rounded-md">
                          {report.type}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          ID: {report.id}
                        </span>
                      </div>
                      <p className="text-zinc-800 text-sm whitespace-pre-wrap leading-relaxed mt-2">
                        {report.details}
                      </p>
                      <div className="text-xs text-zinc-500 pt-2 border-t border-zinc-200 flex justify-between">
                        <span>Reporter: {report.reporterId === 'anonymous' ? 'Anonymous Informant' : report.reporterId}</span>
                        <span>Audited under Pillar 3 Incorruptibility Shield</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p className="text-sm">FFE Admin Portal</p>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of {selectedApps.length} application{selectedApps.length !== 1 ? 's' : ''} to <strong>"{pendingAction}"</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmBulkAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
