import { JSX } from "react";

export type MenuBarOpt = {
  id: string;
  icon: JSX.Element;
  action: () => void;
  pressed: boolean;
};

export type MenuBarOptGroup = MenuBarOpt[];

export interface ITipTapEditorProps {
  content: string;
  onUpdate: (content: string) => void;
}
