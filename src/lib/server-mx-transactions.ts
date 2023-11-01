import { selectedNetwork } from "@/config/network";
import { fetchTokenById } from "@/services/rest/elrond/tokens";
import { provider } from "@/services/sc/provider";
import {
  decryptPrivateKey,
  generateEncryptionPassword,
} from "@/utils/functions/crypto";
import {
  Account,
  Address,
  GasEstimator,
  TokenTransfer,
  TransferTransactionsFactory,
} from "@multiversx/sdk-core/out";
import { UserSecretKey, UserSigner } from "@multiversx/sdk-wallet/out";
import axios from "axios";
import * as fs from "fs";
import prisma from "./db";

export async function downloadTextFile(url: string) {
  let response = await axios.get(url, {
    responseType: "text",
    transformResponse: [],
  });
  let text = response.data.toString();
  return text;
}
export async function readTestFile(filePath: string): Promise<string> {
  return await fs.promises.readFile(filePath, { encoding: "utf8" });
}

export const sendTokens = async ({
  receiver,
  token,
  amount,
}: {
  receiver: string;
  token: string;
  amount: number;
}) => {
  try {
    console.log("Start sending tokens");

    const secretKey = await getPrivateKey();
    const senderAddress = secretKey.generatePublicKey().toAddress().bech32();

    // ---------

    // Tokens to send
    const tokendDetail = await fetchTokenById(token);
    const transfer1 = TokenTransfer.fungibleFromAmount(
      token,
      amount,
      tokendDetail.decimals
    );

    console.log("Bulding tx");
    // Transaction
    const factory = new TransferTransactionsFactory(new GasEstimator());

    const transaction = factory.createESDTTransfer({
      tokenTransfer: transfer1,
      sender: new Address(senderAddress),
      receiver: new Address(receiver),
      chainID: selectedNetwork.ChainID,
    });

    console.log("Handling nonce for tx");

    // Handle nonce for the tx
    const senderAccount = new Account(new Address(senderAddress));
    const senderAccountOnNetwork = await provider.getAccount(
      new Address(senderAddress)
    );
    senderAccount.update(senderAccountOnNetwork);
    transaction.setNonce(senderAccount.getNonceThenIncrement());

    // Serialize transaction
    const serialized = transaction.serializeForSigning();

    console.log("Creating signature for the tx");

    // Create signature for the transaction
    const signer = new UserSigner(secretKey);
    const signature = await signer.sign(serialized);

    // Apply signature to the tx
    transaction.applySignature(signature);

    console.log("Sending tx to the network");
    await provider.sendTransaction(transaction);

    const txHash = transaction.getHash().toString();
    console.log("Tx sended, hash: ", txHash);

    return txHash;
  } catch (error) {
    console.log({ error });
  }
};

export const getPrivateKey = async () => {
  const secret = process.env.SECRET_ENCRPTION_PASSWORD!;

  const password = generateEncryptionPassword(secret);

  const wallet = await prisma.wallet.findUnique({
    where: { name: process.env.WALLET_NAME! },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  const descryptedPK = decryptPrivateKey(wallet.encryptedSeed, password);

  const secretKey = UserSecretKey.fromString(descryptedPK);

  return secretKey;
};
