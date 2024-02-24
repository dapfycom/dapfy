import { externnalLinks } from "@/config/routes";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const useTxNotification = () => {
  const handleToast = () => {
    const toastId = toast.success(
      <div className="relative">
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
        </span>
        <div
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => toast.dismiss(toastId)}
        >
          <X fontSize={"14px"} size={"16px"} />
        </div>
      </div>,
      {
        duration: 6000000,
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
