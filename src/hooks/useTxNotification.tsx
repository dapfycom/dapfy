import { useToast } from "@/components/ui/use-toast";
import { externnalLinks } from "@/config/routes";

const useTxNotification = () => {
  const { toast } = useToast();
  const handleToast = () => {
    toast({
      description: (
        <span>
          💡 Like, comment and retweet{" "}
          <a href={externnalLinks.twitter}>@dapfycom</a> posts on X to be
          eligible for rewards!
        </span>
      ),
    });
  };
  return {
    toastTxNotification: handleToast,

    delayedToastTxNotification: (delay: number = 2000) => {
      setTimeout(() => {
        handleToast();
      }, delay);
    },
  };
};

export default useTxNotification;
