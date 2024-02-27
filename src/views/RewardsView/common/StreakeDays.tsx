import { useGetStreak } from "../lib/hooks";

export default function StreakDays() {
  const { userStreak, error } = useGetStreak();

  if (userStreak === 0 || error) {
    return null;
  }
  return (
    <div className="flex items-center justify-center w-full  rounded-lg  my-[-10px]">
      <div className="grid grid-cols-1 items-center gap-4 text-center">
        <div className="flex items-center justify-center">
          <span className="text-8xl font-extrabold leading-none tracking-tighter gradienteTitle">
            {userStreak}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1.5">
          <span className="text-xl font-medium ">Streak Days</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Keep it up! You&apos;re on a roll.
          </span>
        </div>
      </div>
    </div>
  );
}
