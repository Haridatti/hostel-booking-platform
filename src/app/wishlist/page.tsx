'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import { allHostels } from '@/lib/mock-data';
import HostelCard from '@/components/HostelCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const wishlistedHostels = allHostels.filter(hostel => wishlist.includes(hostel.id));

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Your Wishlist</h1>
        <p className="text-muted-foreground mt-2">
          Your saved hostels for future adventures.
        </p>
      </div>

      {wishlistedHostels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlistedHostels.map(hostel => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Start exploring and save hostels you're interested in!
          </p>
          <Button asChild>
            <Link href="/search">
              Find Hostels
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
