"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import {
  IconBold,
  IconCode,
  IconHeading,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconLetterT,
  IconList,
  IconListNumbers,
  IconUnderline,
} from "@tabler/icons-react";

import { ITipTapEditorProps, MenuBarOpt, MenuBarOptGroup } from "@/lib/models";
import { Button } from "./ui/button";
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
import { Toggle } from "./ui/toggle";
import { SESSION_STORAGE_KEY } from "@/lib/constants";

export const MenuBar = ({
  editor,
  onViewCodeClick,
}: Pick<ITipTapEditorProps, "onViewCodeClick"> & { editor: Editor | null }) => {
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);
  const [isMarkDropdownOpen, setIsMarkDropdownOpen] = useState(false);
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    // the selector function is used to select the state you want to react to
    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
        currentContentLength: editor.getText().length,
        isH1Active: editor.isActive("heading", { level: 1 }),
        isH2Active: editor.isActive("heading", { level: 2 }),
        isH3Active: editor.isActive("heading", { level: 3 }),
        isH4Active: editor.isActive("heading", { level: 4 }),
        isH5Active: editor.isActive("heading", { level: 5 }),
        isH6Active: editor.isActive("heading", { level: 6 }),
        isParagraphActive: editor.isActive("paragraph"),
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isUnderline: editor.isActive("underline"),
        isBulletListActive: editor.isActive("bulletList"),
        isOrderedListActive: editor.isActive("orderedList"),
      };
    },
  });

  useEffect(() => {
    try {
      if (editor && !editorState?.currentContentLength) {
        editor.commands.clearContent();
      }
    } catch (e) {
      console.error("Error while clearing editor content", e);
    }
  }, [editor, editorState?.currentContentLength]);

  const handleViewCodeClick = useCallback(() => {
    if (editor && typeof onViewCodeClick === "function") {
      const jsonData = editor?.getJSON();
      onViewCodeClick(jsonData);
      sessionStorage?.setItem(SESSION_STORAGE_KEY, JSON.stringify(jsonData));
    }
  }, [editor, onViewCodeClick]);

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

  const paragraphItem: MenuBarOpt | undefined = useMemo(() => {
    if (!editor) return;
    return {
      id: "paragraph",
      icon: (
        <IconLetterT
          className={
            editorState?.isParagraphActive ? "text-blue-500" : "text-gray-900"
          }
          size={14}
        />
      ),
      action: () => editor.chain().focus().setParagraph().run(),
      pressed: editorState?.isParagraphActive || false,
    };
  }, [editor, editorState?.isParagraphActive]);

  const markOptions = useMemo(() => {
    if (!editor) return [];
    return [
      {
        id: "bold",
        icon: (
          <IconBold
            className={editorState?.isBold ? "text-blue-500" : "text-gray-900"}
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleBold().run(),
        pressed: editorState?.isBold || false,
      },
      {
        id: "italic",
        icon: (
          <IconItalic
            className={
              editorState?.isItalic ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleItalic().run(),
        pressed: editorState?.isItalic || false,
      },
      {
        id: "underline",
        icon: (
          <IconUnderline
            className={
              editorState?.isUnderline ? "text-blue-500" : "text-gray-900"
            }
            size={14}
          />
        ),
        action: () => editor.chain().focus().toggleUnderline().run(),
        pressed: editorState?.isUnderline || false,
      },
    ];
  }, [
    editor,
    editorState?.isBold,
    editorState?.isItalic,
    editorState?.isUnderline,
  ]);

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

  const getSelectedMarkToggle = useCallback(() => {
    const selectedMarkOptionIndex = editorState?.isBold
      ? 0
      : editorState?.isItalic
      ? 1
      : editorState?.isUnderline
      ? 2
      : -1;
    return (
      <Toggle
        aria-label="Mark Options Trigger Toggle"
        className={
          selectedMarkOptionIndex > -1
            ? "text-blue-500 cursor-pointer bg-slate-200"
            : "cursor-pointer bg-slate-100"
        }
        role="combobox"
      >
        {selectedMarkOptionIndex > -1 ? (
          markOptions[selectedMarkOptionIndex]?.icon
        ) : (
          <IconBold className="text-gray-900" size={14} />
        )}
      </Toggle>
    );
  }, [
    editorState?.isBold,
    editorState?.isItalic,
    editorState?.isUnderline,
    markOptions,
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

  if (!editor) {
    return null;
  }

  return (
    <div className="sricky top-0 border p-2 bg-slate-50 rounded-md flex justify-between gap-4 md:gap-24">
      <div className=" flex items-center gap-2 flex-wrap">
        {Array?.isArray(headingOptions) && headingOptions?.length > 0 ? (
          <Popover
            open={isHeadingDropdownOpen}
            onOpenChange={setIsHeadingDropdownOpen}
          >
            <PopoverTrigger asChild>
              {getSelectedHeadingToggle()}
            </PopoverTrigger>
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
        )}
        {paragraphItem ? (
          <Toggle
            aria-label="Paragraph Options Toggle"
            className={
              editorState?.isParagraphActive
                ? "text-blue-500 cursor-pointer bg-slate-200"
                : "cursor-pointer bg-slate-100"
            }
            onPressedChange={() => paragraphItem?.action()}
          >
            {paragraphItem?.icon}
          </Toggle>
        ) : (
          <></>
        )}
        {Array?.isArray(markOptions) && markOptions?.length > 0 ? (
          <Popover
            open={isMarkDropdownOpen}
            onOpenChange={setIsMarkDropdownOpen}
          >
            <PopoverTrigger asChild>{getSelectedMarkToggle()}</PopoverTrigger>
            <PopoverContent className="w-10 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No Mark options found.</CommandEmpty>
                  <CommandGroup>
                    {markOptions.map((markOption) => (
                      <CommandItem
                        key={markOption?.id}
                        value={markOption?.id}
                        onSelect={() => {
                          markOption?.action();
                          setIsMarkDropdownOpen(false);
                        }}
                      >
                        {markOption?.icon}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <></>
        )}
        {Array?.isArray(listOptions) && listOptions?.length > 0 ? (
          <Popover
            open={isListDropdownOpen}
            onOpenChange={setIsListDropdownOpen}
          >
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
        )}
      </div>
      <Button
        className="flex items-center cursor-pointer transition duration-700 bg-linear-65 from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
        disabled={editorState?.currentContentLength === 0}
        onClick={handleViewCodeClick}
      >
        <IconCode size={16} stroke={2} className="text-background" />
        <span>View Code</span>
      </Button>
    </div>
  );
};
