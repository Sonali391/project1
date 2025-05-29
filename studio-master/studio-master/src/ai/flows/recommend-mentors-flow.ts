
'use server';
/**
 * @fileOverview AI flow for recommending mentors based on user queries.
 *
 * - recommendMentors - A function that takes a user's query and returns mentor recommendations.
 * - MentorRecommendationInput - The input type for the recommendMentors function.
 * - MentorRecommendationOutput - The return type for the recommendMentors function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as mentorService from '@/services/mentorService';
import type { MentorProfile } from '@/types';
import { MentorRecommendationInputSchema, MentorRecommendationOutputSchema, RecommendedMentorSchema } from '@/types';

export type MentorRecommendationInput = z.infer<typeof MentorRecommendationInputSchema>;
export type MentorRecommendationOutput = z.infer<typeof MentorRecommendationOutputSchema>;

export async function recommendMentors(input: MentorRecommendationInput): Promise<MentorRecommendationOutput> {
  return recommendMentorsFlow(input);
}

// Helper function to format mentor profiles for the prompt
const formatMentorProfilesForPrompt = (mentors: MentorProfile[]): string => {
  if (!mentors || mentors.length === 0) {
    return "No mentors currently available in the database.";
  }
  return mentors
    .map(
      (mentor) =>
        `Mentor ID: ${mentor.id}\nName: ${mentor.name}\nExpertise: ${mentor.expertiseFields.join(', ')}\nSummary: ${mentor.experienceSummary}\nAvailability: ${mentor.availability || 'Not specified'}\n---\n`
    )
    .join('\n');
};


const recommendationPrompt = ai.definePrompt({
  name: 'recommendMentorsPrompt',
  input: { schema: z.object({ userQuery: z.string(), mentorProfilesContext: z.string() }) },
  output: { schema: MentorRecommendationOutputSchema },
  prompt: `You are an AI assistant for Wisdom Bridge, specializing in matching users with suitable mentors.
Your task is to recommend up to 3 mentors from the provided list based on the user's query.

User's Request:
"{{{userQuery}}}"

Available Mentors:
{{{mentorProfilesContext}}}

Instructions:
1. Analyze the user's request and the profiles of the available mentors.
2. Identify the top 1 to 3 mentors whose expertise and experience best match the user's needs.
3. For each recommended mentor, provide:
    - Their 'mentorId'.
    - Their 'mentorName'.
    - A concise 'justification' (1-2 sentences) explaining why they are a good match.
    - Their 'expertiseFields'.
    - A 'experienceSummarySnippet' (a relevant short part of their experience summary, max 20 words).
4. If no mentors are a good match, explain why and provide an empty recommendations list.
5. Optionally, provide a brief overall 'analysis' message about the recommendations or if no suitable mentors were found.
6. Ensure your output is a valid JSON object conforming to the specified output schema.

Example of a good justification: "Dr. Vance's extensive background in AI and Machine Learning aligns perfectly with your interest in advanced AI topics."
Example of a good experienceSummarySnippet: "Retired CTO with 30+ years in tech, specializing in AI development..."

Respond ONLY with the JSON object.
`,
    config: {
      safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE'},
      ],
    },
});


const recommendMentorsFlow = ai.defineFlow(
  {
    name: 'recommendMentorsFlow',
    inputSchema: MentorRecommendationInputSchema,
    outputSchema: MentorRecommendationOutputSchema,
  },
  async (input) => {
    console.log('[recommendMentorsFlow] Received input:', JSON.stringify(input));

    try {
      const allMentors = await mentorService.getAllMentors();
      if (!allMentors || allMentors.length === 0) {
        console.log('[recommendMentorsFlow] No mentors found in service.');
        return { 
          recommendations: [],
          analysis: "Currently, there are no mentors available in our database. Please check back later."
        };
      }
      
      const mentorProfilesContext = formatMentorProfilesForPrompt(allMentors);
      console.log('[recommendMentorsFlow] Formatted mentor context length:', mentorProfilesContext.length);

      const promptInput = {
        userQuery: input.userQuery,
        mentorProfilesContext: mentorProfilesContext,
      };

      const { output } = await recommendationPrompt(promptInput);

      if (output && Array.isArray(output.recommendations)) {
        console.log('[recommendMentorsFlow] Successfully generated recommendations:', JSON.stringify(output));
        // Further validation could be added here if needed, e.g., ensuring mentorIds are valid
        return output;
      } else {
        console.warn('[recommendMentorsFlow] AI did not return valid recommendations. Output:', JSON.stringify(output));
        return { 
          recommendations: [],
          analysis: "I couldn't find suitable mentor recommendations based on your query at this time. You might want to try rephrasing your request or check our general mentor listings."
        };
      }
    } catch (error: any) {
      console.error('[recommendMentorsFlow] CRITICAL ERROR:', error.message);
      if (error.stack) console.error('[recommendMentorsFlow] Stack:', error.stack);
      if (error.details) console.error('[recommendMentorsFlow] GenkitError Details:', JSON.stringify(error.details));
      
      return {
        recommendations: [],
        analysis: "An unexpected error occurred while trying to generate mentor recommendations. Please try again later."
      };
    }
  }
);
