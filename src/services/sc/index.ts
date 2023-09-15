import bskFarmAbiUrl from "@/assets/abis/beskar-dao.abi.json";
import dustAbiUrl from "@/assets/abis/dust_sc.abi.json";
import flipAbiUrl from "@/assets/abis/sc_flip.abi.json";
import { selectedNetwork } from "@/config/network";
import { Address } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { SmartContractInteraction } from "./calls/transaction";

export const provider = new ProxyNetworkProvider(
  selectedNetwork.network.gatewayAddress,
  {
    timeout: 30000,
  }
);

export const EGLD_VAL = Math.pow(10, 18);

export type WspTypes =
  | "maiarBskExchangeWsp"
  | "wrapEgldpWsp"
  | "wrapEgldpWspShard1"
  | "wrapEgldpWspShard2"
  | "maiarRouterWsp"
  | "bskFarmWsp"
  | "flipWsp"
  | "dustWsp";

export const getInterface = (workspace: WspTypes) => {
  let address = null;
  let abiUrl: any = null;
  let implementsInterfaces = "";
  let simpleAddress = "";

  switch (workspace) {
    case "maiarBskExchangeWsp":
      simpleAddress = selectedNetwork.scAddress.maiarBskSwap;
      address = new Address(simpleAddress);
      break;

    case "wrapEgldpWsp":
      simpleAddress = selectedNetwork.scAddress.wrapEgld;
      address = new Address(simpleAddress);

      break;
    case "wrapEgldpWspShard1":
      simpleAddress = selectedNetwork.scAddress.wrapEgldShar1;
      address = new Address(simpleAddress);

      break;
    case "wrapEgldpWspShard2":
      simpleAddress = selectedNetwork.scAddress.wrapEgldShar2;
      address = new Address(simpleAddress);

      break;
    case "maiarRouterWsp":
      simpleAddress = selectedNetwork.scAddress.maiarRouter;
      address = new Address(simpleAddress);
      break;
    case "bskFarmWsp":
      simpleAddress = selectedNetwork.scAddress.farm;
      address = new Address(simpleAddress);
      abiUrl = bskFarmAbiUrl;
      implementsInterfaces = "Esdtrewards";
      break;
    case "flipWsp":
      simpleAddress = selectedNetwork.scAddress.flip;
      address = new Address(simpleAddress);
      abiUrl = flipAbiUrl;
      implementsInterfaces = "FlipContract";
      break;
    case "dustWsp":
      simpleAddress = selectedNetwork.scAddress.dust;
      address = new Address(simpleAddress);
      abiUrl = dustAbiUrl;
      implementsInterfaces = "DustContract";
      break;
    default:
      break;
  }

  return { address, abiUrl, implementsInterfaces, simpleAddress };
};

export const getSmartContractInteraction = (
  key: WspTypes | string
): SmartContractInteraction => {
  const smartsContractsInteractions: {
    [key: string]: SmartContractInteraction;
  } = {
    bskFarmWsp: new SmartContractInteraction(
      getInterface("bskFarmWsp").simpleAddress
    ),
    maiarRouterWsp: new SmartContractInteraction(
      getInterface("maiarRouterWsp").simpleAddress
    ),
    wrapEgldpWspShard2: new SmartContractInteraction(
      getInterface("wrapEgldpWspShard2").simpleAddress
    ),
    wrapEgldpWspShard1: new SmartContractInteraction(
      getInterface("wrapEgldpWspShard1").simpleAddress
    ),
    wrapEgldpWsp: new SmartContractInteraction(
      getInterface("wrapEgldpWsp").simpleAddress
    ),
    maiarBskExchangeWsp: new SmartContractInteraction(
      getInterface("maiarBskExchangeWsp").simpleAddress
    ),
    flipWsp: new SmartContractInteraction(
      getInterface("flipWsp").simpleAddress
    ),
    dustWsp: new SmartContractInteraction(
      getInterface("dustWsp").simpleAddress
    ),
  };

  if (smartsContractsInteractions[key]) {
    return smartsContractsInteractions[key];
  } else {
    try {
      new Address(key);
    } catch (error) {
      throw new Error("Invalid address");
    }
    return new SmartContractInteraction(key);
  }
};
