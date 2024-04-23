import useAuthentication from "@/hooks/useAuthentication";
import { Button, ButtonProps } from "../ui/button";

const RequiredLoginButton = ({ ...props }: ButtonProps) => {
  const { handleConnect, isLoggedIn } = useAuthentication();
  const handleClick = (e: any) => {
    if (isLoggedIn && props.onClick) {
      props.onClick(e);
    } else {
      handleConnect();
    }
  };
  return (
    <Button {...props} onClick={(e) => handleClick(e)}>
      Purchase
    </Button>
  );
};

export default RequiredLoginButton;
