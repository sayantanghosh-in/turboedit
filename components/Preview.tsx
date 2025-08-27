"use client";

import { useEffect, useState } from "react";
import { renderToMarkdown } from "@tiptap/static-renderer";
import StarterKit from "@tiptap/starter-kit";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IEditorPreviewProps } from "@/lib/models";
import { IconChevronDown } from "@tabler/icons-react";

type SupportedLanguages = "markdown" | "html";

const languageOptions: {
  [key in SupportedLanguages]: {
    id: string;
    name: string;
    extension: string;
  };
} = {
  markdown: {
    id: "markdown",
    name: "Markdown",
    extension: ".md",
  },
  html: {
    id: "html",
    name: "HTML",
    extension: ".html",
  },
};

export const Preview = (props: IEditorPreviewProps) => {
  const [selectedLanguage] = useState<SupportedLanguages>("markdown");
  const [editorMarkdownContent, setEditorMarkdownContent] = useState<string>();

  useEffect(() => {
    if (props?.editorJsonContent) {
      const md = renderToMarkdown({
        extensions: [StarterKit],
        content: props?.editorJsonContent,
      });
      setEditorMarkdownContent(md);
    }
  }, [props?.editorJsonContent]);

  return (
    <div className="flex flex-col gap-2">
      <div className="border flex items-center justify-between gap-2 flex-wrap p-2 bg-slate-50 rounded-md">
        <h2>Preview</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="border bg-background rounded-md text-sm p-2 flex items-center gap-2">
              <span>{languageOptions[selectedLanguage]?.name}</span>
              <IconChevronDown size={12} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              {Array?.isArray(Object?.entries(languageOptions)) &&
              Object?.entries(languageOptions)?.length > 0 ? (
                <DropdownMenuGroup>
                  {Object?.entries(languageOptions)?.map((language) => {
                    return (
                      <DropdownMenuItem
                        key={`language-${language?.[0]}`}
                        className="cursor-pointer"
                      >
                        {language?.[0]}
                        <DropdownMenuShortcut>
                          {language?.[1]?.extension}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              ) : (
                <DropdownMenuLabel>No Languages Found</DropdownMenuLabel>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {typeof editorMarkdownContent === "string" &&
      editorMarkdownContent?.length > 0 ? (
        <div className="h-[350px] md:h-[480px] overflow-hidden overflow-y-auto p-2 bg-slate-50 rounded-md border">
          <SyntaxHighlighter
            language="markdown"
            style={docco}
            wrapLongLines
            className="m-0 p-0"
            id="preview-pre"
          >
            {editorMarkdownContent?.replaceAll("\n\n", "\n")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="h-[350px] md:h-[480px] p-2 bg-slate-50 rounded-md border flex flex-col justify-center items-center gap-2 text-center">
          <h2>Your Words, Our Code.</h2>
          <p className="max-w-3/5">
            There&apos;s a beautiful blank space on your left. It&apos;s waiting
            for your first masterpiece.
          </p>
          <p>Go ahead, try us. We dare you.</p>
        </div>
      )}
    </div>
  );
};
