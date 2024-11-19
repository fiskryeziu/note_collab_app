"use client";

import { PartialBlock } from "@blocknote/core";
import dynamic from "next/dynamic";

export const Editor = dynamic<{ initialContent: PartialBlock[] }>(
  () => import("./editor"),
  { ssr: false },
);
