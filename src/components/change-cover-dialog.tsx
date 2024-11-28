import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "./custom-pages/custom-pages-input";
import Image from "next/image";
import { TControl } from "../../types";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { updatePageCover } from "@/lib/data";

type controlState = React.Dispatch<React.SetStateAction<TControl>>;
export function ChangeCover({
  setControlData,
}: {
  setControlData: controlState;
}) {
  const [open] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const params = useParams<{ pageId: string }>();

  useEffect(() => {
    if (pRef.current) {
      const rect = pRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.bottom, left: rect.left });
    }
  }, [open]);

  const changeImage = async (cover: string) => {
    setControlData((prev) => ({ ...prev, cover }));
    await updatePageCover(params.pageId, cover);
  };
  const removeImage = async () => {
    setControlData((prev) => ({ ...prev, cover: "" }));
    await updatePageCover(params.pageId, "");
  };
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
            <Button size="sm" variant="ghost" onClick={removeImage}>
              remove
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          {IMAGES.map((img, idx) => (
            <div key={idx} onClick={() => changeImage(img)}>
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
