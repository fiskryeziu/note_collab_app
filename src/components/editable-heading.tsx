"use client";
import { useContentEditable } from "@/hooks/useContentEditable";
import React, { use } from "react";
import { TContext } from "../../types";
import { AppContext } from "@/context";
import { useParams, usePathname } from "next/navigation";

interface HeadingProps {
  placeholder?: string;
  initialContent?: string;
  className?: string;
}

export function EditableHeading({
  placeholder = "Untitled",
  initialContent = "",
  className = "",
}: HeadingProps) {
  const context = use<TContext | null>(AppContext);
  const params = useParams<{ pageId: string }>();

  if (!context) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { getPageTitle } = context;

  const initialTitle = getPageTitle(params.pageId);

  const { contentRef, isEmpty, handleInput, handleKeyDown } =
    useContentEditable(
      (initialTitle === "New page" ? undefined : initialTitle) ??
        initialContent,
    );

  return (
    <h1
      ref={contentRef}
      contentEditable
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={`text-4xl font-bold outline-none ${
        isEmpty ? "text-gray-400 before:content-[attr(data-placeholder)]" : ""
      } ${className}`}
      data-placeholder={placeholder}
      suppressContentEditableWarning
    />
  );
}
