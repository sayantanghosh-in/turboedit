"use client";

import { useState } from "react";
import { Preview } from "@/components/Preview";
import { TipTapEditor } from "./TipTapEditor";

export const Editor = () => {
  const [showCodeSection, setShowCodeSection] = useState<boolean>(false);
  const [editorJsonContent, setEditorJsonContent] = useState<object | null>(
    null
  );

  const handleViewCodeClick = (jsonContent: object | null) => {
    setEditorJsonContent(jsonContent);
    setShowCodeSection(true);
  };

  return (
    <div className="border-x-1 p-2 grid grid-cols-1">
      {showCodeSection ? (
        <Preview
          editorJsonContent={editorJsonContent}
          setShowCodeSection={setShowCodeSection}
        />
      ) : (
        <TipTapEditor onViewCodeClick={handleViewCodeClick} />
      )}
    </div>
  );
};
