import { JSX } from "react";
import { Editor } from "@tiptap/react";

export type MenuBarOptActionData = {
  image: {
    alt: string;
    width: number;
    height: number;
  };
};

export type MenuBarOpt = {
  id: string;
  icon: JSX.Element;
  action: (arg?: string, data?: MenuBarOptActionData) => void;
  pressed: boolean;
};

export type MenuBarOptGroup = MenuBarOpt[];

export interface ITipTapEditorProps {
  onViewCodeClick: (editorJsonContent: object | null) => void;
}

export interface IEditorPreviewProps {
  editorJsonContent: object | null;
  setShowCodeSection: (showCodeSection: boolean) => void;
}

export interface IEditorState {
  isEditable: boolean;
  currentSelection: Selection;
  currentContentLength: number;
  isH1Active: boolean;
  isH2Active: boolean;
  isH3Active: boolean;
  isH4Active: boolean;
  isH5Active: boolean;
  isH6Active: boolean;
  isParagraphActive: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isLink: boolean;
  isBulletListActive: boolean;
  isOrderedListActive: boolean;
  isAlignLeft: boolean;
  isAlignRight: boolean;
  isAlignCenter: boolean;
  isAlignJustified: boolean;
  isImage: boolean;
  imageAttributes: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface ICommonMenuBarOptProps {
  editor: Editor;
  editorState: IEditorState | null;
}
