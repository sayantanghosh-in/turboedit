import { JSX } from "react";

export type MenuBarOpt = {
  id: string;
  icon: JSX.Element;
  action: (arg?: string) => void;
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
