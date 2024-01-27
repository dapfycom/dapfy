import Collapse from "@/components/Collapse/Collapse";
import Loader1 from "@/components/ui-system/Loader/Loader1";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import { routeNames } from "@/config/routes";
import useDisclosure from "@/hooks/useDisclosure";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { formatAddress } from "@/utils/functions/formatAddress";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useGetXFees } from "../../lib/hooks";

const FeesCard = () => {
  const [feesAddress, setFeesAddress] = useState("");
  const userAddress = useAppSelector(selectUserAddress);
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlAddress = searchParams.get("address");
  const [price] = useGetTokenPrice(selectedNetwork.tokensID.egld);
  const { isOpen, onToggle } = useDisclosure(false);

  const { xfees, isLoading } = useGetXFees(feesAddress);
  useEffect(() => {
    if (urlAddress) {
      setFeesAddress(urlAddress);
    }
  }, [urlAddress]);

  useEffect(() => {
    if (!urlAddress) {
      router.push(routeNames.xfees + "?address=" + userAddress);
    }
  }, [router, urlAddress, userAddress]);

  const formik = useFormik({
    initialValues: {
      address: feesAddress,
    },
    validationSchema: yup.object({
      address: yup
        .string()
        .required("Address is required")
        //  should be a string like this erd1twpgwyu2hd0jrx3q2uypum8vwhgvm2jvl66nswq0lk9fe37xkddqkp92v0
        .matches(/^(erd1)[0-9a-z]{58}$/, "Invalid address"),
    }),
    onSubmit: (values) => {
      console.log("submit", values);

      router.push(routeNames.xfees + "?address=" + values.address);
    },
  });

  return (
    <div className="w-full">
      <Card className="max-w-[450px] mx-auto">
        <CardHeader>
          <CardTitle>Address : {formatAddress(feesAddress)}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader1 />
          ) : (
            <>
              <p>
                Fees:{" "}
                <span className="text-green-500"> {xfees?.xfees} EGLD</span>
              </p>
              <p>
                Dollar amount :{" "}
                <span className="text-green-500">
                  {" "}
                  {formatBalanceDollar(
                    {
                      balance: xfees?.xfees || 0,
                      decimals: 0,
                    },
                    price
                  )}{" "}
                  USD
                </span>
              </p>
              <p>
                Transactions:{" "}
                <span className="text-green-500">{xfees?.transactions}</span>
              </p>
            </>
          )}
        </CardContent>
        <Collapse isOpen={isOpen}>
          <CardFooter>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-sm">
                Your are allowed to change the fee wallet without connecting it
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="address">Other address</Label>
                  <Input
                    id="address"
                    placeholder="erd..."
                    onChange={formik.handleChange}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-700">{formik.errors.address}</p>
                  )}

                  <Button
                    type="submit"
                    size={"sm"}
                    disabled={formik.isSubmitting && !formik.isValid}
                  >
                    Change wallet
                  </Button>
                </div>
              </form>

              <Button
                className="mt-5"
                onClick={() =>
                  router.push(routeNames.xfees + "?address=" + userAddress)
                }
                variant={"secondary"}
                disabled={userAddress === feesAddress}
              >
                Use my wallet
              </Button>
            </div>
          </CardFooter>
        </Collapse>

        <div className="flex justify-center mb-4">
          <Button variant={"outline"} size={"xs"} onClick={onToggle}>
            Show {isOpen ? "Less" : "More"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FeesCard;
