'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const TanStackProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { 
        cacheTime: Infinity, // ✅ Keeps cache forever until manually invalidated
        staleTime: Infinity, // ✅ Prevents unnecessary refetching
        refetchOnWindowFocus: false, // ✅ Avoid refetching when user switches tabs
      },
    },
  }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
export default TanStackProvider;