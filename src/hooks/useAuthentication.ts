import { openLogin, selectIsLoginModal } from "@/redux/dapp/dapp-slice";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { useAppDispatch, useAppSelector } from "./useRedux";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const isOpenLoginModal = useAppSelector(selectIsLoginModal);

  const { isLoggedIn } = useGetLoginInfo();

  const handleConnect = () => {
    dispatch(openLogin(true));
  };
  const handleDisconnect = () => {
    logout("/");
  };

  return {
    isLoggedIn,
    isLoginModal: isOpenLoginModal,
    handleConnect,
    handleDisconnect,
  };
};

export default useAuthentication;
