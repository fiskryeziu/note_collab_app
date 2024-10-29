"use client";
import { createContext, useEffect, useState } from "react";
import { TContext, TNavlinks } from "../../types";

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
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch("http://localhost:3001/pages", {
      cache: "no-store",
    });
    const data = (await response.json()) as TNavlinks[];
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
