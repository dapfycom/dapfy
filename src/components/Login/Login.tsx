import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import ConnectComponent from "./ConnectComponent";
import DisconnectComponent from "./DisconnectComponent";

import { useAppDispatch } from "@/hooks/useRedux";
import { setShard, setUserAddress } from "@/redux/dapp/dapp-slice";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks";
import { useEffect } from "react";

const Login = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const dispatch = useAppDispatch();

  const { address, shard } = useGetAccountInfo();
  useEffect(() => {
    dispatch(
      setUserAddress(process.env.REACT_APP_CONNECTED_ADDRESS || address)
    );
    dispatch(setShard(shard || 1));
  }, [address, dispatch, shard]);

  return (
    <>
      {isLoggedIn ? (
        <DisconnectComponent />
      ) : (
        <ConnectComponent place="navbar" />
      )}
    </>
  );
};

export default Login;
