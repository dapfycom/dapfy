"use client";

import { ENVIROMENT } from "@/config/network";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import dynamic from "next/dynamic";
import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList,
} from "./sdk-components";

export const DappProvider = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/wrappers/DappProvider"))
      .DappProvider;
  },
  { ssr: false }
);

export const walletConnectV2ProjectId = "a5e4dd12d896af078bd26e68295a8c94";

export default function SdkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={["https://tools.elrond.com"]}
      >
        <DappProvider
          environment={ENVIROMENT}
          customNetworkConfig={{
            name: "customConfig",
            apiTimeout: 10000,
            walletAddress: "https://xalias.com",
            walletConnectV2ProjectId,
          }}
          dappConfig={{
            shouldUseWebViewProvider: true,
          }}
        >
          <AxiosInterceptorContext.Listener />
          <TransactionsToastList className="text-black" />
          <NotificationModal />
          <SignTransactionsModals className="text-black" />
          <>{children}</>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
