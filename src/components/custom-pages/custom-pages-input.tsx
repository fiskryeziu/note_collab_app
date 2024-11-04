"use client";
import { Topbar } from "@/components/top-bar";
import clsx from "clsx";
import { Image as Img, MessageSquareText, Smile } from "lucide-react";
import React, { useState } from "react";
import ScrollWrapper from "@/components/scroll-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "../editor";
import EmojiPicker from "../emoji-picker";
import { TEmoji } from "../../../types";

export default function CustomPagesInput() {
  const [pageName] = useState<string>("New page");
  const [toggleControl, setToggleControl] = useState(false);

  //emoji
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const addEmoji = (emoji: TEmoji<string>) => {
    setInputValue(inputValue + emoji.native);
    setShowPicker(false);
  };

  return (
    <div className="flex grow flex-col overflow-hidden">
      <Topbar pageName={pageName} />

      <ScrollWrapper>
        <ScrollArea className="h-full">
          <main className="mx-auto flex w-3/4 flex-col">
            {inputValue && (
              <div className="mt-20">
                <p className="text-7xl">{inputValue}</p>
              </div>
            )}
            <div
              className={clsx(
                "flex items-center gap-5 pt-20 transition-opacity duration-200",
                toggleControl ? "opacity-100" : "opacity-0",
                inputValue && "pt-5",
              )}
              onMouseEnter={() => setToggleControl(true)}
              onMouseLeave={() => setToggleControl(false)}
            >
              {!inputValue && (
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-[5px] p-1 hover:bg-white/10"
                  role="button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <EmojiPicker
                    toggle={togglePicker}
                    show={showPicker}
                    add={addEmoji}
                    value={inputValue}
                  />
                  <Smile size={16} className="text-white/80" />
                  <p className="text-sm text-white/80">Add icon</p>
                </div>
              )}
              <div className="flex items-center gap-2 rounded-[5px] p-1 hover:bg-white/10">
                <Img size={16} className="text-white/80" />
                <p className="text-sm text-white/80">Add cover</p>
              </div>
              <div className="flex items-center gap-2 rounded-[5px] p-1 hover:bg-white/10">
                <MessageSquareText size={16} className="text-white/80" />
                <p className="text-sm text-white/80">Add a comment</p>
              </div>
            </div>
            <div>
              <Editor />
            </div>
          </main>
        </ScrollArea>
      </ScrollWrapper>
    </div>
  );
}
