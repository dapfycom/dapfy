import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CollectRewardsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Collect rewards in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="BSK" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">BSK</SelectItem>
              <SelectItem value="dark">EGLD</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Button size={"sm"}>Collect</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectRewardsCard;
