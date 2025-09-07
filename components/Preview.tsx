"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { renderToMarkdown } from "@tiptap/static-renderer";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { toast } from "sonner";
import StarterKit from "@tiptap/starter-kit";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { IEditorPreviewProps } from "@/lib/models";
import {
  IconCopy,
  IconEdit,
  IconInfoCircle,
  IconSettings,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyToClipboard } from "@/lib/utils";
import { FRONT_MATTER_LOCAL_STORAGE_KEY } from "@/lib/constants";

export const Preview = (props: IEditorPreviewProps) => {
  const [frontMatter, setFrontMatter] = useState<string>("");
  const [editorMarkdownContent, setEditorMarkdownContent] = useState<
    string | null
  >("");

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(
      (typeof frontMatter === "string" && frontMatter?.length > 0
        ? frontMatter + "\n"
        : "") + editorMarkdownContent?.replaceAll("\n\n", "\n") || ""
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
  }, [editorMarkdownContent, frontMatter]);

  const handleFrontMatterUpdate = useCallback(() => {
    if (window && window?.localStorage) {
      window?.localStorage?.setItem(
        FRONT_MATTER_LOCAL_STORAGE_KEY,
        frontMatter
      );
    }
  }, [frontMatter]);

  useEffect(() => {
    if (props?.editorJsonContent) {
      const md = renderToMarkdown({
        extensions: [StarterKit, Image, ImageResize],
        content: props?.editorJsonContent,
      });
      setEditorMarkdownContent(md);
    } else {
      setEditorMarkdownContent(null);
    }
  }, [props?.editorJsonContent]);

  useEffect(() => {
    // Load frontMatter from localStorage
    if (!window || !window?.localStorage) setFrontMatter("");
    const storedData = localStorage.getItem(FRONT_MATTER_LOCAL_STORAGE_KEY);
    if (storedData) {
      setFrontMatter(storedData);
      return;
    }
    setFrontMatter("");
  }, []);

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="sticky top-0 border flex justify-between items-center gap-4 md:gap-24 flex-wrap p-2 bg-slate-50 rounded-md">
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="items-center gap-2 cursor-pointer">
                <IconSettings
                  size={16}
                  stroke={2}
                  className="text-background"
                />
                <span className="hidden md:inline">Configure Front Matter</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Configure Front matter</DialogTitle>
                <DialogDescription>
                  Make changes to your front matter here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Front Matter</Label>
                  <Textarea
                    placeholder="Type your front matter here..."
                    className="max-h-48"
                    value={frontMatter}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFrontMatter(e?.target.value?.trim() || "")
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="cursor-pointer"
                    onClick={handleFrontMatterUpdate}
                  >
                    Done
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <IconInfoCircle
            size={12}
            className="text-gray-700 cursor-pointer"
            onClick={() => {
              window.open("https://frontmatter.codes/docs", "_blank");
            }}
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <IconCopy
            size={16}
            stroke={2}
            className={
              typeof editorMarkdownContent === "string" &&
              editorMarkdownContent?.length > 0
                ? "text-gray-900 cursor-pointer"
                : "text-gray-900 cursor-not-allowed"
            }
            onClick={handleCopy}
          />
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
            {(typeof frontMatter === "string" && frontMatter?.length > 0
              ? frontMatter + "\n"
              : "") + editorMarkdownContent?.replaceAll("\n\n", "\n")}
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
