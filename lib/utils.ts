import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Copies the given text to the clipboard.
 * Uses the modern Clipboard API with a fallback for older browsers or restricted environments.
 * @param text The text content to copy.
 * @returns A Promise that resolves to true if the copy was successful, false otherwise.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text) {
    console.error("Cannot copy empty content to clipboard.");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};
