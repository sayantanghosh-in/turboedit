"use client";

import { useMemo } from "react";
import { IconBold } from "@tabler/icons-react";

import { Toggle } from "@/components/ui/toggle";

import { ICommonMenuBarOptProps, MenuBarOpt } from "@/lib/models";

export const BoldItem = ({ editor, editorState }: ICommonMenuBarOptProps) => {
  const boldItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "bold",
      icon: (
        <IconBold
          className={editorState?.isBold ? "text-blue-500" : "text-gray-900"}
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleBold().run(),
      pressed: editorState?.isBold || false,
    };
  }, [editor, editorState?.isBold]);

  return boldItem ? (
    <Toggle
      aria-label="Bold Option Toggle"
      className={
        editorState?.isBold
          ? "text-blue-500 cursor-pointer bg-slate-200"
          : "cursor-pointer bg-slate-100"
      }
      onPressedChange={() => boldItem?.action()}
    >
      {boldItem?.icon}
    </Toggle>
  ) : (
    <></>
  );
};
