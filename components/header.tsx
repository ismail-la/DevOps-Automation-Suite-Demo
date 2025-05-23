"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, LayoutDashboard, Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Provisioning",
    path: "/provision",
    icon: <Cloud className="mr-2 h-4 w-4" />,
  },
  {
    name: "Pipeline Status",
    path: "/status",
    icon: <Activity className="mr-2 h-4 w-4" />,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
];

export default function Header() {
  const pathname = usePathname() || ""; // Fallback to an empty string
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              DevOps Suite
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === route.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === route.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
