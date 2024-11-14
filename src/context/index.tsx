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

  useEffect(() => {
    fetchPages();
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
