'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { allHostels } from '@/lib/mock-data';
import HostelCard from '@/components/HostelCard';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Hostel, Facility } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const facilitiesList: { id: Facility; label: string }[] = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'pool', label: 'Pool' },
  { id: 'parking', label: 'Parking' },
  { id: 'gym', label: 'Gym' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'food', label: 'Food' },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  
  const [sortOrder, setSortOrder] = useState('rating-desc');
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);

  const handleFacilityChange = (facility: Facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((a) => a !== facility)
        : [...prev, facility]
    );
  };
  
  const filteredAndSortedHostels = useMemo(() => {
    let hostels: Hostel[] = [...allHostels];

    if (location) {
      hostels = hostels.filter(h => h.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (selectedFacilities.length > 0) {
      hostels = hostels.filter((hostel) =>
        selectedFacilities.every((facility) => hostel.facilities.includes(facility))
      );
    }
    
    return hostels.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating-desc': return b.rating - a.rating;
        default: return b.rating - a.rating;
      }
    });
  }, [location, sortOrder, selectedFacilities]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2 font-headline">
        Hostels {location ? `in ${location}` : ''}
      </h1>
      <p className="text-muted-foreground mb-8">
        Found {filteredAndSortedHostels.length} hostels. Happy travels!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="sort" className="font-bold">Sort by</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger id="sort" className="w-full mt-2">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Filter by Facilities</h3>
                <div className="space-y-2">
                  {facilitiesList.map((facility) => (
                    <div key={facility.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={facility.id}
                        checked={selectedFacilities.includes(facility.id)}
                        onCheckedChange={() => handleFacilityChange(facility.id)}
                      />
                      <Label htmlFor={facility.id} className="font-normal cursor-pointer">{facility.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          {filteredAndSortedHostels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedHostels.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No Hostels Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or searching for a different location.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-10 w-1/3 mb-2" />
      <Skeleton className="h-6 w-1/4 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Skeleton className="h-64 w-full" />
        </aside>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}
