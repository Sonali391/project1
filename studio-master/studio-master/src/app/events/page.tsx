
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EventsPage() {
  const placeholderEvents = [
    { id: 1, title: "Workshop: Effective Communication for Mentors", date: "June 10, 2024 - 2:00 PM", type: "Online Workshop", description: "Learn techniques to enhance your communication skills as a mentor and build stronger mentee relationships."},
    { id: 2, title: "Panel Discussion: The Future of Work & Lifelong Learning", date: "June 25, 2024 - 10:00 AM", type: "Online Panel", description: "Join industry leaders and experienced professionals as they discuss trends shaping the future of work and the importance of continuous skill development."},
    { id: 3, title: "Networking Mixer: Mentor & Mentee Meetup", date: "July 5, 2024 - 6:00 PM", type: "In-Person Mixer (Local Hub)", description: "An informal opportunity for mentors and mentees to connect, share experiences, and build community."},
  ];

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Events & <span className="text-primary">Workshops</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our upcoming events to learn, connect, and grow with the Wisdom Bridge community.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {placeholderEvents.map(event => (
            <Card key={event.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
              {/* Image section removed */}
              <div className="flex flex-col flex-grow"> {/* Ensure content takes up space */}
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-xs">
                    <span className="font-semibold text-primary">{event.type}</span> - {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-foreground/80 mb-4">{event.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="outline" asChild>
                    <Link href="#">Learn More & Register</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16 bg-secondary/30 p-8 rounded-lg">
            <CalendarDays className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">More Events Coming Soon!</h2>
            <p className="text-muted-foreground mb-6">
                We are always planning new and exciting events. Keep an eye on this page for updates.
            </p>
            <Button>
                <Mic2 className="mr-2 h-4 w-4" />
                Host an Event (Partner with Us)
            </Button>
        </div>

      </main>
      <Footer />
    </>
  );
}
