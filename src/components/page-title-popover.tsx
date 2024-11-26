"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { use } from "react";
import { TContext } from "../../types";
import { AppContext } from "@/context";
import { useParams } from "next/navigation";
import { debounce } from "@/lib/utils";
import { updatePageTitle } from "@/lib/data";

export function PageTitlePopover() {
  const context = use<TContext | null>(AppContext);
  const params = useParams<{ pageId: string }>();

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { getPageTitle, setPages } = context;

  const initialTitle = getPageTitle(params.pageId);
  const title =
    initialTitle === ""
      ? "New Page"
      : initialTitle && initialTitle.length > 40
        ? initialTitle.slice(0, 40) + "..."
        : initialTitle;

  const saveToDatabase = debounce(async (newContent: string) => {
    await updatePageTitle(params.pageId, newContent);
  }, 500);
  return (
    <Popover>
      <PopoverTrigger asChild className="z-50 relative">
        <Button
          variant="ghost"
          className="py-3 px-2 h-0 rounded-[10px]"
          onClick={() => console.log("hello")}
        >
          <p className="text-sm text-white/80">{title}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1 bg-sidebar -ml-28" align="start">
        <div className="grid gap-4">
          {/*  
            TODO: - btn to toggle emoji picker 
          */}

          <Input
            type="text"
            value={initialTitle === "New page" ? "" : initialTitle}
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
