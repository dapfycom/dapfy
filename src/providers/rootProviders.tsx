import ReduxProvider from "./redux/ReduxProvider";
import SdkProvider from "./sdk-dapp/SdkProvider";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <SdkProvider>{children}</SdkProvider>
    </ReduxProvider>
  );
}
