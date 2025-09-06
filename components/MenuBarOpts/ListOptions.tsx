"use client";

import { useCallback, useMemo, useState } from "react";
import { IconList, IconListNumbers } from "@tabler/icons-react";

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

export const ListOptions = ({
  editor,
  editorState,
}: ICommonMenuBarOptProps) => {
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);

  const listOptions = useMemo(() => {
    if (!editor) return [];
    return [
      {
        id: "bulletList",
        icon: (
          <IconList
            className={
              editorState?.isBulletListActive
                ? "text-blue-500"
                : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleBulletList().run(),
        pressed: editorState?.isBulletListActive || false,
      },
      {
        id: "orderedList",
        icon: (
          <IconListNumbers
            className={
              editorState?.isOrderedListActive
                ? "text-blue-500"
                : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleOrderedList().run(),
        pressed: editorState?.isOrderedListActive || false,
      },
    ];
  }, [
    editor,
    editorState?.isBulletListActive,
    editorState?.isOrderedListActive,
  ]);

  const getSelectedListToggle = useCallback(() => {
    const selectedListOptionIndex = editorState?.isBulletListActive
      ? 0
      : editorState?.isOrderedListActive
      ? 1
      : -1;
    return (
      <Toggle
        aria-label="List Options Trigger Toggle"
        className={
          selectedListOptionIndex > -1
            ? "text-blue-500 cursor-pointer bg-slate-200"
            : "cursor-pointer bg-slate-100"
        }
        role="combobox"
      >
        {selectedListOptionIndex > -1 ? (
          listOptions[selectedListOptionIndex]?.icon
        ) : (
          <IconList className="text-gray-900" size={14} />
        )}
      </Toggle>
    );
  }, [
    editorState?.isBulletListActive,
    editorState?.isOrderedListActive,
    listOptions,
  ]);

  return Array?.isArray(listOptions) && listOptions?.length > 0 ? (
    <Popover open={isListDropdownOpen} onOpenChange={setIsListDropdownOpen}>
      <PopoverTrigger asChild>{getSelectedListToggle()}</PopoverTrigger>
      <PopoverContent className="w-10 p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No List options found.</CommandEmpty>
            <CommandGroup>
              {listOptions.map((listOption) => (
                <CommandItem
                  key={listOption?.id}
                  value={listOption?.id}
                  onSelect={() => {
                    listOption?.action();
                    setIsListDropdownOpen(false);
                  }}
                >
                  {listOption?.icon}
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
