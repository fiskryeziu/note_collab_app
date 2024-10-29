"use client";

import { AppContext } from "@/context";
import Link from "next/link";
import { use } from "react";

export default function NavbarLinks() {
  const context = use(AppContext);

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { loading, pages } = context;

  return (
    <ul className="navbar-links flex flex-col">
      {loading && <>loading...</>}
      {pages.map((page) => (
        <Link href={page.slug} key={page.id}>
          {page.title}
        </Link>
      ))}
    </ul>
  );
}
