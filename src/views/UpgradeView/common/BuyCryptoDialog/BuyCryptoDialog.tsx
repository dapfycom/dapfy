"use client";
import { LoaderV2 } from "@/components/ui-system/Loader/Loader1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import axiosDapfy from "@/services/rest/dapfy-api";
import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";
import * as Yup from "yup";
// zod schema
const schema = Yup.object().shape({
  amount: Yup.number()
    .max(5000, "The maximun amount allowed is $5000")
    .min(1, "The minimun amount allowed is $1")
    .required("Required"),
});
function BuyCryptoDialog() {
  const { trigger, isMutating } = useSWRMutation(
    "/upgrade",
    async (url, { arg }: { arg: { values: { amount: number } } }) => {
      const { data } = await axiosDapfy.post<{ url: string }>(url, {
        address: address,
        amount: arg.values.amount,
      });

      return data;
    }
  );
  const address = useAppSelector(selectUserAddress);
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      const data = await trigger({
        values: {
          amount: Number(values.amount),
        },
      });

      window.location.href = data.url;
    },
    validationSchema: schema,
  });

  return (
    <div className="w-full">
      <div>
        {isMutating ? (
          <div className="text-center">
            <LoaderV2 iconSize="40px" />
            <p className=" mt-2 text-muted-foreground">
              We are processing your info. <br /> You will be redirected to
              Stripe to complete your payment
            </p>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex w-full justify-center mb-5">
                <div>
                  <Input
                    className="mt-2 w-full max-w-[350px]"
                    id="amount"
                    placeholder={"Enter amount here, e.g. $300"}
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                  />
                  {formik.errors.amount && formik.touched.amount && (
                    <p className="text-sm text-red-600 mt-1">
                      {formik.errors.amount}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center ">
                <Slider
                  className="max-w-[450px]"
                  value={[Number(formik.values.amount)]}
                  onValueChange={(value) =>
                    formik.setFieldValue("amount", value[0])
                  }
                  max={5000}
                  step={1}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="gradient-wave  text-white text-lg"
              size={"lg"}
              disabled={!address}
            >
              Upgrade to Premium ✨
            </Button>{" "}
          </form>
        )}
      </div>
    </div>
  );
}

export default BuyCryptoDialog;
