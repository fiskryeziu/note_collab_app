"use client";

import { AppContext } from "@/context";
import { Settings } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function NavbarLinks() {
  const context = use(AppContext);

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { loading, pages } = context;

  return (
    <>
      {loading && <>loading...</>}
      {pages.map((page) => (
        <Link
          href={page.id}
          key={page.id}
          className="flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5"
        >
          <Settings size={16} />
          <p className="text-sm">{page.title}</p>
        </Link>
      ))}
    </>
  );
}
