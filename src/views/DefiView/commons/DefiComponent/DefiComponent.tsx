"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import { routeNames } from "@/config/routes";
import useDisclosure from "@/hooks/useDisclosure";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { formatBalanceDolar } from "@/utils/functions/formatBalance";
import { useGetFarmsInfo } from "@/views/FarmView/utils/hooks";
import Image from "next/image";
import Link from "next/link";
import FarmInfo from "./common/FarmInfo/FarmInfo";
import FarmMainButtons from "./common/FarmMainButtons/FarmMainButtons";
import StakedInfo from "./common/StakedInfo/StakedInfo";
const FarmComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(selectedNetwork.tokensID.bskwegld);
  const { data: farmInfo } = useGetFarmsInfo();
  const [price] = useGetTokenPrice(selectedNetwork.tokensID.bskwegld);

  return (
    <>
      <div className="flex gap-2 w-full items-center mt-10 mb-4">
        <Label className="">Protocol: </Label>
        <div className="px-4 py-1 border rounded-md">HATOM</div>
      </div>
      <Card className="w-full  px-4">
        <CardContent className="space-y-2 pt-6">
          <div
            className="flex justify-between items-center cursor-pointer flex-col sm:flex-row"
            onClick={onToggle}
          >
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px]">
                <Image
                  src={"/images/hatom.png"}
                  alt="hatom"
                  width={50}
                  height={50}
                />{" "}
              </div>
              {farmInfo && (
                <div className="flex flex-col ">
                  <p className="whitespace-nowrap mb-2">Total Value Locked</p>
                  <p className="text-[12px] text-muted-foreground">
                    $
                    {formatBalanceDolar(
                      { balance: farmInfo.stakedLp, decimals: 18 },
                      price,
                      true
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-7 flex-col sm:flex-row flex-1 justify-end">
              <FarmInfo />
              <FarmMainButtons isOpen={isOpen} />
            </div>
          </div>
        </CardContent>
        {isOpen && <Divider className="mb-4" />}

        <Collapse isOpen={isOpen}>
          <StakedInfo />
        </Collapse>
      </Card>

      <p className="mt-20">
        Don&apos;t have any LP tokens? Buy LP{" "}
        <Link href={routeNames.swapLp} className="text-blue-700">
          here
        </Link>
      </p>
    </>
    // <Center mb={20} mt={12} flexDir="column">
    //   <Box maxW="1300px" w="full" borderRadius="md" overflow={"hidden"}>
    //     <Flex
    //       gap={10}
    //       w="full"
    //       bg="dark.500"
    //       px={7}
    //       py={5}
    //       onClick={onToggle}
    //       cursor="pointer"
    //       flexWrap={"wrap"}
    //       flexDir={{ xs: "column", lg: "row" }}
    //       alignItems="center"
    //     >
    //       <Flex gap={3} flex={1} alignItems="center">
    //         {elrondToken && <LpTokenImageV2 lpToken={elrondToken} size={40} />}
    //         {farmInfo && (
    //           <Flex flexDir={"column"}>
    //             <Text color="white" mb={2} fontSize="md" whiteSpace={"nowrap"}>
    //               BSK-EGLD
    //             </Text>
    //             <Text fontSize={"lsm"}>
    //               $
    //               {formatBalanceDolar(
    //                 { balance: farmInfo.stakedLp, decimals: 18 },
    //                 price,
    //                 true
    //               )}
    //             </Text>
    //           </Flex>
    //         )}
    //       </Flex>
    //       <FarmInfo />
    //       <FarmMainButtons isOpen={isOpen} />
    //     </Flex>
    //     <Collapse in={isOpen}>
    //       <StakedInfo />
    //     </Collapse>
    //   </Box>

    //   <Text mt={20}>
    //     Don't have any LP tokens? Buy LP{" "}
    //     <Box as={Link} to={routeNames.swapLp} color="primary">
    //       here
    //     </Box>
    //   </Text>
    // </Center>
  );
};

export default FarmComponent;
