import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IElrondAccountToken } from "@/types/elrond.interface";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { maxAllowedTokensCount } from "@/views/DustView/lib/contants";
import {
  selectConvertInfo,
  selectOutputToken,
} from "@/views/DustView/lib/dust-slice";
import Image from "next/image";

interface IProps {
  token: IElrondAccountToken;
  checked: boolean;
}
const RowToken = ({ token, checked }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectConvertInfo);

  const handleSelect = (isCheked: boolean) => {
    if (selectedTokens.length <= maxAllowedTokensCount) {
      dispatch(
        selectOutputToken({
          data: token,
          isCheked: isCheked,
        })
      );
    }
  };

  const disbleTokenSelection =
    selectedTokens.length >= maxAllowedTokensCount &&
    !Boolean(selectedTokens.find((t) => t.identifier === token.identifier));
  return (
    <div className="items-top flex space-x-2 items-center gap-2 cursor-pointer">
      <Checkbox
        id={token.identifier}
        onCheckedChange={(e) => handleSelect(e as boolean)}
        disabled={disbleTokenSelection}
        checked={checked}
      />
      <div className="grid gap-1.5 leading-none w-full cursor-pointer">
        <label
          htmlFor={token.identifier}
          className="w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <div className="flex gap-3 items-center w-full">
            {token?.assets && (
              <div className="rounded-full w-[30px] md:w-[37px] h-[30px] md:h-[37px]">
                <Image
                  alt=""
                  src={token.assets.svgUrl}
                  width={37}
                  height={37}
                />
              </div>
            )}
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex font-bold gap-2">
                <p>{formatBalance(token)}</p>
                <p>{formatTokenI(token.identifier)}</p>
              </div>
              <div className="flex text-muted-foreground text-sm">
                ≈ ${formatBalanceDollar(token, token?.price || 0)}
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
    // <Box>
    //   <Checkbox
    //     value={token.identifier}
    //     w="full"
    //     sx={{
    //       "& .chakra-checkbox__label": {
    //         w: "full",
    //       },
    //     }}
    //     _hover={{
    //       opacity: "0.8",
    //     }}
    //     onChange={(e) => handleSelect(e.target.checked)}
    //     disabled={disbleTokenSelection}
    //   >
    //     <Flex gap={3} alignItems="center" w="full">
    //       {token?.assets && (
    //         <Box rounded={"full"} boxSize={{ xs: "30px", md: "37px" }}>
    //           <Image alt="" src={token.assets.svgUrl} width={37} height={37} />
    //         </Box>
    //       )}
    //       <Flex flexDir={"column"} gap={1} flex={1}>
    //         <Flex fontWeight="600" gap={2}>
    //           <Text>{formatBalance(token)}</Text>
    //           <Text>{formatTokenI(token.identifier)}</Text>
    //         </Flex>
    //         <Flex fontSize={"lsm"} color="GrayText">
    //           ≈ ${formatBalanceDolar(token, token.price)}
    //         </Flex>
    //       </Flex>
    //     </Flex>
    //   </Checkbox>
    // </Box>
  );
};

export default RowToken;
