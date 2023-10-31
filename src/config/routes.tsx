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
  dust: "/multiversx/dust",
  aggregator: "/multiversx/aggregator",
  defi: "/multiversx/defi",
  docs: "/docs",
  blog: "/blog",
  upgrade: "/upgrade",

  // internals
  about: "/about",
  sustainability: "/sustainability",
  sales: "/sales",
  security: "/security",
  terms: "/terms-of-use",
  openSource: "/open-source",
};

export const externnalLinks = {
  twitter: "https://x.com/xBeskar",
  telegram: "https://t.me/xBeskar",
  github: "https://github.com/MxBeskar",
};

export const mainSiteRoutes = [
  {
    path: routeNames.aggregator,
    title: "Swap Aggregator",
  },

  {
    path: routeNames.farm,
    title: "Farm",
  },

  {
    path: routeNames.play,
    title: "Play",
    soon: false,
  },

  {
    title: "The Forge",
    soon: true,
  },
  {
    path: routeNames.dust,
    title: "Dust",
  },
  {
    path: routeNames.defi,
    title: "Defi",
  },
  {},
];
