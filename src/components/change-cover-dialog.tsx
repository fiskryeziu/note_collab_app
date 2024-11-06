"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

export function ChangeCover() {
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
        className="absolute right-0 top-0 sm:max-w-[425px]"
        style={{
          top: `${buttonPosition.top}px`,
          right: `${buttonPosition.left}px`,
          transform: "translateY(10px)",
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>photos here</div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
