"use client";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import axiosDapfy from "@/services/rest/dapfy-api";
import { formatAddress } from "@/utils/functions/formatAddress";
import { useFormik } from "formik";
import * as Yup from "yup";
// zod schema
const schema = Yup.object().shape({
  address: Yup.string().required("Required"),
  amount: Yup.number().required("Required"),
});
function BuyCryptoDialog() {
  const formik = useFormik({
    initialValues: {
      address: "",
      amount: "",
    },
    onSubmit: async (values) => {
      const { data } = await axiosDapfy.post<{ url: string }>("/upgrade", {
        address: values.address,
        amount: Number(values.amount),
      });

      window.location.href = data.url;
    },
    validationSchema: schema,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gradient-wave my-16 text-white text-lg" size={"lg"}>
          Upgrade to Premium ✨
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>How much you want?</DialogTitle>
            <DialogDescription>
              You can upgrade in seconds with any amount you want
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="address">Your erd address</Label>
              <Input
                className="mt-2"
                id="address"
                placeholder={formatAddress(
                  "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn"
                )}
                name="address"
                onChange={formik.handleChange}
              />
            </div>
            <div className="">
              <Label htmlFor="address">Amount</Label>
              <Input
                className="mt-2"
                id="amount"
                placeholder={"$300"}
                name="amount"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Upagrade</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BuyCryptoDialog;
