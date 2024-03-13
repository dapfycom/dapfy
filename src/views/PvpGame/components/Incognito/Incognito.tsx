import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Incognito = () => {
  const [incognitoPreference, setIncognitoPreference] = useState(false);

  useEffect(() => {
    const incognitoPreference = getCookie("incognito-mode");

    if (incognitoPreference === "true") {
      setIncognitoPreference(true);
    }
  }, []);

  const handleChangeIncognito = (checked: boolean) => {
    setIncognitoPreference(checked);
    setCookie("incognito-mode", checked.toString(), {
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  };
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Switch
        id="incognito-mode"
        checked={incognitoPreference}
        onCheckedChange={handleChangeIncognito}
      />
      <Label htmlFor="incognito-mode" className="text-lg cursor-pointer">
        👀 Incognito
      </Label>
    </div>
  );
};

export default Incognito;
