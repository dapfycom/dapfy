const Stats = () => {
  return (
    <div className="p-4 rounded-lg mb-4 text-center">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-bold">Total Games Played</p>
          <p className="text-lg font-semibold">245</p>
        </div>
        <div>
          <p className="text-2xl font-bold">Total Volume</p>
          <p className="text-lg font-semibold">120 EGLD</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
