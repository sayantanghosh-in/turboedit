"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IconPhotoScan } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";

import {
  ICommonMenuBarOptProps,
  MenuBarOpt,
  MenuBarOptActionData,
} from "@/lib/models";

const ImagePopoverContent = ({
  editorState,
  imageItem,
}: {
  editorState: ICommonMenuBarOptProps["editorState"];
  imageItem: MenuBarOpt;
}) => {
  const [url, setUrl] = useState<string>(
    editorState?.imageAttributes?.src || ""
  );
  const [alt, setAlt] = useState<string>(
    editorState?.imageAttributes?.alt || ""
  );
  const [width, setWidth] = useState<number>(
    editorState?.imageAttributes?.width || 0
  );
  const [height, setHeight] = useState<number>(
    editorState?.imageAttributes?.height || 0
  );

  useEffect(() => {
    const currentUrl = editorState?.imageAttributes?.src || "";
    const currentAlt = editorState?.imageAttributes?.alt || "";
    setUrl(currentUrl);
    setAlt(currentAlt);
  }, [editorState?.imageAttributes?.alt, editorState?.imageAttributes?.src]);

  return (
    <PopoverContent className="w-80 flex flex-col items-end gap-2">
      <Input
        type="text"
        placeholder="Image URL"
        value={url}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUrl(e?.target?.value || "")
        }
      />
      <Input
        type="text"
        placeholder="Image Alt Text"
        value={alt}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAlt(e?.target?.value || "")
        }
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          placeholder="Width (in px)"
          value={width}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setWidth(Number(e?.target?.value) || 0)
          }
        />
        <Input
          type="number"
          placeholder="Height (in px)"
          value={height}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setHeight(Number(e?.target?.value) || 0)
          }
        />
      </div>
      <Button
        onClick={() =>
          imageItem?.action(url, { image: { alt, width, height } })
        }
      >
        Add
      </Button>
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
      action: (url?: string, data?: MenuBarOptActionData) => {
        // empty
        if (!url || url === "") {
          return;
        }

        // update link
        try {
          editor
            .chain()
            .focus()
            .setImage({
              src: url,
              alt: data?.image?.alt || "",
              width: data?.image?.width || 0,
              height: data?.image?.height || 0,
            })
            .run();
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
        editorState={editorState}
        imageItem={imageItem}
      />
    </Popover>
  ) : (
    <></>
  );
};
