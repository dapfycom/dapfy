export const pol = 1;
// import { sendTransactions } from "@multiversx/sdk-dapp/services";

// import {
//   Address,
//   AddressValue,
//   BigUIntValue,
//   BytesValue,
//   ContractFunction,
//   Transaction,
//   TransactionPayload,
// } from "@multiversx/sdk-core/out";
// import { refreshAccount } from "@multiversx/sdk-dapp/utils";
// import BigNumber from "bignumber.js";
// import { selectedNetwork } from "config/network";
// import store from "redux/store";
// import { EGLD_VAL, WspTypes, getInterface } from "..";

// interface ISendTransaction {
//   addr: string;
//   payload: TransactionPayload;
//   value?: number;
//   gasL?: number;
// }

// export const sendTransaction = async ({
//   addr,
//   payload,
//   value,
//   gasL,
// }: ISendTransaction) => {
//   const sender = store.getState().dapp.userAddress;
//   const receiverAddress = new Address(addr);
//   const senderAddress = new Address(sender);

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: value || 0,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasL || 50000000,
//     chainID: selectedNetwork.ChainID,
//   });

//   await refreshAccount();

//   const res = await sendTransactions({
//     transactions: tx,
//   });

//   return res;
// };

// export const sendMultipleTransactions = async ({
//   txs,
// }: {
//   txs: Transaction[];
// }) => {
//   await refreshAccount();

//   const res = await sendTransactions({
//     transactions: txs,
//   });

//   return res;
// };

// //call
// export const ESDTNFTTransfer = async (
//   funcName = "",
//   userAddress = "",
//   value = 0,
//   token: { collection: string; nonce: string; decimals: number },
//   contractAddr = "",
//   gasL = 200000000,
//   args = [],
//   finalTokenValue: number | string
// ) => {
//   try {
//     const tokenId = token.collection;
//     const tokenNonce = token.nonce;
//     const finalValue = finalTokenValue || Number(value) * EGLD_VAL;
//     const payload = TransactionPayload.contractCall()
//       .setFunction(new ContractFunction("ESDTNFTTransfer"))
//       .setArgs([
//         BytesValue.fromUTF8(tokenId),
//         new BigUIntValue(new BigNumber(tokenNonce)),
//         new BigUIntValue(new BigNumber(finalValue)),
//         new AddressValue(new Address(contractAddr)),
//         BytesValue.fromUTF8(funcName),
//         ...args,
//       ])
//       .build();

//     const transactionData: any = {
//       addr: userAddress,
//       payload: payload,
//       gasL: gasL,
//     };

//     return await sendTransaction(transactionData);
//   } catch (error) {
//     console.error("error", error);
//   }
// };
// export const ESDTTransfer = async ({
//   funcName = "",
//   token = { identifier: "", decimals: 0 },
//   val = 0,
//   contractAddr = "",
//   args = [],
//   gasL = 200000000,
//   realValue = null,
// }: {
//   funcName: string;
//   token: { identifier: string; decimals: number };
//   val?: string | number;
//   contractAddr: string;
//   args?: any[];
//   gasL?: number;
//   realValue?: number | string;
// }) => {
//   const tokenIdentifier = token.identifier;
//   const multiplyier = new BigNumber(10).pow(token.decimals || 18);
//   const finalValue = new BigNumber(val).multipliedBy(multiplyier).toString();

//   const bgFinalValue = new BigNumber(realValue || finalValue).toFixed(0);
//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(tokenIdentifier),
//       new BigUIntValue(new BigNumber(bgFinalValue)),
//       BytesValue.fromUTF8(funcName),
//       ...args,
//     ])
//     .build();

//   const transactionData: any = {
//     addr: contractAddr,
//     payload: payload,
//     gasL: gasL,
//   };
//   return await sendTransaction(transactionData);
// };

// export const scCall = async (
//   workspace: WspTypes,
//   funcName: string,
//   args: any = [],
//   gasLimit?: number
// ) => {
//   let { simpleAddress } = getInterface(workspace);

//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();
//   const transactionData: any = {
//     addr: simpleAddress,
//     payload: payload,
//     gasL: gasLimit || 200000000,
//   };
//   return await sendTransaction(transactionData);
// };

// export const EGLDPayment = async (
//   workspace: WspTypes,
//   funcName = "",
//   amount = 0,
//   args = [],
//   gasLimit = 200000000
// ) => {
//   let { simpleAddress } = getInterface(workspace);

//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();
//   const transactionData: any = {
//     addr: simpleAddress,
//     payload: payload,
//     value: amount * EGLD_VAL,
//     gasL: gasLimit || 200000000,
//   };

//   return await sendTransaction(transactionData);
// };

// // tx

// export const ESDTTransferOnlyTx = async ({
//   funcName,
//   token,
//   val = 0,
//   contractAddr = "",
//   args = [],
//   gasL = 60000000,
//   realValue = null,
// }) => {
//   const sender = store.getState().dapp.userAddress;
//   const senderAddress = new Address(sender);
//   const receiverAddress = new Address(contractAddr);
//   console.error("receiverAddress", receiverAddress);

//   const tokenIdentifier = token.identifier;
//   const multiplyier = Math.pow(10, token.decimals || 18);
//   const finalValue = realValue || Number(val) * multiplyier;

//   const bgFinalValue = new BigNumber(finalValue).toFixed(0);
//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(tokenIdentifier),
//       new BigUIntValue(new BigNumber(bgFinalValue)),
//       BytesValue.fromUTF8(funcName),
//       ...args,
//     ])
//     .build();

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: 0,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasL || 60000000,
//     chainID: selectedNetwork.ChainID,
//   });
//   return tx;
// };
// export const scCallOnlyTx = async (
//   workspace: WspTypes,
//   funcName: string,
//   args: any = [],
//   gasLimit?: number
// ) => {
//   let { simpleAddress } = getInterface(workspace);
//   const sender = store.getState().dapp.userAddress;
//   const senderAddress = new Address(sender);

//   const receiverAddress = new Address(simpleAddress);

//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: 0,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasLimit || 60000000,
//     chainID: selectedNetwork.ChainID,
//   });
//   return tx;
// };
// export const EGLDPaymentOnlyTx = async (
//   workspace: WspTypes,
//   funcName,
//   amount,
//   args = [],
//   gasLimit = 60000000,
//   finalAmount = null
// ) => {
//   let { simpleAddress } = getInterface(workspace);
//   const sender = store.getState().dapp.userAddress;
//   const senderAddress = new Address(sender);
//   const receiverAddress = new Address(simpleAddress);
//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: finalAmount ?? amount * EGLD_VAL,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasLimit || 60000000,
//     chainID: selectedNetwork.ChainID,
//   });
//   return tx;
// };

// export const wrapEgldAndEsdtTranfer = async (
//   egldAmount: number | string,
//   funcName: string,
//   args: any[] = [],
//   scAddress: string,
//   gasL: number = 30000000
// ) => {
//   const sender = store.getState().dapp.userAddress;
//   const value = new BigNumber(egldAmount).multipliedBy(EGLD_VAL).toFixed(0);

//   //wrap egld
//   let { simpleAddress } = getInterface("wrapEgldpWsp");

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("wrapEgld"))
//     .setArgs([])
//     .build();

//   const tx1 = new Transaction({
//     sender: new Address(sender),
//     value: value,
//     receiver: new Address(simpleAddress),
//     data: payload,
//     gasLimit: 8000000,
//     chainID: selectedNetwork.ChainID,
//   });

//   //esdt transfer

//   const tokenIdentifier = selectedNetwork.tokensID.wegld;

//   const payload2 = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(tokenIdentifier),
//       new BigUIntValue(new BigNumber(value)),
//       BytesValue.fromUTF8(funcName),
//       ...args,
//     ])
//     .build();

//   const tx2 = new Transaction({
//     sender: new Address(sender),
//     value: 0,
//     receiver: new Address(scAddress),
//     data: payload2,
//     gasLimit: gasL,
//     chainID: selectedNetwork.ChainID,
//   });

//   return await sendMultipleTransactions({ txs: [tx1, tx2] });
// };
// export const MultiESDTNFTTransfer = async (
//   wsp: WspTypes,
//   funcName: string,
//   tokens: {
//     collection: string;
//     nonce: number;
//     value: number;
//   }[],
//   args: any[] = [],
//   gasL: number = 100000000
// ) => {
//   try {
//     const userAddress = store.getState().dapp.userAddress;
//     let { simpleAddress } = getInterface(wsp);

//     const data = tokens.flatMap((nft) => {
//       const nftData = [
//         BytesValue.fromUTF8(nft.collection), // <token identifier in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(nft.nonce)), // <token nonce in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(nft.value)), //<token quantity to transfer in hexadecimal encoding>
//       ];
//       return nftData;
//     });

//     const payload = TransactionPayload.contractCall()
//       .setFunction(new ContractFunction("MultiESDTNFTTransfer"))
//       .setArgs([
//         new AddressValue(new Address(simpleAddress)), // <receiver bytes in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(tokens.length)), //<number of tokens to transfer in hexadecimal encoding>
//         ...data,
//         BytesValue.fromUTF8(funcName),
//         ...args,
//       ])
//       .build();

//     const transactionData: any = {
//       addr: userAddress,
//       payload: payload,
//       gasL: gasL,
//     };

//     return await sendTransaction(transactionData);
//   } catch (error) {
//     console.error("error", error);
//   }
// };
