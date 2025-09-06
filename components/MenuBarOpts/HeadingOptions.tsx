"use client";

import { useCallback, useMemo, useState } from "react";
import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHeading,
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
import { ICommonMenuBarOptProps, MenuBarOptGroup } from "@/lib/models";

export const HeadingOptions = ({
  editor,
  editorState,
}: ICommonMenuBarOptProps) => {
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);

  const headingOptions: MenuBarOptGroup = useMemo(() => {
    if (!editor) return [];
    return [
      {
        id: "h1",
        icon: (
          <IconH1
            className={
              editorState?.isH1Active ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        pressed: editorState?.isH1Active || false,
      },
      {
        id: "h2",
        icon: (
          <IconH2
            className={
              editorState?.isH2Active ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        pressed: editorState?.isH2Active || false,
      },
      {
        id: "h3",
        icon: (
          <IconH3
            className={
              editorState?.isH3Active ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        pressed: editorState?.isH3Active || false,
      },
      {
        id: "h4",
        icon: (
          <IconH4
            className={
              editorState?.isH4Active ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        pressed: editorState?.isH4Active || false,
      },
      {
        id: "h5",
        icon: (
          <IconH5
            className={
              editorState?.isH5Active ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        pressed: editorState?.isH5Active || false,
      },
      {
        id: "h6",
        icon: (
          <IconH6
            className={
              editorState?.isH6Active ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        pressed: editorState?.isH6Active || false,
      },
    ];
  }, [
    editor,
    editorState?.isH1Active,
    editorState?.isH2Active,
    editorState?.isH3Active,
    editorState?.isH4Active,
    editorState?.isH5Active,
    editorState?.isH6Active,
  ]);

  const getSelectedHeadingToggle = useCallback(() => {
    const selectedHeadingOptionIndex = editorState?.isH1Active
      ? 0
      : editorState?.isH2Active
      ? 1
      : editorState?.isH3Active
      ? 2
      : editorState?.isH4Active
      ? 3
      : editorState?.isH5Active
      ? 4
      : editorState?.isH6Active
      ? 5
      : -1;
    return (
      <Toggle
        aria-label="Heading Options Trigger Toggle"
        className={
          selectedHeadingOptionIndex > -1
            ? "text-blue-500 cursor-pointer bg-slate-200"
            : "cursor-pointer bg-slate-100"
        }
        role="combobox"
      >
        {selectedHeadingOptionIndex > -1 ? (
          headingOptions[selectedHeadingOptionIndex]?.icon
        ) : (
          <IconHeading className="text-gray-900" size={14} />
        )}
      </Toggle>
    );
  }, [
    editorState?.isH1Active,
    editorState?.isH2Active,
    editorState?.isH3Active,
    editorState?.isH4Active,
    editorState?.isH5Active,
    editorState?.isH6Active,
    headingOptions,
  ]);

  return Array?.isArray(headingOptions) && headingOptions?.length > 0 ? (
    <Popover
      open={isHeadingDropdownOpen}
      onOpenChange={setIsHeadingDropdownOpen}
    >
      <PopoverTrigger asChild>{getSelectedHeadingToggle()}</PopoverTrigger>
      <PopoverContent className="w-10 p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No Heading options found.</CommandEmpty>
            <CommandGroup>
              {headingOptions.map((headingOption) => (
                <CommandItem
                  key={headingOption?.id}
                  value={headingOption?.id}
                  onSelect={() => {
                    headingOption?.action();
                    setIsHeadingDropdownOpen(false);
                  }}
                >
                  {headingOption?.icon}
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
