import Divider from "@/components/Divider/Divider";
import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDisclosure from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  selectDappSlippage,
  updateDappSlippage,
} from "@/redux/dapp/dapp-slice";
import { validatePercent } from "@/utils/functions/numbers";
import { useState } from "react";
const SlippageCard = () => {
  const slippage = useAppSelector(selectDappSlippage);
  const dispatch = useAppDispatch();
  const [formSlippage, setFormSlippage] = useState<string | number>(slippage);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const onSubmit = (e: any) => {
    e.preventDefault();
    //validate a number between 0 and 100

    if (validatePercent(formSlippage)) {
      dispatch(updateDappSlippage(Number(formSlippage)));
      onClose();
    }
  };

  const onChange = (slippage: string | number) => {
    setFormSlippage(slippage);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Slippage</CardTitle>
        <MyTooltip content="Set your favorite language">
          <Dialog open={isOpen} onOpenChange={onToggle}>
            <DialogTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Precision Slippage Settings</DialogTitle>
                <DialogDescription>
                  Customize slippage thresholds for seamless token swaps.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={onSubmit}>
                <div className="flex flex-col w-full gap-3">
                  <div className="text-center">
                    Select a predefined slippage
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      size={"sm"}
                      className="text-sm"
                      variant={
                        Number(formSlippage) === 1 ? "default" : "secondary"
                      }
                      onClick={() => onChange(1)}
                      type="button"
                    >
                      1%
                    </Button>
                    <Button
                      size={"sm"}
                      className="text-sm"
                      variant={
                        Number(formSlippage) === 2 ? "default" : "secondary"
                      }
                      onClick={() => onChange(2)}
                      type="button"
                    >
                      2%
                    </Button>
                    <Button
                      size={"sm"}
                      className="text-sm"
                      variant={
                        Number(formSlippage) === 3 ? "default" : "secondary"
                      }
                      onClick={() => onChange(3)}
                      type="button"
                    >
                      3%
                    </Button>
                    <Button
                      size={"sm"}
                      className="text-sm"
                      variant={
                        Number(formSlippage) === 4 ? "default" : "secondary"
                      }
                      onClick={() => onChange(4)}
                      type="button"
                    >
                      4%
                    </Button>
                    <Button
                      size={"sm"}
                      className="text-sm"
                      variant={
                        Number(formSlippage) === 5 ? "default" : "secondary"
                      }
                      onClick={() => onChange(5)}
                      type="button"
                    >
                      5%
                    </Button>
                  </div>

                  <Divider className="mb-2 mt-2" />

                  <div className="text-center">OR</div>
                  <div className="text-center">Customize slippage (in %)</div>
                  <div className="relative">
                    <div className="absolute top-0 left-4 bottom-0 h-full flex items-center text-muted-foreground">
                      Slippage:
                    </div>
                    <Input
                      className="text-right pr-12"
                      type="number"
                      value={formSlippage}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    <div className="absolute top-0 right-4 bottom-0 h-full flex items-center text-muted-foreground">
                      %
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </MyTooltip>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{slippage}%</div>
        <p className="text-xs text-muted-foreground">
          Default slippage used in the dapp
        </p>
      </CardContent>
    </Card>
  );
};

export default SlippageCard;
