"use client";

import { AppContext } from "@/context";
import { FileText } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function NavbarLinks({
  name,
}: {
  name: "private" | "favorite";
}) {
  const context = use(AppContext);

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { loading, getGroupPages } = context;

  return (
    <>
      {loading && <>loading...</>}
      {getGroupPages(name).map((page) => (
        <Link
          href={page.id}
          key={page.id}
          className="flex items-center gap-2 rounded-[10px] p-2 text-white/40 duration-200 hover:bg-white/5"
        >
          {page.icon === "" ? (
            <FileText size={16} />
          ) : (
            <p className="text-xs">{page.icon}</p>
          )}
          <p className="text-sm">{page.title}</p>
        </Link>
      ))}
    </>
  );
}
