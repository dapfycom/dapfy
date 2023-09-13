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
    // element: <SwapView />,
    title: "Swap",
    // icon: <SwapIcon fontSize={"23px"} />,
    // children: [
    //   {
    //     path: "/",
    //     element: <SwapTab />,
    //   },
    //   {
    //     path: "/swapLp",
    //     element: <SwapLpTab />,
    //   },
    // ],
  },
  {
    path: routeNames.farm,
    // element: <FarmView />,
    title: "Farm",
    // icon: <FarmIcon fontSize={"25px"} />,
  },

  // {
  //   title: "Stake",
  //   icon: <PileIcon fontSize={"20px"} />,
  //   isExternal: true,
  //   path: "https://staking.beskarplay.com",
  // },
  {
    path: routeNames.play,
    // element: <CoinFlipView />,
    title: "Play",
    // icon: <PlayIcon fontSize={"25px"} />,
    soon: false,

    // children: [
    //   {
    //     path: routeNames.play + "/",
    //     element: <PlayView />,
    //   },
    //   {
    //     path: routeNames.coinFlip,
    //     element: <CoinFlipView />,
    //     title: "Coin flip",
    //     icon: <CoinsIcon fontSize={"23px"} />,
    //   },
    //   {
    //     path: "/play/game2",
    //     element: <SwapLpTab />,
    //     title: "Game 2",
    //     icon: <CoinsIcon fontSize={"23px"} />,
    //   },
    //   {
    //     path: "/play/game3",
    //     element: <SwapLpTab />,
    //     title: "Game 3",
    //     icon: <CoinsIcon fontSize={"23px"} />,
    //   },
    // ],
  },

  {
    // path: routeNames.forge,
    // element: <TheForgeView />,
    title: "The Forge",
    // icon: <FireIcon fontSize={"20px"} />,
    soon: true,
  },
  {
    path: routeNames.dust,
    // element: <DustView />,
    title: "Dust",
    // icon: <DustIcon fontSize={"20px"} />,
    hide: true,
  },
];

// export const routes: RouteObject[] = [
//   {
//     path: "/",
//     element: <Layout />,
//     children: mainSiteRoutes,
//   },
// ];
