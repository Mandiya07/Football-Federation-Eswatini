import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Fixtures } from '@/components/Fixtures';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Trophy, Building2, ArrowRight } from 'lucide-react';
import { CLUBS } from '@/data/clubs';

export default function FixturesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-24 pb-12 bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="flex justify-center mb-5">
            <img
              src="/assets/aistudio/indvundvundvwane_major_league_logo_a9d0b495.jpg"
              alt="Indvundvundvwane Major Football League Logo"
              className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-2xl bg-white p-1.5 shadow-2xl border-2 border-secondary"
            />
          </div>

          <Badge className="bg-secondary text-black font-black uppercase tracking-wider mb-3">
            Official Competition Schedule
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            League Fixtures Calendar
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Indvundvundvwane Major Football League Eswatini · Match dates, kickoff times, and exclusive club stadiums.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button size="lg" className="bg-secondary text-black hover:bg-secondary/90 font-bold" asChild>
              <Link to="/logs">
                <Trophy className="w-4 h-4 mr-2" /> View League Logs &amp; Standings
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 bg-zinc-900/80 text-white hover:bg-zinc-800" asChild>
              <Link to="/clubs">
                <Building2 className="w-4 h-4 mr-2" /> Registered Stadiums Map
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 flex-grow max-w-5xl space-y-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border border-zinc-200 bg-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Upcoming Schedule</p>
                <h3 className="text-lg font-bold text-zinc-950">Official League Matches</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200 bg-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-black flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Participating Clubs</p>
                <h3 className="text-lg font-bold text-zinc-950">{CLUBS.length} Registered Clubs</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200 bg-white sm:col-span-2 lg:col-span-1">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Constitutional Mandate</p>
                <h3 className="text-lg font-bold text-zinc-950">Exclusive Club Stadiums</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Fixtures Calendar Component */}
        <Fixtures />

        {/* Quick Link to Standings / Logs */}
        <div className="bg-gradient-to-r from-zinc-900 to-black text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Check Current Club Standings</h3>
            <p className="text-sm text-zinc-400">
              View points, goal differences, and league rankings updated from recorded scores.
            </p>
          </div>
          <Button className="bg-white text-black hover:bg-zinc-200 font-bold shrink-0" asChild>
            <Link to="/logs">
              View Logs Table <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p className="text-sm">Football Federation Eswatini · Indvundvundvwane Major League</p>
      </footer>
    </div>
  );
}
