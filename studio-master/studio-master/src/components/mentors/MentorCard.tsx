
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { MentorProfile } from "@/types";
import { UserCircle2, Briefcase, Sparkles, CalendarClock } from "lucide-react";

interface MentorCardProps {
  mentor: MentorProfile;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const initials = mentor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0,2)
    .toUpperCase();

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow w-full">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <Avatar className="h-16 w-16 border-2 border-primary/50">
          {/* In a real app, mentor.imageUrl would be used */}
          {/* <AvatarImage src={`https://placehold.co/100x100.png?text=${initials}`} alt={mentor.name} data-ai-hint="person professional" /> */}
          <AvatarFallback className="text-xl bg-muted">
            {initials || <UserCircle2 size={32} />}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-2xl text-primary">{mentor.name}</CardTitle>
          {mentor.expertiseFields && mentor.expertiseFields.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {mentor.expertiseFields.slice(0, 3).map((field, index) => ( // Show up to 3 expertise fields
                <Badge key={index} variant="secondary" className="text-xs">
                  {field}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {mentor.experienceSummary && (
          <div>
            <h4 className="flex items-center text-sm font-semibold text-muted-foreground mb-1">
              <Briefcase size={16} className="mr-2 text-secondary-foreground" />
              Experience
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {mentor.experienceSummary}
            </p>
          </div>
        )}
        {mentor.availability && (
           <div>
            <h4 className="flex items-center text-sm font-semibold text-muted-foreground mb-1">
              <CalendarClock size={16} className="mr-2 text-secondary-foreground" />
              Availability
            </h4>
            <p className="text-sm text-foreground/90">
              {mentor.availability}
            </p>
          </div>
        )}
        {!mentor.availability && mentor.expertiseFields && mentor.expertiseFields.length > 3 && (
            <div>
                <h4 className="flex items-center text-sm font-semibold text-muted-foreground mb-1">
                    <Sparkles size={16} className="mr-2 text-secondary-foreground" />
                    More Skills
                </h4>
                 <p className="text-sm text-foreground/90">
                    {mentor.expertiseFields.slice(3).join(', ')}
                </p>
            </div>
        )}

      </CardContent>
      {/* CardFooter can be added later for action buttons like "Connect" or "View Profile" */}
      {/* <CardFooter>
        <Button className="w-full">View Full Profile</Button>
      </CardFooter> */}
    </Card>
  );
}
