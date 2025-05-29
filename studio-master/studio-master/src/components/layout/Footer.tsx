
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-6 md:py-8 border-t border-border/50 bg-card/50 mt-auto">
      <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Wisdom Bridge. All rights reserved.</p>
        <p className="mt-1">Bridging generations, sharing wisdom.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
