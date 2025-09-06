"use client";

import { useMemo } from "react";
import { IconItalic } from "@tabler/icons-react";

import { Toggle } from "@/components/ui/toggle";

import { ICommonMenuBarOptProps, MenuBarOpt } from "@/lib/models";

export const ItalicItem = ({ editor, editorState }: ICommonMenuBarOptProps) => {
  const italicItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "italic",
      icon: (
        <IconItalic
          className={editorState?.isItalic ? "text-blue-500" : "text-gray-900"}
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleItalic().run(),
      pressed: editorState?.isItalic || false,
    };
  }, [editor, editorState?.isItalic]);

  return italicItem ? (
    <Toggle
      aria-label="Italic Option Toggle"
      className={
        editorState?.isItalic
          ? "text-blue-500 cursor-pointer bg-slate-200"
          : "cursor-pointer bg-slate-100"
      }
      onPressedChange={() => italicItem?.action()}
    >
      {italicItem?.icon}
    </Toggle>
  ) : (
    <></>
  );
};
