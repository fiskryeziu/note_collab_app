"use client";
import { Topbar } from "@/components/top-bar";
import clsx from "clsx";
import { Image as Img, MessageSquareText, Smile } from "lucide-react";
import React, { useState } from "react";

// const text = { type: "text", data: { content: "some dummy text" } };
export default function CustomPagesInput() {
  // const headingRef = useRef<HTMLHeadingElement>(null);
  // const [show, setShow] = useState(true);
  const [pageName] = useState<string>("New page");
  const [toggleControl, setToggleControl] = useState(false);
  // const [blocks, setBlocks] = useState<{ type: string; data: any }[]>([text]);

  // const handleInput = () => {
  //   if (headingRef.current) {
  //     const isEmpty = headingRef.current.textContent?.trim() === "";
  //     const text = headingRef.current.textContent?.trim() ?? "";
  //     setShow(isEmpty);
  //     setPageName(text.length > 0 ? text : "New page");
  //   }
  // };

  return (
    <div className="p-4">
      <Topbar pageName={pageName} />
      <main className="max-w-full w-3/4 mx-auto">
        <div
          className={clsx(
            "pt-20 flex items-center gap-5 transition-opacity duration-200",
            toggleControl ? "opacity-100" : "opacity-0",
          )}
          onMouseEnter={() => setToggleControl(true)}
          onMouseLeave={() => setToggleControl(false)}
        >
          <div className="flex gap-2 items-center hover:bg-white/10 p-1 rounded-[5px]">
            <Smile size={16} className="text-white/80" />
            <p className="text-sm text-white/80">Add icon</p>
          </div>
          <div className="flex gap-2 items-center hover:bg-white/10 p-1 rounded-[5px]">
            <Img size={16} className="text-white/80" />
            <p className="text-sm text-white/80">Add cover</p>
          </div>
          <div className="flex gap-2 items-center hover:bg-white/10 p-1 rounded-[5px]">
            <MessageSquareText size={16} className="text-white/80" />
            <p className="text-sm text-white/80">Add a comment</p>
          </div>
        </div>
        <div className="min-h-44 flex h-full"></div>
      </main>
    </div>
  );
}
