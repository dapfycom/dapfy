"use client";

import { ENVIROMENT } from "@/config/network";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider";
import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList,
} from "./sdk-components";

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
            walletConnectV2ProjectId,
          }}
          dappConfig={{
            shouldUseWebViewProvider: true,
          }}
        >
          <AxiosInterceptorContext.Listener />
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className="custom-class-for-modals" />
          <>{children}</>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
