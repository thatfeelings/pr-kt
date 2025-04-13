'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const TanStackProvider = ({ children }) => {
  const [queryClient] = useState(() => {
    // Initialize the Query Client with default options
    return new QueryClient({
      defaultOptions: {
        queries: { 
          cacheTime: Infinity, // ✅ Keeps cache forever until manually invalidated
          staleTime: Infinity, // ✅ Prevents unnecessary refetching
          refetchOnWindowFocus: false, // ✅ Avoid refetching when user switches tabs
        },
      },
    });
  });

  useEffect(() => {
    // Ensure persistence setup only runs in the browser
    if (typeof window !== "undefined") {
      const persister = createSyncStoragePersister({
        storage: window.localStorage, // Use localStorage for persistence
      });

      persistQueryClient({
        queryClient, // Attach persistence to the Query Client
        persister,   // Use localStorage to save query cache
        maxAge: 1000 * 60 * 60 * 24, // Keep cache for 24 hours
      });
    }
  }, [queryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanStackProvider;
