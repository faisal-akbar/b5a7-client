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
import { updateBlog } from "@/services/Blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader2, Sparkles, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SingleImageUploader from "../SingleImageUploader";

const RichTextEditor = dynamic(
  () => import("@/components/modules/dashboard/richTextEditor/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] rounded-lg flex items-center justify-center bg-muted/50">
        <div className="text-center">
          <div className="animate-pulse">Loading editor...</div>
        </div>
      </div>
    ),
  }
);

type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (html: string) => void;
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(500, "Excerpt must be less than 500 characters")
    .optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  thumbnail: z.any().optional(),
});

type Blog = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  excerpt: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
};

type FormData = z.infer<typeof formSchema>;

export default function EditBlogForm({ blog }: { blog: Blog }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title ?? "",
      excerpt: blog?.excerpt ?? "",
      tags: blog?.tags ?? [],
      isFeatured: blog?.isFeatured ?? false,
      isPublished: blog?.isPublished ?? false,
      thumbnail: undefined,
    },
  });
  const router = useRouter();
  const [tags, setTags] = useState<string[]>(blog?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const editorRef = useRef<RichTextEditorHandle>(null);

  useEffect(() => {
    if (editorRef.current && blog?.content) {
      editorRef.current.setContent(blog.content);
    }
  }, [blog]);

  const onSubmit = async (data: FormData) => {
    const editorContent = editorRef.current?.getContent() || "";
    const textContent = editorContent.replace(/<[^>]*>/g, "").trim();
    if (textContent.length === 0) {
      toast.error("Please add some content before saving");
      return;
    }

    const formDataWithContent = {
      ...data,
      content: editorContent,
    } as const;

    const payload = new FormData();
    payload.append("data", JSON.stringify(formDataWithContent));
    if (image) payload.append("file", image);

    try {
      const res = await updateBlog(blog.id, payload);
      if (res.success) {
        toast.success(res.message);
        router.push(`/dashboard/blogs`);
      } else {
        if (res.errorMessages.length === 1) {
          toast.error(res.errorMessages[0].message);
        } else {
          toast.error(res.message || "Failed to edit blog");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog. Please try again.");
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <>
      <Card className="border shadow-lg shadow-primary/5">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Edit Blog</CardTitle>
          </div>
          <CardDescription className="text-base">
            Update the information for your blog post
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
                      placeholder="Enter a compelling title"
                      {...field}
                      className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Excerpt <span className="text-destructive">*</span>
                    </FormLabel>
                    <Textarea
                      placeholder="Write a brief summary or excerpt"
                      rows={4}
                      {...field}
                      className="text-base resize-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Tags
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        className="px-6 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-sm px-3 py-1.5 gap-1.5 hover:bg-secondary/80 transition-colors"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormDescription>
                      Update tags to categorize your content
                    </FormDescription>
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
                        Thumbnail
                      </FormLabel>
                      <SingleImageUploader
                        initialUrl={blog?.thumbnail}
                        onChange={(file) => {
                          setImage(file);
                          field.onChange(file);
                        }}
                      />
                      <FormDescription className="text-xs">
                        Leave empty to keep existing thumbnail
                      </FormDescription>
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
                              Featured Content
                            </FormLabel>
                          </div>
                          <FormDescription className="text-xs">
                            Highlight this on the homepage
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

              <div className="space-y-2">
                <FormLabel className="text-sm font-semibold">
                  Content <span className="text-destructive">*</span>
                </FormLabel>
                <div className="min-h-[500px] h-[500px] border-b-1 overflow-auto">
                  <RichTextEditor
                    ref={editorRef}
                    initialHtml={blog?.content ?? ""}
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
                    {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="px-8 h-12 bg-transparent"
                    onClick={() => router.push("/dashboard/blogs")}
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
