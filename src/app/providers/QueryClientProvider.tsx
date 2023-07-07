"use client";

import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

function QueryClientProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 3.6e6, //1 hour
        },
      },
    })
  );

  return (
    <_QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </_QueryClientProvider>
  );
}

export default QueryClientProvider;
