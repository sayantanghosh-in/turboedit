"use client";

import { Editor, useEditorState } from "@tiptap/react";

import {
  IconBold,
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
import { MenuBarOptGroup } from "@/lib/models";
import { Toggle } from "@/components/ui/toggle";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,

    // the selector function is used to select the state you want to react to
    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
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
    <div className="border flex items-center gap-2 flex-wrap p-2 bg-slate-50 rounded-md">
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
  );
};
