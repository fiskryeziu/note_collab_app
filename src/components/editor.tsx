"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { saveContentToServer } from "@/lib/data";
import { debounce } from "@/lib/utils";

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

  const handleChange = async () => {
    try {
      const content = editor.document;
      saveContentToServer(content, pageId);
    } catch (error) {
      console.error("Error handling change:", error);
    }
  };

  const debouncedHandleChange = debounce(handleChange, 500);

  return <BlockNoteView editor={editor} onChange={debouncedHandleChange} />;
}
