"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000, refetchOnWindowFocus: false, retry: 1 },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#dcfce7" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fee2e2" } },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
