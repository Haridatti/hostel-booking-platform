'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Calendar, Users, MapPin } from 'lucide-react';
import { allHostels } from '@/lib/mock-data';

// Mock data for bookings - in a real app, this would come from a database
const mockBookings = [
  {
    id: 1,
    hostelId: 1,
    checkIn: '2024-08-15',
    checkOut: '2024-08-20',
    guests: 2,
  },
  {
    id: 2,
    hostelId: 4,
    checkIn: '2024-09-10',
    checkOut: '2024-09-15',
    guests: 1,
  },
];


export default function BookingsPage() {
  const bookingsWithDetails = mockBookings.map(booking => {
    const hostel = allHostels.find(h => h.id === booking.hostelId);
    return { ...booking, hostel };
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">My Bookings</h1>
        <p className="text-muted-foreground mt-2">
          Here are your past and upcoming hostel stays.
        </p>
      </div>

      {bookingsWithDetails.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-8">
          {bookingsWithDetails.map(({ id, hostel, checkIn, checkOut, guests }) => {
            if (!hostel) return null;
            return (
              <Card key={id} className="shadow-md overflow-hidden md:flex">
                <div className="md:w-1/3">
                   <Image
                      src={hostel.images[0]}
                      alt={`Image of ${hostel.name}`}
                      width={400}
                      height={400}
                      className="w-full h-48 md:h-full object-cover"
                      data-ai-hint="hostel exterior"
                    />
                </div>
                <div className="flex-grow">
                  <CardHeader>
                    <Link href={`/hostel/${hostel.id}`} className="hover:text-primary">
                      <CardTitle className="font-headline">{hostel.name}</CardTitle>
                    </Link>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <MapPin className="h-4 w-4" />
                      {hostel.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary"/>
                      <div>
                        <p className="font-semibold">Check-in</p>
                        <p>{checkIn}</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary"/>
                      <div>
                        <p className="font-semibold">Check-out</p>
                        <p>{checkOut}</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary"/>
                      <div>
                        <p className="font-semibold">Guests</p>
                        <p>{guests}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href={`/hostel/${hostel.id}`}>View Hostel</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg max-w-2xl mx-auto">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mt-6">You have no bookings yet</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            When you book a hostel, your reservation will appear here.
          </p>
          <Button asChild>
            <Link href="/search">
              Find Your Next Adventure
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
