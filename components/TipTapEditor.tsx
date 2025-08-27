"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import React, { useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { ITipTapEditorProps } from "@/lib/models";
import { DEFAULT_EDITOR_CONTENT } from "@/lib/constants";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

export const TipTapEditor = ({ content, onUpdate }: ITipTapEditorProps) => {
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
    content: content || DEFAULT_EDITOR_CONTENT,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-[350px] md:h-[480px] border rounded-md bg-slate-50 py-2 px-3 overflow-hidden overflow-y-auto",
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getJSON());
    },
  });

  useEffect(() => {
    try {
      if (editor) {
        onUpdate(editor.getJSON());
      }
    } catch (e) {
      console.error(`Error while setting initial JSON`, e);
    }
  }, [editor, onUpdate]);

  return !editor ? (
    <div className="flex flex-col gap-2">
      <div className="border h-[55px] flex items-center gap-2 flex-wrap p-2 bg-slate-50 rounded-md" />
      <div className="h-[350px] md:h-[480px] border rounded-md bg-slate-50 py-2 px-3" />
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
