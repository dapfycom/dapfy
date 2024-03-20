"use client";
import Divider from "@/components/Divider/Divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { arrayToCsv } from "@/lib/csv";
import { addressIsValid } from "@/lib/utils";
import { formatAddress } from "@/utils/functions/formatAddress";
import { copyTextToClipboard } from "@/utils/functions/general";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function SelectWinners() {
  const [winners, setWinners] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState(false);

  const formik = useFormik({
    initialValues: {
      wallets: "",
      winners: "",
    },
    onSubmit: (values) => {
      const wallets = values.wallets.split(" ");
      const winners = [];
      for (let i = 0; i < Number(values.winners); i++) {
        const randomIndex = Math.floor(Math.random() * wallets.length);
        winners.push(wallets[randomIndex]);
        wallets.splice(randomIndex, 1);
      }
      setWinners(winners);
    },
    validationSchema: Yup.object().shape({
      wallets: Yup.string()
        .required("Wallets are required")
        .test("are-valid-wallets", "Invalid wallets", function (value) {
          if (!value) return false;
          const wallets = value.split(" ");
          for (let wallet of wallets) {
            if (!addressIsValid(wallet)) return false;
          }
          return true;
        }),
      winners: Yup.number()
        .required("Number of winners is required")
        .test(
          "less-than-wallets",
          "Number of winners must be less than or equal to the number of wallets",
          function (value) {
            const { wallets } = this.parent;
            const walletList = wallets.split(" ");
            return value <= walletList.length;
          }
        ),
    }),
  });

  useEffect(() => {
    // check for duplicates
    const wallets = formik.values.wallets.split(" ");
    const uniqueWallets = new Set(wallets);

    setDuplicates(uniqueWallets.size !== wallets.length);
  }, [formik.values.wallets]);

  const clearForm = () => {
    formik.resetForm();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="wallets">Wallets</Label>
              <Textarea
                className="min-h-[200px]"
                id="wallets"
                placeholder="Enter a list of wallets separated by space"
                {...formik.getFieldProps("wallets")}
              />
              <div className="mt-5">
                {formik.touched.wallets && formik.errors.wallets ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.wallets}
                  </div>
                ) : null}

                {duplicates && (
                  <div className="flex w-full justify-between items-center ">
                    <div className="text-yellow-500 text-xs">
                      Wallets contain duplicates
                    </div>

                    <Button
                      className="text-xs"
                      size={"xs"}
                      variant="outline"
                      onClick={() => {
                        const wallets = formik.values.wallets.split(" ");
                        const uniqueWallets = new Set(wallets);
                        formik.setFieldValue(
                          "wallets",
                          Array.from(uniqueWallets).join(" ")
                        );
                      }}
                    >
                      {" "}
                      Remove duplicates
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="winners">Winners</Label>
              <Input
                id="winners"
                placeholder="Number of winners"
                type="number"
                {...formik.getFieldProps("winners")}
              />
              {formik.touched.winners && formik.errors.winners ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.winners}
                </div>
              ) : null}
            </div>
            <div className="flex space-x-3">
              <Button className="flex-1" variant="outline" onClick={clearForm}>
                Clear
              </Button>
              <Button className="flex-1" type="submit">
                Select Winners
              </Button>
            </div>

            {winners.length > 0 && (
              <div className="space-y-2 mt-6">
                <div className="w-full flex justify-between items-center">
                  <Label>Lucky ones 🍀 : </Label>
                  <div className="flex gap-3">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="rounded-full text-xs"
                      onClick={() => {
                        copyTextToClipboard(winners.join(" "));
                        toast.success("Copied to clipboard");
                      }}
                    >
                      Copy All
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="rounded-full text-xs"
                      onClick={() => {
                        arrayToCsv({
                          data: winners.map((w) => ({
                            addresses: w,
                          })),
                          fileName: "winners.csv",
                        });
                      }}
                    >
                      To Csv
                    </Button>
                  </div>
                </div>
                <Divider />
                <div className="grid grid-cols-2 gap-2">
                  {winners.map((winner, index) => (
                    <Button
                      key={index}
                      variant={"ghost"}
                      className="w-fit"
                      onClick={() => {
                        copyTextToClipboard(winner);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <div>
                        {index + 1}. {formatAddress(winner)}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
