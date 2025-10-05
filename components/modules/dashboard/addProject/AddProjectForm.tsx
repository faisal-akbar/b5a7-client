/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/services/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Eye, Loader2, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import z from "zod";
import SingleImageUploader from "../SingleImageUploader";

const formSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(200, { message: "Title cannot exceed 200 characters." }),
  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(2000, { message: "Description cannot exceed 2000 characters." }),
  projectLink: z
    .string({ invalid_type_error: "Project link must be string" })
    .url({ message: "Project link must be a valid URL." }),
  liveSite: z
    .string({ invalid_type_error: "Live site must be string" })
    .url({ message: "Live site must be a valid URL." }),
  features: z
    .array(z.string({ invalid_type_error: "Each feature must be string" }), {
      invalid_type_error: "Features must be an array of strings",
    })
    .min(1, { message: "At least one feature is required." })
    .max(20, { message: "Cannot have more than 20 features." }),
  techStack: z
    .array(
      z.string({ invalid_type_error: "Each tech stack item must be string" }),
      {
        invalid_type_error: "Tech stack must be an array of strings",
      }
    )
    .min(1, { message: "At least one tech stack item is required." })
    .max(20, { message: "Cannot have more than 20 tech stack items." }),
  isFeatured: z
    .boolean({ invalid_type_error: "isFeatured must be true or false" })
    .optional(),
  isPublished: z
    .boolean({ invalid_type_error: "isPublished must be true or false" })
    .optional(),
  thumbnail: z
    .custom<File>((val) => val instanceof File, {
      message: "Thumbnail must be a file",
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProjectForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      projectLink: "",
      liveSite: "",
      features: [],
      techStack: [],
      isFeatured: false,
      isPublished: true,
      thumbnail: undefined,
    },
  });

  const router = useRouter();
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    // Check if thumbnail is selected
    if (!image) {
      toast.error("Please select a thumbnail image");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    try {
      const res = await createProject(formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/projects");
      } else {
        console.error("Error creating project:", res);
        // @ts-expect-error
        if (res.errorMessages.length === 1) {
          // @ts-expect-error
          toast.error(res.errorMessages[0].message);
        } else {
          toast.error(res.message || "Failed to create project");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project. Please try again.");
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      const newFeatures = [...features, featureInput.trim()];
      setFeatures(newFeatures);
      form.setValue("features", newFeatures);
      setFeatureInput("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    const newFeatures = features.filter(
      (feature) => feature !== featureToRemove
    );
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      const newTechStack = [...techStack, techInput.trim()];
      setTechStack(newTechStack);
      form.setValue("techStack", newTechStack);
      setTechInput("");
    }
  };

  const removeTech = (techToRemove: string) => {
    const newTechStack = techStack.filter((tech) => tech !== techToRemove);
    setTechStack(newTechStack);
    form.setValue("techStack", newTechStack);
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  return (
    <>
      <Card className="border shadow-lg shadow-primary/5">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Project Details
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Enter the information for your new project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Title <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="Enter project title"
                      {...field}
                      className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <FormMessage />
                    <FormDescription>
                      {field.value && (
                        <>
                          <span>Generated Slug: </span>
                          {slugify(field.value, {
                            lower: true,
                          })}
                        </>
                      )}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Description <span className="text-destructive">*</span>
                    </FormLabel>
                    <Textarea
                      placeholder="Describe your project in detail"
                      rows={4}
                      {...field}
                      className="text-base resize-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Project Link <span className="text-destructive">*</span>
                      </FormLabel>
                      <Input
                        placeholder="https://github.com/username/project"
                        {...field}
                        className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="liveSite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Live Site URL{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Input
                        placeholder="https://yourproject.com"
                        {...field}
                        className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Features
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a feature and press Enter"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={handleFeatureKeyDown}
                        className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <Button
                        type="button"
                        onClick={addFeature}
                        variant="outline"
                        className="px-6 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>
                    {features.length > 0 && (
                      <ul className="mt-3 list-disc pl-6 space-y-1">
                        {features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm flex items-center gap-2 border px-3 py-1 rounded bg-muted"
                          >
                            <span className="flex-1">{feature}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(feature)}
                              className="inline-flex items-center justify-center rounded hover:text-destructive transition-colors"
                              aria-label={`Remove ${feature}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="techStack"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Tech Stack
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a technology and press Enter"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={handleTechKeyDown}
                        className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <Button
                        type="button"
                        onClick={addTech}
                        variant="outline"
                        className="px-6 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {techStack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-sm px-3 py-1.5 gap-1.5 hover:bg-secondary/80 transition-colors"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="ml-1 hover:text-destructive transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Thumbnail <span className="text-destructive">*</span>
                      </FormLabel>
                      <SingleImageUploader
                        onChange={(file) => {
                          setImage(file);
                          field.onChange(file);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4 md:mt-7">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/5 transition-colors h-[5.75rem] shadow-sm space-y-0">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <FormLabel className="text-sm font-semibold cursor-pointer">
                              Featured Project
                            </FormLabel>
                          </div>
                          <FormDescription className="text-xs">
                            Highlight this as a featured project
                          </FormDescription>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/5 transition-colors h-[5.75rem] shadow-sm space-y-0">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-primary" />
                            <FormLabel className="text-sm font-semibold cursor-pointer">
                              Publish Now
                            </FormLabel>
                          </div>
                          <FormDescription className="text-xs">
                            Make visible to everyone
                          </FormDescription>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <div className="pt-3 gap-3 flex">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 h-12"
                    disabled={form.formState.isSubmitting}
                    aria-busy={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {form.formState.isSubmitting ? "Saving..." : "Save Project"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="px-8 h-12 bg-transparent"
                    onClick={() => router.push("/dashboard/projects")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
