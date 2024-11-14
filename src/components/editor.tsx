"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function Editor({ initialContent }) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  return <BlockNoteView editor={editor} />;
}
