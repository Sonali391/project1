"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { useEffect, useState } from "react";


interface ImageDisplayProps {
  prompt: string;
  imageUrl: string;
}

export function ImageDisplay({ prompt, imageUrl }: ImageDisplayProps) {
  const { toast } = useToast();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLoadingImage(true);
    setImageError(false);
  }, [imageUrl]);


  const handleDownload = async () => {
    if (!imageUrl || imageError) {
      toast({
        title: "Download Error",
        description: "No image available to download or image failed to load.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      
      // Create a filename from the prompt (simplified)
      const filenamePrompt = prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `prophecy_${filenamePrompt || 'image'}_${Date.now()}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast({
        title: "Image Downloaded",
        description: "Your prophecy image has been saved.",
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Download Failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" />
          Your Prophecy Revealed
        </CardTitle>
        <CardDescription>
          Behold the visual manifestation of your words.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full rounded-md border border-border bg-muted/30 overflow-hidden relative">
          {(isLoadingImage || imageError) && (
             <Skeleton className="h-full w-full absolute" />
          )}
          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-destructive p-4">
              <ImageIcon size={48} className="mb-2"/>
              <p className="text-center">Failed to load image.</p>
              <p className="text-xs text-center text-muted-foreground">The prophecy's image is obscured.</p>
            </div>
          )}
          {!imageError && imageUrl && (
            <Image
              src={imageUrl}
              alt={`Generated image for prompt: ${prompt}`}
              width={1280}
              height={720}
              className={`object-contain w-full h-full transition-opacity duration-500 ${isLoadingImage ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoadingImage(false)}
              onError={() => {
                setIsLoadingImage(false);
                setImageError(true);
              }}
              data-ai-hint="prophecy vision"
              priority // Ensure LCP is optimized
            />
          )}
          {!imageUrl && !imageError && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-4">
              <ImageIcon size={48} className="mb-2"/>
              <p className="text-center">Your generated image will appear here.</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
            <FileText className="h-5 w-5 text-secondary-foreground" />
            Original Prophecy:
          </h3>
          <p className="text-sm text-foreground/80 italic bg-secondary/30 p-3 rounded-md border border-border">
            &ldquo;{prompt}&rdquo;
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleDownload} 
          disabled={!imageUrl || isLoadingImage || imageError}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          aria-label="Download generated image"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
      </CardFooter>
    </Card>
  );
}
