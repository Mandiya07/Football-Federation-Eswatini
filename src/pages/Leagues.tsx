import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Building2, 
  CalendarDays, 
  Globe2, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase,
  Sparkles,
  Heart
} from 'lucide-react';
import { ConstitutionalPillars } from '@/components/ConstitutionalPillars';
import { LeagueStandings } from '@/components/LeagueStandings';
import { Fixtures } from '@/components/Fixtures';
import { isRegionalLocalEquivalentPlayer } from '@/utils/ffeConstitution';

export default function Leagues() {
  const { hash } = useLocation();
  const [selectedNation, setSelectedNation] = useState('South Africa');
  const [selectedSeason, setSelectedSeason] = useState(1);
  const isDomesticEquivalent = isRegionalLocalEquivalentPlayer(selectedNation, selectedSeason);

  useEffect(() => {
    if (hash === '#standings' || hash === '#fixtures') {
      const targetId = hash.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1431324155629-1a6fc1ac5eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <img
              src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
              alt="Indvundvundvwane Major League Official Logo"
              className="w-32 h-32 md:w-36 md:h-36 object-contain rounded-2xl bg-white p-2 shadow-2xl border-2 border-secondary"
            />
          </div>
          <Badge className="bg-secondary text-black font-black uppercase tracking-wider mb-4">
            Commercial Tier 1 & Professional Pyramid
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
            Indvundvundvwane Major Football League Eswatini
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium">
            A standalone private company owned 100% by its 16 participating clubs. Commercially independent under FFE jurisdiction, operating outside FIFA.
          </p>
        </div>
      </section>

      <section className="py-20 flex-grow bg-zinc-50">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Key Facts Quick Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <Building2 className="w-8 h-8 text-secondary mb-3" />
              <div className="text-2xl font-black text-black">16 Clubs</div>
              <p className="text-xs text-zinc-500 font-medium">Equal Company Shareholders</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <Users className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-black text-black">5 - 7 Board</div>
              <p className="text-xs text-zinc-500 font-medium">Elected Club Directors</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <CalendarDays className="w-8 h-8 text-emerald-600 mb-3" />
              <div className="text-2xl font-black text-black">Full Fixtures</div>
              <p className="text-xs text-zinc-500 font-medium">Released End of Current Season</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <Globe2 className="w-8 h-8 text-purple-600 mb-3" />
              <div className="text-2xl font-black text-black">6 SADC Nations</div>
              <p className="text-xs text-zinc-500 font-medium">5-Yr Domestic Player Status</p>
            </div>
          </div>

          {/* Official League Standings Table */}
          <div className="mb-12">
            <LeagueStandings />
          </div>

          {/* Upcoming Fixtures Calendar */}
          <div className="mb-20">
            <Fixtures />
          </div>

          {/* Pyramid Visual */}
          <div className="mb-24 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-12 text-center">The FFE Professional Pyramid</h2>
            <div className="w-full max-w-2xl flex flex-col items-center gap-4">
              <div className="w-[70%] bg-secondary text-black p-6 flex flex-col items-center justify-center rounded-t-xl shadow-xl relative border-2 border-secondary z-20">
                <img
                  src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
                  alt="Indvundvundvwane Major League Crest"
                  className="w-16 h-16 object-contain rounded-xl bg-white p-1 mb-2 shadow-md border border-black/10"
                />
                <span className="font-black text-xl uppercase tracking-widest text-center">
                  Indvundvundvwane Major League
                </span>
                <span className="text-sm font-semibold mt-1">Tier 1 • 16 Shareholder Clubs</span>
                <div className="absolute -bottom-8 bg-zinc-200 border-2 border-white rounded-full p-2 z-30 shadow-md">
                   <TrendingUp className="w-5 h-5 text-green-600 inline mr-1"/><TrendingDown className="w-5 h-5 text-red-600 inline"/>
                </div>
              </div>
              <div className="w-[85%] bg-black text-white p-6 flex flex-col items-center justify-center shadow-lg relative z-10 pt-10">
                <span className="font-bold text-lg uppercase tracking-widest">Federation League - Div 1</span>
                <span className="text-sm text-gray-400 mt-1">Tier 2 Promotion Pathway</span>
                <div className="absolute -bottom-8 bg-zinc-200 border-2 border-white rounded-full p-2 z-30 shadow-md">
                   <TrendingUp className="w-5 h-5 text-green-600 inline mr-1"/><TrendingDown className="w-5 h-5 text-red-600 inline"/>
                </div>
              </div>
              <div className="w-[100%] bg-zinc-800 text-white p-6 flex flex-col items-center justify-center rounded-b-xl shadow-md pt-10 relative">
                <span className="font-bold text-lg uppercase tracking-widest">Regional Division Leagues</span>
                <span className="text-sm text-gray-400 mt-1">Regional Grassroots Feeder Tiers</span>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-8 text-sm italic">Direct promotion and automatic share transfer between tiers.</p>
          </div>

          <div className="space-y-16 mb-20">
            {/* Indvundvundvwane Major League Deep Dive */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-secondary/50 p-1 shadow-sm overflow-hidden">
                  <img
                    src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
                    alt="Indvundvundvwane Major League Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">Indvundvundvwane Major League</h2>
                  <p className="text-zinc-600 text-sm">Standalone Private Corporate Commercial Entity</p>
                </div>
              </div>
              
              <Card className="border-secondary/50 shadow-lg bg-white overflow-hidden">
                <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 text-white p-6 border-b border-zinc-800">
                  <p className="text-sm text-zinc-300 leading-relaxed font-serif italic">
                    "The INDVUNDVUNDVWANE MAJOR FOOTBALL LEAGUE ESWATINI, shall be a private company whose shareholders shall be the clubs whose teams play in it. When a team is relegated, the club whose team shall replace the relegated team, shall be the shareholder instead."
                  </p>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
                      <h4 className="font-bold text-black text-base mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        Shareholder Structure & Relegation
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        The company is owned 100% equally by the 16 clubs playing in it. There is no external corporate owner or state monopoly. Upon sporting relegation, the relegated club's equity share automatically transfers to the promoted champion club taking its place.
                      </p>
                    </div>

                    <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
                      <h4 className="font-bold text-black text-base mb-2 flex items-center gap-2">
                        <Users className="w-5 h-5 text-secondary" />
                        Board of Directors & Management
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        The 16 shareholder clubs elect <strong>not more than seven (7), but not less than five (5)</strong> board members to oversee company operations. The company employs an Executive Director, assisted by an Accountant, an Office Secretary, and a Messenger.
                      </p>
                    </div>

                    <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
                      <h4 className="font-bold text-black text-base mb-2 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-emerald-600" />
                        End-of-Season Fixture Publication
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        The full yearly fixture calendar for the upcoming season is released in full at the <strong>end of the current season</strong> (never at the beginning of the new season). This gives clubs months of certainty to design scientific pre-season training, friendly tours, and commercial ticketing.
                      </p>
                    </div>

                    <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200">
                      <h4 className="font-bold text-black text-base mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-purple-600" />
                        Independent Operation Under FFE Jurisdiction
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        The league conducts its business autonomously to maximize broadcasting, sponsorship, and commercial value, while remaining under the regulatory integrity jurisdiction of the FFE.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 5-Year Regional Player Policy & 10-Year Self Reliance */}
            <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-secondary border border-secondary/40 text-xs font-black uppercase tracking-wider mb-4">
                  <Globe2 className="w-3.5 h-3.5" />
                  Regional Player Integration Policy
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4">
                  5-Year SADC Domestic Player Status
                </h3>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 font-serif italic">
                  "For the first five seasons, we shall consider players from neighbouring countries such as Mozambique, South Africa, Lesotho, Namibia, Botswana and Zimbabwe, as local players. They shall not be affected by a foreign quota. We will apply for their work visas/permits from Government but still treat them as locals for the benefit of our professionalism..."
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h4 className="text-secondary font-bold text-lg mb-2">1. Elevating Professionalism</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Infuses battle-tested regional talent to raise domestic standards technically, tactically, physically, and mentally while Maswati players adapt to high-performance demands.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h4 className="text-secondary font-bold text-lg mb-2">2. Government Work Permits</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      The FFE handles all official work permits directly with Government, ensuring seamless legal compliance and zero foreign quota penalties for clubs.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h4 className="text-secondary font-bold text-lg mb-2">3. 10-Year Self Reliance</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      After 5 seasons, as the 3-tier youth academies graduate elite Maswati talent, foreign quotas will gradually phase in, reaching full self-reliance in 10 years.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-6">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                          Regional Quota Eligibility Checker (Article IV)
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Verify whether a player qualifies as domestic/local for a given league season.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          aria-label="Player Nationality"
                          value={selectedNation}
                          onChange={(e) => setSelectedNation(e.target.value)}
                          className="h-9 rounded-lg bg-zinc-900 border border-white/20 px-3 text-xs text-white"
                        >
                          <option value="Eswatini">Eswatini</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                          <option value="Other">Other International</option>
                        </select>
                        <select
                          aria-label="League Season"
                          value={selectedSeason}
                          onChange={(e) => setSelectedSeason(Number(e.target.value))}
                          className="h-9 rounded-lg bg-zinc-900 border border-white/20 px-3 text-xs text-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                            <option key={s} value={s}>Season {s}</option>
                          ))}
                        </select>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${isDomesticEquivalent ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                          {isDomesticEquivalent ? 'Treated as Local (Quota Exempt)' : 'Subject to Foreign Quota'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {['Mozambique', 'South Africa', 'Lesotho', 'Namibia', 'Botswana', 'Zimbabwe'].map(country => (
                        <span key={country} className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white border border-white/20">
                          {country}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-amber-300 font-mono">
                      *Operates outside FIFA • Free of national team duties
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Federation League Tier 2 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">Federation League (Tier 2)</h2>
                  <p className="text-zinc-600 text-sm">The Gateway to Major League Equity</p>
                </div>
              </div>
              <Card className="border-gray-200 shadow-md">
                <CardContent className="p-8 prose prose-lg max-w-none prose-p:text-gray-700">
                  <p>
                    The Federation League houses ambitious clubs aspiring to reach the Indvundvundvwane Major League. Clubs are held to the exact same rigorous corporate registration, stadium ownership, and transparent financial standards.
                  </p>
                  <p>
                    When a club earns promotion on the pitch, it inherits the relegated club's company shares in the Indvundvundvwane Major Football League company. Positions are never bought or granted by favoritism—they are earned purely through sporting excellence.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Women's Football League Spotlight */}
            <div className="bg-rose-50 border-2 border-rose-200 p-8 md:p-10 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <Badge className="bg-rose-600 text-white font-bold mb-2">Dedicated Professional Competition</Badge>
                  <h3 className="text-2xl md:text-3xl font-black text-rose-950 mb-3">
                    The FFE Women's Football League
                  </h3>
                  <p className="text-rose-900 text-base md:text-lg leading-relaxed mb-4">
                    Women's football is not an afterthought in FFE; it has a dedicated professional league and equal infrastructure. Fed by our 3-tier development structure (Nursery from ages 1-10, Girls Academy from 11-17, and Senior Teams at 18), our women athletes will turn professional and command international respect.
                  </p>
                  <p className="text-rose-800 font-bold text-lg italic">
                    "Maswati, we want to put you on the world map. FOR ONCE,"
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Constitutional Pillars Reference Component */}
          <div className="my-16">
            <ConstitutionalPillars defaultOpenPillar={4} />
          </div>

        </div>
      </section>

      <footer className="bg-black py-12 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p>© {new Date().getFullYear()} Football Federation Eswatini. All rights reserved.</p>
      </footer>
    </div>
  );
}
