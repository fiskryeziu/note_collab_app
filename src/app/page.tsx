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
          <div className="mb-[2000px] mt-20 flex flex-col gap-10 px-20">
            <div className="mx-auto">
              <h1 className="text-3xl font-bold">Good Afternoon, User</h1>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-white/40">
                <Clock3 size={14} />
                <p className="text-xs">Recently visited</p>
              </div>
              <RecentlyCarousel />
            </div>
          </div>
        </ScrollArea>
      </ScrollWrapper>
    </main>
  );
}
