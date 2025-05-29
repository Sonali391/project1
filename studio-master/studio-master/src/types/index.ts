
import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export type Generation = {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: string; // ISO string for dates
};

export type HowToStep = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

export type Recommendation = {
  id: string;
  field: string;
  description: string;
  icon?: React.ElementType; // Optional icon for the field
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
};

export type ChatMessage = {
  id:string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
};

export const AppMentorProfileSchema = z.object({
  id: z.string().describe("Unique identifier for the mentor"),
  name: z.string().describe("Full name of the mentor"),
  expertiseFields: z.array(z.string()).describe("A list of primary fields of expertise, e.g., ['Software Engineering', 'Product Management']"),
  experienceSummary: z.string().describe("A brief summary of their professional experience and background."),
  availability: z.string().optional().describe("General availability for mentorship, e.g., 'Weekends', 'Evenings after 6 PM'"),
});
export type MentorProfile = z.infer<typeof AppMentorProfileSchema>;

// For AI Mentor Recommendation Flow
export const MentorRecommendationInputSchema = z.object({
  userQuery: z.string().describe("User's description of what they are looking for in a mentor or the skills they want to learn."),
});
export type MentorRecommendationInput = z.infer<typeof MentorRecommendationInputSchema>;

export const RecommendedMentorSchema = z.object({
  mentorId: z.string().describe("The ID of the recommended mentor."),
  mentorName: z.string().describe("The name of the recommended mentor."),
  justification: z.string().describe("A brief explanation from the AI on why this mentor is a good match."),
  expertiseFields: z.array(z.string()).optional().describe("Key expertise fields of the mentor for quick reference."),
  experienceSummarySnippet: z.string().optional().describe("A short snippet of the mentor's experience summary.")
});
export type RecommendedMentor = z.infer<typeof RecommendedMentorSchema>;

export const MentorRecommendationOutputSchema = z.object({
  recommendations: z.array(RecommendedMentorSchema).describe("A list of up to 3 recommended mentors."),
  analysis: z.string().optional().describe("A brief overall analysis or message from the AI about the recommendations.")
});
export type MentorRecommendationOutput = z.infer<typeof MentorRecommendationOutputSchema>;
