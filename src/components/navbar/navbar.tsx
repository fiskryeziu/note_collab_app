"use client";
import React, { use, useRef } from "react";
import {
  ArrowUpRight,
  Bot,
  Calendar,
  ChevronDown,
  ChevronsLeft,
  HelpCircle,
  HomeIcon,
  InboxIcon,
  Search,
  Settings,
  Shapes,
  SquarePen,
  Trash,
  UserRoundPlus,
} from "lucide-react";
import clsx from "clsx";
import { AppContext } from "@/context";
import { TContext } from "../../../types";
import { CollapsibleLinks } from "../collapsible-links";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export const Navbar = () => {
  // dynamic pages will call the function from db
  // we'll use either prisma or drizzle , react query
  // if no text in it & if you change route dont save
  // the pages will be cached but on delete | update the navbar will get revalidated
  const context = use<TContext | null>(AppContext);
  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { show, setShow, toggle, toggleMenu } = context;
  return (
    <nav
      className={clsx(
        "grow-0 shrink-0 pointer-events-none relative z-50 w-60",
        toggleMenu && "w-0",
      )}
    >
      <div className="absolute top-0 left-0 bottom-0 flex flex-col">
        <div
          className={clsx(
            "flex flex-col h-full relative pointer-events-auto visible w-60 opacity-100",
          )}
          onMouseLeave={() => setShow(false)}
        >
          <aside
            className={clsx(
              "bg-sidebar w-60 flex flex-col ease duration-200 transition-all h-full max-h-full",
              toggleMenu && "max-h-[calc(-118px+100vh)] translate-y-[60px]",
              toggleMenu && !show
                ? "translate-x-[-220px] opacity-0"
                : "visible opacity-100 ",
              toggleMenu && "translate-y-0",
            )}
            onMouseEnter={() => setShow(true)}
          >
            <header className="flex flex-col m-2">
              <div className="flex items-center p-2">
                <div className="flex text-sm gap-2 items-center">
                  <p className="w-5 h-5 text-center bg-white/10 rounded-sm text-white/40">
                    F
                  </p>
                  <p>{`Fiss's`} Notion</p>

                  <ChevronDown size={14} className="text-white/40" />
                </div>
                <div className="ml-auto flex gap-2 items-center">
                  <ChevronsLeft
                    className={clsx(
                      "text-white/40 cursor-pointer",
                      show ? "visible" : "invisible",
                      toggleMenu && "invisible",
                    )}
                    onClick={() => toggle()}
                  />
                  <SquarePen size={16} className="text-white/80" />
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center text-white/60 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <Search size={16} />
                  <p className="text-sm">Search</p>
                </div>
                <div className="flex gap-2 items-center text-white/60 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <Bot size={16} />
                  <p className="text-sm">Notion AI</p>
                </div>
                <div className="flex gap-2 items-center text-white/60 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <Shapes size={16} />
                  <p className="text-sm">Templates</p>
                </div>
                <Link
                  href="/"
                  className="flex gap-2 items-center text-white/60 p-2 hover:bg-white/5 duration-200 rounded-[10px]"
                >
                  <HomeIcon size={16} />
                  <p className="text-sm">Home</p>
                </Link>
                <div className="flex gap-2 items-center text-white/60 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <InboxIcon size={16} />
                  <p className="text-sm">Inbox</p>
                </div>
              </div>
            </header>
            <ScrollArea className="grow">
              <main className="flex flex-col grow gap-y-0.5 m-2">
                <CollapsibleLinks />
                <div className="flex gap-2 items-center text-white/40 p-2 hover:bg-white/5 duration-200 rounded-[10px] mt-4">
                  <Calendar size={16} />
                  <p className="text-sm">Calendar</p>
                  <ArrowUpRight size={16} />
                </div>
                <div className="flex gap-2 items-center text-white/40 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <Settings size={16} />
                  <p className="text-sm">Settings</p>
                </div>
                <div className="flex gap-2 items-center text-white/40 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <Shapes size={16} />
                  <p className="text-sm">Templates</p>
                </div>
                <div className="flex gap-2 items-center text-white/40 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <Trash size={16} />
                  <p className="text-sm">Trash</p>
                </div>
                <div className="flex gap-2 items-center text-white/40 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
                  <HelpCircle size={16} />
                  <p className="text-sm">Help</p>
                </div>
              </main>
            </ScrollArea>
            <footer className="flex m-2 items-center gap-2 text-sm text-white/40 p-2 hover:bg-white/5 duration-200 rounded-[10px]">
              <UserRoundPlus size={16} />
              <p>Invite members</p>
            </footer>
          </aside>
        </div>
      </div>
    </nav>
  );
};
