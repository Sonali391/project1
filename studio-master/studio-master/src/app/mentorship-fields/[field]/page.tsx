
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MentorCard } from '@/components/mentors/MentorCard';
import { findMentorsByField } from '@/services/mentorService';
import type { MentorProfile } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Users, Frown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Helper function to convert slug back to a more readable title format
// This should ideally match the casing of your actual field names or be robust enough.
const deslugifyAndTitleCase = (slug: string): string => {
  const words = slug.replace(/-/g, ' ').split(' ');
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default async function FieldMentorsPage({ params }: { params: { field: string } }) {
  const fieldSlug = params.field;
  const fieldName = deslugifyAndTitleCase(fieldSlug);
  
  // Fetch mentors. findMentorsByField is case-insensitive internally,
  // so the exact casing of fieldName might not be critical if the service handles it.
  const mentors: MentorProfile[] = await findMentorsByField(fieldName);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Mentors in <span className="text-primary">{fieldName}</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Discover experienced professionals ready to share their knowledge in {fieldName.toLowerCase()}.
          </p>
        </div>
        
        <Separator className="my-8" />

        {mentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Frown className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No Mentors Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any mentors specializing in "{fieldName}" at the moment.
            </p>
            <Button asChild variant="outline">
              <Link href="/#explore-fields">Explore Other Fields</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

// Optional: Generate static paths if you have a fixed list of fields
// export async function generateStaticParams() {
//   const fields = ['Tech & Software', 'Business & Entrepreneurship', 'Arts & Creativity', 'Engineering', 'Healthcare', 'Education']; // Example fields
//   const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
//   return fields.map((field) => ({
//     field: slugify(field),
//   }));
// }
