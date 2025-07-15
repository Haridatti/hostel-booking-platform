import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HostelCard from '@/components/HostelCard';
import { featuredHostels } from '@/lib/mock-data';
import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section with Freepik Background */}
      <section
        className="w-full py-20 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hostel-hero.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="bg-white/80 backdrop-blur-sm py-10 px-6 rounded-xl max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-destructive-foreground bg-destructive rounded-lg p-4 inline-block">
            Hostel Booking Platform
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
            Your compass to the world's most vibrant hostels. Discover, connect, and explore.
          </p>
          <div className="mt-8 max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Featured Hostels</h2>
            <Button asChild variant="link">
              <Link href="/search">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featuredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
