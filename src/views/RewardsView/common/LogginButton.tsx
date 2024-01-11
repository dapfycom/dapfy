import { Button } from "@/components/ui/button";
import { useXAuthentication } from "@/hooks/useXAuthentication";

const LoginButton = () => {
  const { isAuthenticated, handleLogin } = useXAuthentication();
  // const handleLogin = () => {
  //   toast("Coming soon", {
  //     icon: <AlertCircle className="text-yellow-500" />,
  //     position: "top-center",
  //   });
  // };

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
