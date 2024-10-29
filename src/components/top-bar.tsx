"use client";
import { AppContext } from "@/context";
import React, { use } from "react";
import { TContext } from "../../types";
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
export const Topbar = ({ pageName }: { pageName: string }) => {
  const context = use<TContext | null>(AppContext);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { show, setShow, toggle, toggleMenu } = context;

  return (
    <main className="flex items-center gap-2">
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
      <p className="text-sm text-white/80">
        {pageName && pageName.length > 40
          ? pageName.slice(0, 40) + "..."
          : pageName}
      </p>
      <div className="ml-auto flex gap-4">
        {isHomePage ? (
          <Ellipsis size={20} className="text-white/80" />
        ) : (
          <>
            <p className="text-white/80 text-sm">Share</p>
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
