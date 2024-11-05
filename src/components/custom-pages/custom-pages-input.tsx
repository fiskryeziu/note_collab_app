"use client";
import clsx from "clsx";
import { Topbar } from "@/components/top-bar";
import { Image as Img, MessageSquareText, Smile } from "lucide-react";
import React, { useState } from "react";
import ScrollWrapper from "@/components/scroll-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "../editor";
import EmojiPicker from "../emoji-picker";
import { TControl, TEmoji } from "../../../types";
import Image from "next/image";

const IMAGES = ["/1.webp", "/2.webp", "/3.webp"];
export default function CustomPagesInput() {
  const [pageName] = useState<string>("New page");
  const [toggleControl, setToggleControl] = useState(false);
  const [controlData, setControlData] = useState<TControl>({
    title: "",
    img: "",
    comment: "",
  });
  const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];

  //emoji
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const hasControl =
    controlData.title || controlData.comment || controlData.img;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const addEmoji = (emoji: TEmoji<string>) => {
    setControlData((prev) => ({
      ...prev,
      title: emoji.native,
    }));
    setShowPicker(false);
  };
  const addBg = (img: string) => {
    setControlData((prev) => ({
      ...prev,
      img,
    }));
  };
  return (
    <div className="flex grow flex-col overflow-hidden">
      <Topbar pageName={pageName} />

      <ScrollWrapper>
        <ScrollArea className="h-full">
          <div className="mx-auto flex w-full">
            {controlData.img && (
              <div className="mt-12 block h-20 w-full">
                <Image
                  alt={controlData.title}
                  src={controlData.img}
                  width={1000}
                  height={800}
                  className="h-40 w-full object-cover"
                />
              </div>
            )}
          </div>
          <main
            className={clsx(
              "mx-auto flex w-3/4 flex-col",
              !controlData.title && controlData.img && "mt-20",
            )}
          >
            <div>
              {controlData.title && (
                <div
                  className="mt-10 w-fit cursor-pointer hover:bg-white/5"
                  onClick={togglePicker}
                >
                  <p className="text-7xl">{controlData.title}</p>
                </div>
              )}
            </div>
            <div
              className={clsx(
                "flex items-center gap-5 pt-20 transition-opacity duration-200",
                toggleControl ? "opacity-100" : "opacity-0",
                hasControl && "pt-5",
              )}
              onMouseEnter={() => setToggleControl(true)}
              onMouseLeave={() => setToggleControl(false)}
            >
              {!controlData.title && (
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-[5px] p-1 hover:bg-white/10"
                  role="button"
                  // onClick={() => setIsOpen(!isOpen)}
                  onClick={togglePicker}
                >
                  <EmojiPicker show={showPicker} add={addEmoji} />
                  <Smile size={16} className="text-white/80" />
                  <p className="text-sm text-white/80">Add icon</p>
                </div>
              )}
              {!controlData.img && (
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-[5px] p-1 hover:bg-white/10"
                  role="button"
                  onClick={() =>
                    setControlData((prev) => ({
                      ...prev,
                      img: randomImage,
                    }))
                  }
                >
                  <Img size={16} className="text-white/80" />
                  <p className="text-sm text-white/80">Add cover</p>
                </div>
              )}
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
