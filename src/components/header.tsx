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
import { useState } from "react";
import Search from "./search/search";

const Header = () => {
  const pathname = usePathname();
  const selectedMenuItem = pathname.split("/")[1]?.toLowerCase();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  const renderMenuItem = (item: (typeof dashboardMenuItems)[number]) => {
    const isActive = item.activeSegments.includes(selectedMenuItem);
    return (
      <Link
        href={item.link}
        className={`text-sm font-semibold tracking-wide transition-colors ${
          isActive ? "text-primary" : "text-white hover:text-primary"
        }`}
      >
        {item.name.toUpperCase()}
      </Link>
    );
  };

  return (
    <Navbar
      className="!bg-neutral-950/80 isolate z-50 fixed border-b border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl backdrop-saturate-150"
      classNames={{ wrapper: "px-(--shell-x)" }}
      height="var(--header-h)"
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
        <NavbarBrand className="justify-center">
          <Link href={paths.home()}>
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden min-w-0 flex-1 md:flex">
        <NavbarItem className="w-full max-w-[750px]">
          <Search />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        justify="end"
        className="hidden !grow-0 !basis-auto gap-12 md:flex"
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
