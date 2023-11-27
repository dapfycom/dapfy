import { Button } from "@/components/ui/button";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import React from "react";

const LoginButton = () => {
  const { handleLogin } = useXAuthentication();
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
