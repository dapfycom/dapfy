import Navbar from "@/components/Navbar/Navbar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  // const dispatch = useDispatch();
  // const pathname = usePathname();

  // const isLoginModal: boolean = useAppSelector(selectIsLoginModal);
  // const { address, shard } = useGetAccountInfo();
  // const { isLoggedIn } = useGetLoginInfo();

  // const location = pathname;

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(openLogin(false));
  //   }
  // }, [isLoggedIn, dispatch]);

  // useEffect(() => {
  //   dispatch(
  //     setUserAddress(process.env.REACT_APP_CONNECTED_ADDRESS || address)
  //   );
  //   dispatch(setShard(shard || 1));
  // }, [address, dispatch, shard]);

  // const showFooter =
  //   location !== routeNames.swap && location !== routeNames.swapLp;
  return (
    <div>
      <Navbar />
      {children}
      {/* {isLoginModal && <Login isLoginOpen={isLoginModal} />}
        <Box
        sx={{
          "& >div": {
            pt: "70px",
          },
        }}
        >
        {children}
        </Box>
        {showFooter && <Footer />} */}
    </div>
  );
};

export default Layout;
