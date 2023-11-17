import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface IProps {
  presetDays?: {
    value: number;
    label: string;
  }[];

  onChange: (date: Date) => void;
  defaultValue?: Date;
}

export function DatePicker({ presetDays, onChange, defaultValue }: IProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  const [finalDate, setFinalDate] = React.useState<Date | undefined>(
    defaultValue
  );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const handleAcceptDate = () => {
    if (date) {
      setFinalDate(date);
      setOpenDialog(false);
      onChange(date);
    }
  };

  return (
    <Popover open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[230px] justify-start text-left font-normal",
            !finalDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {finalDate ? format(finalDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        {presetDays && (
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {presetDays.map((preset) => {
                return (
                  <SelectItem
                    key={preset.label}
                    value={preset.value.toString()}
                  >
                    {preset.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAcceptDate} size={"sm"}>
            Accept
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
