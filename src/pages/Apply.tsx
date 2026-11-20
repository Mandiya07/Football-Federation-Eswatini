import * as React from 'react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, CheckCircle2, Building, FileText, ArrowRight, ArrowLeft, Landmark, MapPin, Search, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { AuthDomainError, db, signInWithGoogle } from '@/lib/firebase';

interface AttachedDocument {
  docKey: string;
  fileName: string;
  fileSizeKb: number;
  mimeType: string;
}

export default function Apply() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("apply");
  const [statusAppId, setStatusAppId] = useState("");
  const [appStatus, setAppStatus] = useState<null | 'Pending' | 'Under Review' | 'Approved' | 'Not Found' | 'Rejected'>(null);

  // Form state
  const [clubName, setClubName] = useState("");
  const [yearFounded, setYearFounded] = useState("");
  const [region, setRegion] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [presidentName, setPresidentName] = useState("");
  const [presidentContact, setPresidentContact] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [ceoContact, setCeoContact] = useState("");
  const [coachName, setCoachName] = useState("");
  const [coachContact, setCoachContact] = useState("");
  const [complianceName, setComplianceName] = useState("");
  const [complianceContact, setComplianceContact] = useState("");
  const [companyReg, setCompanyReg] = useState("");
  const [facilityDetails, setFacilityDetails] = useState("");
  const [documents, setDocuments] = useState<Record<string, AttachedDocument>>({});

  const [formError, setFormError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading } = useAuth();

  const handleFileAttach = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setFormError(`"${file.name}" exceeds the 10MB limit.`);
      return;
    }
    setDocuments(prev => ({
      ...prev,
      [docKey]: {
        docKey,
        fileName: file.name.slice(0, 120),
        fileSizeKb: Math.max(1, Math.round(file.size / 1024)),
        mimeType: file.type || 'application/octet-stream',
      }
    }));
  };

  const handleInlineLogin = async () => {
    setLoginError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err instanceof AuthDomainError) {
        setLoginError(err.message);
      } else {
        setLoginError(err?.message || 'Unable to sign in with Google. Check popup settings and try again.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!user) {
      setFormError("You must be signed in to submit an application.");
      return;
    }
    if (!clubName.trim()) {
      setFormError("Please enter your Registered Club Name in Step 1.");
      setStep(1);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        clubName: clubName.trim().slice(0, 200),
        yearFounded: yearFounded.trim().slice(0, 10),
        region: region.trim().slice(0, 64),
        contactName: contactName.trim().slice(0, 150),
        contactEmail: contactEmail.trim().slice(0, 200),
        officials: {
          president: { name: presidentName.trim().slice(0, 120), contact: presidentContact.trim().slice(0, 120) },
          ceo: { name: ceoName.trim().slice(0, 120), contact: ceoContact.trim().slice(0, 120) },
          headCoach: { name: coachName.trim().slice(0, 120), contact: coachContact.trim().slice(0, 120) },
          complianceOfficer: { name: complianceName.trim().slice(0, 120), contact: complianceContact.trim().slice(0, 120) },
        },
        companyReg: companyReg.trim().slice(0, 100),
        facilityDetails: facilityDetails.trim().slice(0, 2000),
        attachedDocuments: Object.values(documents),
        status: 'Pending',
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setSubmittedAppId(docRef.id);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application", error);
      setFormError("Failed to submit licensing package. Please verify your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusAppId.trim() || !user) return;
    
    try {
      const q = query(collection(db, 'applications'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      let found = false;
      const needle = statusAppId.trim().toLowerCase();
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (docSnap.id.toLowerCase() === needle || (data.clubName && String(data.clubName).toLowerCase().includes(needle))) {
          setAppStatus(data.status);
          found = true;
        }
      });
      
      if (!found) {
        setAppStatus('Not Found');
      }
    } catch (error) {
      console.error("Error checking status", error);
      setAppStatus('Not Found');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-20 flex-grow flex items-center justify-center">
          <Card className="max-w-2xl w-full text-center border-none shadow-xl bg-white p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6 text-lg">
              You must be signed in to access the Digital Licensing Engine and submit or track a club application.
            </p>
            {loginError && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-left text-sm text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>{loginError}</span>
              </div>
            )}
            <Button onClick={handleInlineLogin} size="lg" className="bg-black text-white hover:bg-black/80 px-8">
              Continue with Google
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-20 flex-grow flex items-center justify-center">
          <Card className="max-w-2xl w-full text-center border-none shadow-xl bg-white p-8 md:p-12">
            <CheckCircle2 className="w-20 h-20 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Application Submitted</h2>
            {submittedAppId && (
              <p className="text-sm font-mono bg-zinc-100 inline-block px-3 py-1 rounded mb-4 text-zinc-700">
                Reference ID: {submittedAppId}
              </p>
            )}
            <p className="text-gray-600 mb-8 text-lg">
              Your licensing package has been successfully submitted to the FFE Digital Licensing Engine. 
              Our compliance officers will review your corporate and infrastructure documents within 48 hours.
            </p>
            <div className="bg-zinc-50 border rounded-xl p-6 mb-8 text-left">
               <h3 className="font-bold mb-4 border-b pb-2">Next Steps & Approval Workflow</h3>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                     <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Pending</span>
                     <span className="text-sm text-gray-700">Initial document screening (Current Status)</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Under Review</span>
                     <span className="text-sm text-gray-700">Detailed compliance & finance audit by FFE</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Approved</span>
                     <span className="text-sm text-gray-700">Official licensing granted & equity secured</span>
                  </li>
               </ul>
            </div>
            <Button size="lg" className="bg-black text-white px-8" asChild>
              <Link to="/dashboard">Go to Club Dashboard</Link>
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const renderUploadRow = (docKey: string, title: string, subtitle: string, accentBg = 'bg-primary/10 text-primary', iconEl = <FileText className="w-5 h-5" />) => {
    const attached = documents[docKey];
    return (
      <label className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-50 cursor-pointer transition-colors">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${attached ? 'bg-emerald-100 text-emerald-700' : accentBg}`}>
            {attached ? <CheckCircle2 className="w-5 h-5" /> : iconEl}
          </div>
          <div>
            <p className="font-bold text-sm">{title}</p>
            {attached ? (
              <p className="text-xs text-emerald-700 font-medium">{attached.fileName} ({attached.fileSizeKb} KB)</p>
            ) : (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-input bg-background text-xs font-medium hover:bg-accent">
          <Upload className="w-3.5 h-3.5 mr-1.5" /> {attached ? 'Replace' : 'Select File'}
        </span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => handleFileAttach(docKey, e)}
        />
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-black text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h1 className="text-4xl font-bold mb-4">Digital Licensing Engine</h1>
            <p className="text-gray-400 text-lg">Elite Club Compliance Portal: Submit your documentation to begin the corporate and infrastructure vetting process.</p>
         </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white border p-1 rounded-xl shadow-sm">
                <TabsTrigger value="apply" className="px-6 py-2 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white">New Application</TabsTrigger>
                <TabsTrigger value="status" className="px-6 py-2 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white">Check Status</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="apply" className="mt-0">
               {/* Progress Tracker */}
               <div className="mb-12">
                 <div className="flex justify-between text-sm font-medium text-gray-500 mb-4 px-2">
                   <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-black' : ''}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</div>
                     <span className="hidden sm:block">Identity</span>
                   </div>
                   <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-black' : ''}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</div>
                     <span className="hidden sm:block">Officials</span>
                   </div>
                   <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-black' : ''}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>3</div>
                     <span className="hidden sm:block">Corporate</span>
                   </div>
                   <div className={`flex flex-col items-center gap-2 ${step >= 4 ? 'text-black' : ''}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 4 ? 'bg-black text-white' : 'bg-gray-200'}`}>4</div>
                     <span className="hidden sm:block">Infrastructure</span>
                   </div>
                   <div className={`flex flex-col items-center gap-2 ${step >= 5 ? 'text-black' : ''}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 5 ? 'bg-black text-white' : 'bg-gray-200'}`}>5</div>
                     <span className="hidden sm:block">Review</span>
                   </div>
                 </div>
                 <Progress value={step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100} className="h-2 bg-gray-200 [&>div]:bg-black" />
                 <div className="text-center mt-4 text-sm text-gray-500 font-medium">Compliance Checklist: {step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100}% Complete</div>
               </div>

               {formError && (
                 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-900 flex items-center justify-between">
                   <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-600 shrink-0" /> {formError}</span>
                   <button type="button" onClick={() => setFormError(null)} className="text-xs underline ml-4">Dismiss</button>
                 </div>
               )}

               <Card className="border-none shadow-xl bg-white overflow-hidden">
                 <CardContent className="p-0">
                   <form onSubmit={handleSubmit}>
                 <div className="p-8 md:p-12">
                   
                   {/* STEP 1: Identity */}
                   {step === 1 && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                         <Building className="w-6 h-6 text-primary" />
                         <h2 className="text-2xl font-bold">1. Club Identity</h2>
                       </div>
                       
                       <div className="grid sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <Label htmlFor="clubName">Registered Club Name</Label>
                           <Input id="clubName" placeholder="e.g. Royal Lobamba FC" value={clubName} onChange={(e) => setClubName(e.target.value)} required />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="yearFounded">Year Founded (if applicable)</Label>
                           <Input id="yearFounded" type="number" placeholder="2026" value={yearFounded} onChange={(e) => setYearFounded(e.target.value)} />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                          <Label htmlFor="region">Operating Region</Label>
                          <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <option value="">Select Region</option>
                            <option value="Hhohho">Hhohho</option>
                            <option value="Manzini">Manzini</option>
                            <option value="Shiselweni">Shiselweni</option>
                            <option value="Lubombo">Lubombo</option>
                          </select>
                       </div>

                       <div className="grid sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <Label htmlFor="contactName">Contact Person</Label>
                           <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required placeholder="John Doe" />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="contactEmail">Official Email Address</Label>
                           <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required placeholder="admin@club.com" />
                         </div>
                       </div>
                     </div>
                   )}

                   {/* STEP 2: Officials */}
                   {step === 2 && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                         <MapPin className="w-6 h-6 text-primary" />
                         <h2 className="text-2xl font-bold">2. Key Officials</h2>
                       </div>
                       
                       <div className="grid sm:grid-cols-2 gap-6">
                         <div className="space-y-4 border p-4 rounded-xl">
                           <h3 className="font-bold border-b pb-2">President</h3>
                           <div className="space-y-2">
                             <Label htmlFor="presidentName">Name</Label>
                             <Input id="presidentName" value={presidentName} onChange={(e) => setPresidentName(e.target.value)} required />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="presidentContact">Contact Details</Label>
                             <Input id="presidentContact" value={presidentContact} onChange={(e) => setPresidentContact(e.target.value)} required />
                           </div>
                         </div>
                         <div className="space-y-4 border p-4 rounded-xl">
                           <h3 className="font-bold border-b pb-2">CEO</h3>
                           <div className="space-y-2">
                             <Label htmlFor="ceoName">Name</Label>
                             <Input id="ceoName" value={ceoName} onChange={(e) => setCeoName(e.target.value)} required />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="ceoContact">Contact Details</Label>
                             <Input id="ceoContact" value={ceoContact} onChange={(e) => setCeoContact(e.target.value)} required />
                           </div>
                         </div>
                         <div className="space-y-4 border p-4 rounded-xl">
                           <h3 className="font-bold border-b pb-2">Head Coach</h3>
                           <div className="space-y-2">
                             <Label htmlFor="coachName">Name</Label>
                             <Input id="coachName" value={coachName} onChange={(e) => setCoachName(e.target.value)} required />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="coachContact">Contact Details</Label>
                             <Input id="coachContact" value={coachContact} onChange={(e) => setCoachContact(e.target.value)} required />
                           </div>
                         </div>
                         <div className="space-y-4 border p-4 rounded-xl">
                           <h3 className="font-bold border-b pb-2">Compliance Officer</h3>
                           <div className="space-y-2">
                             <Label htmlFor="complianceName">Name</Label>
                             <Input id="complianceName" value={complianceName} onChange={(e) => setComplianceName(e.target.value)} required />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="complianceContact">Contact Details</Label>
                             <Input id="complianceContact" value={complianceContact} onChange={(e) => setComplianceContact(e.target.value)} />
                           </div>
                         </div>
                       </div>
                     </div>
                   )}

                   {/* STEP 3: Corporate */}
                   {step === 3 && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                         <Landmark className="w-6 h-6 text-primary" />
                         <h2 className="text-2xl font-bold">3. Corporate & Finance</h2>
                       </div>
                       
                       <div className="space-y-2 mb-6">
                         <Label htmlFor="companyReg">Company Registration Number</Label>
                         <Input id="companyReg" value={companyReg} onChange={(e) => setCompanyReg(e.target.value)} placeholder="e.g. 2026/12345/07" required />
                         <p className="text-xs text-gray-500 mt-1">Clubs must be registered commercial entities, not societies.</p>
                       </div>

                       <div className="space-y-4">
                          <Label>Attach Official Documents</Label>
                          {renderUploadRow('incorporation', 'Certificate of Incorporation', 'PDF, up to 10MB')}
                          {renderUploadRow('capital', 'Proof of Capital / Bank Letter', 'Must show minimum E 1.5M operational capacity')}
                          {renderUploadRow('audit', 'Independent Financial Audit', 'Required for Financial Fair Play (FFP) Compliance')}
                          {renderUploadRow('directorsId', 'Directors ID / Passport Copies', 'For background vetting')}
                       </div>
                     </div>
                   )}

                   {/* STEP 4: Infrastructure */}
                   {step === 4 && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                         <MapPin className="w-6 h-6 text-primary" />
                         <h2 className="text-2xl font-bold">4. Land, Infrastructure & Academy</h2>
                       </div>
                       
                       <div className="bg-black text-white p-6 rounded-xl mb-6">
                          <p className="text-sm font-medium mb-2 uppercase tracking-wide text-gray-400">Core Requirement</p>
                          <p className="text-sm leading-relaxed">To be eligible for the Major League, clubs must own at least 3 hectares of land designated for a training facility/stadium, AND demonstrate a commitment to the 3-Tier Nursery &amp; Youth Academy structure.</p>
                       </div>

                       <div className="space-y-4">
                          <Label>Attach Facilities &amp; Academy Proof</Label>
                          {renderUploadRow('titleDeed', 'Title Deed / Land Ownership Proof', 'PDF or Image Document', 'bg-secondary/20 text-black', <MapPin className="w-5 h-5" />)}
                          {renderUploadRow('blueprints', 'Facility Development Plans', 'Architectural drawings or blueprints for Stadium & Clinic', 'bg-secondary/20 text-black', <Building className="w-5 h-5" />)}
                          {renderUploadRow('academyPlan', 'Youth Academy Development Plan', 'Outlining Nursery (1–10), Academy (11–17 Boys & Girls), and Senior integration', 'bg-secondary/20 text-black', <FileText className="w-5 h-5" />)}
                          
                          <div className="space-y-2 mt-4">
                            <Label htmlFor="facilityDetails">Facility Details &amp; GPS Coordinates (Optional)</Label>
                            <Textarea id="facilityDetails" value={facilityDetails} onChange={(e) => setFacilityDetails(e.target.value)} placeholder="Provide link to Google Maps coordinates or describe current infrastructure status..." />
                          </div>
                       </div>
                     </div>
                   )}

                   {/* STEP 5: Review */}
                   {step === 5 && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                         <CheckCircle2 className="w-6 h-6 text-primary" />
                         <h2 className="text-2xl font-bold">5. Review &amp; Declarations</h2>
                       </div>

                       <div className="p-4 bg-zinc-50 border rounded-xl text-sm space-y-1.5">
                         <p><span className="font-bold">Club:</span> {clubName || 'Not specified'} ({region || 'Region not set'})</p>
                         <p><span className="font-bold">Company Registration:</span> {companyReg || 'Pending entry'}</p>
                         <p><span className="font-bold">Attached Documents:</span> {Object.keys(documents).length} of 7 files attached</p>
                       </div>
                       
                       <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 mb-6">
                         <h3 className="font-bold mb-4">Declarations</h3>
                         
                         <div className="space-y-4">
                           <div className="flex gap-3">
                             <input type="checkbox" id="dec1" className="mt-1 w-4 h-4 accent-primary" required />
                             <label htmlFor="dec1" className="text-sm text-gray-700 leading-relaxed">
                               I declare that all information provided is accurate and true. I understand that falsifying documents will lead to immediate lifetime ban from the Football Federation Eswatini.
                             </label>
                           </div>
                           <div className="flex gap-3">
                             <input type="checkbox" id="dec2" className="mt-1 w-4 h-4 accent-primary" required />
                             <label htmlFor="dec2" className="text-sm text-gray-700 leading-relaxed">
                               The club agrees to abide by the FFE Constitution, Financial Fair Play Regulations, and the Anti-Corruption Code.
                             </label>
                           </div>
                           <div className="flex gap-3">
                             <input type="checkbox" id="dec3" className="mt-1 w-4 h-4 accent-primary" required />
                             <label htmlFor="dec3" className="text-sm text-gray-700 leading-relaxed">
                               I authorize the FFE to conduct independent verification of company registration and land deeds with relevant national authorities.
                             </label>
                           </div>
                         </div>
                       </div>
                     </div>
                   )}

                 </div>

                 {/* Navigation Footer */}
                 <div className="bg-gray-50 p-6 border-t flex justify-between items-center rounded-b-xl">
                   {step > 1 ? (
                     <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                       <ArrowLeft className="w-4 h-4 mr-2" /> Back
                     </Button>
                   ) : (
                     <div></div>
                   )}
                   
                   {step < 5 ? (
                     <Button type="button" onClick={() => setStep(step + 1)} className="bg-black text-white px-8 hover:bg-black/80">
                       Next Step <ArrowRight className="w-4 h-4 ml-2" />
                     </Button>
                   ) : (
                     <Button type="submit" disabled={isSubmitting} className="bg-primary text-white px-8 hover:bg-primary/90 text-lg h-12">
                       {isSubmitting ? 'Submitting...' : 'Submit to Licensing Engine'}
                     </Button>
                   )}
                 </div>
               </form>
             </CardContent>
           </Card>
           </TabsContent>

           <TabsContent value="status" className="mt-0">
              <Card className="border-none shadow-xl bg-white overflow-hidden p-8 md:p-12 text-center max-w-2xl mx-auto">
                 <Search className="w-16 h-16 text-primary mx-auto mb-6" />
                 <h2 className="text-3xl font-bold mb-4">Application Status Tracker</h2>
                 <p className="text-gray-600 mb-8">Enter your Application Reference ID or Registered Club Name to view the real-time status of your licensing review.</p>
                 <form onSubmit={handleCheckStatus} className="flex gap-2 max-w-md mx-auto mb-8">
                     <Input 
                       placeholder="Reference ID or Club Name" 
                       value={statusAppId} 
                       onChange={(e) => setStatusAppId(e.target.value)}
                       required
                       className="text-center bg-zinc-50 font-mono"
                     />
                     <Button type="submit" className="bg-black text-white hover:bg-black/80">Check Status</Button>
                 </form>

                 {appStatus && (
                   <div className="bg-zinc-50 border rounded-xl p-6 text-left animate-in fade-in slide-in-from-bottom-2">
                      <h3 className="font-bold text-lg mb-4 text-center border-b pb-4">Status Result</h3>
                      {appStatus === 'Pending' && (
                        <div className="flex flex-col items-center gap-4">
                           <div className="p-4 bg-yellow-100 rounded-full">
                              <FileText className="text-yellow-600 w-8 h-8" />
                           </div>
                           <div className="text-center">
                             <h4 className="text-xl font-bold text-yellow-600 mb-2">Pending Initial Review</h4>
                             <p className="text-gray-600 text-sm">Your application has been received and is awaiting initial document screening by the compliance team. Please allow 48-72 hours.</p>
                           </div>
                        </div>
                      )}
                      {appStatus === 'Under Review' && (
                        <div className="flex flex-col items-center gap-4">
                           <div className="p-4 bg-blue-100 rounded-full">
                              <Search className="text-blue-600 w-8 h-8" />
                           </div>
                           <div className="text-center">
                             <h4 className="text-xl font-bold text-blue-600 mb-2">Under Review</h4>
                             <p className="text-gray-600 text-sm">Your application is currently undergoing detailed commercial and infrastructure audits by the FFE compliance committee.</p>
                           </div>
                        </div>
                      )}
                      {appStatus === 'Approved' && (
                        <div className="flex flex-col items-center gap-4">
                           <div className="p-4 bg-green-100 rounded-full">
                              <CheckCircle2 className="text-green-600 w-8 h-8" />
                           </div>
                           <div className="text-center">
                             <h4 className="text-xl font-bold text-green-600 mb-2">Approved</h4>
                             <p className="text-gray-600 text-sm">Congratulations! Your licensing package has been approved. You are now officially cleared for next steps in the Indvundvundvwane Major Football League.</p>
                           </div>
                        </div>
                      )}
                      {appStatus === 'Rejected' && (
                        <div className="flex flex-col items-center gap-4">
                           <div className="p-4 bg-red-100 rounded-full">
                              <AlertCircle className="text-red-600 w-8 h-8" />
                           </div>
                           <div className="text-center">
                             <h4 className="text-xl font-bold text-red-600 mb-2">Application Rejected</h4>
                             <p className="text-gray-600 text-sm">Your application did not meet the mandatory licensing criteria. Contact the compliance desk for detailed feedback.</p>
                           </div>
                        </div>
                      )}
                      {appStatus === 'Not Found' && (
                        <div className="flex flex-col items-center gap-4">
                           <div className="p-4 bg-red-100 rounded-full">
                              <span className="font-bold text-red-600 text-2xl px-2">!</span>
                           </div>
                           <div className="text-center">
                             <h4 className="text-xl font-bold text-red-600 mb-2">Application Not Found</h4>
                             <p className="text-gray-600 text-sm">We could not find an application matching that ID or club name under your account.</p>
                           </div>
                        </div>
                      )}
                   </div>
                 )}
              </Card>
           </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
