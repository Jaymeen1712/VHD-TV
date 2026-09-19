"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const AppScroll = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div
      id="app-scroll"
      ref={scrollRef}
      className="scrollbar-brand flex flex-1 flex-col overflow-y-auto"
    >
      {children}
    </div>
  );
};

export default AppScroll;
