import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CLUBS } from '@/data/clubs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  MapPin, 
  ShieldCheck, 
  Camera, 
  Globe, 
  Twitter, 
  Instagram, 
  Users, 
  Trophy, 
  History, 
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileText,
  TrendingUp,
  UserCheck,
  Target,
  Heart,
  BarChart3,
  Activity,
  ChevronDown,
  ChevronUp,
  Share2,
  MessageCircle,
  Shirt
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function ClubProfile() {
  const { id } = useParams<{ id: string }>();
  const club = CLUBS.find(c => c.id === Number(id));

  if (!club) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Club not found</h1>
        <Button asChild><Link to="/clubs">Return to Clubs</Link></Button>
      </div>
    );
  }

  // Mock data for the specific club
  const roster = [
    { name: "Sibusiso Dlamini", position: "Goalkeeper", number: 1, apps: 24, goals: 0, assists: 0, yellow: 1, red: 0 },
    { name: "Mlungisi Ndlovu", position: "Defender", number: 4, apps: 22, goals: 1, assists: 1, yellow: 4, red: 0 },
    { name: "Vusi Mabuza", position: "Midfielder", number: 8, apps: 25, goals: 3, assists: 6, yellow: 3, red: 0 },
    { name: "Sifiso Zwane", position: "Forward", number: 9, apps: 20, goals: 12, assists: 2, yellow: 1, red: 0 },
    { name: "Bongani Nxumalo", position: "Forward", number: 11, apps: 18, goals: 7, assists: 3, yellow: 0, red: 0 },
    { name: "Thabo Kunene", position: "Midfielder", number: 10, apps: 21, goals: 5, assists: 8, yellow: 2, red: 0 },
    { name: "Zinhle Magagula", position: "Defender", number: 13, apps: 15, goals: 0, assists: 0, yellow: 5, red: 1 },
    { name: "Mandla Gwebu", position: "Defender", number: 20, apps: 12, goals: 2, assists: 1, yellow: 2, red: 0 },
  ];

  // Live match history loaded from official recorded fixtures for this club
  const [clubMatches, setClubMatches] = React.useState<any[]>([]);

  React.useEffect(() => {
    import('firebase/firestore').then(({ collection, query, orderBy, onSnapshot }) => {
      import('@/lib/firebase').then(({ db }) => {
        const q = query(collection(db, 'matches'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const matches: any[] = [];
            snapshot.docs.forEach((docSnap) => {
              const data = docSnap.data();
              const homeId = Number(data.homeClubId);
              const awayId = Number(data.awayClubId);
              const homeName = String(data.homeClubName || '');
              const awayName = String(data.awayClubName || '');

              const isHome = homeId === club.id || homeName.toLowerCase() === club.name.toLowerCase();
              const isAway = awayId === club.id || awayName.toLowerCase() === club.name.toLowerCase();

              if (isHome || isAway) {
                const myGoals = isHome ? Number(data.homeGoals || 0) : Number(data.awayGoals || 0);
                const oppGoals = isHome ? Number(data.awayGoals || 0) : Number(data.homeGoals || 0);
                const result = myGoals > oppGoals ? 'W' : myGoals < oppGoals ? 'L' : 'D';
                const opponent = isHome ? awayName : homeName;

                matches.push({
                  id: docSnap.id,
                  opponent,
                  result,
                  score: `${myGoals}-${oppGoals}`,
                  date: String(data.matchDate || ''),
                  type: `Matchday ${data.matchday || 1}`,
                  venue: String(data.venue || ''),
                });
              }
            });
            setClubMatches(matches);
          },
          (err) => {
            console.warn('Notice: Club matches subscription', err);
          }
        );
        return () => unsubscribe();
      });
    });
  }, [club.id, club.name]);

  const [expandedMatch, setExpandedMatch] = React.useState<number | null>(null);
  const [resultFilter, setResultFilter] = React.useState('All');
  const [shareCopied, setShareCopied] = React.useState(false);

  const filteredMatches = clubMatches.filter((match) => {
    const resultMatch = resultFilter === 'All' || match.result === resultFilter;
    return resultMatch;
  });

  const photos = [
    club.image,
    "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518605368461-1e1e11415082?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: `url('${club.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10 text-white">
          <Link to="/clubs" className="inline-flex items-center text-sm font-medium hover:text-blue-400 transition-colors mb-6 text-gray-300">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clubs
          </Link>
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-blue-400 border-blue-400 uppercase tracking-widest">{club.category} Division</Badge>
                {club.category === 'Elite' && (
                  <Badge variant="secondary" className="bg-blue-600 text-white border-none flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Elite Certified
                  </Badge>
                )}
                {club.funding && (
                  <Badge className="bg-yellow-500 text-black border-none flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Investment Ready
                  </Badge>
                )}
                <Badge variant="outline" className="text-green-400 border-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Infrastructure Verified
                </Badge>
              </div>
              <h1 className="text-5xl font-bold tracking-tighter mb-2">{club.name}</h1>
              <p className="text-xl text-gray-300 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" /> {club.city}, Eswatini
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button asChild size="icon" variant="outline" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white transition-all hover:scale-110" title="Club Website">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4" />
                </a>
              </Button>
              <Button onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: club.name,
                    text: `Check out ${club.name} on the Football Federation Eswatini platform!`,
                    url: url
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(url);
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2000);
                }
              }} size={shareCopied ? "sm" : "icon"} variant="outline" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white transition-all hover:scale-105" title="Share via Device">
                {shareCopied ? (
                  <span className="text-xs font-bold px-2 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Copied</span>
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </Button>
              <Button asChild size="icon" variant="outline" className="rounded-full bg-white/10 border-white/20 hover:bg-blue-500 hover:border-blue-500 text-white transition-all hover:scale-110" title="Share on Twitter">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out ' + club.name + ' on Football Federation Eswatini!')}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="icon" variant="outline" className="rounded-full bg-white/10 border-white/20 hover:bg-green-500 hover:border-green-500 text-white transition-all hover:scale-110" title="Share on WhatsApp">
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out ' + club.name + ' on Football Federation Eswatini! ' + window.location.href)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview & Key Goals */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-red-600" /> Season Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5" />
                      <span>Top 3 Finish in Elite Division</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5" />
                      <span>Qualify for CAF Confederation Cup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5" />
                      <span>Launch U-17 Youth Academy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Heart className="w-5 h-5 text-pink-600" /> Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-600 mt-1.5" />
                      <span>Weekly Free Schools Clinic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-600 mt-1.5" />
                      <span>Sustainable Stadium Recycling Initiative</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-600 mt-1.5" />
                      <span>Local Business Partnership Network</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* History & Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <History className="w-6 h-6 text-blue-600" /> Club Overview & History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-600 leading-relaxed">
                <div className="space-y-4">
                  <p>
                    {club.description} Founded in the early days of professional football in Eswatini, the club has grown to become one of the most recognized institutions in the region.
                  </p>
                  <p>
                    The club has always stood for technical excellence and community engagement. Over the decades, they have produced numerous national team players and won several domestic cups. Their commitment to the new FFE professional standards aligns perfectly with their modern vision for a sustainable football enterprise.
                  </p>
                </div>

                {/* Timeline Component */}
                <div className="pt-6 border-t border-zinc-100">
                  <h4 className="text-sm font-black uppercase text-gray-400 tracking-widest mb-8">Evolution & Milestones</h4>
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[1.35rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-blue-200 before:to-transparent">
                    {[
                      { year: '1982', title: 'Club Founding', desc: 'Established as a community-driven football collective in the heart of the district.', icon: <Building className="w-3.5 h-3.5" /> },
                      { year: '1995', title: 'First Major Trophy', desc: 'Victory in the Eswatini Cup, marking the club\'s entry into the national elite.', icon: <Trophy className="w-3.5 h-3.5" /> },
                      { year: '2008', title: 'Stadium Opening', desc: 'The club moved to its current home, establishing a permanent base for fans.', icon: <MapPin className="w-3.5 h-3.5" /> },
                      { year: '2015', title: 'Record Signing', desc: 'Landmark transfer of the national team captain, elevating technical standards.', icon: <Users className="w-3.5 h-3.5" /> },
                      { year: '2024', title: 'Elite Division Entry', desc: 'Secured promotion and full FFE professional membership status.', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                      { year: '2026', title: 'Global Digital Link', desc: 'Official launch of digital fan engagement and interactive stats platforms.', icon: <Globe className="w-3.5 h-3.5" /> },
                    ].map((milestone, idx) => (
                      <div key={idx} className="relative flex items-start group">
                        <div className="sticky top-0 flex flex-col items-center justify-center">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-xl shadow-blue-100 transition-all group-hover:scale-110 z-10">
                            {milestone.icon}
                          </div>
                        </div>
                        <div className="ml-6 pt-1 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-1">
                            <span className="text-sm font-black text-blue-600 whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded leading-none">{milestone.year}</span>
                            <h5 className="font-bold text-gray-900 tracking-tight">{milestone.title}</h5>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed font-medium">{milestone.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Youth Academy */}
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Users className="w-5 h-5 text-green-600" /> Youth Academy
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    State-of-the-art youth development program integrating elite football training with formal education, ensuring homegrown talent pipelines.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded border">
                      <span className="text-sm font-bold">U19 Elite Squad</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded border">
                      <span className="text-sm font-bold">U15 Development</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded border">
                      <span className="text-sm font-bold">U11 Mixed Nursery</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fan Engagement & Digital */}
              <Card className="flex flex-col h-full bg-blue-600 text-white border-blue-500 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <Globe className="w-5 h-5 text-blue-200" /> Global Fan Ecosystem
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-sm text-blue-100 mb-4 flex-1">
                    Integrating fans globally through high-tier membership apps, interactive match streaming, and dynamic loyalty rewards.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-500 pb-2">
                       <span className="text-sm font-medium">Active Members</span>
                       <span className="font-black text-lg">24,500+</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-blue-500 pb-2">
                       <span className="text-sm font-medium">Digital Reach</span>
                       <span className="font-black text-lg">1.2M</span>
                    </div>
                    <Button variant="secondary" className="w-full mt-2 font-bold tracking-widest uppercase text-xs">Join Official App</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sports Science */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="w-5 h-5 text-purple-600" /> Sports Science & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                     <h4 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-1">Medical Dept</h4>
                     <p className="text-sm font-medium text-gray-900">Advanced injury prevention protocols & on-site physiotherapists.</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                     <h4 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-1">Performance Data</h4>
                     <p className="text-sm font-medium text-gray-900">GPS tracking & biometric analysis for all first-team & U19 players.</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                     <h4 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-1">Tactical Analysis</h4>
                     <p className="text-sm font-medium text-gray-900">AI-driven video scouting and match insights integrated.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Pitch & Funding Needs (Dynamic) */}
            {club.funding && (
              <Card className="border-t-4 border-t-yellow-500 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2 text-yellow-600">
                         Investment Pitch & Funding Needs
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Active equity offering on the FFE Investment Marketplace.
                      </CardDescription>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 px-3 py-1 text-sm">
                      {club.funding.stage} Round
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-zinc-50 border rounded-lg">
                       <p className="text-sm text-gray-500 mb-1">Target Capital</p>
                       <p className="font-bold text-3xl text-blue-600">{club.funding.seeking}</p>
                    </div>
                    <div className="p-4 bg-zinc-50 border rounded-lg">
                       <p className="text-sm text-gray-500 mb-1">Equity Offered</p>
                       <p className="font-bold text-3xl text-gray-900">{club.funding.equity}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Use of Funds</h4>
                    <p className="text-gray-700 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">{club.funding.purpose}</p>
                  </div>

                  <div className="mb-6">
                     <div className="flex justify-between text-sm text-gray-500 mb-2">
                       <span>Funding Progress</span>
                       <span className="font-bold text-gray-900">{club.funding.progress}%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="bg-blue-600 rounded-full h-3" style={{ width: `${club.funding.progress}%` }}></div>
                     </div>
                  </div>
                  
                  <div className="flex gap-4">
                     <Button className="flex-1 bg-black text-white hover:bg-black/80">Request Pitch Deck</Button>
                     <Button variant="outline" className="flex-1 border-gray-300 text-black">Contact Club Board</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Kits & Colors Section */}
            {(club as any).kits && (
              <Card className="border-t-4 border-t-blue-600 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Shirt className="w-6 h-6 text-blue-600" /> Official Match Kits & Colors
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Official Home and Away strips registered with the Federation.
                      </CardDescription>
                    </div>
                    {club.name === "Qomintaba Warriors FC" && (
                      <Badge className="bg-black text-white px-3 py-1 text-xs font-bold">
                        Est. 1970 • Baick Mashuba
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {club.name === "Qomintaba Warriors FC" && (
                    <div className="rounded-xl overflow-hidden mb-6 border shadow-md bg-zinc-950 p-3 text-center">
                      <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation & Crest</p>
                      <img 
                        src="/assets/aistudio/Qomintaba_Warriors_FC_cd502241.jpg" 
                        alt="Qomintaba Warriors FC Kits" 
                        className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                      />
                    </div>
                  )}
                  {club.name === "Mbabane United FC" && (
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-2 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Home Strip (Brown &amp; Gold)</p>
                        <img 
                          src="/assets/aistudio/mbabane_united_kit_2ca7597c.jpg" 
                          alt="Mbabane United Home Kit" 
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-2 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">First Away Strip (White &amp; Gold)</p>
                        <img 
                          src="/assets/aistudio/mbabane_united_kit1_92ef9c51.jpg" 
                          alt="Mbabane United Away Kit 1" 
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-2 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Second Away Strip (Gold &amp; Brown)</p>
                        <img 
                          src="/assets/aistudio/mbabane_united_kit2_6059d53e.jpg" 
                          alt="Mbabane United Away Kit 2" 
                          className="w-full h-auto max-h-[300px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Nhlangano Seven Stars FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center max-w-sm mx-auto">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Club Crest ("Soccer at Heart")</p>
                        <img 
                          src="/assets/aistudio/nhlangano_seven_sars_fc_logo_4e77c008.jpg" 
                          alt="Nhlangano Seven Stars FC Logo" 
                          className="w-48 h-48 object-contain rounded-full mx-auto border-2 border-orange-500/40 shadow-lg bg-black"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation (Home Orange, Away Black/Pink, Third White/Orange)</p>
                        <img 
                          src="/assets/aistudio/nhlangano_seven_stars_fc_kit_af398824.jpg" 
                          alt="Nhlangano Seven Stars FC Kits" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Mpolonjeni Young Zebras F.C." && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center max-w-sm mx-auto">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Club Crest (Est. 1984)</p>
                        <img 
                          src="/assets/aistudio/mpolonjeni_young_zebras_fc_logo_7f0dad02.jpg" 
                          alt="Mpolonjeni Young Zebras F.C. Logo" 
                          className="w-48 h-48 object-contain rounded-full mx-auto border-2 border-white/40 shadow-lg bg-black"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation (Home B&amp;W, Away Blue/Gold, Third Gold/Black)</p>
                        <img 
                          src="/assets/aistudio/mpolonjeni_young_zebras_fc_kit_0c3695d7.jpg" 
                          alt="Mpolonjeni Young Zebras F.C. Kits" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Velezizweni FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation &amp; Crest ("Rise, United, Conquer.")</p>
                        <img 
                          src="/assets/aistudio/velezizweni_fc_6c543c8e.jpg" 
                          alt="Velezizweni FC Kits and Crest" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Ngcoseni United FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center max-w-sm mx-auto">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Club Crest (Est. 1990 • "Time Will Tell")</p>
                        <img 
                          src="/assets/aistudio/ngcoseni_united_fc_logo_679143a7.jpg" 
                          alt="Ngcoseni United FC Logo" 
                          className="w-48 h-48 object-contain rounded-full mx-auto border-2 border-blue-500/40 shadow-lg bg-black"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation (Home Green, Away White/Green, Third Blue)</p>
                        <img 
                          src="/assets/aistudio/ngcoseni_united_kit_fd6c517e.jpg" 
                          alt="Ngcoseni United FC Kits" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Mkhiweni Eagles FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation &amp; Crest ("The Executives" • Play • Compete • Excel)</p>
                        <img 
                          src="/assets/aistudio/mkhiweni_eagles_fc_debcb9cc.jpg" 
                          alt="Mkhiweni Eagles FC Kits and Crest" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Maguga Young Stars FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation &amp; Crest (Home Sky Blue, Away Navy, Second Away Green/Gold)</p>
                        <img 
                          src="/assets/aistudio/maguga_young_stars_fc_a71e96f2.jpg" 
                          alt="Maguga Young Stars FC Kits and Crest" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Lubombo United FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center max-w-sm mx-auto">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Club Crest ("One Region. One Pride. One Club.")</p>
                        <img 
                          src="/assets/aistudio/lubombo_united_fc_logo_7623f27f.jpg" 
                          alt="Lubombo United FC Logo" 
                          className="w-48 h-48 object-contain rounded-full mx-auto border-2 border-red-500/40 shadow-lg bg-black"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation ("Lubovu Lumankelenkele" • Home Red, Away White, GK Black/Lime)</p>
                        <img 
                          src="/assets/aistudio/lubombo_united_kit_a5751361.jpg" 
                          alt="Lubombo United FC Kits" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Khuphuka Ben United FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center max-w-sm mx-auto">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Club Crest (Hornbill Emblem)</p>
                        <img 
                          src="/assets/aistudio/khuphuka_ben_united_fc_logo_14821ed5.jpg" 
                          alt="Khuphuka Ben United FC Logo" 
                          className="w-48 h-48 object-contain rounded-full mx-auto border-2 border-red-500/40 shadow-lg bg-black"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation (Home Red/White, Away White/Red, Second Away Blue/Red)</p>
                        <img 
                          src="/assets/aistudio/khuphuka_ben_united_fc_kit_90b492fa.jpg" 
                          alt="Khuphuka Ben United FC Kits" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Kaphunga FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center max-w-sm mx-auto">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Club Crest (Soaring Swallow Emblem)</p>
                        <img 
                          src="/assets/aistudio/kaphunga_fc_logo_f5c7d6e0.jpg" 
                          alt="Kaphunga FC Logo" 
                          className="w-48 h-48 object-contain rounded-full mx-auto border-2 border-red-900/50 shadow-lg bg-black"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation (Home Maroon, Away White, Second Away Royal Blue)</p>
                        <img 
                          src="/assets/aistudio/kaphunga_fc_kit_3ca6f10d.jpg" 
                          alt="Kaphunga FC Kits" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  {club.name === "Gege United FC" && (
                    <div className="space-y-4 mb-6">
                      <div className="rounded-xl overflow-hidden border shadow-md bg-zinc-950 p-3 text-center">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Official Kit Presentation &amp; Crest (Home Red/White, Away White/Red, Second Away Cream/Blue)</p>
                        <img 
                          src="/assets/aistudio/gege_united_fc_76c84368.jpg" 
                          alt="Gege United FC Kits and Crest" 
                          className="w-full h-auto max-h-[450px] object-contain rounded-lg mx-auto"
                        />
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-3 gap-6">
                    {Object.values((club as any).kits).map((kit: any, idx: number) => (
                      <div key={idx} className="p-4 bg-zinc-50 border rounded-xl flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-base text-zinc-900">{kit.name}</span>
                            <div className="flex gap-1.5 items-center">
                              <span className="w-5 h-5 rounded-full border border-zinc-300 shadow-sm" style={{ backgroundColor: kit.primaryColor }} title="Primary Color" />
                              <span className="w-5 h-5 rounded-full border border-zinc-300 shadow-sm" style={{ backgroundColor: kit.secondaryColor }} title="Secondary Color" />
                            </div>
                          </div>
                          <p className="text-xs text-zinc-600 font-medium mb-1"><span className="font-bold">Jersey:</span> {kit.jersey}</p>
                          <p className="text-xs text-zinc-600 font-medium mb-1"><span className="font-bold">Shorts:</span> {kit.shorts}</p>
                          <p className="text-xs text-zinc-600 font-medium"><span className="font-bold">Socks:</span> {kit.socks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Infrastructure Verification Section */}
            <Card className="border-t-4 border-t-red-600 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Building className="w-6 h-6 text-red-600" /> Infrastructure Verification
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Official FFE compliance record for facilities and infrastructure.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Map */}
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 h-64 relative z-0">
                    <MapContainer 
                      center={club.location as [number, number]} 
                      zoom={13} 
                      scrollWheelZoom={false} 
                      style={{ height: '100%', width: '100%' }}
                      className="z-0"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      />
                      <Marker position={club.location as [number, number]} icon={customIcon}>
                        <Popup>{club.stadium}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  
                  {/* Facility Details */}
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-50 border rounded-lg">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Primary Stadium</h4>
                      <p className="text-lg font-bold text-gray-900">{club.stadium}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-600">Capacity</span>
                        <span className="font-bold">{club.capacity.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">Turf Type</span>
                        <span className="font-medium text-gray-900">Natural Grass</span>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-50 border rounded-lg flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Facility Development Plan</p>
                        <p className="text-xs text-gray-500">2026-2030 Roadmap</p>
                        <a href="#" className="text-blue-600 text-xs font-medium hover:underline mt-1 inline-block">Download PDF</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Photos */}
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2 mb-3">
                    <Camera className="w-4 h-4 text-gray-500" /> Verified Assessment Photos
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {photos.map((src, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <img src={src} alt={`Stadium verify ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Performance Stats / Official Match Form */}
            <Card>
              <CardHeader className="pb-3 border-b border-zinc-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-950">
                    <Trophy className="w-4 h-4 text-secondary shrink-0" />
                    Official Match Form
                  </CardTitle>
                  {clubMatches.length > 0 && (
                    <div className="flex items-center gap-1">
                      {['All', 'W', 'D', 'L'].map((r) => (
                        <button
                          key={r}
                          onClick={() => setResultFilter(r)}
                          className={`w-7 h-7 rounded-full text-[10px] font-black transition-all flex items-center justify-center ${
                            resultFilter === r
                              ? r === 'W'
                                ? 'bg-green-600 text-white'
                                : r === 'L'
                                ? 'bg-red-600 text-white'
                                : r === 'D'
                                ? 'bg-zinc-800 text-white'
                                : 'bg-black text-white'
                              : 'bg-zinc-100 text-gray-500 hover:bg-zinc-200'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {clubMatches.length === 0 ? (
                    <div className="py-8 text-center bg-zinc-50/50 rounded-xl border border-zinc-200 px-4">
                      <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-80" />
                      <p className="text-zinc-900 text-sm font-bold">Pre-Season Development Stage</p>
                      <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 mb-4">
                        No official league matches recorded yet for {club.name}. Upcoming scheduled fixtures will appear here once published.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-8 border-zinc-300" asChild>
                          <Link to="/fixtures">View Fixtures</Link>
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-zinc-950 text-white" asChild>
                          <Link to="/logs">View Logs</Link>
                        </Button>
                      </div>
                    </div>
                  ) : filteredMatches.length > 0 ? (
                    filteredMatches.map((match, i) => (
                      <div key={match.id || i} className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/60">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold text-white shrink-0 ${
                                match.result === 'W' ? 'bg-green-600' : match.result === 'L' ? 'bg-red-600' : 'bg-zinc-500'
                              }`}
                            >
                              {match.result}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-zinc-950 truncate">{match.opponent}</p>
                              <p className="text-[11px] text-zinc-500 truncate">
                                {match.date} • {match.type} {match.venue ? `• ${match.venue}` : ''}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono font-black text-sm text-zinc-950 px-2 py-0.5 bg-white rounded border border-zinc-200 shrink-0">
                            {match.score}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                      <History className="w-8 h-8 text-zinc-300 mx-auto mb-2 opacity-50" />
                      <p className="text-gray-500 text-sm font-bold tracking-tight">No Matches Found</p>
                      <p className="text-xs text-gray-400 mb-3 px-4">Adjust your result filter to see match history.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setResultFilter('All')}
                      >
                        Reset Filter
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Roster */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> First Team Roster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div className="flex text-[9px] uppercase font-bold text-gray-400 mb-2 px-2 border-b pb-1">
                    <span className="w-6">#</span>
                    <span className="flex-grow">Player</span>
                    <div className="flex gap-1.5 w-40 justify-end">
                      <span className="w-7 text-center" title="Appearances">APP</span>
                      <span className="w-5 text-center" title="Goals">G</span>
                      <span className="w-5 text-center" title="Assists">A</span>
                      <span className="w-5 text-center" title="Yellow Cards">Y</span>
                      <span className="w-5 text-center" title="Red Cards">R</span>
                    </div>
                  </div>
                  {roster.map((player, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-zinc-50 transition-all border-b border-zinc-100 last:border-none group">
                      <span className="w-6 flex justify-center text-xs font-black text-blue-600 group-hover:scale-110 transition-transform">
                        {player.number}
                      </span>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-gray-900 leading-none mb-1 truncate">{player.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tight">{player.position}</p>
                      </div>
                      <div className="flex gap-1.5 w-40 justify-end items-center">
                        <span className="w-7 text-center font-medium text-gray-400 text-[11px]">{player.apps}</span>
                        <span className="w-5 text-center font-black text-zinc-900 text-[11px]">{player.goals}</span>
                        <span className="w-5 text-center font-bold text-blue-600 text-[11px]">{player.assists}</span>
                        <span className="w-5 text-center font-bold text-yellow-600 text-[11px]">{player.yellow}</span>
                        <span className="w-5 text-center font-bold text-red-600 text-[11px]">{player.red}</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-900 leading-relaxed">
                    <span className="font-bold">Article IV Regional Policy:</span> Players from Mozambique, South Africa, Lesotho, Namibia, Botswana, and Zimbabwe are classified as local players for the first 5 seasons under FFE work permit facilitation, exempt from foreign quotas.
                  </div>
                  <Button variant="outline" className="w-full mt-3 text-[10px] h-8 uppercase tracking-widest font-bold">View Full Technical Report</Button>
                </div>
              </CardContent>
            </Card>

            {/* Management & Governance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-600" /> Key Officials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Musa Zwane</p>
                      <p className="text-xs text-gray-500">President • musa.z@club.sz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Thulani Sibiya</p>
                      <p className="text-xs text-gray-500">Chief Executive Officer • ceo@club.sz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Lindiwe Mdluli</p>
                      <p className="text-xs text-gray-500">Compliance Officer • compl@club.sz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Sihle Ntshalintshali</p>
                      <p className="text-xs text-gray-500">Head Coach • s.ntshali@club.sz</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t text-[10px] text-gray-400">
                    Compliant with FFE Governance Code 2026. Board structure verified.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p className="text-sm">Football Federation Eswatini &copy; 2026</p>
      </footer>
    </div>
  );
}
