import { useGetUserGamesHistory } from "../../utils/hooks";
import HistoryTable from "../HistoryTable/HistoryTable";

const UserGamesHistory = () => {
  const { history, isLoading } = useGetUserGamesHistory();
  return <HistoryTable data={history} isLoading={isLoading} />;
};

export default UserGamesHistory;
