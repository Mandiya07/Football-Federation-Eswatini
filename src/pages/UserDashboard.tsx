import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Star, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function UserDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Navbar />
      <div className="bg-black text-white py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl font-bold">Welcome, {user?.displayName || 'Supporter'}!</h1>
            <p className="text-gray-400">Fan Portal</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
           <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Ticket className="w-5 h-5 text-primary" /> Leagues &amp; Fixtures</CardTitle>
                <CardDescription>Explore the Indvundvundvwane Major League.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed rounded-lg">
                   No upcoming tickets booked
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link to="/leagues">Explore Leagues</Link>
                </Button>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /> Club Directory</CardTitle>
                <CardDescription>Discover licensed FFE shareholder clubs.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed rounded-lg">
                   Select your favorite club
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/clubs">Browse Clubs</Link>
                </Button>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-blue-500" /> Club Investment</CardTitle>
                <CardDescription>Review active club funding rounds.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed rounded-lg">
                   Open equity &amp; sponsorship opportunities
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/investment">View Opportunities</Link>
                </Button>
             </CardContent>
           </Card>
        </div>
        
        <Card className="bg-zinc-100 border-none">
          <CardContent className="p-6 md:p-8 text-center text-gray-600">
             <h3 className="text-lg font-bold mb-2">Want to license a club?</h3>
             <p className="text-sm mb-4">Are you a club official or administrator? Submit your club package through the Digital Licensing Engine.</p>
             <Button variant="outline" asChild>
               <Link to="/apply">Apply for Club Licensing</Link>
             </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 mt-auto">
        <p className="text-sm">FFE Fan Portal</p>
      </footer>
    </div>
  );
}
