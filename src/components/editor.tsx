"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { saveContentToServer } from "@/lib/data";

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export default function Editor({
  initialContent,
}: {
  initialContent: PartialBlock[];
}) {
  const { pageId } = useParams<{ pageId: string }>();
  const init = initialContent.length > 0 ? initialContent : undefined;

  const editor = useCreateBlockNote({
    initialContent: init,
  });

  const handleChange = useCallback(async () => {
    try {
      const content = editor.document;
      saveContentToServer(content, pageId);
    } catch (error) {
      console.error("Error handling change:", error);
    }
  }, [editor]);

  const debouncedHandleChange = useCallback(debounce(handleChange, 500), [
    handleChange,
  ]);

  return <BlockNoteView editor={editor} onChange={debouncedHandleChange} />;
}
