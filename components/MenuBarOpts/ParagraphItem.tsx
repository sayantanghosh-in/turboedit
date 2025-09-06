"use client";

import { useMemo } from "react";
import { IconLetterT } from "@tabler/icons-react";

import { Toggle } from "@/components/ui/toggle";

import { ICommonMenuBarOptProps, MenuBarOpt } from "@/lib/models";

export const ParagraphItem = ({
  editor,
  editorState,
}: ICommonMenuBarOptProps) => {
  const paragraphItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "paragraph",
      icon: (
        <IconLetterT
          className={
            editorState?.isParagraphActive ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().setParagraph().run(),
      pressed: editorState?.isParagraphActive || false,
    };
  }, [editor, editorState?.isParagraphActive]);

  return paragraphItem ? (
    <Toggle
      aria-label="Paragraph Option Toggle"
      className={
        editorState?.isParagraphActive
          ? "text-blue-500 cursor-pointer bg-slate-200"
          : "cursor-pointer bg-slate-100"
      }
      onPressedChange={() => paragraphItem?.action()}
    >
      {paragraphItem?.icon}
    </Toggle>
  ) : (
    <></>
  );
};
