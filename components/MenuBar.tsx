"use client";

import { Editor, useEditorState } from "@tiptap/react";

import {
  IconBold,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconLetterT,
  IconList,
  IconListNumbers,
  IconUnderline,
} from "@tabler/icons-react";
import { ITipTapEditorProps, MenuBarOptGroup } from "@/lib/models";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "./ui/button";
import { useCallback, useEffect } from "react";

export const MenuBar = ({
  editor,
  onViewCodeClick,
}: Pick<ITipTapEditorProps, "onViewCodeClick"> & { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    // the selector function is used to select the state you want to react to
    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
        currentContentLength: editor.getText().length,
        isH1Active: editor.isActive("heading", { level: 1 }),
        isH2Active: editor.isActive("heading", { level: 2 }),
        isH3Active: editor.isActive("heading", { level: 3 }),
        isH4Active: editor.isActive("heading", { level: 4 }),
        isH5Active: editor.isActive("heading", { level: 5 }),
        isH6Active: editor.isActive("heading", { level: 6 }),
        isParagraphActive: editor.isActive("paragraph"),
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isUnderline: editor.isActive("underline"),
        isBulletListActive: editor.isActive("bulletList"),
        isOrderedListActive: editor.isActive("orderedList"),
      };
    },
  });

  useEffect(() => {
    try {
      if (editor && !editorState?.currentContentLength) {
        editor.commands.clearContent();
      }
    } catch (e) {
      console.error("Error while clearing editor content", e);
    }
  }, [editor, editorState?.currentContentLength]);

  const handleViewCodeClick = useCallback(() => {
    if (editor && typeof onViewCodeClick === "function") {
      onViewCodeClick(editor?.getJSON());
    }
  }, [editor, onViewCodeClick]);

  if (!editor) {
    return null;
  }

  const options: MenuBarOptGroup = [
    {
      id: "h1",
      icon: (
        <IconH1
          className={
            editorState?.isH1Active ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editorState?.isH1Active || false,
    },
    {
      id: "h2",
      icon: (
        <IconH2
          className={
            editorState?.isH2Active ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editorState?.isH2Active || false,
    },
    {
      id: "h3",
      icon: (
        <IconH3
          className={
            editorState?.isH3Active ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editorState?.isH3Active || false,
    },
    {
      id: "h4",
      icon: (
        <IconH4
          className={
            editorState?.isH4Active ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editorState?.isH4Active || false,
    },
    {
      id: "h5",
      icon: (
        <IconH5
          className={
            editorState?.isH5Active ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      pressed: editorState?.isH5Active || false,
    },
    {
      id: "h6",
      icon: (
        <IconH6
          className={
            editorState?.isH6Active ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      pressed: editorState?.isH6Active || false,
    },
    {
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
    },

    {
      id: "bold",
      icon: (
        <IconBold
          className={editorState?.isBold ? "text-blue-500" : "text-gray-900"}
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleBold().run(),
      pressed: editorState?.isBold || false,
    },
    {
      id: "italic",
      icon: (
        <IconItalic
          className={editorState?.isItalic ? "text-blue-500" : "text-gray-900"}
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleItalic().run(),
      pressed: editorState?.isItalic || false,
    },
    {
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
    },
    {
      id: "bulletList",
      icon: (
        <IconList
          className={
            editorState?.isBulletListActive ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editorState?.isBulletListActive || false,
    },
    {
      id: "orderedList",
      icon: (
        <IconListNumbers
          className={
            editorState?.isOrderedListActive ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editorState?.isOrderedListActive || false,
    },
  ];

  return (
    <div className="sricky top-0 border p-2 bg-slate-50 rounded-md flex justify-between gap-4 md:gap-24">
      <div className=" flex items-center gap-2 flex-wrap">
        {Array?.isArray(options) && options?.length > 0 ? (
          options?.map((option) => {
            return (
              <Toggle
                key={`menubar-option-${option?.id}`}
                aria-label={`Toggle ${option?.id}`}
                className={
                  option?.pressed
                    ? "border-1 border-blue-500 cursor-pointer"
                    : "cursor-pointer"
                }
                pressed={option?.pressed}
                onPressedChange={() => option?.action()}
              >
                {option?.icon}
              </Toggle>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <Button
        className="flex items-center cursor-pointer transition duration-700 bg-linear-65 from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
        disabled={editorState?.currentContentLength === 0}
        onClick={handleViewCodeClick}
      >
        <IconCode size={16} stroke={2} className="text-background" />
        <span className="hidden md:inline">View Code</span>
      </Button>
    </div>
  );
};
