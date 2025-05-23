"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side rendering: initial state
  const [mounted, setMounted] = useState(false);

  // Only run once on the client after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initial render (server-side): return a minimal, stable UI
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-16 border-b"></div> {/* Header placeholder */}
        <main className="flex-1">{children}</main>
        <div className="border-t py-6"></div> {/* Footer placeholder */}
      </div>
    );
  }

  // Client-side render (after hydration)
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer
          className="border-t bg-background py-6"
          suppressHydrationWarning
        >
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} DevOps Automation Suite. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
