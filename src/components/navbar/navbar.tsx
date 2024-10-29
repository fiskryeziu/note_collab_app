"use client";
import React, { use } from "react";
import { ChevronDown, ChevronsLeft, SquarePen } from "lucide-react";
import NavbarLinks from "./navbar-links";
import clsx from "clsx";
import { AppContext } from "@/context";
import { TContext } from "../../../types";

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
              "bg-sidebar w-60  flex justify-between flex-col ease duration-200 transition-all h-full max-h-full",
              toggleMenu && "max-h-[calc(-118px+100vh)] translate-y-[60px]",
              toggleMenu && !show
                ? "translate-x-[-220px] opacity-0"
                : "visible opacity-100 ",
              toggleMenu && "translate-y-0",
            )}
            onMouseEnter={() => setShow(true)}
          >
            <header className="flex m-2 items-center">
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
            </header>
            <main className="flex flex-col">
              <NavbarLinks />
            </main>
            <footer></footer>
          </aside>
        </div>
      </div>
    </nav>
  );
};
