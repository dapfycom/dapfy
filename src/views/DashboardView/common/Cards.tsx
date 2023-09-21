import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectedNetwork } from "@/config/network";
import { routeNames } from "@/config/routes";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import {
  formatBalance,
  formatBalanceDolar,
} from "@/utils/functions/formatBalance";
import { useGetEgldPrice } from "@multiversx/sdk-dapp/hooks";
import { ArrowLeftRight, Languages } from "lucide-react";
import Link from "next/link";
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
import Divider from "@/components/Divider/Divider";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  selectDappSlippage,
  updateDappSlippage,
} from "@/redux/dapp/dapp-slice";
import { validatePercent } from "@/utils/functions/numbers";
import { useState } from "react";
import useDisclosure from "@/hooks/useDisclosure";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n-config";
import BskCard from "./BskCard";
import EgldCard from "./EgldCard";
import LanguageCard from "./LanguageCard";
import SlippageCard from "./SlippageCard";
const Cards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BskCard />
      <EgldCard />
      <LanguageCard />
      <SlippageCard />
    </div>
  );
};

export default Cards;
