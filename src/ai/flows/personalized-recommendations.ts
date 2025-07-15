// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview A personalized hostel recommendation AI agent.
 *
 * - getPersonalizedRecommendations - A function that returns personalized hostel recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  travelHistory: z
    .string()
    .describe(
      'A summary of the user travel history and booking preferences, including locations, dates, types of accommodations, and interests.'
    ),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of hostel recommendations to return.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      hostelName: z.string().describe('The name of the hostel.'),
      location: z.string().describe('The location of the hostel.'),
      description: z.string().describe('A short description of the hostel.'),
      facilities: z.array(z.string()).describe('A list of facilities offered by the hostel.'),
      price: z.number().describe('The average price per night in Indian Rupees (INR).'),
      rating: z.number().describe('The average rating of the hostel (out of 5).'),
    })
  ).describe('A list of personalized hostel recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a travel expert specializing in personalized hostel recommendations. Based on the user's travel history and preferences, you will provide a list of hostel recommendations that match their travel style and interests.

Travel History and Preferences: {{{travelHistory}}}

Please provide {{{numberOfRecommendations}}} hostel recommendations in Indian Rupees (INR) in the following JSON format:

{{$json PersonalizedRecommendationsOutputSchema}}`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
