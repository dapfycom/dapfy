import { Button } from "@/components/ui/button";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { TwitterIcon } from "lucide-react";

const RewardsHeader = () => {
  const { handleLogin, isAuthenticated, user, error } = useXAuthentication();
  console.log({ user, error, isAuthenticated });

  return (
    <div className="flex items-center justify-between text-center sm:text-left sm:flex-row flex-col-reverse">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Leaderboard</h2>
        <p className="text-sm text-muted-foreground">
          User points track daily.
        </p>
      </div>

      {isAuthenticated ? (
        <div className="text-center text-sm text-yellow-500 -translate-y-6 sm:translate-y-0">
          Welcome back lobby
        </div>
      ) : (
        <Button
          onClick={handleLogin}
          className="-translate-y-6 sm:translate-y-0"
        >
          <TwitterIcon className="mr-2 h-4 w-4" />
          Connect with X
        </Button>
      )}
    </div>
  );
};

export default RewardsHeader;
