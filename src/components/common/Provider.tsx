"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocialAutoLinkProvider } from "@/context/SocialAutoLinkContext";
import { Toaster } from "sonner";
export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <SocialAutoLinkProvider>{children}  <Toaster position="top-center"/></SocialAutoLinkProvider>
      </QueryClientProvider>
    </>
  );
}
