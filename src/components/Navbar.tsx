import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Menu, LogOut, Copy, Check, AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { AuthDomainError, signInWithGoogle, signOut } from '@/lib/firebase';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authErrorDetails, setAuthErrorDetails] = useState<{ title: string; message: string; hostname?: string } | null>(null);
  const [copiedHost, setCopiedHost] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/logs') return location.pathname === '/logs' || location.pathname === '/standings';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navLinks = [
    { name: 'Logs', path: '/logs' },
    { name: 'Fixtures', path: '/fixtures' },
    { name: 'Leagues', path: '/leagues' },
    { name: 'Clubs Map', path: '/clubs' },
    { name: 'Structure', path: '/structure' },
    { name: 'Governance', path: '/governance' },
    { name: 'About', path: '/about' },
  ];

  const secondaryLinks = [
    { name: 'Membership', path: '/membership' },
    { name: 'Investment', path: '/investment' },
    { name: 'Academy', path: '/academy' },
  ];

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err instanceof AuthDomainError || err?.code === 'auth/unauthorized-domain') {
        const host = err?.hostname || (typeof window !== 'undefined' ? window.location.hostname : '');
        setAuthErrorDetails({
          title: 'Authorize Deployment Domain for Google Sign-In',
          message:
            'Your current deployment domain is not listed under Authorized Domains in your Firebase project. Add the hostname below in Firebase Console → Authentication → Settings → Authorized domains, then retry.',
          hostname: host,
        });
      } else {
        setAuthErrorDetails({
          title: 'Sign-In Could Not Complete',
          message: err?.message || 'Unable to complete Google authentication. Please check your browser popup settings and try again.',
        });
      }
      setAuthDialogOpen(true);
    }
  };

  const handleCopyHostname = () => {
    if (authErrorDetails?.hostname) {
      navigator.clipboard.writeText(authErrorDetails.hostname);
      setCopiedHost(true);
      setTimeout(() => setCopiedHost(false), 2000);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-black text-white border-b border-white/10 shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          {/* Brand mark with Football Federation Eswatini */}
          <Link to="/" className="text-xl sm:text-2xl font-black text-white tracking-tighter flex items-center gap-3 shrink-0">
            <Logo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
            <span className="text-white hidden sm:inline-block">Football Federation Eswatini</span>
            <span className="text-white sm:hidden font-black text-base">FFE</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs xl:text-sm font-semibold transition-all whitespace-nowrap shrink-0 px-2.5 py-1.5 rounded-lg ${
                    active
                      ? 'text-secondary bg-white/10 font-bold border border-secondary/40 shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* User Auth & Actions */}
          <div className="hidden lg:flex gap-3 items-center shrink-0">
            {!loading && user ? (
              <>
                 <span className="text-xs text-gray-400 max-w-[140px] truncate" title={user.email || ''}>
                   {user.email}
                 </span>
                 <Button
                   variant="outline"
                   className={`text-black bg-white hover:bg-gray-200 border-none text-xs h-9 ${
                     isLinkActive('/dashboard') ? 'ring-2 ring-secondary' : ''
                   }`}
                   asChild
                 >
                   <Link to="/dashboard">Dashboard</Link>
                 </Button>
                 <Button variant="ghost" size="icon" onClick={() => signOut()} aria-label="Log out" className="hover:text-primary hover:bg-white/10 h-9 w-9">
                   <LogOut className="w-4 h-4" />
                 </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="text-black bg-white hover:bg-gray-200 border-none text-xs h-9" onClick={handleLogin}>
                  Login
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90 text-xs h-9" asChild>
                  <Link to="/apply">Join Now</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-zinc-950 border-b border-white/10 flex flex-col p-4 gap-1.5 shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 pt-1">
              Core Competitions
            </div>
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    active
                      ? 'text-secondary bg-secondary/10 border-l-4 border-secondary font-bold pl-2.5'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="text-[10px] uppercase font-mono text-secondary">Active</span>}
                </Link>
              );
            })}

            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 pt-3 border-t border-zinc-800">
              Federation
            </div>
            {secondaryLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    active
                      ? 'text-secondary bg-secondary/10 border-l-4 border-secondary font-bold pl-2.5'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="text-[10px] uppercase font-mono text-secondary">Active</span>}
                </Link>
              );
            })}

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              {!loading && user ? (
                 <>
                   <div className="text-xs text-zinc-400 px-3 py-1 truncate">
                     Signed in as <strong className="text-white">{user.email}</strong>
                   </div>
                   <Button variant="outline" className="w-full text-black bg-white" onClick={() => setIsOpen(false)} asChild>
                     <Link to="/dashboard">Dashboard</Link>
                   </Button>
                   <Button variant="destructive" className="w-full" onClick={() => { signOut(); setIsOpen(false); }}>
                     <LogOut className="w-4 h-4 mr-2" /> Log out
                   </Button>
                 </>
              ) : (
                <>
                  <Button variant="outline" className="w-full text-black bg-white" onClick={() => { handleLogin(); setIsOpen(false); }}>
                    Login
                  </Button>
                  <Button className="w-full bg-primary text-white" onClick={() => setIsOpen(false)} asChild>
                    <Link to="/apply">Join Now</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              {authErrorDetails?.title || 'Authentication Notice'}
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm text-zinc-600 leading-relaxed">
              {authErrorDetails?.message}
            </DialogDescription>
          </DialogHeader>
          {authErrorDetails?.hostname && (
            <div className="mt-2 p-3 bg-zinc-100 border border-zinc-200 rounded-lg flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-zinc-900 truncate">{authErrorDetails.hostname}</code>
              <Button size="sm" variant="outline" onClick={handleCopyHostname} className="shrink-0">
                {copiedHost ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copiedHost ? 'Copied' : 'Copy Host'}
              </Button>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button onClick={() => setAuthDialogOpen(false)} className="bg-black text-white hover:bg-black/80">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
