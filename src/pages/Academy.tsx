import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  FileDown, 
  PlayCircle, 
  Briefcase, 
  TrendingUp, 
  Presentation, 
  CheckCircle2,
  Baby,
  Users,
  Award,
  Sparkles,
  Heart,
  Globe2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConstitutionalPillars } from '@/components/ConstitutionalPillars';
import { getDevelopmentTierForAge, type PlayerGender } from '@/utils/ffeConstitution';

export default function Academy() {
  const [playerAge, setPlayerAge] = useState(8);
  const [playerGender, setPlayerGender] = useState<PlayerGender>('female');
  const placementTier = getDevelopmentTierForAge(playerAge, playerGender);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1431324155629-1a6fc1ac5eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Badge className="bg-secondary text-black font-black uppercase tracking-wider mb-4">
            3-Tier Development & Women's Football
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Youth Academy & Education Hub
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium">
            From the Nursery at age 1 to senior professional teams at 18. Grooming the next generation of Maswati players to conquer the world stage.
          </p>
        </div>
      </section>

      {/* 3-Tier Youth Development Structure Feature */}
      <section className="py-20 bg-zinc-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider mb-4">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Constitutional Pillar 5 • Development Blueprint
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                The Three-Tier Youth & Women's Development Structure
              </h2>

              <div className="bg-black/50 border-l-4 border-rose-500 p-6 rounded-r-2xl mb-10 shadow-sm">
                <p className="text-rose-100 text-base md:text-lg italic font-serif leading-relaxed mb-4">
                  "At the FOOTBALL FEDERATION ESWATINI, we have a three-tier development structure. At the bottom, we have what we call the NURSERY. The nursery begins with children one and two years old. Boys and girls playing together. They come to the training grounds on Saturday morning to play. We let them play with the ball. Boys and girls together at this stage. When they turn 3, we begin coaching them how to play. Boys and girls together until they turn 10 years of age. At 11 years of age, they graduate to the Academy stage. We now seperate them into Boys academy and girls academy. They will be groomed here during their prime learning stage. At 18 years of age, they graduate to their respective senior teams. Surely by this time they are ripe professional players for both women and men's football. There will also be a women's league. Maswati, we want to put you on the world map. FOR ONCE,"
                </p>
                <div className="text-right text-rose-300 font-black tracking-wider uppercase text-sm">
                  — The Founders, Football Federation Eswatini
                </div>
              </div>

              {/* The 3 Tiers Visual Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Tier 1 */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                        Tier 1 • Ages 1–10
                      </span>
                      <Baby className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">The Nursery</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      <strong>Ages 1–2:</strong> Free play with the ball on Saturday mornings. Boys and girls discovering joy together.
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      <strong>Ages 3–10:</strong> Fundamental technical coaching begins. Co-ed play builds coordination, reflexes, and natural love for football.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-emerald-300 font-semibold">
                    Grassroots Foundation
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                        Tier 2 • Ages 11–17
                      </span>
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">The Academy Stage</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      Graduation at age 11 into segregated <strong>Boys Academy</strong> and <strong>Girls Academy</strong>.
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Prime learning stage: advanced tactical comprehension, mental toughness, physical conditioning, nutrition, and tactical positioning.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-blue-300 font-semibold">
                    Prime Tactical Grooming
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                        Tier 3 • Age 18+
                      </span>
                      <Award className="w-6 h-6 text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Senior Professional</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      Graduation into respective <strong>Senior Men's</strong> and <strong>Senior Women's</strong> teams.
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Ripe, complete professional players ready to compete in the Indvundvundvwane Major League and dedicated Women's Football League.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-rose-300 font-semibold">
                    Professional Climax
                  </div>
                </div>
              </div>

              {/* Inspiring banner */}
              <div className="mt-8 bg-rose-600/20 border border-rose-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Globe2 className="w-6 h-6 text-rose-400 flex-shrink-0" />
                  <span className="text-white font-black text-lg">
                    "Maswati, we want to put you on the world map. FOR ONCE,"
                  </span>
                </div>
                <Badge className="bg-secondary text-black font-black uppercase tracking-wider">
                  World Map Vision
                </Badge>
              </div>

            </div>
          </div>

          {/* Interactive Constitutional Pillars Component */}
          <div className="mb-20">
            <ConstitutionalPillars defaultOpenPillar={5} />
          </div>

          {/* Educational Licensing Pathway Tabs */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight text-black mb-3">Professional Education Pathways</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Standardized licensing and continuous education for coaches, referees, and club executives.
            </p>
          </div>

          <Tabs defaultValue="coaches" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white border rounded-xl p-1 h-auto shadow-sm">
                <TabsTrigger value="coaches" className="px-8 py-3 text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-black rounded-lg">Coaching Licences</TabsTrigger>
                <TabsTrigger value="referees" className="px-8 py-3 text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-black rounded-lg">Referee Certification</TabsTrigger>
                <TabsTrigger value="administrators" className="px-8 py-3 text-base data-[state=active]:bg-zinc-100 data-[state=active]:text-black rounded-lg">Club Administration</TabsTrigger>
              </TabsList>
            </div>

            {/* Coaching Education */}
            <TabsContent value="coaches" className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* D License */}
                <Card className="hover:border-black transition-colors relative overflow-hidden flex flex-col h-full bg-white">
                  <div className="h-2 w-full bg-blue-500 absolute top-0 left-0"></div>
                  <CardContent className="pt-8 flex flex-col flex-grow">
                    <Badge variant="outline" className="w-max mb-4 bg-blue-50 text-blue-700 hover:bg-blue-50">Grassroots</Badge>
                    <h3 className="font-bold text-xl mb-2">FFE D-License</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      Coaching Nursery children (Ages 1-10), fun sessions, ball familiarity, safeguarding.
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <p className="font-medium text-xs mb-3 text-gray-500">Requirements: None</p>
                      <Button className="w-full text-xs" variant="outline">View Syllabus</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* C License */}
                <Card className="hover:border-black transition-colors relative overflow-hidden flex flex-col h-full bg-white">
                  <div className="h-2 w-full bg-emerald-500 absolute top-0 left-0"></div>
                  <CardContent className="pt-8 flex flex-col flex-grow">
                    <Badge variant="outline" className="w-max mb-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Youth Development</Badge>
                    <h3 className="font-bold text-xl mb-2">CAF C-License</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      Dedicated for Academy stage (Ages 11-17). Tactical principles and physiological conditioning.
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <p className="font-medium text-xs mb-3 text-gray-500">Requirements: D-License + 1 Yr</p>
                      <Button className="w-full text-xs" variant="outline">View Syllabus</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* B License */}
                <Card className="hover:border-black transition-colors relative overflow-hidden flex flex-col h-full bg-white">
                  <div className="h-2 w-full bg-orange-500 absolute top-0 left-0"></div>
                  <CardContent className="pt-8 flex flex-col flex-grow">
                    <Badge variant="outline" className="w-max mb-4 bg-orange-50 text-orange-700 hover:bg-orange-50">Elite Youth / Div 1</Badge>
                    <h3 className="font-bold text-xl mb-2">CAF B-License</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      Advanced periodization, sports science, tactical analysis, match modeling.
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <p className="font-medium text-xs mb-3 text-gray-500">Requirements: C-License + 2 Yrs</p>
                      <Button className="w-full text-xs" variant="outline">View Syllabus</Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* A License */}
                <Card className="hover:border-black transition-colors relative overflow-hidden flex flex-col h-full bg-white">
                  <div className="h-2 w-full bg-red-500 absolute top-0 left-0"></div>
                  <CardContent className="pt-8 flex flex-col flex-grow">
                    <Badge variant="outline" className="w-max mb-4 bg-red-50 text-red-700 hover:bg-red-50">Professional</Badge>
                    <h3 className="font-bold text-xl mb-2">CAF A-License</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      Mandatory for Indvundvundvwane Major League Head Coaches. Pro management and systems.
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <p className="font-medium text-xs mb-3 text-gray-500">Requirements: B-License + 2 Yrs</p>
                      <Button className="w-full bg-black text-white hover:bg-black/80 text-xs">Apply for Selection</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Referee Certification */}
            <TabsContent value="referees" className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                 <div className="bg-white p-8 rounded-2xl border flex flex-col h-full">
                    <h3 className="font-bold text-2xl mb-4 text-black border-b pb-4">Level 3: Regional Match Official</h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      Initial training over a 6-week intensive course. Covers the fundamental Laws of the Game, basic fitness assessments, and conflict resolution scenarios. Qualifies officials for amateur and grassroots regional matches.
                    </p>
                    <Button variant="outline" className="w-full">Register for Next Cohort</Button>
                 </div>
                 
                 <div className="bg-white p-8 rounded-2xl border flex flex-col h-full">
                    <h3 className="font-bold text-2xl mb-4 text-black border-b pb-4">Level 2: National First Division Official</h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      Advanced physiological tracking, psychology of elite competition, and complex offside/foul interpretations. Candidates must pass quarterly strict fitness tests (yo-yo test).
                    </p>
                    <Button variant="outline" className="w-full">View Promotion Criteria</Button>
                 </div>
              </div>
            </TabsContent>

            {/* Club Administration */}
            <TabsContent value="administrators" className="space-y-8 animate-in fade-in duration-500">
               <div className="grid md:grid-cols-3 gap-8">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow border-gray-200 flex flex-col bg-white">
                  <div className="aspect-video relative bg-zinc-800">
                    <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Club Management" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 font-medium">
                      <Briefcase className="w-4 h-4" /> Club Operations
                    </div>
                    <h3 className="font-bold text-xl mb-2">Modern Football Club Management</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">
                      Learn how to structure your club's organizational chart, manage matchday operations, and hire effective technical staff.
                    </p>
                    <Button className="w-full bg-black text-white hover:bg-black/80 mt-auto">Start Course</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-xl transition-shadow border-gray-200 flex flex-col bg-white">
                  <div className="aspect-video relative bg-zinc-800">
                    <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Finance" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 font-medium">
                      <TrendingUp className="w-4 h-4" /> Finance
                    </div>
                    <h3 className="font-bold text-xl mb-2">Sustainable Football Finance</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">
                      Master budgeting, Financial Fair Play compliance, player wage structuring, and revenue diversification strategies.
                    </p>
                    <Button className="w-full bg-black text-white hover:bg-black/80 mt-auto">Start Course</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-xl transition-shadow border-gray-200 flex flex-col bg-white">
                  <div className="aspect-video relative bg-zinc-800">
                    <img src="https://images.unsplash.com/photo-1553152531-7aecda7c046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Marketing" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 font-medium">
                      <Presentation className="w-4 h-4" /> Branding
                    </div>
                    <h3 className="font-bold text-xl mb-2">Sports Marketing & Stadium Hubs</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">
                      Commercializing owned stadiums 365 days a year, pitching sponsors, and building a loyal community fanbase.
                    </p>
                    <Button className="w-full bg-black text-white hover:bg-black/80 mt-auto">Start Course</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </section>

      {/* Diploma Certification Callout */}
      <section className="py-16 bg-black text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <GraduationCap className="w-16 h-16 mx-auto text-secondary mb-6" />
          <h2 className="text-3xl font-bold mb-4">Earn Your FFE Club Management Diploma</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Mandatory qualification for all General Managers in the Indvundvundvwane Major Football League.
          </p>
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-8">
            View Certification Pathway
          </Button>
        </div>
      </section>

      <footer className="bg-black py-12 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p>© {new Date().getFullYear()} Football Federation Eswatini. All rights reserved.</p>
      </footer>
    </div>
  );
}
