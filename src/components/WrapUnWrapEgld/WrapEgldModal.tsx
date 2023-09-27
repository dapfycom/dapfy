import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  selectIsWrapEgldOpen,
  setIsWrapEgldOpen,
} from "@/redux/dapp/dapp-slice";
import store from "@/redux/store";
import { getSmartContractInteraction } from "@/services/sc";
import {
  formatBalance,
  setElrondBalance,
} from "@/utils/functions/formatBalance";
import { getWspOfWrapedEgld } from "@/utils/functions/sc";
import BigNumber from "bignumber.js";
import { useState } from "react";

export function WrapEgldModal() {
  const isOpen = useAppSelector(selectIsWrapEgldOpen);
  const dispatch = useAppDispatch();
  const { accountToken: egldtoken } = useGetAccountToken(
    selectedNetwork.tokensID.egld
  );

  const [amount, setAmount] = useState<BigNumber | null>(null);

  const onToggle = () => {
    dispatch(setIsWrapEgldOpen(!isOpen));
  };

  const handleMax = () => {
    setAmount(new BigNumber(egldtoken.balance));
  };

  const handleSubmit = () => {
    if (amount) {
      const shard = store.getState().dapp.shard;
      const wrapedWsp = getWspOfWrapedEgld(shard);
      getSmartContractInteraction(wrapedWsp).EGLDPayment({
        functionName: "wrapEgld",
        realValue: amount,
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wrap yout EGLD here</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-end">
              <Label htmlFor="amount">
                Blance : {formatBalance(egldtoken)} EGLD
              </Label>
            </div>
            <div className="relative">
              <Input
                id="amount"
                placeholder="0.0"
                className="col-span-3 pr-16"
                value={
                  amount !== null
                    ? formatBalance(
                        {
                          balance: amount,
                          decimals: 18,
                        },
                        true
                      )
                    : ""
                }
                onChange={(e) => {
                  setAmount(
                    new BigNumber(setElrondBalance(Number(e.target.value), 18))
                  );
                }}
              />

              <div className="top-0 bottom-0 right-3 absolute h-full flex items-center">
                <Button
                  className="text-xs w-fit "
                  size={"xs"}
                  onClick={handleMax}
                >
                  MAX
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Wrap
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
