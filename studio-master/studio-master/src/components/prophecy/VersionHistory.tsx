"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import type { Generation } from "@/types";
import { History, Eye, Image as ImageIconLucide } from "lucide-react";

interface VersionHistoryProps {
  generations: Generation[];
  onSelectVersion: (version: Generation) => void;
  currentGenerationId?: string;
}

export function VersionHistory({ generations, onSelectVersion, currentGenerationId }: VersionHistoryProps) {
  if (generations.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Past Prophecies
          </CardTitle>
          <CardDescription>Your journey through visions will be chronicled here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No prophecies have been recorded yet. Create your first vision!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Past Prophecies
        </CardTitle>
        <CardDescription>Review your previously generated visions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          <Accordion type="single" collapsible className="w-full">
            {generations.map((gen) => (
              <AccordionItem value={gen.id} key={gen.id} className={gen.id === currentGenerationId ? 'border-primary border-l-2 pl-2' : ''}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-[300px]">
                      {gen.prompt.length > 40 ? `${gen.prompt.substring(0, 37)}...` : gen.prompt}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(gen.timestamp).toLocaleString()}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-16 rounded border border-border overflow-hidden bg-muted relative">
                       <Image
                        src={gen.imageUrl}
                        alt={`Preview for: ${gen.prompt.substring(0,20)}...`}
                        width={96}
                        height={64}
                        className="object-cover w-full h-full"
                        data-ai-hint="prophecy preview"
                        onError={(e) => e.currentTarget.style.display = 'none'} // Hide if image fails
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity">
                         <ImageIconLucide className="text-white/70 h-6 w-6"/>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/90 flex-1 italic">
                       &ldquo;{gen.prompt}&rdquo;
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectVersion(gen)}
                    className="w-full"
                    aria-label={`View prophecy version from ${new Date(gen.timestamp).toLocaleDateString()}`}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View This Version
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
