import Divider from "@/components/Divider/Divider";
import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
import Loader1 from "@/components/ui-system/Loader/Loader1";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { formatBalance } from "@/utils/functions/formatBalance";
import {
  useGetFarmUserInfo,
  useLpStoped,
  useNFTsStoped,
} from "@/views/FarmView/utils/hooks";
import { stop } from "@/views/FarmView/utils/services";
import { useFormik } from "formik";
import { AlertCircle } from "lucide-react";
import * as yup from "yup";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal = ({ isOpen, onClose }: IProps) => {
  const { data: userFarmInfo } = useGetFarmUserInfo();

  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    selectedNetwork.tokensID.bskwegld
  );

  const stakeSchema = yup.object({
    amount: yup
      .number()

      .min(0, "Negative number")
      .max(
        formatBalance(
          {
            balance: userFarmInfo?.lpActive || 0,
            decimals: stakedToken.decimals,
          },
          true,
          18
        ) as number,
        "Insufficient funds"
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      onClose();
      stop(values.amount, []);
    },
    validationSchema: stakeSchema,
  });
  const handleMax = () => {
    const value = formatBalance(
      { balance: userFarmInfo?.lpActive || 0, decimals: stakedToken.decimals },
      true,
      18
    );
    formik.setFieldValue("amount", value);
  };

  const { isLpStoped } = useLpStoped();
  const { isNFTsStoped } = useNFTsStoped();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full sm:max-w-[500px]">
        {isLoading ? (
          <Loader1 />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {" "}
                <div className="flex items-center gap-3">
                  <LpTokenImageV2 lpToken={stakedToken} size={25} />
                  <h3>Withdraw in BSK-EGLD farm</h3>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm flex-1">
                {" "}
                Please note that your LP tokens or nfts will be available to
                claim in 48 hours after unstaking.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  id="amount-bskegld"
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  isInvalid={
                    formik.touched.amount && Boolean(formik.errors.amount)
                  }
                />

                <div className="flex justify-between mt-3 text-xs mb-2">
                  <p className="text-red-700">{formik.errors.amount}</p>
                  <p className="cursor-pointer" onClick={handleMax}>
                    Balance:{" "}
                    {formatBalance({
                      balance: userFarmInfo?.lpActive || 0,
                      decimals: stakedToken.decimals,
                    })}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <div className="flex-col flex w-full">
                  <Button className="w-full" type="submit">
                    Unstake
                  </Button>
                  <Divider className="my-4" />

                  <div className="flex flex-col">
                    <p className="text-sm mb-1 text-muted-foreground">
                      Avilable to usnstake : {userFarmInfo?.nftActive.length}{" "}
                      NFTs
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (userFarmInfo) {
                          onClose();
                          stop(
                            "0",
                            userFarmInfo.nftActive.map((nft) => {
                              const nonce = nft.split("-")[2];
                              return parseInt(nonce, 16);
                            })
                          );
                        }
                      }}
                    >
                      Unstake NFTs
                    </Button>
                  </div>

                  <Divider className="my-4" />

                  <div className="flex flex-col">
                    <p className="text-sm mb-1 text-muted-foreground">
                      {isLpStoped ? "Locked " : "Available to claim"}:{" "}
                      {formatBalance({
                        balance: userFarmInfo?.lpStopped || 0,
                        decimals: stakedToken.decimals,
                      })}{" "}
                      LP {`and ${userFarmInfo?.nftStopped.length} NFTs`}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        onClose();
                      }}
                      disabled={isLpStoped && isNFTsStoped}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
    // <MyModal isOpen={isOpen} onClose={onClose} size="2xl" py={6}>
    //   {isLoading ? (
    //     <Spinner />
    //   ) : (
    //     <form onSubmit={formik.handleSubmit}>
    //       <ModalHeader>
    //         <Flex alignItems={"center"} gap={3}>
    //           <LpTokenImageV2 lpToken={stakedToken} size={35} />
    //           <Heading fontSize={"lg"}>Withdraw in BSK-EGLD farm</Heading>
    //         </Flex>
    //       </ModalHeader>
    //       <ModalBody>
    //         <Alert status="warning" borderRadius={"md"} mb={4} fontSize="14px">
    //           <AlertIcon />
    //           Please note that your LP tokens or nfts will be available to claim
    //           in 48 hours after unstaking.
    //         </Alert>
    //         <InputGroup size={"lg"}>
    //           <Input
    //             name="amount"
    //             type={"number"}
    //             placeholder="Amount"
    //             fontSize={"sm"}
    //             onChange={formik.handleChange}
    //             value={formik.values.amount}
    //             isInvalid={
    //               formik.touched.amount && Boolean(formik.errors.amount)
    //             }
    //           />
    //           <InputRightElement
    //             pointerEvents="none"
    //             children={
    //               <Flex pt={2}>
    //                 <LpTokenImageV2 lpToken={stakedToken} size={20} />
    //               </Flex>
    //             }
    //           />
    //         </InputGroup>
    //         <Flex justifyContent="space-between" mt={3} fontSize={"xs"}>
    //           <Text color="tomato">{formik.errors.amount}</Text>
    //           <Text onClick={handleMax} cursor="pointer">
    //             Balance:{" "}
    //             {formatBalance({
    //               balance: userFarmInfo?.lpActive,
    //               decimals: stakedToken.decimals,
    //             })}
    //           </Text>
    //         </Flex>
    //         <Flex w="full" gap={4} mt={6} mb={8}>
    //           <ActionButton flex={1} type="submit">
    //             Unstake
    //           </ActionButton>
    //         </Flex>

    //         <Divider />

    //         <Flex mt={4} flexDir="column">
    //           <Text fontSize={"sm"} color="white">
    //             Avilable to usnstake : {userFarmInfo.nftActive.length} NFTs
    //           </Text>
    //           <Flex w="full" gap={4} mt={3} mb={8}>
    //             <ActionButton
    //               flex={1}
    //               onClick={() => {
    //                 stop(
    //                   "0",
    //                   userFarmInfo.nftActive.map((nft) => {
    //                     const nonce = nft.split("-")[2];
    //                     return parseInt(nonce, 16);
    //                   })
    //                 );
    //               }}
    //             >
    //               Unstake NFTs
    //             </ActionButton>
    //           </Flex>
    //         </Flex>
    //         <Divider />

    //         <Flex mt={4} flexDir="column">
    //           <Text fontSize={"sm"} color="white">
    //             {isLpStoped ? "Locked " : "Available to claim"}:{" "}
    //             {formatBalance({
    //               balance: userFarmInfo.lpStopped,
    //               decimals: stakedToken.decimals,
    //             })}{" "}
    //             LP {`and ${userFarmInfo.nftStopped.length} NFTs`}
    //           </Text>
    //           <Flex w="full" gap={4} mt={3} mb={8}>
    //             <ActionButton
    //               flex={1}
    //               onClick={withdraw}
    //               disabled={isLpStoped && isNFTsStoped}
    //             >
    //               Claim
    //             </ActionButton>
    //           </Flex>
    //         </Flex>
    //       </ModalBody>

    //       <ModalFooter>
    //         <Flex w="full" gap={4}>
    //           <ActionButton flex={1} bg="dark.500" onClick={onClose}>
    //             Cancel
    //           </ActionButton>
    //         </Flex>
    //       </ModalFooter>
    //     </form>
    //   )}
    // </MyModal>
  );
};

export default WithdrawModal;
