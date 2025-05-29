
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import React from "react";

const createAccountFormSchema = z.object({
  role: z.enum(["mentor", "learner"], {
    required_error: "Please select your role.",
  }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  expertise: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
}).refine(data => {
  if (data.role === "mentor" && (!data.expertise || data.expertise.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Please list your areas of expertise if registering as a mentor.",
  path: ["expertise"],
});

type CreateAccountFormValues = z.infer<typeof createAccountFormSchema>;

interface CreateAccountFormProps {
  onSuccess?: () => void;
}

export function CreateAccountForm({ onSuccess }: CreateAccountFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      role: undefined, 
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      expertise: "",
    },
  });

  const selectedRole = form.watch("role");

  async function onSubmit(data: CreateAccountFormValues) {
    setIsLoading(true);
    
    const submissionData: any = {
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password, // In a real app, hash this server-side
    };

    if (data.role === "mentor" && data.expertise) {
      submissionData.expertiseFields = data.expertise.split(',').map(s => s.trim()).filter(s => s);
    }
    
    console.log("Create Account data:", submissionData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Account Created (Simulated)",
      description: "Welcome to Wisdom Bridge! Your profile details have been noted.",
    });
    setIsLoading(false);
    onSuccess?.();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Register as:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2 pt-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentor" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Mentor (Share your expertise)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="learner" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Learner (Seek guidance and knowledge)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                    <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {selectedRole === "mentor" && (
          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Areas of Expertise</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Software Engineering, AI, Business Strategy, Creative Writing"
                    className="resize-none min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  List your skills or fields of expertise, separated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          Create Account
        </Button>
      </form>
    </Form>
  );
}
