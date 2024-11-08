"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "./custom-pages/custom-pages-input";
import Image from "next/image";
import { TControl } from "../../types";
import { Button } from "./ui/button";

type controlState = React.Dispatch<React.SetStateAction<TControl>>;
export function ChangeCover({
  setControlDataAction,
}: {
  setControlDataAction: controlState;
}) {
  const [open, setOpen] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (pRef.current) {
      const rect = pRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.bottom, left: rect.left });
    }
  }, [open]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p ref={pRef}>Change cover</p>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        style={{
          top: `${buttonPosition.top}px`,
          right: `${buttonPosition.left}px`,
          transform: "translateY(10px)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>Images</div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setControlDataAction((prev) => ({ ...prev, img: "" }))
              }
            >
              remove
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          {IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setControlDataAction((prev) => ({ ...prev, img }))}
            >
              <Image
                src={img}
                priority
                alt="banner image"
                width={500}
                height={500}
                className="h-20 w-20 object-cover"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
