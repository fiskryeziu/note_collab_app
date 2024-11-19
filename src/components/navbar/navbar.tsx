"use client";
import React, { use } from "react";
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
        "pointer-events-none relative z-50 shrink-0 grow-0 transition-all duration-200",
        toggleMenu ? "w-0" : "w-60",
      )}
    >
      <div className="absolute bottom-0 left-0 top-0 flex flex-col">
        <div
          className={clsx(
            "pointer-events-auto relative flex h-full w-60 flex-col ",
          )}
          onMouseLeave={() => setShow(false)}
        >
          <aside
            className={clsx(
              "ease flex w-60 flex-col bg-sidebar transition-all duration-200",
              toggleMenu
                ? "max-h-[calc(-118px+100vh)]  translate-y-[60px]"
                : "h-full max-h-full translate-y-0",
              toggleMenu && !show
                ? "translate-x-[-220px] opacity-0"
                : "translate-x-0 opacity-100 ",
            )}
            onMouseEnter={() => setShow(true)}
          >
            <header className="m-2 flex flex-col">
              <div className="flex items-center p-2">
                <div className="flex items-center gap-2 text-sm">
                  <p className="h-5 w-5 rounded-sm bg-white/10 text-center text-white/40">
                    F
                  </p>
                  <p>{`Fiss's`} Notion</p>

                  <ChevronDown size={14} className="text-white/40" />
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <ChevronsLeft
                    className={clsx(
                      "cursor-pointer text-white/40",
                      show ? "visible" : "invisible",
                      toggleMenu && "invisible",
                    )}
                    onClick={() => toggle()}
                  />
                  <SquarePen size={16} className="text-white/80" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/60 duration-200 hover:bg-white/5">
                  <Search size={16} />
                  <p className="text-sm">Search</p>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/60 duration-200 hover:bg-white/5">
                  <Bot size={16} />
                  <p className="text-sm">Notion AI</p>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/60 duration-200 hover:bg-white/5">
                  <Shapes size={16} />
                  <p className="text-sm">Templates</p>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-[10px] p-2 text-white/60 duration-200 hover:bg-white/5"
                >
                  <HomeIcon size={16} />
                  <p className="text-sm">Home</p>
                </Link>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/60 duration-200 hover:bg-white/5">
                  <InboxIcon size={16} />
                  <p className="text-sm">Inbox</p>
                </div>
              </div>
            </header>
            <ScrollArea className="grow">
              <main className="m-2 flex grow flex-col gap-y-0.5">
                <CollapsibleLinks />
                <div className="mt-4 flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5">
                  <Calendar size={16} />
                  <p className="text-sm">Calendar</p>
                  <ArrowUpRight size={16} />
                </div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5">
                  <Settings size={16} />
                  <p className="text-sm">Settings</p>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5">
                  <Shapes size={16} />
                  <p className="text-sm">Templates</p>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5">
                  <Trash size={16} />
                  <p className="text-sm">Trash</p>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5">
                  <HelpCircle size={16} />
                  <p className="text-sm">Help</p>
                </div>
              </main>
            </ScrollArea>
            <footer className="m-2 flex items-center gap-2 rounded-[10px] p-2 text-sm text-white/40 duration-200 hover:bg-white/5">
              <UserRoundPlus size={16} />
              <p>Invite members</p>
            </footer>
          </aside>
        </div>
      </div>
    </nav>
  );
};
