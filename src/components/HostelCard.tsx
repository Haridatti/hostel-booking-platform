'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star } from 'lucide-react';
import type { Hostel } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';

interface HostelCardProps {
  hostel: Hostel;
}

export default function HostelCard({ hostel }: HostelCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isSaved = isWishlisted(hostel.id);

  const priceSuffix = hostel.roomOptions ? '/month' : '/night';

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-xl flex flex-col">
      <CardHeader className="p-0 relative">
        <Link href={`/hostel/${hostel.id}`}>
          <Image
            src={hostel.images[0]}
            alt={`Image of ${hostel.name}`}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="hostel exterior"
          />
        </Link>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 rounded-full h-8 w-8 bg-card/80 hover:bg-card"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(hostel.id);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn("h-4 w-4", isSaved ? "fill-red-500 text-red-500" : "text-primary")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/hostel/${hostel.id}`} className="space-y-2">
            <CardTitle className="text-lg font-bold leading-tight truncate font-headline hover:text-primary">
              {hostel.name}
            </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hostel.location}</span>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-bold">
          ₹{hostel.price}
          <span className="text-sm font-normal text-muted-foreground">{priceSuffix}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">{hostel.rating}</span>
          <span className="text-sm text-muted-foreground">({hostel.reviews})</span>
        </div>
      </CardFooter>
    </Card>
  );
}
