import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Building2, 
  Users, 
  Award, 
  Globe2, 
  HeartHandshake, 
  Scale, 
  CheckCircle2, 
  CalendarDays, 
  Briefcase, 
  Baby, 
  Sparkles, 
  Flag,
  FileText,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ConstitutionalPillarsProps {
  className?: string;
  defaultOpenPillar?: number;
}

export function ConstitutionalPillars({ className = '', defaultOpenPillar }: ConstitutionalPillarsProps) {
  const [activeTab, setActiveTab] = useState<number>(defaultOpenPillar || 1);

  const pillars = [
    {
      id: 1,
      badge: "Article I • Membership",
      title: "Clubs Only — No Associations as Members",
      summary: "Associations (players, referees, coaches, supporters, regional bodies) shall NOT be members. Football clubs affiliated to those associations are the sole members.",
      verbatim: "No association shall be members of the Federation. The players union, referees, coaches, and football supportes union shall not be admitted as members. However they will be allowed to organise themselves as associations that represent their members, and make representations to the FFE. In the event that it becomes necessary to organise some clubs on a regional basis, the regional associations shall not be admitted as members of the FOOTBALL FEDERATION ESWATINI. The football clubs affiliated to those associations shall be members of the FOOTBALL FEDERATION ESWATINI, instead. Much as CAF is not a member of FIFA, yet CAF affiliates are.",
      highlights: [
        { label: "Clubs As Sole Members", desc: "Only licensed football clubs hold direct membership and sovereign rights in the FFE." },
        { label: "Organize & Represent", desc: "Referees, coaches, players, and supporters unions may organize to represent interests, but hold no membership." },
        { label: "Regional Independence", desc: "Regional associations are administrative bodies, never federation members. Their affiliated clubs are the members." },
        { label: "The CAF-FIFA Precedent", desc: "Directly modeled on international hierarchy: CAF is not a FIFA member, but the individual national associations are." }
      ],
      icon: Building2,
      accentColor: "border-blue-500",
      tagColor: "bg-blue-100 text-blue-900 border-blue-200"
    },
    {
      id: 2,
      badge: "Article II • Representation & Voting",
      title: "Five Honorary Founders & Sovereign Club Voting",
      summary: "No individual membership exists. The 5 founders are lifetime Honorary Members who may deliberate at conferences, but SHALL NOT VOTE. Only football clubs vote.",
      verbatim: "No individual shall be a member of the FOOTBALL FEDERATION ESWATINI, except one who is honored as 'Honorary member.' For that reason, the five (5) founders of the FOOTBALL FEDERATION ESWATINI, shall be honorary members for the rest of their lives respectively. They can attend general conferences, and take part in deliberations. However they SHALL NOT VOTE. Only the football clubs shall vote.",
      highlights: [
        { label: "Zero Individual Ownership", desc: "No executive, politician, or individual owns the federation. Power resides permanently with the clubs." },
        { label: "5 Lifetime Honorary Founders", desc: "Honored for life with rights to attend general conferences and participate actively in deliberations." },
        { label: "Strict Voting Prohibition", desc: "Founders and honorary members SHALL NOT VOTE. Voting franchise is reserved strictly for member clubs." },
        { label: "One Club, One Vote", desc: "Pure sporting democracy where clubs decide policy, leadership, and commercial trajectory." }
      ],
      icon: Award,
      accentColor: "border-amber-500",
      tagColor: "bg-amber-100 text-amber-900 border-amber-200"
    },
    {
      id: 3,
      badge: "Article III • Integrity & Anti-Nepotism",
      title: "Independent Incorruptible Eligibility Committee",
      summary: "All candidates for presidential elections, committees, and employment MUST pass an eligibility test administered by an independent committee established beforehand by the founders.",
      verbatim: "All nominated candidates for elections, including candidates for presidential elections, appointments into committees of the Federation, and employment positions, shall pass an eligibility test, conducted by an independent committee of incorruptible persons established beforehand by the founders of the FOOTBALL FEDERATION ESWATINI. That will be done in order to prevent the President or members of te executive appointing friends and relatives into positions of influence within the FEDERATION.",
      highlights: [
        { label: "Mandatory Eligibility Testing", desc: "Every nominee for President, committee seat, or administrative job must undergo strict vetting." },
        { label: "Anti-Nepotism Firewall", desc: "Explicitly bars presidents or executive members from packing committees with friends, allies, or relatives." },
        { label: "Independent Judiciary", desc: "Administered by a standing panel of incorruptible persons appointed beforehand by the founders." },
        { label: "Merit-Based Appointments", desc: "Ethical standing, professional credentials, and integrity replace political patronage." }
      ],
      icon: Scale,
      accentColor: "border-emerald-500",
      tagColor: "bg-emerald-100 text-emerald-900 border-emerald-200"
    },
    {
      id: 4,
      badge: "Article IV • Professional League & Regional Policy",
      title: "Indvundvundvwane Major Football League Eswatini",
      summary: "Private company owned by the 16 clubs, independent under FFE jurisdiction. 5-7 board members, 4 staff. End-of-season fixtures. 5-year domestic player status for 6 regional nations. Playing outside FIFA.",
      verbatim: "The INDVUNDVUNDVWANE MAJOR FOOTBALL LEAGUE ESWATINI, shall be a private company whose shareholders shall be the clubs whose teams play in it. When a team is relegated, the club whose team shall replace the relegated team, shall be the shareholder instead. The INDVUNDVUNDVWANE MAJOR FOOTBALL LEAGUE ESWATINI SHALL conduct its business independently, but under the jurisdiction of the FOOTBALL FEDERATION ESWATINI since its shareholders shall be members of the FEDERATION. The sixteen clubs shall elect not more than seven (7), but not less than five (5) board members to oversee the operations of the company. The company shall employ an executive to run the league. He shall be assisted by an accountant, an office secretary and a messenger. The list of fixtures for the yearly fixtures for the upcoming season shall be released in full at the end of the current season, not at the beginning of the upcoming season. This is done to assist teams in the planning of their pre-season training. For the first five seasons, we shall consider players from neighbouring countries such as Mozambique, South Africa, Lesotho, Namibia, Botswana and Zimbabwe, as local players. They shall not be affected by a foreign quota. We will apply for their work visas/permits from Gonvernment but still treat them as locals for the benefit of our professionalism, as players aka Ngwane aren't professional technically, tactically, physically, nor indeed mentally. After five years, our academies should have developed some Maswati players good enough to play professionally. We will then gradually introduce a system by which we can include our neighbours into the foreign quota. In ten years time, we should be self-reliant. Anyhow we will be playing outside of FIFA. We shall not have the obligation of National teams.",
      highlights: [
        { label: "16 Club Shareholders", desc: "Private company 100% owned by the 16 clubs. Upon relegation, the promoted replacement club inherits the share." },
        { label: "Board of 5 to 7 Directors", desc: "Elected directly by the 16 clubs to oversee corporate operations independently under FFE oversight." },
        { label: "Core Executive Staff", desc: "Operated by a designated Executive Director, assisted by an Accountant, an Office Secretary, and a Messenger." },
        { label: "End-of-Season Fixtures Release", desc: "Full annual fixture list published at the close of the prior season to allow comprehensive pre-season planning." },
        { label: "5-Year Regional Player Policy", desc: "Players from Mozambique, South Africa, Lesotho, Namibia, Botswana, and Zimbabwe treated as local (no foreign quota, FFE assists with work permits) to accelerate professional standards." },
        { label: "10-Year Self-Reliance & Outside FIFA", desc: "Path to domestic self-reliance as academies mature. Playing outside FIFA without national team obligations or bureaucratic drag." }
      ],
      icon: Globe2,
      accentColor: "border-purple-500",
      tagColor: "bg-purple-100 text-purple-900 border-purple-200"
    },
    {
      id: 5,
      badge: "Article V • Youth & Women's Football",
      title: "Women's Football & 3-Tier Youth Development",
      summary: "Ages 1–10 Nursery (play at 1-2, co-ed coaching at 3) -> Ages 11–17 segregated Boys & Girls Academy -> Age 18 Senior Professional Teams. Dedicated Women's League.",
      verbatim: "WOMEN'S FOOTBALL. At the FOOTBALL FEDERATION ESWATINI, we have a three-tier development structure. At the bottom, we have what we call the NURSERY. The nursery begins with children one and two years old. Boys and girls playing together. They come to the training grounds on Saturday morning to play. We let them play with the ball. Boys and girls together at this stage. When they turn 3, we begin coaching them how to play. Boys and girls together until they turn 10 years of age. At 11 years of age, they graduate to the Academy stage. We now seperate them into Boys academy and girls academy. They will be groomed here during their prime learning stage. At 18 years of age, they graduate to their respective senior teams. Surely by this time they are ripe professional players for both women and men's football. There will also be a women's league. Maswati, we want to put you on the world map. FOR ONCE,",
      highlights: [
        { label: "Tier 1: The Nursery (Ages 1–10)", desc: "Ages 1–2: Saturday morning free play with the ball. Ages 3–10: Technical co-ed coaching for boys and girls together." },
        { label: "Tier 2: The Academy (Ages 11–17)", desc: "Graduation at age 11 into separate elite Boys and Girls Academies for prime tactical and physical grooming." },
        { label: "Tier 3: Senior Pro Teams (Age 18+)", desc: "Direct graduation at 18 into fully professional senior men's and women's squads." },
        { label: "Dedicated Women's League", desc: "A standalone professional Women's League giving equal stage, investment, and spotlight to female talent." },
        { label: "The Historic Rallying Cry", desc: "\"Maswati, we want to put you on the world map. FOR ONCE,\"" }
      ],
      icon: Baby,
      accentColor: "border-rose-500",
      tagColor: "bg-rose-100 text-rose-900 border-rose-200"
    }
  ];

  const currentPillar = pillars.find(p => p.id === activeTab) || pillars[0];
  const CurrentIcon = currentPillar.icon;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black text-white p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-black font-black text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Official Constitutional Declaration
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            The 5 Foundational Constitutional Pillars
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">
            How the <strong>FOOTBALL FEDERATION ESWATINI</strong> and the <strong>INDVUNDVUNDVWANE MAJOR FOOTBALL LEAGUE ESWATINI</strong> are legally, structurally, and philosophically constituted.
          </p>
        </div>
      </div>

      {/* Pillar Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activeTab === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isActive 
                  ? 'bg-black text-white border-black shadow-xl ring-2 ring-primary/40 -translate-y-1' 
                  : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-zinc-800 text-secondary' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  Pillar {pillar.id}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-secondary' : 'text-zinc-400'}`} />
              </div>
              <p className="font-bold text-sm leading-snug line-clamp-2">
                {pillar.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Detailed View */}
      <Card className="border-2 border-zinc-200 shadow-xl overflow-hidden bg-white">
        <div className="bg-zinc-950 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-secondary border border-white/10">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-secondary text-secondary font-mono text-xs">
                  {currentPillar.badge}
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                {currentPillar.title}
              </h3>
            </div>
          </div>
          <div className="text-sm text-zinc-400 font-medium">
            Pillar {currentPillar.id} of 5
          </div>
        </div>

        <CardContent className="p-6 md:p-10 space-y-8">
          {/* Verbatim Constitutional Text Box */}
          <div className="bg-amber-50/70 border-l-4 border-amber-500 p-6 md:p-8 rounded-r-2xl shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-3">
              <FileText className="w-4 h-4 text-amber-600" />
              Verbatim Constitutional Clause
            </div>
            <p className="text-gray-900 text-base md:text-lg italic font-serif leading-relaxed">
              "{currentPillar.verbatim}"
            </p>
          </div>

          {/* Key Breakdown Points */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-wider text-black mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Structural Architecture & Rules
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {currentPillar.highlights.map((point, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200/80 p-5 rounded-xl hover:border-zinc-300 transition-colors">
                  <h5 className="font-bold text-zinc-900 text-sm md:text-base mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    {point.label}
                  </h5>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Navigation */}
          <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {pillars.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    activeTab === p.id 
                      ? 'bg-black text-white scale-110 shadow-md' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                  aria-label={`Go to Pillar ${p.id}`}
                >
                  {p.id}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              {activeTab > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab(activeTab - 1)}
                >
                  Previous Pillar
                </Button>
              )}
              {activeTab < 5 && (
                <Button 
                  className="bg-black text-white hover:bg-zinc-800" 
                  size="sm"
                  onClick={() => setActiveTab(activeTab + 1)}
                >
                  Next Pillar <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
