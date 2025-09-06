"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IconLink } from "@tabler/icons-react";
import { Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";

import { ICommonMenuBarOptProps, MenuBarOpt } from "@/lib/models";

const LinkPopoverContent = ({
  editor,
  linkItem,
}: {
  editor: Editor;
  linkItem: MenuBarOpt;
}) => {
  const [url, setUrl] = useState<string>(
    editor?.getAttributes("link").href || ""
  );

  useEffect(() => {
    // This effect runs whenever the PopoverContent is mounted
    // and whenever the editor's state changes.
    // It grabs the URL of the currently selected link and updates
    // the local state for the input field.
    const currentUrl = editor.isActive("link")
      ? editor.getAttributes("link").href
      : "";
    setUrl(currentUrl);
  }, [editor]);

  return (
    <PopoverContent className="w-80 flex items-center gap-2">
      <Input
        type="text"
        placeholder="https://example.com/image300x300.png"
        value={url}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUrl(e?.target?.value || "")
        }
      />
      <Button onClick={() => linkItem?.action(url)}>Add</Button>
    </PopoverContent>
  );
};

export const LinkItem = ({ editor, editorState }: ICommonMenuBarOptProps) => {
  const [isLinkItemPopoverOpen, setIsLinkItemPopoverOpen] =
    useState<boolean>(false);

  const linkItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "link",
      icon: (
        <IconLink
          className={editorState?.isLink ? "text-blue-500" : "text-gray-900"}
          size={14}
        />
      ),
      action: (url?: string) => {
        // empty
        if (!url || url === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();

          return;
        }

        // update link
        try {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        } catch (e) {
          console.error("Error while doing link operation", e);
        } finally {
          setIsLinkItemPopoverOpen(false);
        }
      },
      pressed: editorState?.isLink || false,
    };
  }, [editor, editorState?.isLink]);

  return linkItem ? (
    <Popover
      open={isLinkItemPopoverOpen}
      onOpenChange={setIsLinkItemPopoverOpen}
    >
      <PopoverTrigger asChild>
        <Toggle
          aria-label="Link Option Toggle"
          className={
            editorState?.isLink
              ? "text-blue-500 cursor-pointer bg-slate-200"
              : "cursor-pointer bg-slate-100"
          }
        >
          {linkItem?.icon}
        </Toggle>
      </PopoverTrigger>
      <LinkPopoverContent
        key={`popover-open-${isLinkItemPopoverOpen}`}
        editor={editor}
        linkItem={linkItem}
      />
    </Popover>
  ) : (
    <></>
  );
};
