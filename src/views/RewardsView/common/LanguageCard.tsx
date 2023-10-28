"use client";
import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { i18n } from "@/i18n-config";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";

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

const LanguageCard = () => {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Language</CardTitle>
        <MyTooltip content="Set your favorite language">
          <Dialog>
            <DialogTrigger>
              <Button size={"icon"} variant={"outline"}>
                <Languages className="h-4 w-4 text-muted-foreground" />
              </Button>{" "}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Language Switcher</DialogTitle>
                <DialogDescription>
                  Make Dapfy speak your language
                </DialogDescription>
              </DialogHeader>
              <div>
                <ul className="grid grid-cols-2 gap-3">
                  {i18n.locales.map((locale) => {
                    return (
                      <li key={locale}>
                        <Link href={redirectedPathName(locale)}>
                          <div className="flex items-center px-[12px] py-[7px] rounded-sm hover:bg-secondary">
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
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </MyTooltip>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">EN</div>
        <p className="text-xs text-muted-foreground">Prefered dapp language</p>
      </CardContent>
    </Card>
  );
};

export default LanguageCard;
