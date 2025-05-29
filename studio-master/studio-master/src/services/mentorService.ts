
'use server';
/**
 * @fileOverview Mock service for managing mentor profiles.
 * In a real application, this would interact with a database like Firestore.
 */

import type { MentorProfile } from '@/types';

// Sample hardcoded mentor data
const mockMentors: MentorProfile[] = [
  {
    id: 'mentor-1',
    name: 'Dr. Eleanor Vance',
    expertiseFields: ['Software Engineering', 'Artificial Intelligence', 'Machine Learning'],
    experienceSummary: 'Retired CTO with 30+ years in tech, specializing in AI development and team leadership. Led several successful product launches.',
    availability: 'Weekends, Tuesday evenings',
  },
  {
    id: 'mentor-2',
    name: 'Samuel Green',
    expertiseFields: ['Business Strategy', 'Entrepreneurship', 'Marketing'],
    experienceSummary: 'Former CEO of a successful marketing agency. Expert in branding, market analysis, and startup growth. Enjoys guiding new entrepreneurs.',
    availability: 'Monday and Wednesday afternoons',
  },
  {
    id: 'mentor-3',
    name: 'Aisha Khan',
    expertiseFields: ['Creative Writing', 'Publishing', 'Arts Administration'],
    experienceSummary: 'Award-winning novelist and former editor-in-chief at a publishing house. Passionate about nurturing new literary voices.',
  },
  {
    id: 'mentor-4',
    name: 'Robert Chen',
    expertiseFields: ['Mechanical Engineering', 'Robotics'],
    experienceSummary: 'Lead engineer for a major robotics firm for 25 years. Holds several patents in automation technology.',
    availability: 'Flexible, by appointment',
  },
  {
    id: 'mentor-5',
    name: 'John Doe',
    expertiseFields: ['Software Engineering', 'Web Development', 'Python'],
    experienceSummary: 'Senior full-stack developer with 15 years of experience in building scalable web applications.',
    availability: 'Evenings and weekends',
  },
  {
    id: 'mentor-6',
    name: 'Jane Smith',
    expertiseFields: ['Software Engineering', 'Mobile Development'],
    experienceSummary: 'Lead iOS developer with a decade of experience in mobile app design and development for startups.',
    availability: 'Weekends',
  },
  {
    id: 'mentor-7',
    name: 'Alice Brown',
    expertiseFields: ['Marketing', 'Digital Marketing'],
    experienceSummary: 'Digital marketing strategist with expertise in SEO, SEM, and content marketing.',
    availability: 'Weekday afternoons',
  },
  {
    id: 'mentor-8',
    name: 'Dr. Ada Cypher', 
    expertiseFields: ['Software Engineering', 'Python', 'Data Science', 'Algorithm Design'],
    experienceSummary: 'Renowned data scientist with extensive experience in Python for machine learning and statistical analysis. Authored several key libraries.',
    availability: 'Wednesday mornings, Friday afternoons',
  },
  {
    id: 'mentor-9',
    name: 'Priya Sharma',
    expertiseFields: ['Java', 'Spring Boot', 'Microservices', 'Backend Development'],
    experienceSummary: 'Senior Java Developer with 12 years of experience in enterprise application development and cloud-native architectures.',
    availability: 'Tuesday and Thursday evenings',
  }
];

/**
 * Finds mentors by a specific field of expertise (case-insensitive).
 * @param field The field of expertise to search for.
 * @returns A promise that resolves to an array of MentorProfile objects.
 */
export async function findMentorsByField(field: string): Promise<MentorProfile[]> {
  if (!field) return [];
  const lowerCaseField = field.toLowerCase();
  // Simulate an async operation (like a database call)
  await new Promise(resolve => setTimeout(resolve, 100)); 
  
  return mockMentors.filter(mentor => 
    mentor.expertiseFields.some(f => f.toLowerCase().includes(lowerCaseField))
  );
}

/**
 * Gets a mentor by their ID.
 * @param mentorId The ID of the mentor.
 * @returns A promise that resolves to a MentorProfile or undefined if not found.
 */
export async function getMentorById(mentorId: string): Promise<MentorProfile | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockMentors.find(mentor => mentor.id === mentorId);
}

/**
 * Gets all mentors.
 * @returns A promise that resolves to an array of all MentorProfile objects.
 */
export async function getAllMentors(): Promise<MentorProfile[]> {
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async
    return [...mockMentors]; // Return a copy
}

/**
 * Finds a mentor by name (case-insensitive).
 * @param name The name of the mentor to search for.
 * @returns A promise that resolves to a MentorProfile or undefined if not found.
 */
export async function findMentorByName(name: string): Promise<MentorProfile | undefined> {
  if (!name || name.trim() === "") return undefined;
  const lowerCaseName = name.toLowerCase();
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockMentors.find(mentor => mentor.name.toLowerCase().includes(lowerCaseName));
}

/**
 * Searches mentors by name or expertise (case-insensitive).
 * @param query The search query.
 * @returns A promise that resolves to an array of MentorProfile objects.
 */
export async function searchMentors(query: string): Promise<MentorProfile[]> {
  if (!query || query.trim() === "") return [];
  const lowerCaseQuery = query.toLowerCase();
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async

  return mockMentors.filter(mentor => {
    const nameMatch = mentor.name.toLowerCase().includes(lowerCaseQuery);
    const expertiseMatch = mentor.expertiseFields.some(field => field.toLowerCase().includes(lowerCaseQuery));
    return nameMatch || expertiseMatch;
  });
}
