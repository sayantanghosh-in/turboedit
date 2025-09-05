"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import { MenuBar } from "./MenuBar";
import { ITipTapEditorProps } from "@/lib/models";
import {
  DEFAULT_EDITOR_CONTENT,
  DEFAULT_EDITOR_CONTENT_LOADING,
  SESSION_STORAGE_KEY,
} from "@/lib/constants";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// Utility function to get content from session storage or use default
const getInitialContent = () => {
  if (!window || !window?.sessionStorage) return DEFAULT_EDITOR_CONTENT;
  const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (storedData) {
    try {
      // Attempt to parse the JSON string
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing content from session storage:", error);
      // Fallback to default content if parsing fails
      return DEFAULT_EDITOR_CONTENT;
    }
  }
  // If no data exists in session storage, return the default
  return DEFAULT_EDITOR_CONTENT;
};

export const TipTapEditor = (props: ITipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    // Use the utility function to get the initial content
    content: DEFAULT_EDITOR_CONTENT_LOADING,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-[calc(100vh-136.8px-1.5rem-5px)] border rounded-md bg-slate-50 py-2 px-3 overflow-hidden overflow-y-auto",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(getInitialContent());
    }
  }, [editor]);

  return !editor ? (
    <div className="flex flex-col gap-2 relative">
      <div className="border h-[55px] flex items-center gap-2 flex-wrap p-2 bg-slate-50 rounded-md" />
      <div className="h-[calc(100vh-136.8px-1.5rem-5px)] border rounded-md bg-slate-50 py-2 px-3" />
    </div>
  ) : (
    <div className="flex flex-col gap-2 relative">
      <MenuBar editor={editor} onViewCodeClick={props?.onViewCodeClick} />
      <EditorContent editor={editor} />
    </div>
  );
};
