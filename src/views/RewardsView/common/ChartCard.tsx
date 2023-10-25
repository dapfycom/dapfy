import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "./Chart";

const ChartCard = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Rewards tracker</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
