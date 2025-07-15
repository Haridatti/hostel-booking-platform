'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import HostelCard from '@/components/HostelCard';
import { Wand2 } from 'lucide-react';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { getPersonalizedRecommendations as getRecs } from '@/ai/flows/personalized-recommendations';
import type { Hostel, Facility } from '@/lib/types';

const validFacilities: Facility[] = ['wifi', 'pool', 'parking', 'gym', 'kitchen', 'ac', 'food'];

function isValidFacility(facility: string): facility is Facility {
  return (validFacilities as string[]).includes(facility);
}


export default function RecommendationsPage() {
  const [travelHistory, setTravelHistory] = useState('');
  const [recommendations, setRecommendations] = useState<Hostel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result: PersonalizedRecommendationsOutput = await getRecs({ travelHistory, numberOfRecommendations: 3 });
      
      const formattedRecommendations: Hostel[] = result.recommendations.map((rec, index) => ({
        id: 9000 + index, // temporary IDs
        name: rec.hostelName,
        location: rec.location,
        description: rec.description,
        price: rec.price,
        rating: rec.rating,
        reviews: Math.floor(Math.random() * 500) + 50, // mock reviews
        images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
        facilities: rec.facilities.filter(isValidFacility),
      }));
      setRecommendations(formattedRecommendations);

    } catch (e) {
      setError('Sorry, we couldn\'t generate recommendations at this time. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Wand2 className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold font-headline mt-4">AI-Powered Recommendations</CardTitle>
            <CardDescription className="mt-2">
              Tell us about your past travels, and we'll find hostels that match your vibe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="travel-history" className="font-semibold">Your Travel Style & History</Label>
                <Textarea
                  id="travel-history"
                  placeholder="e.g., 'I love backpacking in Southeast Asia, staying in social party hostels. I've been to Thailand and Vietnam. I enjoy places with a pool and organized pub crawls.'"
                  value={travelHistory}
                  onChange={(e) => setTravelHistory(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Get Recommendations'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
               <div key={i} className="space-y-2 rounded-lg border p-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Here are your personalized recommendations!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {recommendations.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
