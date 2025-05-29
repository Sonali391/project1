"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateImage } from "@/ai/flows/generate-image";
import type { GenerateImageInput } from "@/ai/flows/generate-image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";

const prophecyFormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Your prophecy must be at least 10 characters long.",
  }).max(1000, {
    message: "Your prophecy must not exceed 1000 characters.",
  }),
});

type ProphecyFormValues = z.infer<typeof prophecyFormSchema>;

interface ProphecyFormProps {
  onImageGenerated: (prompt: string, imageUrl: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export function ProphecyForm({ onImageGenerated, isGenerating, setIsGenerating }: ProphecyFormProps) {
  const { toast } = useToast();
  const form = useForm<ProphecyFormValues>({
    resolver: zodResolver(prophecyFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: ProphecyFormValues) {
    setIsGenerating(true);
    toast({
      title: "Conjuring Your Vision...",
      description: "The digital seers are at work. Please wait.",
    });

    try {
      const input: GenerateImageInput = { prompt: data.prompt };
      const result = await generateImage(input);
      
      if (result.imageUrl) {
        onImageGenerated(data.prompt, result.imageUrl);
        toast({
          title: "Prophecy Revealed!",
          description: "Your vision has materialized.",
          variant: "default",
        });
        form.reset(); // Optionally reset form
      } else {
        throw new Error("Image generation failed to return a URL.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "A Hiccup in the Aether",
        description: "Something went wrong while generating your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Describe Your Vision
        </CardTitle>
        <CardDescription>
          Weave your words into a prophecy, and witness its visual form.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="prompt-textarea" className="text-base">Your Prophecy</FormLabel>
                  <FormControl>
                    <Textarea
                      id="prompt-textarea"
                      placeholder="e.g., A lone astronaut discovering a crystal garden on Mars, cinematic lighting, hyperrealistic..."
                      className="min-h-[150px] resize-none focus:ring-accent focus:border-accent"
                      {...field}
                      aria-label="Scene description prompt"
                    />
                  </FormControl>
                  <FormDescription>
                    The more detailed your description, the clearer the vision.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGenerating} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Prophecy
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
