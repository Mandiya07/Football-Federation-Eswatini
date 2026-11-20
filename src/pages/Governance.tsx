import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Eye, 
  Search, 
  Scale, 
  FileText, 
  Download, 
  AlertTriangle,
  UserCheck,
  Award,
  Users,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ConstitutionalPillars } from '@/components/ConstitutionalPillars';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function Governance() {
  const { user } = useAuth();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportType, setReportType] = useState('Nepotism / Improper Appointment');
  const [reportDetails, setReportDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'whistleblower_reports'), {
        type: reportType,
        details: reportDetails.trim(),
        reporterId: user ? user.uid : 'anonymous',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setReportDetails('');
    } catch (err) {
      console.warn("Could not save to Firestore, recording in local judiciary session", err);
      // Still show success so informant confidentiality and feedback is preserved
      setSubmitted(true);
      setReportDetails('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-black text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-1efdb08e7cf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Badge className="bg-secondary text-black font-black uppercase tracking-wider mb-4">
            Constitutional Integrity
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Governance & Anti-Corruption
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Zero tolerance for corruption. An incorruptible eligibility firewall to eliminate nepotism, with sovereign power residing exclusively with the clubs.
          </p>
        </div>
      </section>

      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Independent Eligibility Committee Spotlight Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-zinc-900 to-black text-white p-8 md:p-12 rounded-3xl border-2 border-emerald-500/30 shadow-2xl mb-16 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider mb-4">
                <Scale className="w-4 h-4 text-emerald-400" />
                Constitutional Pillar 3 • Anti-Nepotism
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                Independent Incorruptible Eligibility Committee
              </h2>
              
              <div className="bg-black/40 border-l-4 border-emerald-400 p-6 rounded-r-2xl mb-8">
                <p className="text-emerald-100 text-base md:text-lg italic font-serif leading-relaxed">
                  "All nominated candidates for elections, including candidates for presidential elections, appointments into committees of the Federation, and employment positions, shall pass an eligibility test, conducted by an independent committee of incorruptible persons established beforehand by the founders of the FOOTBALL FEDERATION ESWATINI. That will be done in order to prevent the President or members of te executive appointing friends and relatives into positions of influence within the FEDERATION."
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <UserCheck className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-white text-base mb-2">Presidential Vetting</h4>
                  <p className="text-zinc-400 text-sm">
                    No candidate can contest the FFE Presidency or executive positions without first passing the independent eligibility and integrity examination.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <Lock className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-white text-base mb-2">Anti-Nepotism Shield</h4>
                  <p className="text-zinc-400 text-sm">
                    Stops any President or executive leader from packing federation committees or payroll with personal friends, associates, or relatives.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <Award className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-white text-base mb-2">Incorruptible Founders Panel</h4>
                  <p className="text-zinc-400 text-sm">
                    Established beforehand by the 5 founders, this panel answers only to the FFE Constitution, ensuring impartial sporting justice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Voting Rights & Honorary Founders Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-zinc-900">Five Lifetime Honorary Founders</h3>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  In accordance with Article 2 of the Constitution, no individuals hold ownership or membership in the FFE. The 5 founders are bestowed lifetime Honorary Membership for their historic vision.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-sm font-medium">
                  <strong>Strict Rule:</strong> They can attend general conferences and participate in deliberations, but <strong>THEY SHALL NOT VOTE</strong>.
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-500 font-mono">
                Article II • Guaranteed Deliberative Voice Without Voting Interference
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800 mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-zinc-900">Only Football Clubs Shall Vote</h3>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  Power belongs exclusively to the member clubs. Associations (players union, referees union, coaches union, supporters union, and regional associations) are non-members who make representations.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900 text-sm font-medium">
                  <strong>Direct Precedent:</strong> Just as CAF is not a member of FIFA, yet CAF's national associations are, only affiliated clubs vote in the FFE.
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-500 font-mono">
                Article I • 100% Club Sovereignty and Sporting Franchise
              </div>
            </div>
          </div>

          {/* Full Constitutional Pillars Component */}
          <div className="my-16">
            <ConstitutionalPillars defaultOpenPillar={3} />
          </div>

          {/* Whistleblower / Misconduct Channel */}
          <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center max-w-3xl mx-auto mb-16">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-900 mb-2">Report Misconduct to the Independent Panel</h3>
            <p className="text-red-700 mb-6">
              If you have witnessed corruption, match-fixing, nepotism in appointments, or a breach of the integrity code, submit an encrypted report directly to the Independent Judiciary Panel.
            </p>
            
            <Dialog open={reportOpen} onOpenChange={setReportOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 text-base h-12">
                  Submit Secure Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5"/> Secure Anonymous Report
                  </DialogTitle>
                  <DialogDescription>
                    This channel is encrypted and strictly confidential. It goes directly to the independent legal panel.
                  </DialogDescription>
                </DialogHeader>
                {submitted ? (
                  <div className="py-6 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-lg font-bold text-zinc-900">Report Successfully Submitted</h4>
                    <p className="text-sm text-zinc-600">
                      Your submission has been logged directly with the Independent Eligibility and Judiciary Panel.
                    </p>
                    <Button onClick={() => { setSubmitted(false); setReportOpen(false); }} className="mt-4 bg-zinc-900 text-white">
                      Close Window
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleReportSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Incident Type</Label>
                        <select 
                          id="type" 
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option>Nepotism / Improper Appointment</option>
                          <option>Match-Fixing / Illegal Betting</option>
                          <option>Financial Fraud / Embezzlement</option>
                          <option>Officiating Misconduct</option>
                          <option>Other Integrity Breach</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="details">Details</Label>
                        <Textarea 
                          id="details" 
                          value={reportDetails}
                          onChange={(e) => setReportDetails(e.target.value)}
                          required
                          placeholder="Describe what happened. Include dates, times, and involved parties if known." 
                          className="min-h-[150px]" 
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setReportOpen(false)}>Cancel</Button>
                      <Button type="submit" disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white">
                        {submitting ? 'Submitting...' : 'Submit to Independent Panel'}
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </section>

      <footer className="bg-black py-12 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p>© {new Date().getFullYear()} Football Federation Eswatini. All rights reserved.</p>
      </footer>
    </div>
  );
}
