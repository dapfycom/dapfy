"use client";
import { useAppSelector } from "@/hooks/useRedux";
import { selectLastHouseSelection } from "@/views/CoinFlipView/lib/con-flip-slice";
import { selectChoise } from "@/views/CoinFlipView/lib/functions";
import Image from "next/image";
// import css
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import styles from "./Coin.module.css";

const Coin = () => {
  const houseSelection = useAppSelector(selectLastHouseSelection);

  const isBack = houseSelection === null ? false : !houseSelection;
  return (
    <Card className="border-none w-full p-0">
      <CardContent className="p-0">
        <div
          className={cn(
            `w-full px-[35px] ${
              houseSelection && "pb-[30px]"
            }  rounded-lg min-h-[300px]`,
            styles.container
          )}
        >
          <div
            style={{
              transform: isBack ? "rotateY(180deg)" : "none",
            }}
            className={cn(
              "flip-card-inner h-full min-h-[300px]",
              styles["flip-card-inner"]
            )}
          >
            <div
              className={cn(
                "justify-center items-center flex flip-card-front h-full min-h-[300px]",
                styles["flip-card-front"]
              )}
            >
              <Image
                src={"/images/coin-heads.png"}
                width={265}
                height={265}
                alt=""
              />
            </div>
            <div
              className={cn(
                "justify-center items-center flex w-full h-full",
                styles["flip-card-back"]
              )}
            >
              <Image
                src={"/images/coin-tails.png"}
                width={265}
                height={265}
                alt=""
              />
            </div>
          </div>
          {houseSelection !== null && (
            <div className="justify-center items-center flex text-center">
              LAST TOSS WAS {selectChoise(houseSelection)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    // <CoinS
    //   w={"full"}
    //   px="35px"
    //   pb={houseSelection && "30px"}
    //   bg="dark.600"
    //   border="1px"
    //   borderColor="dark.300"
    //   borderRadius={"lg"}
    //   minH={"300px"}
    //   isBack={isBack}
    // >
    //   <Box className="flip-card-inner" h="full" minH={"300px"}>
    //     <Center className="flip-card-front" h="full" minH={"300px"}>
    //       <Image src={"images/bsk-logo.svg"} w="265px" h="265px" />
    //     </Center>
    //     <Center className="flip-card-back">
    //       <Box
    //         maxW="265px"
    //         maxH="265px"
    //         w={"100%"}
    //         h={backHeight + "px"}
    //         bg="primary"
    //         borderRadius={"full"}
    //         ref={backRef}
    //       >
    //         {" "}
    //         <Box></Box>
    //       </Box>
    //     </Center>
    //   </Box>
    //   {houseSelection !== null && (
    //     <Center textAlign={"center"}>
    //       LAST TOSS WAS {selectChoise(houseSelection)}
    //     </Center>
    //   )}
    // </CoinS>
  );
};

export default Coin;

// const CoinS = styled(Box)`
//   perspective: 1000px;
//   .flip-card-inner {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     text-align: center;
//     transition: transform 0.6s;
//     transform-style: preserve-3d;
//   }

//   .flip-card-inner {
//     transform: ${(props) => (props.isBack ? "rotateY(180deg)" : "none")};
//   }

//   .flip-card-front,
//   .flip-card-back {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     -webkit-backface-visibility: hidden;
//     backface-visibility: hidden;
//   }

//   .flip-card-back {
//     transform: rotateY(180deg);
//   }
// `;
