import {
  LegerWalletIcon,
  MaiarAppIcon,
  MaiarDefiWalletIcon,
  WebWalletIcon,
} from "@/components/ui-system/icons/ui-icons";
import { routeNames } from "@/config/routes";
import { ChevronRight, Zap } from "lucide-react";
import React, { ReactNode, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import useAuthentication from "@/hooks/useAuthentication";
import { useAppDispatch } from "@/hooks/useRedux";
import { walletConnectV2ProjectId } from "@/providers/sdk-dapp/SdkProvider";
import { openLogin } from "@/redux/dapp/dapp-slice";
import { ExtensionLoginButton } from "@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton";
import { LedgerLoginButton } from "@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton";
import { WalletConnectLoginButton } from "@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton";
import { WebWalletLoginButton } from "@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton";

const webWalletLoginComponent = (
  <div className="flex items-center gap-2 h-full">
    {" "}
    <WebWalletIcon className="text-sm" mr="14px" fontSize={"21px"} /> MultiversX
    Web Wallet{" "}
  </div>
);

const XAliasLoginComponent = (
  <div className="flex items-center gap-2 h-full">
    {" "}
    <WebWalletIcon mr="14px" fontSize={"21px"} /> XAlias{" "}
  </div>
);
const legerLoginComponent = (
  <div className="flex items-center gap-2 h-full">
    {" "}
    <LegerWalletIcon mr="14px" fontSize={"21px"} /> Ledger{" "}
  </div>
);
const mobileLoginComponent = (
  <div className="flex items-center gap-2 h-full">
    {" "}
    <MaiarAppIcon mr="14px" fontSize={"21px"} /> xPortal App{" "}
  </div>
);
const desktopLoginComponent = (
  <div className="flex items-center gap-2 h-full">
    {" "}
    <MaiarDefiWalletIcon mr="11.5px" fontSize={"23.5px"} /> MultiversX DeFi
    Wallet{" "}
  </div>
);

const placeClasess = {
  navbar: {
    button: "hidden sx:flex md:flex items-center rounded-fullpx-4",
  },
  drawer: {
    button: " items-center rounded-fullpx-4",
  },
};

interface IProps {
  place: keyof typeof placeClasess;
}

const ConnectComponent = ({ place }: IProps) => {
  const commonProps = {
    callbackRoute: routeNames.swap,
    nativeAuth: true, // optional
  };
  const dispatch = useAppDispatch();
  const { isLoginModal } = useAuthentication();
  const handleChangeModalOpen = (open: boolean) => {
    dispatch(openLogin(open));
  };
  return (
    <Dialog open={isLoginModal} onOpenChange={handleChangeModalOpen}>
      <DialogTrigger asChild>
        <Button
          style={{
            boxShadow: "0 0 0 1px white",
          }}
          size={"sm"}
          className={`relative ${placeClasess[place].button}`}
        >
          <div className=" z-[-1] blur-sm absolute top-0 left-0 right-0 bottom-0 bg-foreground hover:bg-muted-foreground"></div>
          Connect
          <Zap size={16} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <LoginMethod as={ExtensionLoginButton} {...commonProps}>
              {desktopLoginComponent}
            </LoginMethod>

            <LoginMethod
              as={WalletConnectLoginButton}
              {...commonProps}
              {...(walletConnectV2ProjectId
                ? {
                    isWalletConnectV2: true,
                  }
                : {})}
            >
              {mobileLoginComponent}
            </LoginMethod>
            <LoginMethod as={LedgerLoginButton} {...commonProps}>
              {legerLoginComponent}
            </LoginMethod>
            <LoginMethod as={WebWalletLoginButton} {...commonProps}>
              {XAliasLoginComponent}
            </LoginMethod>
          </div>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-center flex-col w-full text-sm max-w-[70%] mx-auto">
            <p className="mb-[15px]" color={"blackT.400"}>
              If you’re on desktop, try MultiversX DeFi Wallet
            </p>
            <p className="mb-6">If you’re on mobile, try xPortal App</p>

            <p className="mb-[15px]">New to MultiversX?</p>
            <a
              className="text-primary text-sm font-semibold"
              href="https://xport.al/referral/v3pqh6iqco"
              target="_blank"
            >
              Learn How to setup a wallet
            </a>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectComponent;

interface LoginMethodProps {
  children: ReactNode;
  as?: React.ElementType;
}

const LoginMethod = ({
  children,
  as: Container = "div",
  ...props
}: LoginMethodProps) => {
  useEffect(() => {
    const dappBtn = document.getElementsByClassName(
      "dapp-core-component__main__btn"
    );
    // remove all classes

    if (dappBtn && dappBtn.length > 0) {
      const listOfClasses = [
        "dapp-core-component__main__btn",
        "dapp-core-component__main__btn-primary",
        "dapp-core-component__main__px-4",
        "dapp-core-component__main__m-1",
      ];

      for (let i = 0; i < dappBtn.length; i++) {
        const element = dappBtn[i];
        for (let j = 0; j < listOfClasses.length; j++) {
          const className = listOfClasses[j];
          element.classList.remove(className);
        }
      }
    }
  }, []);
  return (
    <Button asChild id="dapp-btn-login">
      {/* <ExtensionLoginButton buttonClassName=""   /> */}
      <Container
        className="hidden"
        buttonClassName="!flex w-full justify-between py-2"
        {...props}
      >
        {children}
        <ChevronRight />
      </Container>
    </Button>
  );
};
