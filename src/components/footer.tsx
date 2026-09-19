import Link from "next/link";
import { dashboardMenuItems } from "@/utils";
import Logo from "./logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-10">
      <div className="page-shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <Logo className="justify-start" />
            <p className="text-sm text-white/50">
              Browse movies &amp; TV series.
            </p>
          </div>
          <nav className="flex flex-col gap-2 sm:items-end">
            {dashboardMenuItems.map((item) => (
              <Link
                key={item.key}
                href={item.link}
                className="text-sm text-white/70 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} VHD TV</span>
          <span>Powered by TMDB</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
