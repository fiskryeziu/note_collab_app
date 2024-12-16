"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import clsx from "clsx";

export function RecentlyCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="group w-full"
      opts={{
        align: "start",
        slidesToScroll: 3,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 18 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[144px]">
            <div className="flex h-36 items-center justify-center border">
              {index}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={clsx(
          "opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover:opacity-100",
          current === 1 && "hidden",
        )}
      />
      <CarouselNext
        className={clsx(
          "opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover:opacity-100",
          current === count && "hidden",
        )}
      />
    </Carousel>
  );
}
