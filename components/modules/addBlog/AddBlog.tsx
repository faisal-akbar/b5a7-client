"use client";
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
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SingleImageUploader from "../SingleImageUploader";

const RichTextEditor = dynamic(
  () => import("@/components/modules/richTextEditor/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: "500px", border: "1px solid #ccc" }}>
        Loading editor...
      </div>
    ),
  }
);

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
};

export default function AddBlog() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  //   const [addDivision] = useAddDivisionMutation();

  console.log("Inside add division modal", image);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    // console.log(formData.get("data"));
    // console.log(formData.get("file"));

    try {
      //   const res = await addDivision(formData).unwrap();
      toast.success("Division Added");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  // Text Editor
  const editorRef = useRef<RichTextEditorHandle>(null); // Ref for RichTextEditor
  const [, setEditorContent] = useState<string>(""); // State to store the editor content

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent(); // Get the editor content
      console.log(content);
      setEditorContent(content); // Update the state with the content
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-5"
          id="add-division"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division Type</FormLabel>
                <FormControl>
                  <Input placeholder="Tour Type Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <SingleImageUploader onChange={setImage} />
      </Form>
      <RichTextEditor ref={editorRef} />
      <button
        onClick={handleGetContent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded flex "
      >
        Show Content
      </button>
    </div>
  );
}
