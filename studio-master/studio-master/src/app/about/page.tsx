
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Users, Brain } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            About <span className="text-primary">Wisdom Bridge</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting generations, fostering growth, and sharing invaluable knowledge for a brighter future.
          </p>
        </div>

        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p>
              Wisdom Bridge was founded on the principle that experience is the best teacher, and sharing that experience is a gift. 
              We believe that retired professionals possess a wealth of knowledge, insights, and life lessons that are immensely valuable 
              to the younger generation navigating their careers and personal development.
            </p>
            <p>
              Our platform aims to create meaningful connections between seasoned experts (our Mentors) and eager learners (our Mentees). 
              Through AI-powered matching and a supportive community, we facilitate mentorships that empower individuals, bridge generational gaps, 
              and ensure that valuable wisdom is passed on.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-1 gap-8 mb-12 items-center"> {/* Changed to single column as image is removed */}
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-7 w-7 text-primary" />
              Who We Are
            </h2>
            <p className="text-foreground/90 mb-3">
              We are a passionate team dedicated to lifelong learning and intergenerational connection. 
              Wisdom Bridge is more than just a platform; it's a community built on respect, collaboration, and the shared desire for growth.
            </p>
            <p className="text-foreground/90">
              Our AI assistant helps streamline the process of finding the right mentor or mentee, making it easier than ever to embark on a rewarding mentorship journey.
            </p>
          </div>
          {/* Image div removed */}
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
             <CardTitle className="text-3xl flex items-center gap-3">
                <Info className="h-8 w-8 text-primary" />
                Get Involved
             </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90">
            <p>
              Whether you're a professional ready to share your decades of experience, or an individual seeking guidance to accelerate your growth, 
              Wisdom Bridge welcomes you. Join our community and be a part of this enriching exchange of knowledge.
            </p>
          </CardContent>
        </Card>

      </main>
      <Footer />
    </>
  );
}
