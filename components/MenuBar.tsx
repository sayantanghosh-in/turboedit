"use client";

import { useCallback, useEffect } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { IconCode, IconRefresh } from "@tabler/icons-react";

import { SESSION_STORAGE_KEY } from "@/lib/constants";
import { ICommonMenuBarOptProps, ITipTapEditorProps } from "@/lib/models";
import { Button } from "@/components/ui/button";

import { BoldItem } from "./MenuBarOpts/BoldItem";
import { HeadingOptions } from "./MenuBarOpts/HeadingOptions";
import { ImageItem } from "./MenuBarOpts/ImageItem";
import { ItalicItem } from "./MenuBarOpts/ItalicItem";
import { LinkItem } from "./MenuBarOpts/LinkItem";
import { ListOptions } from "./MenuBarOpts/ListOptions";
import { ParagraphItem } from "./MenuBarOpts/ParagraphItem";
import { UnderlineItem } from "./MenuBarOpts/UnderlineItem";

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
        isLink: editor.isActive("link"),
        isBulletListActive: editor.isActive("bulletList"),
        isOrderedListActive: editor.isActive("orderedList"),
        isAlignLeft: editor.isActive({ textAlign: "left" }),
        isAlignRight: editor.isActive({ textAlign: "right" }),
        isAlignCenter: editor.isActive({ textAlign: "center" }),
        isAlignJustified: editor.isActive({ textAlign: "justify" }),
        isImage: !!editor?.getAttributes("image")?.src?.trim(),
      };
    },
  });

  const handleClearContent = useCallback(() => {
    try {
      if (editor && editorState?.currentContentLength) {
        editor.commands.clearContent();
      }
    } catch (e) {
      console.error("Error while clearing editor content", e);
    }
  }, [editor, editorState?.currentContentLength]);

  const handleViewCodeClick = useCallback(() => {
    if (editor && typeof onViewCodeClick === "function") {
      const jsonData = editor?.getJSON();
      onViewCodeClick(jsonData);
      sessionStorage?.setItem(SESSION_STORAGE_KEY, JSON.stringify(jsonData));
    }
  }, [editor, onViewCodeClick]);

  useEffect(() => {
    try {
      if (editor && !editorState?.currentContentLength) {
        editor.commands.clearContent();
      }
    } catch (e) {
      console.error("Error while clearing editor content", e);
    }
  }, [editor, editorState?.currentContentLength]);

  if (!editor) {
    return null;
  }

  return (
    <div className="sricky top-0 border p-2 bg-slate-50 rounded-md flex justify-between gap-4 md:gap-24">
      <div className=" flex items-center gap-2 overflow-x-auto">
        <HeadingOptions
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <ParagraphItem
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <BoldItem
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <ItalicItem
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <UnderlineItem
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <ListOptions
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <LinkItem
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
        <ImageItem
          editor={editor}
          editorState={editorState as ICommonMenuBarOptProps["editorState"]}
        />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <IconRefresh
          size={16}
          stroke={2}
          className="text-gray-90 transition transition-duration-200 cursor-pointer hover:rotate-[30deg]"
          onClick={handleClearContent}
        />
        <Button
          className="flex items-center cursor-pointer transition duration-700 bg-linear-65 from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
          disabled={editorState?.currentContentLength === 0}
          onClick={handleViewCodeClick}
        >
          <IconCode size={16} stroke={2} className="text-background" />
          <span className="hidden md:inline">View Code</span>
        </Button>
      </div>
    </div>
  );
};
