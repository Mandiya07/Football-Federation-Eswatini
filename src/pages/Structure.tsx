import React from 'react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  Trophy, 
  Shield, 
  Scale, 
  Settings, 
  ChevronRight, 
  UserCircle,
  Building,
  Target,
  ArrowDown,
  Search,
  Award,
  Globe2,
  Sparkles,
  Baby,
  UserCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ConstitutionalPillars } from '@/components/ConstitutionalPillars';

// Simplified Vertical Tree Component
const TreeLine = () => <div className="w-0.5 h-6 bg-zinc-200 mx-auto"></div>;

const StructureCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden mb-12">
    <div className="bg-zinc-900 px-8 py-6 text-white">
      <h3 className="text-2xl font-bold tracking-tighter uppercase">{title}</h3>
      <p className="text-zinc-400 text-sm mt-1 font-medium">{description}</p>
    </div>
    <div className="p-8 overflow-x-auto">
      <div className="min-w-[800px] flex flex-col items-center py-8">
        {children}
      </div>
    </div>
  </div>
);

export default function Structure() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510051644265-934cb9904605?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-secondary text-black font-black uppercase tracking-wider mb-4">
            Constitutional Governance
          </Badge>
          <h1 className="text-5xl font-bold tracking-tighter mb-6">Organizational Structure</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
            The sovereign governance framework of the Football Federation Eswatini, the Indvundvundvwane Major Football League, and member club architecture.
          </p>
        </div>
      </section>

      <section className="py-20 flex-grow px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* FFE Structure */}
          <StructureCard 
            title="Football Federation Eswatini (FFE)" 
            description="Autonomous governing body playing outside FIFA jurisdiction, dedicated 100% to club prosperity and youth academies."
          >
            {/* Root */}
            <div className="flex flex-col items-center w-full">
              <div className="bg-primary text-white p-6 rounded-2xl shadow-2xl border-4 border-white ring-4 ring-primary/20 min-w-[340px] text-center z-20">
                <Shield className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h2 className="text-xl font-black uppercase tracking-widest leading-none">Football Federation Eswatini</h2>
                <h3 className="text-xs font-bold text-gray-300 mt-1 uppercase tracking-tighter">Independent National Sovereign Body</h3>
                <div className="mt-2 text-[10px] bg-black/40 px-3 py-1 rounded-full text-secondary inline-block font-mono">
                  Outside FIFA • Sole Voting Members: Football Clubs
                </div>
              </div>

              {/* Top Checks: 5 Founders & Independent Eligibility Committee */}
              <div className="mt-8 flex gap-8 md:gap-24 w-full justify-center">
                 <div className="flex flex-col items-center">
                    <div className="h-6 w-0.5 bg-zinc-200"></div>
                    <div className="bg-amber-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-center shadow-md">
                      <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <Award className="w-3.5 h-3.5 text-amber-200" />
                        5 Honorary Founders
                      </div>
                      <span className="text-[9px] text-amber-100 normal-case block">Lifetime Deliberative • SHALL NOT VOTE</span>
                    </div>
                 </div>

                 <div className="flex flex-col items-center">
                    <div className="h-6 w-0.5 bg-zinc-200"></div>
                    <div className="bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-center shadow-md">
                      <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <Scale className="w-3.5 h-3.5 text-emerald-200" />
                        Independent Eligibility Committee
                      </div>
                      <span className="text-[9px] text-emerald-100 normal-case block">Incorruptible Vetting Panel • Anti-Nepotism</span>
                    </div>
                 </div>
              </div>

              {/* Main Branches Connector */}
              <div className="w-[85%] h-0.5 bg-zinc-200 mt-8 relative">
                 <div className="absolute top-0 left-0 w-0.5 h-8 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-1/4 w-0.5 h-8 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-3/4 w-0.5 h-8 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-full w-0.5 h-8 bg-zinc-200 -mt-0"></div>
              </div>

              <div className="flex justify-between items-start w-full mt-8 gap-4 px-4">
                {/* Branch 1: Indvundvundvwane Major Football League (Private Company) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-secondary text-black border-2 border-black px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[46px] flex flex-col items-center justify-center shadow-md gap-1">
                    <img
                      src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
                      alt="Indvundvundvwane Major League Logo"
                      className="w-10 h-10 object-contain rounded-md bg-white p-0.5"
                    />
                    <span>Indvundvundvwane Major League</span>
                    <span className="text-[8px] font-bold text-zinc-800">Private Co. • 16 Club Shareholders</span>
                  </div>
                  <TreeLine />
                  <div className="bg-zinc-800 text-white px-3 py-1.5 rounded-md text-[8px] font-bold uppercase tracking-widest text-center">
                    Elected Board (5-7) & Exec Staff
                  </div>
                  <TreeLine />
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[40px] flex items-center">
                    Federation League (Tier 2)
                  </div>
                </div>

                {/* Branch 2: General Conference & Sole Voting Members */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-primary text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[46px] flex flex-col justify-center shadow-lg shadow-blue-100 border-2 border-white">
                    <span>The Member Clubs</span>
                    <span className="text-[8px] text-blue-200 font-bold">Sole Voting Franchise</span>
                  </div>
                  <TreeLine />
                  <div className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[40px] flex items-center">
                    General Conference
                  </div>
                </div>

                {/* Branch 3: Secretariat & Administration */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[46px] flex items-center shadow-xl">
                    Executive Secretariat
                  </div>
                  <TreeLine />
                  <div className="bg-zinc-800 text-white px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-center">
                    Standing Committees
                  </div>
                </div>

                {/* Branch 4: Technical & 3-Tier Development */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[46px] flex items-center">
                    Technical Directorate
                  </div>
                  <TreeLine />
                  <div className="bg-rose-700 text-white px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-center">
                    Women's Football League
                  </div>
                  <TreeLine />
                  <div className="bg-blue-900 text-white px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest text-center">
                    3-Tier Academy Pipeline
                  </div>
                </div>

                {/* Branch 5: Consultative Associations (Non-Members) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-zinc-200 text-zinc-800 border border-zinc-300 px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-center min-h-[46px] flex flex-col justify-center">
                    <span>Consultative Unions</span>
                    <span className="text-[7.5px] text-zinc-500 font-bold">(Not FFE Members)</span>
                  </div>
                  <TreeLine />
                  <div className="bg-zinc-100 text-zinc-700 border border-zinc-200 px-2 py-1.5 rounded text-[8px] font-medium text-center space-y-0.5">
                    <div>Players Union</div>
                    <div>Referees Union</div>
                    <div>Coaches Union</div>
                    <div>Supporters Union</div>
                  </div>
                </div>
              </div>
            </div>
          </StructureCard>

          {/* Member Club Structure */}
          <StructureCard 
            title="Member Club Organization & 3-Tier Youth Pathway" 
            description="The internal architectural breakdown of an FFE-licensed professional football club and its mandatory vertical youth development structure."
          >
            <div className="flex flex-col items-center w-full">
              <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-2xl border-4 border-white ring-4 ring-zinc-100 min-w-[300px] text-center z-20">
                <Building2 className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h2 className="text-xl font-black uppercase tracking-widest leading-none">MEMBER CLUB</h2>
                <h3 className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">Private Corporate Entity</h3>
                <div className="text-[10px] text-gray-400 mt-1">Shareholder of Indvundvundvwane Major League</div>
              </div>

              <TreeLine />

              <div className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 border-2 border-white group transition-all">
                Club Board of Directors & Executive Management
              </div>

              <div className="w-[80%] h-0.5 bg-zinc-200 mt-10 relative">
                 <div className="absolute top-0 left-0 w-0.5 h-12 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-1/3 w-0.5 h-12 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-2/3 w-0.5 h-12 bg-zinc-200 -mt-0"></div>
                 <div className="absolute top-0 left-full w-0.5 h-12 bg-zinc-200 -mt-0"></div>
              </div>

              <div className="flex justify-between w-full mt-12 px-2 gap-4">
                {/* Tier 3: Senior Pro Teams (Age 18+) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-black text-white px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg min-w-[140px] text-center">
                    Tier 3: Senior Pro (18+)
                  </div>
                  <TreeLine />
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest min-w-[130px] text-center">
                    Men's Senior Team
                  </div>
                  <TreeLine />
                  <div className="bg-rose-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest min-w-[130px] text-center">
                    Women's Senior Team
                  </div>
                </div>

                {/* Tier 2: The Academy (Ages 11-17) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg min-w-[140px] text-center">
                    Tier 2: Academy (11-17)
                  </div>
                  <TreeLine />
                  <div className="bg-zinc-100 border border-zinc-300 text-zinc-800 px-4 py-3 rounded-xl text-center space-y-1.5 min-w-[140px]">
                     <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">Separate Academies</div>
                     <div className="text-xs font-bold">Boys Academy (U13-U17)</div>
                     <div className="text-xs font-bold">Girls Academy (U13-U17)</div>
                     <div className="text-[10px] text-zinc-500 italic">Prime Learning Stage</div>
                  </div>
                </div>

                {/* Tier 1: The Nursery (Ages 1-10) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg min-w-[140px] text-center">
                    Tier 1: Nursery (1-10)
                  </div>
                  <TreeLine />
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 px-4 py-3 rounded-xl text-center space-y-1.5 min-w-[140px]">
                     <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Co-Ed (Boys & Girls)</div>
                     <div className="text-xs font-bold">Ages 1-2: Saturday Play</div>
                     <div className="text-xs font-bold">Ages 3-10: Coached Play</div>
                     <div className="text-[10px] text-emerald-700 italic">Fun & Ball Familiarity</div>
                  </div>
                </div>

                {/* Stadium Commercial Operations */}
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-secondary text-black px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg min-w-[140px] text-center">
                    Stadium & Commercial
                  </div>
                  <TreeLine />
                  <div className="bg-zinc-100 border border-zinc-200 text-zinc-700 px-3 py-3 rounded-xl text-center space-y-1 min-w-[140px]">
                    <div className="text-xs font-bold">Owned Stadium</div>
                    <div className="text-[10px] text-zinc-500">365-Day Business Hub</div>
                    <div className="text-[10px] text-zinc-500">Tours, Shops & Scouts</div>
                  </div>
                </div>
              </div>
            </div>
          </StructureCard>

          {/* Full Constitutional Pillars Interactive Section */}
          <div className="my-16">
            <ConstitutionalPillars />
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-zinc-900 p-10 rounded-2xl text-white">
              <Scale className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Integrity & Checks and Balances</h3>
              <p className="text-zinc-400 leading-relaxed font-medium mb-4">
                The Independent Eligibility Committee acts as a constitutional firewall against political nepotism, verifying every nominee for presidential and executive appointments before they can assume office.
              </p>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Meanwhile, the 5 Lifetime Founders serve in an advisory, deliberative capacity without voting rights, ensuring that only football clubs exercise democratic control over the federation.
              </p>
            </div>
            <div className="bg-blue-600 p-10 rounded-2xl text-white">
              <Users className="w-12 h-12 text-zinc-900 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Playing Outside FIFA</h3>
              <p className="text-white/90 leading-relaxed font-medium mb-4">
                By operating outside FIFA jurisdiction, the FFE and Indvundvundvwane Major Football League eliminate burdensome national team obligations, calendar interruptions, and bloated international bureaucracy.
              </p>
              <p className="text-white/90 leading-relaxed font-medium">
                100% of revenue, energy, and resources flow directly to member clubs, youth academies, and women's football to make Eswatini self-reliant and world-class.
              </p>
            </div>
          </div>

        </div>
      </section>
      
      <footer className="bg-black py-12 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p>© {new Date().getFullYear()} Football Federation Eswatini. All rights reserved.</p>
      </footer>
    </div>
  );
}
