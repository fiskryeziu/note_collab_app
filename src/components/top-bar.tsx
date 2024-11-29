"use client";
import { AppContext } from "@/context";
import React, { use } from "react";
import { TContext, TTopBarProps } from "../../types";
import {
  ChevronsRight,
  Clock9,
  Ellipsis,
  Menu,
  MessageSquareText,
  Star,
} from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PageTitlePopover } from "./page-title-popover";

export const Topbar = ({ controlData, setControlData }: TTopBarProps) => {
  const context = use<TContext | null>(AppContext);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { show, setShow, toggle, toggleMenu } = context;

  return (
    <main className="flex items-center gap-2 px-4 h-[44px]">
      {toggleMenu &&
        (toggleMenu && show ? (
          <ChevronsRight
            onClick={() => toggle()}
            className={clsx(toggleMenu && "z-50")}
            onMouseEnter={() => setShow(true)}
          />
        ) : (
          <Menu onMouseEnter={() => setShow(true)} className="z-50" />
        ))}

      {!isHomePage && (
        <PageTitlePopover
          controlData={controlData}
          setControlData={setControlData}
        />
      )}
      <div className="ml-auto flex gap-4">
        {isHomePage ? (
          <Ellipsis size={20} className="text-white/80" />
        ) : (
          <>
            <p className="text-sm text-white/80">Share</p>
            <MessageSquareText size={20} className="text-white/80" />
            <Clock9 size={20} className="text-white/80" />
            <Star size={20} className="text-white/80" />
            <Ellipsis size={20} className="text-white/80" />
          </>
        )}
      </div>
    </main>
  );
};
