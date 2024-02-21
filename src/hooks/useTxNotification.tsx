import { externnalLinks } from "@/config/routes";
import toast from "react-hot-toast";

const useTxNotification = () => {
  const handleToast = () => {
    toast.success(
      <span>
        💡 Like, comment and retweet{" "}
        <a
          href={externnalLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          @dapfycom
        </a>{" "}
        posts on X to be eligible for rewards!
      </span>,
      {
        duration: 10000,
      }
    );
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
