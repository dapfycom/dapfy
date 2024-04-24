// import {
//   DustIcon,
//   FarmIcon,
//   FireIcon,
//   PlayIcon,
//   SwapIcon,
// } from "components/icons/ui-icons";
// import Layout from "components/Layout/MainLayout";
// import React from "react";
// import { RouteObject } from "react-router-dom";

import {
  FarmIcon,
  FireIcon,
  SendMessageIcon,
  SwapIcon,
} from "@/components/ui-system/icons/ui-icons";
import { SendIcon, Table2 } from "lucide-react";

// const SwapView = React.lazy(() => import("views/SwapView"));
// const PlayView = React.lazy(() => import("views/PlayView"));
// const TheForgeView = React.lazy(() => import("views/TheForgeView"));
// const SwapLpTab = React.lazy(() => import("views/SwapView/commons/SwapLpTab"));
// const FarmView = React.lazy(() => import("views/FarmView"));
// const CoinFlipView = React.lazy(() => import("views/CoinFlipView"));
// const SwapTab = React.lazy(() => import("views/SwapView/commons/SwapCard"));
// const DustView = React.lazy(() => import("views/DustView/DustView"));

export const routeNames = {
  home: "/multiversx/rewards",
  rewards: "/multiversx/rewards",
  swap: "/swap",
  swapLp: "/swapLp",

  // play: "/play",
  // coinFlip: "/play/coin-flip",
  // forge: "/the-forge",
  farm: "/multiversx/farm",
  stake: "/multiversx/stake",
  play: "/multiversx/play",
  pvp: "/multiversx/pvp",
  dust: "/multiversx/dust",
  aggregator: "/multiversx/aggregator",
  defi: "/multiversx/defi",
  tools: "/multiversx/tools",
  herotag: "/multiversx/tools/herotag",
  xfees: "/multiversx/tools/x-fees",
  xstkRewards: "/multiversx/tools/staking-providers-rewards",
  xpayments: "/multiversx/tools/x-payments",
  raffle: "/multiversx/tools/raffle",

  mintJeeter: "/mint",

  docs: "/docs",
  blog: "/blog",
  admin: "/admin",
  help: "/help",
  // upgrade: "/multiversx/upgrade",

  assets: "/dapfy-assets.zip",
  // internals
  about: "/about",
  sustainability: "/sustainability",
  sales: "/sales",
  security: "/security",
  terms: "/terms-of-use",
  openSource: "/open-source",
};

export const externnalLinks = {
  twitter: "https://twitter.com/DapfyCom",
  telegram: "https://t.me/dapfydotcom",
  github: "https://github.com/dapfycom",
  instagram: "https://www.instagram.com/dapfycom/",
  facebook: "https://www.facebook.com/profile.php?id=61553057430791",
  linkedin: "https://www.linkedin.com/in/dapfy-com-8b5428299/",
  youtube: "https://www.youtube.com/@DapfyCom",
  tiktok: "https://www.tiktok.com/@dapfy.com?_t=8hktnFd9Ha3&_r=1",
  analitics: "https://plausible.io/dapfy.com",

  email: "mailto:hello@dapfy.com",
};

export const mainSiteRoutes = [
  {
    path: routeNames.rewards,
    title: "Earn",
  },
  {
    path: routeNames.aggregator,
    title: "Swap",
  },
  {
    path: routeNames.farm,
    title: "Farm",
  },
  {
    title: "Play",
    path: routeNames.pvp,
  },
  {
    path: routeNames.dust,
    title: "Dust",
  },
  {
    path: routeNames.mintJeeter,
    title: "Mint",
  },
  {
    title: "Admin",
    path: routeNames.admin,
    onlyAdmin: true,
  },
];

export const adminRoutes = [
  {
    path: routeNames.admin,
    title: "Rewards",
    icon: <Table2 />,
  },
  {
    path: routeNames.admin + "/aggregator",
    title: "Aggregator",
    icon: <SwapIcon />,
  },
  {
    path: routeNames.admin + "/dust",
    title: "Dust",
    icon: <FireIcon />,
  },
  {
    path: routeNames.admin + "/newsletter",
    title: "Newsletter",
    icon: <SendIcon />,
  },

  {
    path: routeNames.admin + "/farms",
    title: "Farms",
    icon: <FarmIcon />,
  },
  {
    path: routeNames.admin + "/tickets",
    title: "Tickets",
    icon: <SendMessageIcon />,
  },
];
