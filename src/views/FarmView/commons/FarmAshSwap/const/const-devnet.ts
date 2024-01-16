import ImgAshIcon from "../assets/images/ash-icon.png";
import IconBUSD from "../assets/images/busd-icon.png";
import ImgEgldIcon from "../assets/images/egld-icon.png";
import IconEPUNKS from "../assets/images/epunks-icon.png";
import IconHTM from "../assets/images/htm-icon.png";
import IconJWLEGLD from "../assets/images/jwlegld-icon.png";
import IconJWLHTM from "../assets/images/jwlhtm-icon.png";
import IconJWLUSD from "../assets/images/jwlusd-icon.png";
import IconSEGLD from "../assets/images/segld-icon.png";
import IconUSDC from "../assets/images/usdc-icon.png";
import IconUSDT from "../assets/images/usdt-icon.png";
import IconUTK from "../assets/images/utk-icon.png";
import ImgWEGLDIcon from "../assets/images/wegld-icon.png";

import { ChainId } from "@ashswap/ash-sdk-js/out";
import { EPoolType, IESDTInfo, IPool } from "../type";
const TOKENS_ALIAS: Record<"EGLD" | "ASH" | "wEGLD", IESDTInfo> = {
  EGLD: {
    identifier: "EGLD",
    chainId: ChainId.Devnet,
    symbol: "xEGLD",
    name: "MultiversX",
    decimals: 18,
    logoURI: ImgEgldIcon.src,
  },
  wEGLD: {
    identifier: "WEGLD-a28c59",
    chainId: ChainId.Devnet,
    symbol: "wEGLD",
    name: "Wrapped EGLD",
    decimals: 18,
    logoURI: ImgWEGLDIcon.src,
  },
  ASH: {
    identifier: "ASH-e3d1b7",
    chainId: ChainId.Devnet,
    symbol: "ASH",
    name: "Ashswap Token",
    decimals: 18,
    logoURI: ImgAshIcon.src,
  },
};
const TOKENS: IESDTInfo[] = [
  TOKENS_ALIAS.EGLD,
  TOKENS_ALIAS.wEGLD,
  TOKENS_ALIAS.ASH,
  {
    identifier: "USDC-350c4e",
    chainId: ChainId.Devnet,
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logoURI: IconUSDC.src,
  },
  {
    identifier: "USDT-dd271a",
    chainId: ChainId.Devnet,
    symbol: "USDT",
    name: "Tether",
    decimals: 6,
    logoURI: IconUSDT.src,
  },
  {
    identifier: "BUSD-d4c014",
    chainId: ChainId.Devnet,
    symbol: "BUSD",
    name: "BUSD",
    decimals: 18,
    logoURI: IconBUSD.src,
  },
  {
    identifier: "HTM-23a1da",
    chainId: ChainId.Devnet,
    symbol: "HTM",
    name: "Hatom Protocol",
    decimals: 18,
    logoURI: IconHTM.src,
  },
  {
    identifier: "UTK-14d57d",
    chainId: ChainId.Devnet,
    symbol: "UTK",
    name: "Utrust",
    decimals: 18,
    logoURI: IconUTK.src,
  },
  {
    identifier: "JWLEGLD-e4b8d3",
    chainId: ChainId.Devnet,
    symbol: "JWLEGLD",
    name: "JewelLockedEGLD",
    decimals: 18,
    logoURI: IconJWLEGLD.src,
  },
  {
    identifier: "JWLHTM-3ed083",
    chainId: ChainId.Devnet,
    symbol: "JWLHTM",
    name: "JewelLockedHTM",
    decimals: 18,
    logoURI: IconJWLHTM.src,
  },
  {
    identifier: "JWLUSD-3d1fab",
    chainId: ChainId.Devnet,
    symbol: "JWLUSD",
    name: "JewelLockedUSD",
    decimals: 18,
    logoURI: IconJWLUSD.src,
  },
  {
    identifier: "SEGLD-f94c36",
    chainId: ChainId.Devnet,
    symbol: "sEGLD",
    name: "Liquid Staked EGLD",
    decimals: 18,
    logoURI: IconSEGLD.src,
  },
  {
    identifier: "EPUNKS-50d907",
    chainId: ChainId.Mainnet,
    symbol: "EPUNKS",
    name: "ElrondPunks",
    decimals: 18,
    logoURI: IconEPUNKS.src,
  },
];

const LP_TOKENS: IESDTInfo[] = [
  // LP tokens
  {
    identifier: "ALP-a89380",
    chainId: ChainId.Devnet,
    symbol: "ALP-3pool",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-20e461",
    chainId: ChainId.Devnet,
    symbol: "ALP-BUSD-wEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-8817f1",
    chainId: ChainId.Devnet,
    symbol: "ALP-ASH-USDT",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-caeac5",
    chainId: ChainId.Devnet,
    symbol: "ALP-BUSD-UTK",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-097c45",
    chainId: ChainId.Devnet,
    symbol: "ALP-JWLEGLD-EGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-a2b238",
    chainId: ChainId.Devnet,
    symbol: "ALP-JWLHTM",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-7f4b3f",
    chainId: ChainId.Devnet,
    symbol: "ALP-JWLUSD-USDC",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-e4391a",
    chainId: ChainId.Devnet,
    symbol: "ALP-SEGLD-WEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-3763b9",
    chainId: ChainId.Devnet,
    symbol: "ALP-SEGLD-JWLEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-2be5ea",
    chainId: ChainId.Devnet,
    symbol: "ALP-JWLEGLD-EPUNKS",
    name: "Ashswap LP",
    decimals: 18,
  },
];

const TOKENS_MAP: Record<string, IESDTInfo> & typeof TOKENS_ALIAS = {
  ...Object.fromEntries(
    [...TOKENS, ...LP_TOKENS].map((t) => [t.identifier, t])
  ),
  ...TOKENS_ALIAS,
};
export const TOKENS_BETA2 = {
  TOKENS,
  LP_TOKENS,
  TOKENS_MAP,
} as const;

const POOLS_BETA2: IPool[] = [
  {
    address: "erd1qqqqqqqqqqqqqpgqpmpm5wlp6x3r3k6g4eqsawex92tgsck52gesmcykhs",
    lpToken: TOKENS_MAP["ALP-a89380"],
    tokens: [
      TOKENS_MAP["USDC-350c4e"],
      TOKENS_MAP["USDT-dd271a"],
      TOKENS_MAP["BUSD-d4c014"],
    ],
    type: EPoolType.PlainPool,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgq9dwlgpy9jxda7kh9zeumjld0tz39w8up2ges9r6s4g",
    lpToken: TOKENS_MAP["ALP-20e461"],
    tokens: [TOKENS_MAP["BUSD-d4c014"], TOKENS_MAP["WEGLD-a28c59"]],
    type: EPoolType.PoolV2,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgqcqllxrhz5g7f8ujkj2d32v4ywm7cwuhn2geswn4xgd",
    lpToken: TOKENS_MAP["ALP-8817f1"],
    tokens: [TOKENS_MAP["USDT-dd271a"], TOKENS_MAP["ASH-e3d1b7"]],
    type: EPoolType.PoolV2,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgq280hzavv72k2tdrdakq4tz64zhwznuln2gesx9a5y7",
    lpToken: TOKENS_MAP["ALP-caeac5"],
    tokens: [TOKENS_MAP["BUSD-d4c014"], TOKENS_MAP["UTK-14d57d"]],
    type: EPoolType.PoolV2,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgqq8j8awvqpcptzsnjz0lqlfd02q96zktu2gesgyal9y",
    lpToken: TOKENS_MAP["ALP-097c45"],
    tokens: [TOKENS_MAP["WEGLD-a28c59"], TOKENS_MAP["JWLEGLD-e4b8d3"]],
    type: EPoolType.PlainPool,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgqlngl0xwzl3lulpeam4tycq70e83mrr6x2gesf656dj",
    lpToken: TOKENS_MAP["ALP-7f4b3f"],
    tokens: [TOKENS_MAP["USDC-350c4e"], TOKENS_MAP["JWLUSD-3d1fab"]],
    type: EPoolType.PlainPool,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgq24zr42pzmpxrklt04a2tq5qx7ajxyzsh2ges4fdr54",
    lpToken: TOKENS_MAP["ALP-e4391a"],
    tokens: [TOKENS_MAP["WEGLD-a28c59"], TOKENS_MAP["SEGLD-f94c36"]],
    type: EPoolType.LendingPool,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgq4zlgmjruxmp657p6fueh823h7h9rgasd2gestk2sc4",
    lpToken: TOKENS_MAP["ALP-3763b9"],
    tokens: [TOKENS_MAP["SEGLD-f94c36"], TOKENS_MAP["JWLEGLD-e4b8d3"]],
    type: EPoolType.LendingPool,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgq3r7sus3slny8nxf4eh7gdrey7dc073ud2ges36dhrr",
    lpToken: TOKENS_MAP["ALP-2be5ea"],
    tokens: [TOKENS_MAP["JWLEGLD-e4b8d3"], TOKENS_MAP["EPUNKS-50d907"]],
    type: EPoolType.PoolV2,
  },
  {
    address: "erd1qqqqqqqqqqqqqpgqxutyaca3w426r6pedg2v3ea587es9d9t2gesk2t977",
    lpToken: TOKENS_MAP["ALP-a2b238"],
    tokens: [TOKENS_MAP["HTM-23a1da"], TOKENS_MAP["JWLHTM-3ed083"]],
    type: EPoolType.PlainPool,
  },
];

export default POOLS_BETA2;
