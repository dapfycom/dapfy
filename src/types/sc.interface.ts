import { Interaction } from "@multiversx/sdk-core";
export interface ISendTransactionProps {
  interaction: Interaction;
  options?: {
    gasL?: number;
    egldVal?: number;
  };
}

export interface IScCallProps {
  functionName: string;
  arg?: any[];
  gasL?: number;
}

export interface IESDTTransferProps extends IScCallProps {
  value?: number;
  realValue?: string;
  token: { collection: string; decimals: number };
}
export interface IESDTNFTTransferProps extends IScCallProps {
  token: { collection: string; nonce: number };
}
export interface IEGLDPaymentProps extends IScCallProps {
  value: number;
}

export interface IwrapEgldAndEsdtTranferProps extends IScCallProps {
  value: number;
}

export interface IMultiESDTNFTTransferProps extends IScCallProps {
  tokens: {
    collection: string;
    nonce: number;
    value: number | string;
    decimals?: number;
  }[];
}
