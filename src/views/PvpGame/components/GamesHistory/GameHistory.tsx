import { useGetGamesHistory } from "../../utils/hooks";
import HistoryTable from "../HistoryTable/HistoryTable";

const GameHistory = () => {
  const { history, isLoading } = useGetGamesHistory();
  return <HistoryTable data={history} isLoading={isLoading} />;
};

export default GameHistory;
