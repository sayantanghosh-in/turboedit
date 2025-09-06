"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IconPhotoScan } from "@tabler/icons-react";
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

const ImagePopoverContent = ({
  editor,
  imageItem,
}: {
  editor: Editor;
  imageItem: MenuBarOpt;
}) => {
  const [url, setUrl] = useState<string>(
    editor?.getAttributes("image")?.src || ""
  );

  useEffect(() => {
    // This effect runs whenever the PopoverContent is mounted
    // and whenever the editor's state changes.
    // It grabs the src URL of the currently selected image and updates
    // the local state for the input field.
    const currentUrl = editor?.getAttributes("image")?.src || "";
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
      <Button onClick={() => imageItem?.action(url)}>Add</Button>
    </PopoverContent>
  );
};

export const ImageItem = ({ editor, editorState }: ICommonMenuBarOptProps) => {
  const [isImageItemPopoverOpen, setIsImageItemPopoverOpen] =
    useState<boolean>(false);

  const imageItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "link",
      icon: (
        <IconPhotoScan
          className={editorState?.isImage ? "text-blue-500" : "text-gray-900"}
          size={14}
        />
      ),
      action: (url?: string) => {
        // empty
        if (!url || url === "") {
          return;
        }

        // update link
        try {
          editor.chain().focus().setImage({ src: url }).run();
        } catch (e) {
          console.error("Error while doing image operation", e);
        } finally {
          setIsImageItemPopoverOpen(false);
        }
      },
      pressed: editorState?.isImage || false,
    };
  }, [editor, editorState?.isImage]);

  return imageItem ? (
    <Popover
      open={isImageItemPopoverOpen}
      onOpenChange={setIsImageItemPopoverOpen}
    >
      <PopoverTrigger asChild>
        <Toggle
          aria-label="Image Option Toggle"
          className={
            editorState?.isImage
              ? "text-blue-500 cursor-pointer bg-slate-200"
              : "cursor-pointer bg-slate-100"
          }
        >
          {imageItem?.icon}
        </Toggle>
      </PopoverTrigger>
      <ImagePopoverContent
        key={`popover-open-${isImageItemPopoverOpen}`}
        editor={editor}
        imageItem={imageItem}
      />
    </Popover>
  ) : (
    <></>
  );
};
