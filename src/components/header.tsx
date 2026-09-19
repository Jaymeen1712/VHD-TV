"use client";

import paths from "@/app/paths";
import Logo from "@/components/logo";
import { HEADER_TRANSPARENT, dashboardMenuItems } from "@/utils";
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
  const selectedMenuItem = pathname.split("/")[1];
  const isTransparentRoute = HEADER_TRANSPARENT.includes(
    selectedMenuItem.toLowerCase(),
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = !isTransparentRoute || isScrolled;

  const renderMenuItem = (item: (typeof dashboardMenuItems)[number]) => {
    const isActive = selectedMenuItem === item.key;
    return (
      <Link
        href={item.link}
        className={`relative py-1 text-sm font-semibold tracking-wide transition-colors hover:text-primary ${
          isActive ? "text-primary" : "text-white"
        } ${
          isActive
            ? "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
            : ""
        }`}
      >
        {item.name.toUpperCase()}
      </Link>
    );
  };

  return (
    <Navbar
      className={`top-0 z-50 transition-colors duration-300 ${
        isSolid
          ? "border-b border-white/10 bg-neutral-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/80 via-black/40 to-transparent"
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
            <Logo size={32} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden min-w-0 flex-1 md:flex">
        <NavbarItem className="w-full max-w-md">
          <Search />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        justify="end"
        className="hidden !grow-0 !basis-auto gap-8 md:flex"
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
          <NavbarMenuItem key={item.key}>{renderMenuItem(item)}</NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
