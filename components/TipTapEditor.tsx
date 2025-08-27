"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import { ITipTapEditorProps } from "@/lib/models";

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
    ],
    content: props?.content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-[350px] md:h-[480px] border rounded-md bg-slate-50 py-2 px-3 overflow-hidden overflow-y-auto",
      },
    },
    onUpdate: ({ editor }) => {
      props?.onUpdate(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
