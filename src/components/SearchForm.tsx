'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

export default function SearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (dates?.from) params.set('from', dates.from.toISOString());
    if (dates?.to) params.set('to', dates.to.toISOString());
    if (guests) params.set('guests', guests.toString());

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="p-4 bg-card rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
    >
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search location"
          className="pl-10"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start font-normal text-left">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            {dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, 'LLL dd, y')} - {format(dates.to, 'LLL dd, y')}
                </>
              ) : (
                format(dates.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-muted-foreground">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="range"
            selected={dates}
            onSelect={setDates}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="relative">
        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="number"
          placeholder="Guests"
          className="pl-10"
          min={1}
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
        />
      </div>
      
      <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground md:col-span-1">
        <SearchIcon className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
