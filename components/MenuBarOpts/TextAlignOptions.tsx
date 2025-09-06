"use client";

import { useCallback, useMemo, useState } from "react";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
} from "@tabler/icons-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { ICommonMenuBarOptProps } from "@/lib/models";

export const TextAlignOptions = ({
  editor,
  editorState,
}: ICommonMenuBarOptProps) => {
  const [isAlignDropdownOpen, setIsAlignDropdownOpen] = useState(false);

  const textAlignOptions = useMemo(() => {
    if (!editor) return [];
    return [
      {
        id: "left",
        icon: (
          <IconAlignLeft
            className={
              editorState?.isAlignLeft ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleTextAlign("left").run(),
        pressed: editorState?.isAlignLeft || false,
      },
      {
        id: "right",
        icon: (
          <IconAlignRight
            className={
              editorState?.isAlignRight ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleTextAlign("right").run(),
        pressed: editorState?.isAlignRight || false,
      },
      {
        id: "center",
        icon: (
          <IconAlignCenter
            className={
              editorState?.isAlignCenter ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleTextAlign("center").run(),
        pressed: editorState?.isAlignCenter || false,
      },
      {
        id: "justify",
        icon: (
          <IconAlignJustified
            className={
              editorState?.isAlignJustified ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleTextAlign("justify").run(),
        pressed: editorState?.isAlignJustified || false,
      },
    ];
  }, [
    editor,
    editorState?.isAlignLeft,
    editorState?.isAlignRight,
    editorState?.isAlignCenter,
    editorState?.isAlignJustified,
  ]);

  const getSelectedAlignToggle = useCallback(() => {
    const selectedAlignOptionIndex = editorState?.isAlignLeft
      ? 0
      : editorState?.isAlignRight
      ? 1
      : editorState?.isAlignCenter
      ? 2
      : editorState?.isAlignJustified
      ? 3
      : -1;
    return (
      <Toggle
        aria-label="Align Options Trigger Toggle"
        className={
          selectedAlignOptionIndex > -1
            ? "text-blue-500 cursor-pointer bg-slate-200"
            : "cursor-pointer bg-slate-100"
        }
        role="combobox"
      >
        {selectedAlignOptionIndex > -1 ? (
          textAlignOptions[selectedAlignOptionIndex]?.icon
        ) : (
          <IconAlignLeft className="text-gray-900" size={14} />
        )}
      </Toggle>
    );
  }, [
    editorState?.isAlignLeft,
    editorState?.isAlignRight,
    editorState?.isAlignCenter,
    editorState?.isAlignJustified,
    textAlignOptions,
  ]);

  return Array?.isArray(textAlignOptions) && textAlignOptions?.length > 0 ? (
    <Popover open={isAlignDropdownOpen} onOpenChange={setIsAlignDropdownOpen}>
      <PopoverTrigger asChild>{getSelectedAlignToggle()}</PopoverTrigger>
      <PopoverContent className="w-10 p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No Align options found.</CommandEmpty>
            <CommandGroup>
              {textAlignOptions.map((alignOption) => (
                <CommandItem
                  key={alignOption?.id}
                  value={alignOption?.id}
                  onSelect={() => {
                    alignOption?.action();
                    setIsAlignDropdownOpen(false);
                  }}
                >
                  {alignOption?.icon}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  ) : (
    <></>
  );
};
