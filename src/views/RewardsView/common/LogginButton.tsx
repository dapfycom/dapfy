import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const LoginButton = () => {
  const { isLoggedIn, handleConnect } = useAuthentication();
  const { isAuthenticated, handleLogin: loginWithX } = useXAuthentication();
  const handleLogin = () => {
    if (isLoggedIn) {
      loginWithX();
    } else {
      toast("Connect your wallet to continue", {
        icon: <AlertCircle className="text-yellow-500" />,
        position: "top-center",
      });
      handleConnect();
    }
  };

  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="flex justify-center">
      <Button
        className="rounded-full max-w-[300px] w-full h-16"
        onClick={handleLogin}
      >
        Log in with X / Twitter
      </Button>
    </div>
  );
};

export default LoginButton;
