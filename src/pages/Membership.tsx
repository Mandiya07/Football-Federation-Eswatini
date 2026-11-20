import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckSquare, 
  AlertCircle, 
  ArrowRight, 
  Building, 
  MapPin, 
  Landmark,
  ShieldAlert,
  Users,
  Award,
  Scale,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ConstitutionalPillars } from '@/components/ConstitutionalPillars';

export default function Membership() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Badge className="bg-secondary text-black font-black uppercase tracking-wider mb-4">
            Exclusive Club Membership
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Membership & Affiliation
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Strictly an exclusive federation of football clubs. No associations, no individual owners. Pure sporting democracy.
          </p>
        </div>
      </section>

      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Constitutional Rule 1 & 2 Warning Box */}
          <div className="bg-gradient-to-r from-blue-950 via-zinc-900 to-black text-white p-8 rounded-3xl border border-white/10 shadow-xl mb-16">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <Badge className="bg-secondary text-black font-bold uppercase tracking-wider text-xs mb-2">
                  Constitutional Membership Clause
                </Badge>
                <h3 className="text-2xl font-black text-white mb-3">
                  Clubs Only — No Associations or Individuals As Members
                </h3>
                <p className="text-zinc-300 text-base leading-relaxed mb-4">
                  The players union, referees, coaches, football supporters union, and regional associations shall NOT be admitted as members of the FFE. They may organize themselves as associations to represent their members and make representations, but the <strong>football clubs affiliated to those bodies are the sole members of the FOOTBALL FEDERATION ESWATINI</strong>.
                </p>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Likewise, no individual holds membership, save for the 5 lifetime Honorary Founders who attend general conferences in an advisory and deliberative role, but <strong>SHALL NOT VOTE</strong>. The democratic franchise belongs 100% to the football clubs.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-16 shadow-sm">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">The Founding 16 Rule</h3>
                <p className="text-gray-700 text-lg">
                  The first 16 qualifying clubs to successfully complete the membership process will strictly form the <strong>INDVUNDVUNDVWANE MAJOR FOOTBALL LEAGUE ESWATINI</strong> as equal company shareholders on a <strong>first-come, first-served basis</strong>. All subsequent qualifying clubs will enter the Federation League.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">Mandatory Club Infrastructure</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Landmark className="w-8 h-8 text-black" />
                <CardTitle>Corporate Entity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">The club MUST be a fully registered private company under Eswatini law, complete with an elected board of directors, transparent accounts, and full tax compliance.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <MapPin className="w-8 h-8 text-secondary" />
                <CardTitle>Land Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">The club must own, or clearly be in the legal process of acquiring, land designated for proprietary club infrastructure development.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Building className="w-8 h-8 text-primary" />
                <CardTitle>Owned Stadium Business Centre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Exclusive home ground operating 365 days a year as a commercial hub with stadium tours, merchandise stores, and spectator security compliance.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Users className="w-8 h-8 text-rose-600" />
                <CardTitle>3-Tier Youth & Women's Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Active pathway comprising the Nursery (Ages 1-10 co-ed), segregated Boys & Girls Academies (Ages 11-17), and senior professional men's and women's squads.</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Constitutional Pillars Component */}
          <div className="my-16">
            <ConstitutionalPillars defaultOpenPillar={1} />
          </div>

          <h2 className="text-3xl font-bold mb-8">Step-by-Step Joining Process</h2>
          <div className="space-y-6 mb-16">
            {[
              { step: 1, title: "Initial Club Application", desc: "Submit the online club application form along with corporate documentation and expression of interest." },
              { step: 2, title: "Independent Eligibility & Corporate Audit", desc: "Club executive leadership passes vetting by the Independent Incorruptible Eligibility Committee, verifying legal incorporation and anti-corruption compliance." },
              { step: 3, title: "Infrastructure & Stadium Inspection", desc: "FFE technical inspectors audit land title deeds, stadium safety, training pitches, and Nursery facilities." },
              { step: 4, title: "Provisional Licensing", desc: "Upon passing all audits, the club receives provisional FFE affiliation and enters the official fixture scheduling system." },
              { step: 5, title: "Shareholder Ratification", desc: "Full membership is executed. If among the first 16, the club executes shareholder agreements for the Indvundvundvwane Major Football League company." }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-zinc-50 p-6 rounded-xl border border-gray-100 items-start">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-12 bg-black text-white rounded-3xl shadow-xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to elevate your club?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the revolution to professionalize football across the Kingdom of Eswatini and put our nation on the world map.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg h-14 px-8" asChild>
                <Link to="/contact">Start Club Application <ArrowRight className="ml-2 h-5 w-5"/></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-black bg-white hover:bg-gray-100 border-none text-lg h-14 px-8" asChild>
                <Link to="/about">Read Full Constitution</Link>
              </Button>
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
