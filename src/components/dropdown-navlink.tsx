"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppContext } from "@/context";
import { deletePage } from "@/lib/data";
import { Ellipsis } from "lucide-react";
import { redirect } from "next/navigation";
import { use } from "react";

export const DropdownMenuLinks = ({ pageId }: { pageId: string }) => {
  const context = use(AppContext);
  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { pages, setPages } = context;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await deletePage(pageId);
    console.log(pageId);
    if (result?.success) {
      const newPages = [...pages];
      const filteredPages = newPages.filter((page) => page.id !== pageId);
      setPages(filteredPages);
      redirect("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="invisible group-hover:visible"
        onClick={handleClick}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        className="bg-[#252525] text-white/80 rounded-xl w-56"
      >
        <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Move to</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Move to Trash
        </DropdownMenuItem>
        <DropdownMenuItem>Open in new tab</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
