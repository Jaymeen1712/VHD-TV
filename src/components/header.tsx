"use client";

import paths from "@/app/paths";
import Logo from "@/components/logo";
import { dashboardMenuItems } from "@/utils";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./search/search";

const Header = () => {
  const pathname = usePathname();
  const selectedMenuItem = pathname.split("/")[1]?.toLowerCase();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const scrollEl = document.getElementById("app-scroll");
    if (!scrollEl) return;

    const handleScroll = () => setIsScrolled(scrollEl.scrollTop > 20);
    handleScroll();
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMenuItem = (item: (typeof dashboardMenuItems)[number]) => {
    const isActive = item.activeSegments.includes(selectedMenuItem);
    return (
      <Link
        href={item.link}
        className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
          isActive
            ? "bg-primary/15 text-primary"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <Navbar
      className={`isolate z-50 shrink-0 backdrop-blur-xl transition-colors duration-300 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-[#2a8085]/20 before:to-transparent before:content-[''] ${
        isScrolled
          ? "border-b border-white/10 !bg-neutral-950/80 shadow-lg shadow-black/20"
          : "border-b border-transparent !bg-neutral-950/25"
      }`}
      classNames={{ wrapper: "page-shell !px-(--shell-x)" }}
      height="72px"
      position="sticky"
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start" className="!grow-0 !basis-auto">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href={paths.home()}>
            <Logo size={40} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden min-w-0 flex-1 md:flex">
        <NavbarItem className="w-full max-w-2xl lg:max-w-3xl">
          <Search />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        justify="end"
        className="hidden !grow-0 !basis-auto gap-2 md:flex"
      >
        {dashboardMenuItems.map((item) => (
          <NavbarItem key={item.key}>{renderMenuItem(item)}</NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="!px-(--shell-x) gap-6 bg-neutral-950/95 pt-6 backdrop-blur-md">
        <NavbarMenuItem>
          <Search />
        </NavbarMenuItem>
        {dashboardMenuItems.map((item) => (
          <NavbarMenuItem key={item.key} className="w-fit">
            {renderMenuItem(item)}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
