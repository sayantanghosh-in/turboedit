"use client";

import { useState } from "react";
import { Preview } from "@/components/Preview";
import { TipTapEditor } from "./TipTapEditor";

export const Editor = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  return (
    <div className="border-x-1 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      <TipTapEditor content={editorContent} onUpdate={setEditorContent} />
      <Preview />
    </div>
  );
};
