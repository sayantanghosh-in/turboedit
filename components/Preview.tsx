"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { renderToMarkdown } from "@tiptap/static-renderer";
import { toast } from "sonner";
import StarterKit from "@tiptap/starter-kit";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { IEditorPreviewProps } from "@/lib/models";
import { IconCopy, IconEdit } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { copyToClipboard } from "@/lib/utils";

export const Preview = (props: IEditorPreviewProps) => {
  const [fileName, setFileName] = useState<string>("README.md");
  const [editorMarkdownContent, setEditorMarkdownContent] = useState<
    string | null
  >("");

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(
      editorMarkdownContent?.replaceAll("\n\n", "\n") || ""
    );
    if (success) {
      toast("Copied Successfully!", {
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } else {
      toast?.error("Could not copy, please check browser console", {
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  }, [editorMarkdownContent]);

  useEffect(() => {
    if (props?.editorJsonContent) {
      const md = renderToMarkdown({
        extensions: [StarterKit],
        content: props?.editorJsonContent,
      });
      setEditorMarkdownContent(md);
    } else {
      setEditorMarkdownContent(null);
    }
  }, [props?.editorJsonContent]);

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="sticky top-0 border flex justify-between items-center gap-4 md:gap-24 flex-wrap p-2 bg-slate-50 rounded-md">
        <Input
          type="text"
          placeholder="Filename: ex - README.md"
          value={fileName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFileName(e?.target.value?.trim() || "")
          }
          className="bg-background w-48 md:w-96"
        />
        <div className="flex items-center gap-4">
          <IconCopy size={16} className="text-blue-500" onClick={handleCopy} />
          <Button
            className="flex items-center cursor-pointer transition duration-700 bg-linear-65 from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
            onClick={() => props?.setShowCodeSection(false)}
          >
            <IconEdit size={16} stroke={2} className="text-background" />
            <span className="hidden md:inline">Edit</span>
          </Button>
        </div>
      </div>
      {typeof editorMarkdownContent === "string" &&
      editorMarkdownContent?.length > 0 ? (
        <div className="h-[calc(100vh-136.8px-1.5rem-5px)] overflow-hidden overflow-y-auto p-2 bg-slate-50 rounded-md border">
          <SyntaxHighlighter
            language="markdown"
            style={docco}
            wrapLongLines
            className="m-0 p-0"
            id="preview-pre"
          >
            {editorMarkdownContent?.replaceAll("\n\n", "\n")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="h-[calc(100vh-136.8px-1.5rem-5px)] p-2 bg-slate-50 rounded-md border flex flex-col justify-center items-center gap-2 text-center">
          <h2>Your Words, Our Code.</h2>
          <p className="max-w-3/5">
            There&apos;s a beautiful blank space on your left. It&apos;s waiting
            for your first masterpiece.
          </p>
          <p>Go ahead, try us. We dare you.</p>
        </div>
      )}
    </div>
  );
};
