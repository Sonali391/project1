
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MentorCard } from '@/components/mentors/MentorCard';
import { searchMentors } from '@/services/mentorService';
import type { MentorProfile } from '@/types';
import { Separator } from '@/components/ui/separator';
import { SearchIcon, Frown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function SearchResultsPage({ params }: { params: { query: string } }) {
  const searchQuery = decodeURIComponent(params.query || "");
  const mentors: MentorProfile[] = await searchMentors(searchQuery);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground flex items-center">
            <SearchIcon className="h-8 w-8 mr-3 text-primary" />
            Search Results for: <span className="text-primary ml-2">&ldquo;{searchQuery}&rdquo;</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Found {mentors.length} mentor(s) matching your query.
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
              We couldn't find any mentors matching "{searchQuery}". Try a different search term or explore our fields.
            </p>
            <Button asChild variant="outline" className="mr-2">
              <Link href="/#explore-fields">Explore Fields</Link>
            </Button>
             <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
