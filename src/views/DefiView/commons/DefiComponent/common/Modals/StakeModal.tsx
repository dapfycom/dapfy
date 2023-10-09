import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
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
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { formatBalance, getRealBalance } from "@/utils/functions/formatBalance";
import { stakeLP } from "@/views/FarmView/utils/services";
import { useFormik } from "formik";
import * as yup from "yup";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    selectedNetwork.tokensID.bskwegld
  );
  const { accountToken: userStakedToken } = useGetAccountToken(
    selectedNetwork.tokensID.bskwegld
  );
  const stakeSchema = yup.object({
    amount: yup
      .number()
      .required("This field is required")
      .min(0, "Negative number")
      .max(
        formatBalance(userStakedToken, true, 18) as number,
        "Insufficient funds"
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      let amount = values.amount;
      stakeLP(amount, stakedToken);
    },
    validationSchema: stakeSchema,
  });
  const handleMax = () => {
    const value = getRealBalance(
      userStakedToken.balance,
      userStakedToken.decimals,
      true
    );
    formik.setFieldValue("amount", value.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            <div className="flex items-center gap-3">
              <LpTokenImageV2 lpToken={stakedToken} size={25} />
              <h3>Stake in BSK-EGLD farm</h3>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            {/* <Label htmlFor="amount-bskegld">BSK-EGLD Amount</Label> */}
            <Input
              id="amount-bskegld"
              name="amount"
              placeholder="Amount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount}
              isInvalid={
                Boolean(formik.touched.amount) && Boolean(formik.errors.amount)
              }
            />
            <div className="flex justify-between mt-3 text-xs mb-2">
              <p className="text-red-700">{formik.errors.amount}</p>
              <p className="cursor-pointer" onClick={handleMax}>
                Balance: {formatBalance(userStakedToken)}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Stake</Button>
          </DialogFooter>
        </form>
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
    //           <Heading fontSize={"lg"}>Stake in BSK-EGLD farm</Heading>
    //         </Flex>
    //       </ModalHeader>
    //       <ModalBody>
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
    //             Balance: {formatBalance(userStakedToken)}
    //           </Text>
    //         </Flex>
    //       </ModalBody>

    //       <ModalFooter>
    //         <Flex w="full" gap={4}>
    //           <ActionButton flex={1} bg="dark.500" onClick={onClose}>
    //             Cancel
    //           </ActionButton>
    //           <ActionButton flex={1} type="submit">
    //             Stake
    //           </ActionButton>
    //         </Flex>
    //       </ModalFooter>
    //     </form>
    //   )}
    // </MyModal>
  );
};

export default StakeModal;
