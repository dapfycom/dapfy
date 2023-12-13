import {
  openLogin,
  selectIsLoginModal,
  selectUserAddress,
} from "@/redux/dapp/dapp-slice";
import { admins } from "@/views/AdminPanelView/data";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const isOpenLoginModal = useAppSelector(selectIsLoginModal);
  const currentAddress = useAppSelector(selectUserAddress);
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();
  console.log("tokenLogin", tokenLogin);

  const handleConnect = () => {
    dispatch(openLogin(true));
  };
  const handleDisconnect = () => {
    logout("/");
  };

  useEffect(() => {
    // set authToken on localStorage
    if (tokenLogin?.loginToken && tokenLogin.signature) {
      const authToken = tokenLogin.loginToken + ":" + tokenLogin.signature;
      localStorage.setItem("authToken", authToken);
    }
  }, [tokenLogin?.loginToken, tokenLogin?.signature]);

  return {
    isLoggedIn,
    tokenLogin,
    address: currentAddress,
    isAdmin:
      process.env.NODE_ENV !== "production" || admins?.includes(currentAddress),
    isLoginModal: isOpenLoginModal,
    handleConnect,
    handleDisconnect,
  };
};

export default useAuthentication;
