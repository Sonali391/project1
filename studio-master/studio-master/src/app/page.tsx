
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, ClipboardEdit, Users as UsersIcon, Search as SearchIcon, Brain, Lightbulb, Goal, ThumbsUp, Zap, TrendingUp, HeartHandshake } from 'lucide-react';
import type { HowToStep, Recommendation, Testimonial } from '@/types';
import { Separator } from '@/components/ui/separator';
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateAccountForm } from '@/components/auth/CreateAccountForm';


const howToStep: HowToStep[] = [
  { 
    id: '1', 
    icon: UserPlus, 
    title: 'Sign Up & Join', 
    description: 'Embark on your Wisdom Bridge journey by creating a free account. Our streamlined registration process is quick and easy, typically taking just a few minutes. Once registered, you gain immediate access to our vibrant community and a world of shared knowledge and growth opportunities. Choose whether you want to be a Mentor, ready to share your invaluable experience, or a Learner, eager to gain insights.' 
  },
  { 
    id: '2', 
    icon: ClipboardEdit, 
    title: 'Craft Your Profile', 
    description: 'Your profile is your introduction to the Wisdom Bridge community. If you\'re a Mentor, detail your areas of expertise, years of experience, significant achievements, and what you hope to offer. If you\'re a Learner, outline your learning objectives, current challenges, and the specific skills or knowledge areas you wish to develop. A comprehensive and thoughtful profile greatly increases the chances of our AI finding you the perfect match.' 
  },
  { 
    id: '3', 
    icon: SearchIcon, 
    title: 'Discover Connections', 
    description: 'Explore potential mentorship connections using our intelligent search filters or let our advanced AI assistant do the work for you. Our system analyzes profiles based on skills, industry experience, personal goals, and availability to suggest the most compatible mentors or mentees. You can browse profiles, read about their unique journeys, and identify individuals who resonate with your aspirations.' 
  },
  { 
    id: '4', 
    icon: UsersIcon, 
    title: 'Connect & Flourish', 
    description: 'Once you\'ve found a potential match, initiate a conversation through our secure and private messaging system. Discuss expectations, schedule virtual or in-person meetings, and set goals for your mentorship. Whether you\'re sharing wisdom or absorbing it, these connections are designed to foster personal and professional growth, build lasting relationships, and create a powerful exchange that benefits both mentor and learner.' 
  },
];

const recommendations: Recommendation[] = [
  { id: '1', field: 'Tech & Software', description: 'Guidance from seasoned IT professionals.', icon: Zap },
  { id: '2', field: 'Business & Entrepreneurship', description: 'Insights on startups and corporate leadership.', icon: TrendingUp },
  { id: '3', field: 'Arts & Creativity', description: 'Mentorship in creative writing, design, and more.', icon: Brain },
  { id: '4', field: 'Engineering', description: 'Expert advice on various engineering disciplines.', icon: Goal },
  { id: '5', field: 'Healthcare', description: 'Knowledge from experienced medical practitioners.', icon: HeartHandshake },
  { id: '6', field: 'Education', description: 'Tips from veteran educators and academics.', icon: Lightbulb },
];

const testimonials: Testimonial[] = [
  { id: '1', name: 'Sarah L.', role: 'Mentee, Software Development', quote: 'Wisdom Bridge connected me with an amazing mentor who helped me navigate my early career challenges. Invaluable!', imageUrl: 'https://placehold.co/80x80.png' }, // imageUrl will be ignored by AvatarImage removal
  { id: '2', name: 'John B.', role: 'Mentor, Retired CEO', quote: 'Sharing my experience with the next generation has been incredibly rewarding. This platform makes it so easy.', imageUrl: 'https://placehold.co/80x80.png' }, // imageUrl will be ignored
  { id: '3', name: 'Maria G.', role: 'Mentee, Marketing', quote: 'The AI chatbot helped me find the perfect mentor for my niche. I\'m learning so much!', imageUrl: 'https://placehold.co/80x80.png' }, // imageUrl will be ignored
];

// Helper function to create URL-friendly slugs
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars (keeping hyphen)
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};


export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const SCROLL_INTERVAL = 3000; 
  const [registerOpen, setRegisterOpen] = useState(false);


  // Effect for automatic scrolling interval
  useEffect(() => {
    if (recommendations.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveItemIndex(prevIndex => (prevIndex + 1) % recommendations.length);
    }, SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [recommendations.length]);

  // Effect for actually performing the scroll
  useEffect(() => {
    if (scrollContainerRef.current && recommendations.length > 0) {
      const container = scrollContainerRef.current;
      const activeChild = container.children[activeItemIndex] as HTMLElement;

      if (activeChild) {
        let scrollTarget = activeChild.offsetLeft;
        container.scrollTo({
          left: scrollTarget,
          behavior: 'smooth',
        });
      }
    }
  }, [activeItemIndex, recommendations.length]);

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[calc(70vh-4rem)] min-h-[400px] md:min-h-[450px] flex items-center justify-center text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm p-8 sm:p-10 md:p-12 rounded-[3rem] shadow-2xl border border-border/20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Welcome to <span className="text-primary">Wisdom Bridge</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Connecting generations, sharing knowledge, and empowering growth.
                Find your mentor or become one today.
              </p>
              <blockquote className="mt-8 text-md md:text-lg italic text-foreground/80 border-l-4 border-accent pl-4 py-1">
                &ldquo;Share your wisdom, shape the future.&rdquo;
              </blockquote>
              <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="mt-10">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Account</DialogTitle>
                    <DialogDescription>Join Wisdom Bridge today! It's free and easy.</DialogDescription>
                  </DialogHeader>
                  <CreateAccountForm onSuccess={() => setRegisterOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">How Wisdom Bridge Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {howToStep.map((step) => (
                <Card key={step.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Separator className="my-16 md:my-20" />

        {/* Top Recommendations Section */}
        <section id="explore-fields" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">Explore Mentorship Fields</h2>
            <div className="relative">
              <div 
                ref={scrollContainerRef}
                className="flex space-x-6 pb-4 overflow-x-auto snap-x snap-mandatory"
              >
                {recommendations.map((rec) => (
                  <Link key={rec.id} href={`/mentorship-fields/${slugify(rec.field)}`} passHref>
                    <div className="snap-center shrink-0 first:pl-4 last:pr-4 cursor-pointer"> 
                      <div 
                        className="w-48 h-48 md:w-56 md:h-56 bg-card rounded-full shadow-lg flex flex-col items-center justify-center p-4 text-center group transition-all duration-300 ease-in-out hover:scale-105"
                      >
                        {rec.icon && <rec.icon className="h-10 w-10 text-primary mb-3 transition-transform duration-300 ease-in-out group-hover:scale-110" />}
                        <h3 className="text-lg font-semibold text-foreground mb-1">{rec.field}</h3>
                        <p className="text-xs text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
               <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none"></div>
               <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>
        
        <Separator className="my-16 md:my-20" />

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">Voices from Our Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="shadow-lg flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    <blockquote className="italic text-foreground/80 mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </CardContent>
                  <CardHeader className="flex flex-row items-center gap-4 pt-0 mt-auto">
                    <Avatar>
                      {/* <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} data-ai-hint="person face" /> */}
                      <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
