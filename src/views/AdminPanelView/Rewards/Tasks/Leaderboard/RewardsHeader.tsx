const RewardsHeader = () => {
  return (
    <div className="flex items-center justify-between text-center sm:text-left sm:flex-row flex-col-reverse">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Leaderboard</h2>
        <p className="text-sm text-muted-foreground">
          User available to get rewards in next distribution
        </p>
      </div>
    </div>
  );
};

export default RewardsHeader;
