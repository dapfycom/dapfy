import { useGetGamesHistory } from "../../utils/hooks";
import HistoryTable from "../HistoryTable/HistoryTable";

const GameHistory = () => {
  const { history } = useGetGamesHistory();
  return <HistoryTable data={history} />;
};

export default GameHistory;
