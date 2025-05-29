
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rss, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogsPage() {
  const placeholderBlogs = [
    { id: 1, title: "The Art of Mentorship: Guiding the Next Generation", date: "May 20, 2024", excerpt: "Explore the key principles of effective mentorship and how experienced professionals can make a lasting impact..." },
    { id: 2, title: "Navigating Career Transitions with Wisdom from a Mentor", date: "May 15, 2024", excerpt: "Changing careers can be daunting. Learn how a mentor can provide clarity, support, and strategic advice..." },
    { id: 3, title: "Lifelong Learning: Why It Matters More Than Ever", date: "May 10, 2024", excerpt: "In a rapidly evolving world, continuous learning is crucial. Discover insights from those who have mastered adaptation..." },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Wisdom <span className="text-primary">Bridge Blogs</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, stories, and advice from our community of mentors and learners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {placeholderBlogs.map(blog => (
            <Card key={blog.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              {/* Image section removed */}
              <CardHeader>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
                <CardDescription className="text-xs">{blog.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/80 mb-4">{blog.excerpt}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="link" asChild className="p-0 h-auto text-primary">
                  <Link href="#">Read More &rarr;</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
            <Rss className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Stay Tuned</h2>
            <p className="text-muted-foreground mb-6">
                We are actively working on bringing you more insightful content. <br/> Check back soon for new articles and stories!
            </p>
             <Button variant="outline">
                <Edit3 className="mr-2 h-4 w-4" />
                Suggest a Topic (Coming Soon)
            </Button>
        </div>

      </main>
      <Footer />
    </>
  );
}
