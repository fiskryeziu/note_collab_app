"use client";
import { useContext, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NavbarLinks from "./navbar/navbar-links";
import { Plus } from "lucide-react";
import { createPage } from "@/lib/data";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context";
export function CollapsibleLinks() {
  const context = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { setPages } = context;

  const handleCreatePage = async () => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      const result = await createPage();
      if (result.success) {
        // NOTE: add type for prev
        setPages((prev) => [
          ...prev,
          {
            id: result.id,
            title: "New page",
            slug: result.slug,
            cover: "",
            icon: "",
          },
        ]);
        router.push(`/${result.id}`);
      } else {
        console.error("Failed to create page:", result.error);
      }
    } catch (error) {
      console.error("Error creating page:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div>
        <CollapsibleTrigger asChild>
          <div
            role="button"
            className="group flex justify-between rounded-[10px] p-2 text-xs duration-150 hover:bg-white/5"
          >
            <p>Private</p>
            <Plus
              size={16}
              className="text-white/40 opacity-0 transition-all duration-150 group-hover:opacity-100"
              onClick={(e) => {
                // NOTE: dont collaps links
                e.stopPropagation();
                handleCreatePage();
              }}
            />
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-0.5">
        <NavbarLinks />
      </CollapsibleContent>
    </Collapsible>
  );
}
