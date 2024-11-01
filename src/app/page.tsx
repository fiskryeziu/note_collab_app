import { RecentlyCarousel } from "@/components/recently-carousel";
import { Topbar } from "@/components/top-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock3 } from "lucide-react";
import ScrollWrapper from "@/components/scroll-wrapper";

export default function Home() {
  return (
    <main className="flex grow flex-col overflow-hidden">
      <Topbar pageName="" />
      <ScrollWrapper>
        <ScrollArea className="h-full">
          <div className="mb-[2000px] flex flex-col px-20">
            <div className="flex items-center gap-2">
              <Clock3 />
              <p>Recently visited</p>
            </div>
            <RecentlyCarousel />
          </div>
        </ScrollArea>
      </ScrollWrapper>
    </main>
  );
}
