import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trophy, ShieldCheck, Building2, CheckCircle2, LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-black text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Professional Football Stadium"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten" 
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 border border-primary/50 tracking-wider uppercase">
              Football Federation Eswatini
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-5xl mx-auto leading-tight">
              The Future of Football <br className="hidden md:block"/> Belongs to the <span className="text-secondary">Clubs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-24 max-w-3xl mx-auto leading-relaxed">
              The Football Federation Eswatini is a bold, professional ecosystem built strictly by and for football clubs. Zero corruption. Total ownership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg h-14 px-8 w-full sm:w-auto" asChild>
                <Link to="/contact">Join the Federation <ArrowRight className="ml-2 h-5 w-5"/></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-black bg-white hover:bg-gray-100 border-none text-lg h-14 px-8 w-full sm:w-auto" asChild>
                <Link to="/about">Our Vision</Link>
              </Button>
            </div>
          </div>

          {/* Early Entry Tracker */}
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Live Tracker
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4 mt-2">
              <div className="text-left">
                <h3 className="text-2xl font-bold font-mono tracking-tight text-white mb-1">12 / 16</h3>
                <p className="text-sm text-gray-400">Major League spots filled</p>
              </div>
              <div className="flex-1 w-full max-w-xs">
                <Progress value={75} className="h-3 bg-white/10 [&>div]:bg-secondary" />
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold font-mono tracking-tight text-secondary mb-1">4</h3>
                <p className="text-sm text-gray-400">Spots Remaining</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              *The Founding 16 Rule: The first 16 compliant clubs secure equal equity in the Major League. <Link to="/membership" className="text-primary hover:underline">Read the requirements</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-black font-black text-xs mb-3 uppercase tracking-wider">
              Constitutional Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-black">A Two-Tier Professional Ecosystem</h2>
            <p className="text-lg text-gray-600">
              Operating outside FIFA without national team obligations. Owned 100% by the clubs, anchored by the Indvundvundvwane Major Football League company.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="border-2 border-secondary overflow-hidden shadow-xl bg-white">
              <div className="bg-secondary p-5 text-center">
                <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-wider">
                  Indvundvundvwane Major Football League
                </h3>
                <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                  Tier 1 • Standalone Private Company
                </span>
              </div>
              <CardContent className="p-8 md:p-10 bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
                    alt="Indvundvundvwane Major League Official Logo"
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-zinc-200 shadow-sm"
                  />
                  <h4 className="text-2xl font-bold">The Flagship Tier</h4>
                </div>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  A private corporate entity owned equally by the 16 participating clubs. Independent commercial operations under FFE jurisdiction, with full yearly fixtures released at the end of the previous season.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    Strictly 16 shareholder clubs (shares transfer on promotion/relegation)
                  </li>
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    Elected Board (5–7 members) & dedicated executive staff
                  </li>
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    5-Year domestic status for Mozambique, SA, Lesotho, Namibia, Botswana, Zimbabwe
                  </li>
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    Independent from FIFA; zero national team disruptions
                  </li>
                </ul>
                <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="flex-1 border-zinc-300 text-black hover:bg-zinc-50 font-bold text-xs" asChild>
                    <Link to="/logs">
                      League Logs &amp; Table <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-zinc-300 text-black hover:bg-zinc-50 font-bold text-xs" asChild>
                    <Link to="/fixtures">
                      Match Fixtures <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 overflow-hidden shadow-lg bg-white">
              <div className="bg-black p-5 text-center text-white">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider">
                  Federation League & Women's League
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Tier 2 & Dedicated Women's Pro League
                </span>
              </div>
              <CardContent className="p-8 md:p-10 bg-white">
                <Building2 className="w-12 h-12 text-black mb-6" />
                <h4 className="text-2xl font-bold mb-4">The Multi-Division Pathway</h4>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  For all qualifying professional clubs and women's teams. Governed under identical infrastructure and anti-corruption requirements, providing pure merit-based promotion.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-black w-5 h-5 flex-shrink-0" />
                    Direct promotion/relegation inheriting Major League company equity
                  </li>
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-black w-5 h-5 flex-shrink-0" />
                    Dedicated Women's Football League with professional backing
                  </li>
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-black w-5 h-5 flex-shrink-0" />
                    Mandatory 3-tier youth pathway: Nursery (1–10) & Academies (11–17)
                  </li>
                  <li className="flex gap-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="text-black w-5 h-5 flex-shrink-0" />
                    Sole voting franchise in the FFE strictly for member clubs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Constitutional Pillars Preview */}
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="px-3 py-1 rounded-full bg-secondary text-black text-xs font-black uppercase tracking-wider mb-4 inline-block">
                  Foundational Charter
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  The 5 Constitutional Pillars of FFE
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  Discover how the FOOTBALL FEDERATION ESWATINI and the INDVUNDVUNDVWANE MAJOR FOOTBALL LEAGUE ESWATINI are constituted: No association membership, 5 honorary founders with zero voting rights, independent eligibility test to eliminate nepotism, 16-club private company league, and a 3-tier nursery-to-senior development pyramid.
                </p>
                <p className="text-secondary font-black text-lg italic">
                  "Maswati, we want to put you on the world map. FOR ONCE,"
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 font-bold" asChild>
                  <Link to="/about">Explore 5 Pillars <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
                  <Link to="/structure">View Structure</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Built to Protect the Integrity of the Game</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We empower clubs to govern. By making clubs the sole members and shareholders, we eliminate external political interference and ensure resources stay within the game.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Building2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Exclusive Business Centres</h4>
                    <p className="text-gray-400">Stadiums are not public pitches—they are exclusive club-owned business venues operating 365 days a year to generate revenue for players and staff.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Zero Corruption Tolerance</h4>
                    <p className="text-gray-400">A transparent governance framework where clubs act as watchdogs. Strict compliance is non-negotiable.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <LockIcon className="text-blue-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Financial Fair Play</h4>
                    <p className="text-gray-400">Mandatory third-party audits and sustainability caps ensure leagues remain competitive and economically viable long-term.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Trophy className="text-green-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Elite Youth Academies</h4>
                    <p className="text-gray-400">Mandatory homegrown player quotas and world-class athletic facilities integrated with formal education systems.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Professional football stadium" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white text-black p-8 rounded-xl shadow-xl max-w-xs border-l-4 border-primary">
                <p className="font-bold text-xl mb-2">Secure Your Spot</p>
                <p className="text-gray-600">The first 16 qualifying clubs form the Major League. It operates strictly on a first-come, first-served basis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold tracking-tighter mb-6">Come on board now.</h2>
          <p className="text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Secure your place in the top league and become a founding shareholder in the future of Eswatini professional football.
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-black/80 text-xl h-16 px-10" asChild>
             <Link to="/contact">Apply for Membership</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Football Federation Eswatini. All rights reserved.</p>
      </footer>
    </div>
  );
}
