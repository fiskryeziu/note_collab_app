import { useState, useEffect, useCallback, useRef, use } from "react";
import { TContext } from "../../types";
import { AppContext } from "@/context";
import { debounce } from "@/lib/utils";
import { clear } from "console";
import { useParams } from "next/navigation";

export function useContentEditable(initialContent: string = "") {
  const [isEmpty, setIsEmpty] = useState(initialContent === "");
  const contentRef = useRef<HTMLHeadingElement>(null);

  const params = useParams<{ pageId: string }>();

  const context = use<TContext | null>(AppContext);
  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { pages, setPages } = context;

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.textContent = initialContent;
    }
    setIsEmpty(initialContent === "");
  }, [initialContent]);

  const saveToDatabase = debounce((newContent: string) => {
    console.log("Saving to DB:", newContent);
  }, 500);

  const handleInput = useCallback(() => {
    const newContent = contentRef.current?.textContent || "";
    setIsEmpty(newContent === "");

    // clean the textcontent so the cursor to be in the start
    if (newContent === "" && contentRef.current) {
      contentRef.current.textContent = "";
    }
    saveToDatabase(newContent);
    updatePageTitleById(params.pageId, newContent);
  }, []);

  const updatePageTitleById = (id: string, newTitle: string) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === id
          ? { ...page, title: newTitle === "" ? "New page" : newTitle }
          : page,
      ),
    );
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLHeadingElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    },
    [],
  );

  return { contentRef, isEmpty, handleInput, handleKeyDown };
}
