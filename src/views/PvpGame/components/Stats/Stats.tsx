import Collapse from "@/components/Collapse/Collapse";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useDisclosure from "@/hooks/useDisclosure";
import { formatBalance } from "@/utils/functions/formatBalance";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useStatsGAmes } from "../../utils/hooks";

const Stats = () => {
  const { stats, error, isLoading } = useStatsGAmes();
  const { isOpen, onToggle } = useDisclosure();

  const egldVolume = stats.volume.find((v) => v.token === "EGLD");
  return (
    <div className="my-4 ">
      <Collapse isOpen={isOpen}>
        <Card className="w-full max-w-3xl">
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">
                      Games Played
                    </TableCell>
                    <TableCell>{stats.gamesPlayed}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">
                      Total Volume
                    </TableCell>
                    <TableCell>
                      {formatBalance({
                        balance: egldVolume?.amount || 0,
                      })}{" "}
                      EGLD
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Total Users</TableCell>
                    <TableCell>{stats.total_users}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Collapse>

      <div className="flex justify-center mt-4">
        <Button variant={"outline"} onClick={onToggle} className="flex">
          {isOpen ? (
            <span className="flex items-center mr-1">
              <ChevronUp />
              Hide
            </span>
          ) : (
            <span className="flex items-center mr-1">
              <ChevronDown /> Show
            </span>
          )}{" "}
          Statistics
        </Button>
      </div>
    </div>
  );
};

export default Stats;
