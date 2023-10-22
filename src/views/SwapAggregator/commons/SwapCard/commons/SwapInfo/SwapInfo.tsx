import Divider from "@/components/Divider/Divider";

const SwapInfo = () => {
  return (
    <div className="border px-3 py-5 rounded">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">From</span>
          <span className="text-lg">0.0000</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">To</span>
          <span className="text-lg">0.0000</span>
        </div>
      </div>
      <Divider className="my-3" />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Price</span>
          <span className="text-lg">0.0000</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Price</span>
          <span className="text-lg">0.0000</span>
        </div>
      </div>
    </div>
  );
};

export default SwapInfo;
