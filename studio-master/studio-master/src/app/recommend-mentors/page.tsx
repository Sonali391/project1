
"use client";

import { useState, type FormEvent } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, UserCheck, Loader2, SearchX, Sparkles } from 'lucide-react';
import type { MentorRecommendationInput, MentorRecommendationOutput, RecommendedMentor } from '@/types';
import { recommendMentors } from '@/ai/flows/recommend-mentors-flow'; // Ensure this path is correct
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function RecommendMentorsPage() {
  const [userQuery, setUserQuery] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendedMentor[]>([]);
  const [analysis, setAnalysis] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userQuery.trim()) {
      setError("Please describe what you're looking for in a mentor.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setAnalysis('');

    try {
      const input: MentorRecommendationInput = { userQuery };
      const result: MentorRecommendationOutput = await recommendMentors(input);
      
      setRecommendations(result.recommendations || []);
      setAnalysis(result.analysis);
      if (result.recommendations.length === 0 && !result.analysis) {
        setAnalysis("No specific recommendations found based on your query. Try being more specific or broader in your request.");
      }

    } catch (e: any) {
      console.error("Error fetching recommendations:", e);
      setError(e.message || "Failed to fetch recommendations. Please try again.");
      setAnalysis("An error occurred while trying to get recommendations.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getInitials = (name: string) => {
    if (!name) return "";
    return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0,2)
    .toUpperCase();
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Mentor Recommendations
          </h1>
          <p className="text-lg text-muted-foreground">
            Describe your ideal mentor or learning goals, and our AI will suggest suitable mentors from Wisdom Bridge.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Tell Us What You Need
            </CardTitle>
            <CardDescription>
              The more details you provide, the better our AI can match you. (e.g., "I want to learn advanced Python for data science," or "Looking for a mentor in startup marketing with experience in B2C.")
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Textarea
                placeholder="Describe your ideal mentor or what you want to learn..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                rows={5}
                className="focus:ring-primary focus:border-primary"
                aria-label="Describe your mentorship needs"
                disabled={isLoading}
              />
              {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Find My Mentor
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {isLoading && (
          <div className="text-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Our AI is pondering your request...</p>
          </div>
        )}

        {!isLoading && analysis && (
          <Alert className="max-w-2xl mx-auto mt-8 bg-secondary/30 border-primary/30">
            <Lightbulb className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-semibold">AI Analysis</AlertTitle>
            <AlertDescription className="text-foreground/90">
              {analysis}
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Recommended Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <Card key={rec.mentorId} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                  <CardHeader className="flex flex-row items-start gap-3 pb-3">
                     <Avatar className="h-14 w-14 border-2 border-primary/50">
                        {/* <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(rec.mentorName)}`} alt={rec.mentorName} data-ai-hint="person professional" /> */}
                        <AvatarFallback className="text-lg bg-muted">{getInitials(rec.mentorName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-xl text-primary">{rec.mentorName}</CardTitle>
                        {rec.expertiseFields && rec.expertiseFields.length > 0 && (
                           <div className="mt-1 flex flex-wrap gap-1">
                             {rec.expertiseFields.slice(0,3).map(field => (
                               <Badge key={field} variant="secondary" className="text-xs">{field}</Badge>
                             ))}
                           </div>
                        )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-0.5">AI's Justification:</h4>
                        <p className="text-sm text-foreground/90 italic">&ldquo;{rec.justification}&rdquo;</p>
                    </div>
                    {rec.experienceSummarySnippet && (
                       <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-0.5">Experience Snippet:</h4>
                        <p className="text-sm text-foreground/80">{rec.experienceSummarySnippet}</p>
                    </div>
                    )}
                  </CardContent>
                   <CardFooter>
                     <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/10">
                       View Profile (Coming Soon)
                     </Button>
                   </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!isLoading && recommendations.length === 0 && userQuery && !error && !analysis?.includes("error") && (
          <div className="text-center py-10 mt-8 max-w-xl mx-auto">
            <SearchX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground">No Mentors Found</h3>
            <p className="text-muted-foreground mt-2">
              Our AI couldn't find a specific match for your query: "{userQuery}". 
              Try rephrasing your request or explore our mentors directory.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
