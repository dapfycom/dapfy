"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { selectIsStreakModal, setIsStreakModal } from "@/redux/dapp/dapp-slice";
import { useGetStreak } from "@/views/RewardsView/lib/hooks";
import { CheckCircle2, Flame, Gem } from "lucide-react";
import Image from "next/image";
import Realistic from "../Conffeti/Realistic";

export function StrikeModal({}: {}) {
  const dispatch = useAppDispatch();
  const isStreakActive = useAppSelector(selectIsStreakModal);
  const { userStreak, error, isLoading } = useGetStreak();

  return (
    <>
      {isStreakActive && (
        <>
          <Realistic />
          <Dialog
            open={isStreakActive}
            onOpenChange={(open) => dispatch(setIsStreakModal(open))}
          >
            <DialogContent className="sm:max-w-[425px] text-center px-10">
              <div className="w-full flex justify-center mt-6">
                <div
                  style={{
                    background:
                      "radial-gradient(circle, rgba(143,93,10,1) 0%, rgba(84,64,8,1) 0%, rgba(23,17,1,1) 82%)",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: "2px solid rgba(255, 255, 255, 0.25)",
                  }}
                  className="p-3  rounded-2xl"
                >
                  <Image
                    src={"/images/flame.png"}
                    alt="flame"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
              <div>Streak Activated!</div>

              <div className="text-muted-foreground text-xs">
                Awesome job, you have ignited your first streak, The longer you
                keep it up, the better the rewards.
              </div>

              <div className="flex w-full justify-between relative my-10">
                <div className="h-[3px] bg-gray-500 w-full absolute top-[50%] -translate-y-1/2 -z-10"></div>
                <StreakItem
                  active={userStreak >= 1}
                  bottomComponent={
                    <span className="flex">
                      <CheckCircle2
                        className="mr-1 text-green-500"
                        size={"13px"}
                      />{" "}
                      activated
                    </span>
                  }
                  topText="Day 1"
                />
                <StreakItem
                  active={userStreak >= 7}
                  topText="Day 7"
                  bottomComponent={
                    <span className="flex">
                      <Gem className="mr-1 text-purple-500" size={"13px"} />
                      5%
                    </span>
                  }
                />
                <StreakItem
                  active={userStreak >= 14}
                  topText="Day 14"
                  bottomComponent={
                    <span className="flex">
                      <Gem className="mr-1 text-purple-500" size={"13px"} />
                      10%
                    </span>
                  }
                />
                <StreakItem
                  active={userStreak >= 30}
                  topText="Day 30"
                  bottomComponent={
                    <span className="flex">
                      <Gem className="mr-1 text-purple-500" size={"13px"} />
                      20%
                    </span>
                  }
                />
              </div>
              <div className="text-sm text-gray-300">
                🤩 Congrats, you have activated Streaks
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

interface IStreakItemProps {
  active?: boolean;
  topText: string;
  bottomComponent: React.ReactNode;
}
const StreakItem = ({ active, bottomComponent, topText }: IStreakItemProps) => {
  const activeClasses = active
    ? "bg-orange-400 text-white"
    : "bg-gray-900 text-gray-600";
  return (
    <div>
      <div
        className={cn(
          "relative p-2  rounded-full flex justify-center items-center",
          activeClasses
        )}
      >
        <div className="absolute -top-5 left-[50%] -translate-x-1/2 text-xs whitespace-nowrap">
          {topText}
        </div>
        <div className="text-gray-300 flex items-center px-[4px] py-[2px] rounded-md bg-[rgba(31,31,31,0.95)] absolute -bottom-7 left-[50%] -translate-x-1/2 text-[10px] whitespace-nowrap">
          {bottomComponent}
        </div>
        <Flame />
      </div>
    </div>
  );
};
