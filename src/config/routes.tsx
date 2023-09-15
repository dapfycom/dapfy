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
  swap: "/",
  swapLp: "/swapLp",

  // play: "/play",
  // coinFlip: "/play/coin-flip",
  // forge: "/the-forge",
  farm: "/farm",
  stake: "/stake",
  play: "/play",
  dust: "/dust",
};

export const mainSiteRoutes = [
  {
    path: routeNames.swap,
    title: "Swap",
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
];
