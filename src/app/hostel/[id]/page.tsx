'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getHostelById } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Wifi, UtensilsCrossed, Star, MapPin, ParkingCircle, Sun, Wind, Dumbbell, Heart, Soup, Droplets, Zap, Video, Sparkles, WashingMachine, Refrigerator, BookUser, Waves, Building, ShieldCheck, Users, Banknote, CalendarDays, CheckCircle } from 'lucide-react';
import type { Facility } from '@/lib/types';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const facilityIcons: Record<Facility, React.ElementType> = {
  wifi: Wifi,
  pool: Sun,
  parking: ParkingCircle,
  gym: Dumbbell,
  kitchen: UtensilsCrossed,
  ac: Wind,
  food: Soup,
  water: Droplets,
  power: Zap,
  cctv: Video,
  cleaning: Sparkles,
  laundry: WashingMachine,
  fridge: Refrigerator,
  study: BookUser,
  purifier: Waves,
  lift: Building,
  visitors: Users,
};

const facilityLabels: Record<Facility, string> = {
  wifi: 'High-speed Wi-Fi',
  pool: 'Swimming Pool',
  parking: 'Parking Space (2-Wheeler)',
  gym: 'Gymnasium',
  kitchen: 'Common Kitchen',
  ac: 'Air Conditioning',
  food: 'Daily Meals Provided',
  water: '24/7 Water Supply',
  power: 'Power Backup',
  cctv: 'CCTV Security',
  cleaning: 'Daily Room Cleaning',
  laundry: 'Washing Machine',
  fridge: 'Refrigerator (Common)',
  study: 'Study Table & Chair',
  purifier: 'Water Purifier',
  lift: 'Lift/Elevator Access',
  visitors: 'Visitor Waiting Area',
};

const durationOptions = [
    { value: 'day', label: '1 Day' },
    { value: 'twoDays', label: '2 Days' },
    { value: 'weekly', label: 'Weekly (7 Days)' },
    { value: 'monthly', label: 'Monthly (30 Days)' },
    { value: 'yearly', label: 'Yearly (12 Months)' },
];

export default function HostelDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const hostel = getHostelById(id);
  const { isWishlisted, toggleWishlist } = useWishlist();
  
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [selectedRoomType, setSelectedRoomType] = useState('nonAc');

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
  
  const isSaved = isWishlisted(hostel.id);
  const finalCost = hostel.rateCard 
    ? hostel.rateCard[selectedRoomType as keyof typeof hostel.rateCard][selectedDuration as keyof typeof hostel.rateCard.ac]
    : hostel.price;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold font-headline">{hostel.name}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-foreground">{hostel.rating}</span>
            <span>({hostel.reviews} reviews)</span>
          </div>
          <Separator orientation="vertical" className="h-5 hidden sm:block" />
          <div className="flex items-center gap-1">
            <MapPin className="h-5 w-5" />
            <span>{hostel.fullAddress || hostel.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-2 mb-8">
            <Image
              src={hostel.images[0]}
              alt={`Main image of ${hostel.name}`}
              width={800}
              height={500}
              className="col-span-2 w-full h-96 object-cover rounded-lg"
              priority
              data-ai-hint="hostel bedroom"
            />
            {hostel.images.slice(1, 3).map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Image ${index + 2} of ${hostel.name}`}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-lg"
                 data-ai-hint="hostel common area"
              />
            ))}
          </div>

          <Tabs defaultValue="pricing" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="food">Food Menu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="py-6">
              <h2 className="text-2xl font-bold mb-4 font-headline">About this hostel</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{hostel.description}</p>
            </TabsContent>

            <TabsContent value="facilities" className="py-6">
               <h2 className="text-2xl font-bold mb-4 font-headline">Facilities</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostel.facilities.map((facility) => {
                  const Icon = facilityIcons[facility];
                  return (
                    <div key={facility} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                      <span className="capitalize text-sm font-medium">{facilityLabels[facility]}</span>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="food" className="py-6">
              <h2 className="text-2xl font-bold mb-4 font-headline">Weekly Food Menu</h2>
              {hostel.foodMenu ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Day</TableHead>
                        <TableHead>Breakfast</TableHead>
                        <TableHead>Lunch</TableHead>
                        <TableHead>Dinner</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hostel.foodMenu.map((item) => (
                        <TableRow key={item.day}>
                          <TableCell className="font-medium">{item.day}</TableCell>
                          <TableCell>{item.breakfast}</TableCell>
                          <TableCell>{item.lunch}</TableCell>
                          <TableCell>{item.dinner}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <p>Food menu details are not available for this hostel.</p>
              )}
            </TabsContent>

            <TabsContent value="pricing" className="py-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <CalendarDays className="h-6 w-6 text-primary" />
                            Choose Your Stay Duration
                        </CardTitle>
                        <CardDescription>Please select how long you want to stay at {hostel.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <RadioGroup value={selectedDuration} onValueChange={setSelectedDuration} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {durationOptions.map(option => (
                                <div key={option.value}>
                                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                                    <Label htmlFor={option.value} className={cn(
                                        "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                        selectedDuration === option.value && "border-primary"
                                    )}>
                                       {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        
                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Rate Chart (Per Head)</h3>
                            {hostel.rateCard ? (
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Room Type</TableHead>
                                    {durationOptions.map(d => <TableHead key={d.value} className="text-right">{d.label}</TableHead>)}
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">AC Room</TableCell>
                                        {Object.values(hostel.rateCard.ac).map((price, i) => <TableCell key={i} className="text-right">₹{price.toLocaleString()}</TableCell>)}
                                    </TableRow>
                                     <TableRow>
                                        <TableCell className="font-medium">Non-AC Room</TableCell>
                                        {Object.values(hostel.rateCard.nonAc).map((price, i) => <TableCell key={i} className="text-right">₹{price.toLocaleString()}</TableCell>)}
                                    </TableRow>
                                </TableBody>
                            </Table>
                            ) : <p>Detailed rate card not available.</p>}
                        </div>

                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hostel.inclusions && (
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" />What's Included?</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {hostel.inclusions.map((item, i) => <li key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary/50" /> {item}</li>)}
                                    </ul>
                                </div>
                            )}

                             {hostel.paymentOptions && (
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><Banknote className="h-5 w-5 text-primary" />Payment Options</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                         {hostel.paymentOptions.map((item, i) => <li key={i} className="flex items-center gap-2"><Banknote className="h-4 w-4 text-primary/50" /> {item}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
             <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Select your stay details to see the final price.</CardDescription>
              </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Your Selection</h3>
                  <div className="space-y-2">
                    <Label>Room Type</Label>
                     <RadioGroup value={selectedRoomType} onValueChange={setSelectedRoomType} className="flex gap-4">
                        <div>
                            <RadioGroupItem value="ac" id="ac" />
                            <Label htmlFor="ac" className="ml-2">AC Room</Label>
                        </div>
                         <div>
                            <RadioGroupItem value="nonAc" id="nonAc" />
                            <Label htmlFor="nonAc" className="ml-2">Non-AC Room</Label>
                        </div>
                     </RadioGroup>
                  </div>
                  <Separator/>
                   <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{durationOptions.find(d => d.value === selectedDuration)?.label}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Room Type</span>
                        <span className="font-medium">{selectedRoomType === 'ac' ? 'AC' : 'Non-AC'}</span>
                   </div>
                    {hostel.securityDeposit && (
                       <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Security Deposit</span>
                            <span className="font-medium">₹{hostel.securityDeposit.toLocaleString()}</span>
                       </div>
                    )}
                   <Separator/>
                   <div className="flex justify-between font-bold text-2xl">
                        <span>Total Price</span>
                        <span>₹{finalCost.toLocaleString()}</span>
                   </div>
                   <p className="text-xs text-muted-foreground text-center">Final price per head. Security deposit is extra and refundable.</p>
               </div>
              
              <div className="space-y-2">
                 <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href={`/book/${hostel.id}`}>Book Now</Link>
                </Button>
                 <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => toggleWishlist(hostel.id)}
                >
                  <Heart className={cn("mr-2 h-4 w-4", isSaved && "fill-red-500 text-red-500")} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>

               {hostel.securityInfo && (
                <div>
                   <Separator className="my-4" />
                   <h3 className="font-bold mb-3 text-center">Security & Safety</h3>
                   <ul className="space-y-2 text-sm">
                     {hostel.securityInfo.map((info, index) => (
                       <li key={index} className="flex items-center gap-2 text-muted-foreground">
                         <ShieldCheck className="h-4 w-4 text-primary" />
                         <span>{info}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
