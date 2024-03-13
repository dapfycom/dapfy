import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const PendingModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <div
          key="1"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-black text-white rounded-lg max-w-md w-full mx-4 p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4 p-2 rounded-full border-2 border-yellow-500 animate-spin-slow">
                <HourglassIcon className="h-12 w-12 text-yellow-500" />
              </div>
              <h1 className="text-xl font-semibold mb-2">
                No action required!
              </h1>
              <p className="text-lg">Your transaction is now processing...</p>
            </div>
            <p className="text-center text-sm mb-6">
              This usually takes a few moments, but can vary depending on
              network activity. Please wait patiently.
            </p>
            <Button className="w-full " onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PendingModal;

function HourglassIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  );
}
