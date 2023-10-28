import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { i18n } from "@/i18n-config";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { Button } from "../ui/button";
const LocaleComponent = {
  en: {
    name: "English",
    flag: "GB",
  },
  fr: {
    name: "French",
    flag: "FR",
  },
  ro: {
    name: "Romanian",
    flag: "RO",
  },
};

const LanguageSelector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Languages className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {i18n.locales.map((locale) => (
              <CommandItem
                key={locale}
                value={locale}
                className="cursor-pointer"
                onSelect={(currentValue) => {
                  router.push(redirectedPathName(currentValue));
                }}
              >
                <div className="flex gap-3">
                  <div className="rounded-full overflow-hidden mr-4">
                    <ReactCountryFlag
                      countryCode={LocaleComponent[locale].flag}
                      style={{
                        width: "2em",
                        height: "2em",
                      }}
                      svg
                    />
                  </div>
                  <span className="text-muted-foreground font-semibold">
                    {LocaleComponent[locale].name}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
