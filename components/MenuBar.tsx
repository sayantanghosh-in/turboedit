"use client";

import { Editor } from "@tiptap/react";

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
  if (!editor) {
    return null;
  }

  const options: MenuBarOptGroup = [
    {
      id: "h1",
      icon: <IconH1 size={14} />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      id: "h2",
      icon: <IconH2 size={14} />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      id: "h3",
      icon: <IconH3 size={14} />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      id: "h4",
      icon: <IconH4 size={14} />,
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),

      pressed: editor.isActive("heading", { level: 4 }),
    },
    {
      id: "h5",
      icon: <IconH5 size={14} />,
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      pressed: editor.isActive("heading", { level: 5 }),
    },
    {
      id: "h6",
      icon: <IconH6 size={14} />,
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      pressed: editor.isActive("heading", { level: 6 }),
    },
    {
      id: "paragraph",
      icon: <IconLetterT size={14} />,
      action: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },

    {
      id: "bold",
      icon: <IconBold size={14} />,
      action: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      id: "italic",
      icon: <IconItalic size={14} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      id: "underline",
      icon: <IconUnderline size={14} />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      id: "bulletList",
      icon: <IconList size={14} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      id: "orderedList",
      icon: <IconListNumbers size={14} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
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
              className="cursor-pointer"
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
