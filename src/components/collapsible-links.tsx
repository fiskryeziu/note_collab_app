"use client";

import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NavbarLinks from "./navbar/navbar-links";

export function CollapsibleLinks() {
  const [isOpen, setIsOpen] = useState(false);

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
            className="p-2 text-xs hover:bg-white/5 duration-200 rounded-[10px]"
          >
            <p>Private</p>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-0.5">
        <NavbarLinks />
      </CollapsibleContent>
    </Collapsible>
  );
}
