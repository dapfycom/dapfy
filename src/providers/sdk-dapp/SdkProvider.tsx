"use client";

import { ENVIROMENT } from "@/config/network";
import { routeNames } from "@/config/routes";
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

export const walletConnectV2ProjectId = "38bf422714d35fca269a4d5ca11cf809";

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
            walletConnectV2ProjectId,
          }}
          dappConfig={{
            shouldUseWebViewProvider: true,
            logoutRoute: routeNames.rewards,
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
