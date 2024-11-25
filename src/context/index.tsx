"use client";
import { createContext, useEffect, useState } from "react";
import { TContext, TNavlinks } from "../../types";
import { getPages } from "@/lib/data";

export const AppContext = createContext<TContext | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  // navlinks
  const [pages, setPages] = useState<TNavlinks[]>([]);
  const [loading, setLoading] = useState(false);

  const getPageTitle = (id: string) => {
    const title = pages.find((page) => page.id === id)?.title || "";
    return title;
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // TODO: - we need pages, setPages, when we change the pagetitle on the topbar, custompage, icons(emoji).
  //       - the changes of those the db will get updated.
  //       - use debounce

  async function fetchPages() {
    setLoading(true);
    // NOTE: for now will use this method
    const data = await getPages();
    setPages(data);
    setLoading(false);
  }
  const toggle = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <AppContext.Provider
      value={{
        show,
        setShow,
        toggle,
        toggleMenu,
        setToggleMenu,
        loading,
        pages,
        setPages,
        getPageTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
