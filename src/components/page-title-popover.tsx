import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { use, useState } from "react";
import { TContext, TEmoji, TTopBarProps } from "../../types";
import { AppContext } from "@/context";
import { useParams } from "next/navigation";
import { debounce } from "@/lib/utils";
import { updatePageIcon, updatePageTitle } from "@/lib/data";
import EmojiPicker from "./emoji-picker";
import { File } from "lucide-react";

export function PageTitlePopover({
  controlData,
  setControlData,
}: TTopBarProps) {
  const context = use<TContext | null>(AppContext);
  const params = useParams<{ pageId: string }>();
  const [show, setShow] = useState(false);

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { getPageTitle, setPages, updateState } = context;

  const initialTitle = getPageTitle(params.pageId);
  const title =
    initialTitle.title === ""
      ? "New Page"
      : initialTitle.title && initialTitle.title.length > 40
        ? initialTitle.title.slice(0, 40) + "..."
        : initialTitle.title;

  const saveToDatabase = debounce(async (newContent: string) => {
    await updatePageTitle(params.pageId, newContent);
  }, 500);

  const addEmoji = (emoji: TEmoji<string>) => {
    setControlData!((prev) => ({
      ...prev,
      icon: emoji.native,
    }));
    setShow(false);
    updateState(setPages, params.pageId, "icon", emoji.native);
    updatePageIcon(params.pageId, emoji.native);
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="z-50 relative">
        <Button variant="ghost" className="py-3 px-2 h-0 rounded-[10px]">
          <p className="text-sm text-white/80">
            {controlData?.icon} {title}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1 bg-sidebar -ml-28" align="start">
        <div className="flex gap-4">
          <div
            className="border p-2 relative"
            onClick={(e) => {
              e.stopPropagation();
              setShow(true);
            }}
          >
            {controlData?.icon === "" ? (
              <File size={14} />
            ) : (
              <p className="text-xs">{controlData?.icon}</p>
            )}
          </div>
          <EmojiPicker show={show} add={addEmoji} setShow={setShow} />
          <Input
            type="text"
            value={initialTitle.title === "New page" ? "" : initialTitle.title}
            placeholder="New Page"
            onChange={(e) => {
              setPages((prevPages) =>
                prevPages.map((page) =>
                  page.id === params.pageId
                    ? {
                        ...page,
                        title:
                          e.target.value === "" ? "New page" : e.target.value,
                      }
                    : page,
                ),
              );
              saveToDatabase(e.target.value);
            }}
            className="col-span-2 h-8 bg-sidebar/30 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
