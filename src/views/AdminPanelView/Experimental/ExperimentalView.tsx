"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectIsStreakModal, setIsStreakModal } from "@/redux/dapp/dapp-slice";

const ExperimentalView = () => {
  const dispatch = useAppDispatch();
  const isStreakModal = useAppSelector(selectIsStreakModal);
  const handleClick = () => {
    dispatch(setIsStreakModal(!isStreakModal));
  };
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <div className="border-none p-0 outline-none  h-full flex  flex-col  w-full">
        <div>
          <Button onClick={handleClick}>
            {isStreakModal ? "Hide " : "Show "}Strike Dialog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperimentalView;
