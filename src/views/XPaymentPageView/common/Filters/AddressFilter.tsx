import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { IFormValues } from "../FormikContainer/FormikContainer";

const AddressFilter = () => {
  const { values, handleChange, setFieldValue } =
    useFormikContext<IFormValues>();
  const address = useAppSelector(selectUserAddress);

  useEffect(() => {
    console.log({
      receiver: values.receiver,
      address,
    });

    if (values.receiver === "" && address !== "") {
      setFieldValue("receiver", address);
    }
  }, [address, setFieldValue, values.receiver]);
  return (
    <div className="flex flex-col sm:flex-row  gap-4 w-full mt-[-3px]">
      <div className="w-full">
        <Label>Receiver</Label>
        <Input
          placeholder="erd..."
          value={values.receiver}
          name="receiver"
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div className="w-full">
        <Label>Sender</Label>
        <Input
          placeholder="erd..."
          value={values.sender}
          name="sender"
          onChange={handleChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AddressFilter;
