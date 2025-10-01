"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
};

interface RichTextEditorProps {
  ref?: React.Ref<RichTextEditorHandle>;
}

const RichTextEditor = ({ ref }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            ["link", "image", "video"],
            ["blockquote", "code-block"],
            [{ script: "sub" }, { script: "super" }],
            ["clean"],
          ],
          clipboard: {
            matchVisual: false,
          },
        },
        placeholder: "Start writing your content here...",
        formats: [
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "align",
          "list",
          "bullet",
          "link",
          "image",
          "video",
          "blockquote",
          "code-block",
          "script",
        ],
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null; // Cleanup to avoid memory leaks
      }
    };
  }, []);

  // Expose the getContent function to the parent component using React 19 ref handling
  if (ref && typeof ref === "object" && "current" in ref) {
    ref.current = {
      getContent: () => {
        if (quillRef.current) {
          return quillRef.current.root.innerHTML; // Return the HTML content
        }
        return "";
      },
    };
  }

  return (
    <div
      ref={editorRef}
      className="quill-editor-wrapper"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "var(--background)",
      }}
    />
  );
};
export default RichTextEditor;
