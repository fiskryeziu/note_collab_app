"use client";
import { createContext, useEffect, useState } from "react";
import { TContext, TNavlinks, UpdateStateFn } from "../../types";
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

  const getPageTitle = (id: string) => {
    const page = pages.find((p) => p.id === id);

    const result = {
      cover: page?.cover ?? "",
      icon: page?.icon ?? "",
      title: page?.title ?? "",
    };
    return result;
  };

  const getGroupPages = (name: "private" | "favorite") => {
    if (name === "favorite") {
      return pages.filter((p) => p.is_favorite === true);
    }
    return pages;
  };

  const updateState: UpdateStateFn<TNavlinks> = (setState, id, prop, value) => {
    setState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, [prop]: value } : item,
      ),
    );
  };

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
        updateState,
        getGroupPages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
