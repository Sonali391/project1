
"use client";

import { Brain, Search, LogIn, MoreVertical, Info, BookOpen, CalendarDays, UserPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInForm } from '@/components/auth/SignInForm';
import { CreateAccountForm } from '@/components/auth/CreateAccountForm';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: "/about", label: "About Us", icon: Info },
    { href: "/blogs", label: "Blogs", icon: BookOpen },
    { href: "/events", label: "Events", icon: CalendarDays },
    { href: "/recommend-mentors", label: "AI Recs", icon: Sparkles },
  ];

  return (
    <header className="w-full border-b border-border/50 bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mr-6">
            <Brain className="h-6 w-6" />
            <span>Wisdom Bridge</span>
          </Link>
        </div>

        {/* Right side: Search, Auth, "More" Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search mentors..."
              className="pl-8 sm:w-[180px] md:w-[220px] lg:w-[280px] h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </form>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                  <DialogDescription>Access your Wisdom Bridge account.</DialogDescription>
                </DialogHeader>
                <SignInForm onSuccess={() => setSignInOpen(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
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

          {/* "More" Dropdown Trigger for all screen sizes */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>
                      <link.icon className="mr-2 h-4 w-4" />
                      <span>{link.label === "AI Recs" ? "AI Recommendations" : link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="sm:hidden" /> {/* Separator only on mobile */}
                <DropdownMenuItem onSelect={() => setSignInOpen(true)} className="sm:hidden"> {/* Sign In only on mobile dropdown */}
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setRegisterOpen(true)} className="sm:hidden"> {/* Register only on mobile dropdown */}
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => alert('Mobile search will be integrated here.')} className="sm:hidden"> {/* Search only on mobile dropdown */}
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
