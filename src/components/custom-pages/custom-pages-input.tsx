"use client";
import clsx from "clsx";
import { Topbar } from "@/components/top-bar";
import { Image as Img, Smile } from "lucide-react";
import React, { useCallback, useState } from "react";
import ScrollWrapper from "@/components/scroll-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPicker from "../emoji-picker";
import { TControl, TEmoji } from "../../../types";
import Image from "next/image";
import { ChangeCover } from "../change-cover-dialog";
import { PartialBlock } from "@blocknote/core";
import { Editor } from "../dynamic-editor";
import { EditableHeading } from "../editable-heading";

// TODO:  - add h1 for pagetitle contenteditable
//        - top-bar pagetitle onclick show popover
//        - action change pagetitle with debounce
export const IMAGES = ["/1.webp", "/2.webp", "/3.webp"];
export default function CustomPagesInput({
  initialContent,
}: {
  initialContent: PartialBlock[];
}) {
  const [toggleControl, setToggleControl] = useState(false);

  // TODO: get from db the initial data
  const [controlData, setControlData] = useState<TControl>({
    icon: "",
    title: "",
    img: "",
  });
  const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];

  //emoji
  const [showPicker, setShowPicker] = useState(false);

  const hasControl = controlData.icon || controlData.img;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const addEmoji = (emoji: TEmoji<string>) => {
    setControlData((prev) => ({
      ...prev,
      icon: emoji.native,
    }));
    setShowPicker(false);
  };
  // const addBg = (img: string) => {
  //   setControlData((prev) => ({
  //     ...prev,
  //     img,
  //   }));
  // };

  // NOTE: this will get used in custom-pages-input & top-bar
  // const handleChange = async () => {
  //   try {
  //     // update server action call
  //   } catch (error) {
  //     console.error("Error handling change:", error);
  //   }
  // };
  // const debouncedHandleChange = useCallback(debounce(handleChange, 500), [
  //   handleChange,
  // ]);

  return (
    <div className="flex grow flex-col overflow-hidden">
      <Topbar />

      <ScrollWrapper>
        <ScrollArea className="h-full">
          <div className="mx-auto flex w-full">
            {controlData.img && (
              <div
                className={clsx(
                  "group relative mt-[44px] block h-20 w-full",
                  controlData.icon ? "mb-0" : "mb-20",
                )}
              >
                <Image
                  alt={controlData.title}
                  src={controlData.img}
                  width={1000}
                  height={800}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute bottom-1/2 left-3/4 flex cursor-pointer items-center justify-center rounded-[3px] bg-sidebar p-1 text-xs text-white/40 opacity-0 group-hover:opacity-100">
                  <div className="relative">
                    <ChangeCover setControlDataAction={setControlData} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <main className={clsx("mx-auto flex w-3/4 flex-col")}>
            <div className="z-10">
              {controlData.icon && (
                <div
                  className="ml-12 mt-10 w-fit cursor-pointer hover:bg-white/5 relative"
                  onClick={togglePicker}
                >
                  <p className="text-7xl">{controlData.icon}</p>
                  <EmojiPicker
                    show={showPicker}
                    add={addEmoji}
                    setShow={setShowPicker}
                  />
                </div>
              )}
            </div>
            <div
              className={clsx(
                "flex items-center gap-5 pt-20 transition-opacity duration-200 ml-12 relative",
                toggleControl ? "opacity-100" : "opacity-0",
                hasControl && "pt-5",
              )}
              onMouseEnter={() => setToggleControl(true)}
              onMouseLeave={() => {
                setToggleControl(false), setShowPicker(false);
              }}
            >
              {!controlData.icon && (
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-[5px] p-1 hover:bg-white/10"
                  role="button"
                  onClick={togglePicker}
                >
                  <EmojiPicker
                    show={showPicker}
                    add={addEmoji}
                    setShow={setShowPicker}
                  />
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
            <div className="ml-14 my-4">
              {/* NOTE: - use initialcontent when fetch from db */}
              <EditableHeading placeholder="New Page" />
            </div>
            <div>
              <Editor initialContent={initialContent} />
            </div>
          </main>
        </ScrollArea>
      </ScrollWrapper>
    </div>
  );
}
