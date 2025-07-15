'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { getHostelById } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Users, ArrowLeft, BedDouble } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, differenceInDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const id = Number(params.id);
  const hostel = getHostelById(id);

  const [dates, setDates] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const nights = useMemo(() => {
    if (dates?.from && dates?.to) {
      const diff = differenceInDays(dates.to, dates.from);
      return diff > 0 ? diff : 0;
    }
    return 0;
  }, [dates]);

  const totalPrice = useMemo(() => {
    if (hostel && nights > 0 && guests > 0) {
      return hostel.price * nights * guests;
    }
    return 0;
  }, [hostel, nights, guests]);

  if (!hostel) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Hostel not found</h1>
          <p className="text-muted-foreground mt-2">The hostel you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!dates?.from || !dates?.to || guests <= 0 || nights <= 0) {
      toast({
        title: 'Incomplete Information',
        description: 'Please select valid check-in/out dates and number of guests.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Booking Confirmed!',
      description: `Your booking at ${hostel.name} is confirmed. Enjoy your stay!`,
    });
    router.push('/bookings');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to hostel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline">Confirm your Booking</CardTitle>
              <CardDescription>Please review and confirm your details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dates">Check-in / Check-out Dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="dates" variant="outline" className="w-full justify-start font-normal text-left">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {dates?.from ? (
                        dates.to ? (
                          <>
                            {format(dates.from, 'LLL dd, y')} - {format(dates.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dates.from, 'LLL dd, y')
                        )
                      ) : (
                        <span className="text-muted-foreground">Pick your dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dates}
                      onSelect={setDates}
                      initialFocus
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="guests"
                    type="number"
                    placeholder="Guests"
                    className="pl-10"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
                  />
                </div>
              </div>
              
              <Separator />

              <div className="space-y-4">
                 <h3 className="text-lg font-semibold">Guest Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="John Doe" required />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required/>
                    </div>
                 </div>
              </div>

            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <Image
                src={hostel.images[0]}
                alt={`Image of ${hostel.name}`}
                width={400}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-4"
                data-ai-hint="hostel room"
              />
              <CardTitle className="font-headline">{hostel.name}</CardTitle>
              <CardDescription>{hostel.location}</CardDescription>
            </CardHeader>
            <CardContent>
              {nights > 0 ? (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="text-lg font-semibold pt-2">Booking Summary</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><BedDouble className="h-4 w-4" /> Duration of stay</span>
                    <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Number of guests</span>
                    <span className="font-medium">{guests}</span>
                  </div>
                   <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Price per night</span>
                    <span className="font-medium">₹{hostel.price.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Price</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Select your dates to see the price.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={handleBooking} disabled={totalPrice <= 0}>
                Confirm and Book
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
