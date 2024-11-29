"use client";
import clsx from "clsx";
import { Topbar } from "@/components/top-bar";
import { Image as Img, Smile } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import ScrollWrapper from "@/components/scroll-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPicker from "../emoji-picker";
import { TContext, TEmoji } from "../../../types";
import Image from "next/image";
import { ChangeCover } from "../change-cover-dialog";
import { PartialBlock } from "@blocknote/core";
import { Editor } from "../dynamic-editor";
import { EditableHeading } from "../editable-heading";
import { updatePageCover, updatePageIcon } from "@/lib/data";
import { useParams } from "next/navigation";
import { AppContext } from "@/context";

export const IMAGES = ["/1.webp", "/2.webp", "/3.webp"];
export default function CustomPagesInput({
  initialContent,
}: {
  initialContent: PartialBlock[];
}) {
  const context = use<TContext | null>(AppContext);

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { pageId } = useParams<{ pageId: string }>();
  const { setPages, updateState, getPageTitle } = context;
  const [toggleControl, setToggleControl] = useState(false);

  const [controlData, setControlData] = useState({
    title: "",
    icon: "",
    cover: "",
  });
  //emoji
  const [showPicker, setShowPicker] = useState(false);
  const hasControl = controlData.icon || controlData.cover;

  useEffect(() => {
    if (pageId) {
      const initialData = getPageTitle(pageId);
      setControlData(initialData);
    }
  }, [pageId, getPageTitle]);

  const imageClickHandler = async () => {
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    setControlData((prev) => ({
      ...prev,
      img: randomImage,
    }));

    await updatePageCover(pageId, randomImage);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const addEmoji = async (emoji: TEmoji<string>) => {
    setShowPicker(false);
    await updatePageIcon(pageId, emoji.native);
    updateState(setPages, pageId, "icon", emoji.native);
  };

  return (
    <div className="flex grow flex-col overflow-hidden">
      <Topbar controlData={controlData} setControlData={setControlData} />

      <ScrollWrapper>
        <ScrollArea className="h-full">
          <div className="mx-auto flex w-full">
            {controlData.cover && (
              <div
                className={clsx(
                  "group relative mt-[44px] block h-20 w-full",
                  controlData.icon ? "mb-0" : "mb-20",
                )}
              >
                <Image
                  alt={controlData.title}
                  src={controlData.cover}
                  width={1000}
                  height={800}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute bottom-1/2 left-3/4 flex cursor-pointer items-center justify-center rounded-[3px] bg-sidebar p-1 text-xs text-white/40 opacity-0 group-hover:opacity-100">
                  <div className="relative">
                    <ChangeCover setControlData={setControlData} />
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
                  onClick={() => setShowPicker(true)}
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
                setToggleControl(false);
                setShowPicker(false);
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
              {!controlData.cover && (
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-[5px] p-1 hover:bg-white/10"
                  role="button"
                  onClick={imageClickHandler}
                >
                  <Img size={16} className="text-white/80" />
                  <p className="text-sm text-white/80">Add cover</p>
                </div>
              )}
            </div>
            <div className="ml-14 my-4">
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
