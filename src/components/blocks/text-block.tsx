"use client";
import clsx from "clsx";
import React, { useRef, useEffect, useState } from "react";

interface TextBlockProps {
  data: { content: string };
}

// TODO: https://www.blocknotejs.org/docs/editor-basics/default-schema#heading
const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pRef.current) {
      pRef.current.textContent = data.content || ""; // Set initial content
    }
  }, [data.content]);

  const handleInput = () => {
    if (pRef.current) {
      const isEmpty = pRef.current.textContent?.trim() === "";
      setShow(isEmpty);
      data.content = pRef.current.textContent || ""; // Update content dynamically
    }
  };

  return (
    <p
      ref={pRef}
      contentEditable
      onInput={handleInput}
      suppressContentEditableWarning
      className={clsx("outline-none relative", show ? "empty" : "")}
    ></p>
  );
};

export default TextBlock;
