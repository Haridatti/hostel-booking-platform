'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon, Wand2 } from 'lucide-react';
import { generateImage } from '@/ai/flows/generate-image-flow';

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!prompt) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await generateImage({ prompt });
      if (!result?.imageUrl) throw new Error("No image URL returned");
      setImageUrl(result.imageUrl);
    } catch (e) {
      setError("Sorry, we couldn't generate an image at this time. Please try again later.");
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
            <CardTitle className="text-3xl font-bold font-headline mt-4">AI Image Generator</CardTitle>
            <CardDescription className="mt-2">
              Describe an image, and let our AI bring it to life.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="font-semibold">Image Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="e.g., 'A futuristic hostel on Mars with a view of Earth'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Image'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        {isLoading && (
          <Card>
            <CardContent className="p-6 flex justify-center items-center">
              <div className="w-full space-y-4">
                <p className="text-center text-muted-foreground" aria-live="polite">
                  Generating your masterpiece...
                </p>
                <Skeleton className="aspect-square w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </div>
        )}

        {imageUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Your Generated Image</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Image
                src={imageUrl}
                alt={prompt}
                width={512}
                height={512}
                className="rounded-lg w-full h-auto object-contain"
              />
            </CardContent>
          </Card>
        )}

        {!isLoading && !imageUrl && !error && (
          <Card className="border-2 border-dashed">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your generated image will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
