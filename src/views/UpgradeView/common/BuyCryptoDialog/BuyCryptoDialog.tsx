"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import axiosDapfy from "@/services/rest/dapfy-api";
import { useFormik } from "formik";
import * as Yup from "yup";

// zod schema
const schema = Yup.object().shape({
  amount: Yup.number().required("Required"),
});
function BuyCryptoDialog() {
  const address = useAppSelector(selectUserAddress);
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      const { data } = await axiosDapfy.post<{ url: string }>("/upgrade", {
        address: address,
        amount: Number(values.amount),
      });

      window.location.href = data.url;
    },
    validationSchema: schema,
  });

  return (
    <div className="w-full">
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex w-full justify-center mb-5">
              <Input
                className="mt-2 w-full max-w-[350px]"
                id="amount"
                placeholder={"Enter amount here, e.g. $300"}
                name="amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
            </div>
            <div className="w-full flex justify-center ">
              <Slider
                className="max-w-[450px]"
                value={[Number(formik.values.amount)]}
                onValueChange={(value) =>
                  formik.setFieldValue("amount", value[0])
                }
                max={1000}
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
      </div>
    </div>
  );
}

export default BuyCryptoDialog;
