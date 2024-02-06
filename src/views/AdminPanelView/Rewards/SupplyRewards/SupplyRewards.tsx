"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSmartContractInteraction } from "@/services/sc";
import { useFormik } from "formik";
import * as yup from "yup";
const SupplyRewards = () => {
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      getSmartContractInteraction("rewardsWsp").EGLDPayment({
        functionName: "supply",
        value: values.amount,
      });
    },

    validationSchema: yup.object().shape({
      amount: yup.string().required("Required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid w-full items-center gap-4 max-w-sm">
        <div className="flex flex-col gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            placeholder="Amount to distribute"
            onChange={formik.handleChange}
          />
        </div>
        <Button>Send</Button>
      </div>
    </form>
  );
};

export default SupplyRewards;
