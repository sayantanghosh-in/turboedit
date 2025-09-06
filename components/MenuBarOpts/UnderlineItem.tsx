"use client";

import { useMemo } from "react";
import { IconUnderline } from "@tabler/icons-react";

import { Toggle } from "@/components/ui/toggle";

import { ICommonMenuBarOptProps, MenuBarOpt } from "@/lib/models";

export const UnderlineItem = ({
  editor,
  editorState,
}: ICommonMenuBarOptProps) => {
  const underlineItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "underline",
      icon: (
        <IconUnderline
          className={
            editorState?.isUnderline ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editorState?.isUnderline || false,
    };
  }, [editor, editorState?.isUnderline]);

  return underlineItem ? (
    <Toggle
      aria-label="Underline Option Toggle"
      className={
        editorState?.isUnderline
          ? "text-blue-500 cursor-pointer bg-slate-200"
          : "cursor-pointer bg-slate-100"
      }
      onPressedChange={() => underlineItem?.action()}
    >
      {underlineItem?.icon}
    </Toggle>
  ) : (
    <></>
  );
};
