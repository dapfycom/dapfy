import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";

const ConnectButton = () => {
  const { handleConnect } = useAuthentication();
  return (
    <div className="text-center">
      <Button className="mx-auto" onClick={handleConnect}>
        Find my fees
      </Button>
    </div>
  );
};

export default ConnectButton;
