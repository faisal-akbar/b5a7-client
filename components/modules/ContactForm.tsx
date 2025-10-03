"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";

import config from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Spinner } from "./Spinner";

interface EmailJSTemplateParams {
  from_name: string;
  from_email: string;
  message: string;
  source: string;
  to_name: string;
}

interface EmailJSResponse {
  status: number;
  text: string;
}

declare global {
  interface Window {
    emailjs: {
      send: (
        serviceId: string,
        templateId: string,
        templateParams: EmailJSTemplateParams,
        publicKey: string
      ) => Promise<EmailJSResponse>;
    };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  source: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      source: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: ContactFormValues) {
    setLoading(true);

    try {
      // template parameters
      const templateParams: EmailJSTemplateParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
        source: values.source || "Contact Form",
        to_name: "Support Team",
      };

      // Send email
      //   const response = await sendEmail(templateParams);
      const response = await emailjs.send(
        config.emailJsServiceId as string,
        config.emailJsTemplateId as string,
        templateParams as unknown as Record<string, string>,
        config.emailJsPublicKey as string
      );

      // Check if email was sent successfully
      if (response.status === 200) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error: unknown) {
      console.log("Email sending error:", error);
      toast.error("Failed to send message. Please try again.", {});
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="text-center mb-8">
              <Badge variant="outline" className="mb-4 w-fit mx-auto">
                Send Message
              </Badge>
              <CardTitle className="text-3xl md:text-4xl font-black tracking-tight">
                Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              className="h-12"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                              className="h-12"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="Tell us how we can help you..."
                            {...field}
                            className="resize-none"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How&apos;d you hear about us?</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Searching the web, Social media, Friend recommendation"
                            {...field}
                            className="h-12"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full text-lg py-6 flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading && (
                      <Spinner className="mt-1" variant={"circle-filled"} />
                    )}
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
