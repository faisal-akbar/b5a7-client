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
import { updateAbout } from "@/services/About";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SingleImageUploader from "./SingleImageUploader";

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
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(200, { message: "Title cannot exceed 200 characters." })
    .optional(),
  content: z
    .string({ invalid_type_error: "Content must be string" })
    .min(10, { message: "Content must be at least 10 characters long." })
    .optional(),
  skills: z
    .array(z.string({ invalid_type_error: "Each skill must be string" }), {
      invalid_type_error: "Skills must be an array of strings",
    })
    .min(1, { message: "At least one skill is required." })
    .max(50, { message: "Cannot have more than 50 skills." })
    .optional(),
  thumbnail: z.any().optional(),
  resume: z
    .string({ invalid_type_error: "Resume must be string" })
    .url({ message: "Resume must be a valid URL." })
    .optional(),
});

type About = {
  id: number;
  title: string;
  content: string;
  skills: string[];
  thumbnail: string;
  resume: string;
};

type FormData = z.infer<typeof formSchema>;

export default function AboutForm({ about }: { about?: About }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: about?.title ?? "",
      content: about?.content ?? "",
      skills: about?.skills ?? [],
      thumbnail: undefined,
      resume: undefined,
    },
  });

  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(about?.skills ?? []);

  const [skillInput, setSkillInput] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);

  const editorRef = useRef<RichTextEditorHandle>(null);

  useEffect(() => {
    if (editorRef.current && about?.content) {
      editorRef.current.setContent(about.content);
    }
  }, [about]);

  const onSubmit = async (data: FormData) => {
    const editorContent = editorRef.current?.getContent() || "";

    const formDataWithContent = {
      ...data,
      content: editorContent,
      skills,
    } as const;

    const payload = new FormData();
    payload.append("data", JSON.stringify(formDataWithContent));
    if (thumbnailImage) payload.append("file", thumbnailImage);

    try {
      const res = await updateAbout(payload);

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/about");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error("UpdateAbout error:", err);
      toast.error("Failed to update about. Please try again.");
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      form.setValue("skills", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    form.setValue("skills", newSkills);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <>
      <Card className="border shadow-lg shadow-primary/5">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Edit className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              About Information
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Update your personal information and professional details
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
                      placeholder="Enter your professional title"
                      {...field}
                      className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                    />
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
                        Profile Image
                      </FormLabel>
                      <SingleImageUploader
                        initialUrl={about?.thumbnail}
                        onChange={(file) => {
                          setThumbnailImage(file);
                          field.onChange(file);
                        }}
                      />
                      <FormDescription className="text-xs">
                        Leave empty to keep existing image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Resume <span className="text-destructive">*</span>
                      </FormLabel>
                      <Input
                        placeholder="Enter your resume link"
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
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Skills
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill and press Enter"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKeyDown}
                        className="h-11 text-base focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <Button
                        type="button"
                        onClick={addSkill}
                        variant="outline"
                        className="px-6 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm px-3 py-1.5 gap-1.5 hover:bg-secondary/80 transition-colors"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 hover:text-destructive transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormDescription>
                      Add your technical and professional skills
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="text-sm font-semibold">
                  About Content <span className="text-destructive">*</span>
                </FormLabel>
                <div className="min-h-[500px] h-[500px] border-b-1 overflow-auto">
                  <RichTextEditor
                    ref={editorRef}
                    initialHtml={about?.content ?? ""}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="pt-3 gap-3 flex">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 h-12"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="px-8 h-12 bg-transparent"
                    onClick={() => router.push("/dashboard/about")}
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
