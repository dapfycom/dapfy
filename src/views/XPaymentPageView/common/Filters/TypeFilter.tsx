import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormikContext } from "formik";
import { IFormValues } from "../FormikContainer/FormikContainer";

export function TypeFilter() {
  const { values, setFieldValue } = useFormikContext<IFormValues>();

  return (
    <div>
      <Label>Token Type</Label>
      <Select
        value={values.type}
        onValueChange={(value) => setFieldValue("type", value)}
        name="type"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a token type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="egld">EGLD</SelectItem>
            <SelectItem value="esdt">ESDTs</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
