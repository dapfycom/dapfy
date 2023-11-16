import {
  openLogin,
  selectIsLoginModal,
  selectUserAddress,
} from "@/redux/dapp/dapp-slice";
import { admins } from "@/views/AdminPanelView/data";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { useAppDispatch, useAppSelector } from "./useRedux";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const isOpenLoginModal = useAppSelector(selectIsLoginModal);
  const currentAddress = useAppSelector(selectUserAddress);
  const { isLoggedIn } = useGetLoginInfo();

  const handleConnect = () => {
    dispatch(openLogin(true));
  };
  const handleDisconnect = () => {
    logout("/");
  };

  return {
    isLoggedIn,
    isAdmin: admins?.includes(currentAddress),
    isLoginModal: isOpenLoginModal,
    handleConnect,
    handleDisconnect,
  };
};

export default useAuthentication;
