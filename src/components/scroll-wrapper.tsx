"use client";
import React, { use } from "react";
import { TContext } from "../../types";
import { AppContext } from "@/context";
import clsx from "clsx";

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const context = use<TContext | null>(AppContext);
  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { toggleMenu } = context;
  return (
    <div
      className={clsx(
        "absolute h-full max-w-full shrink grow-0",
        toggleMenu ? "w-full" : "w-[calc(100%-240px)]",
      )}
    >
      {children}
    </div>
  );
};

export default ScrollWrapper;
