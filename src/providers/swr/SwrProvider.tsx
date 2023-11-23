"use client";
import React, { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const SwrProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          console.log("error", error);
          console.log("key", key);

          if (error.status === 404) return;
          if (retryCount >= 3) return;
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
