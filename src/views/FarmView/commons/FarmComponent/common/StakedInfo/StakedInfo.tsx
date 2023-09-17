import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import useDisclosure from "@/hooks/useDisclosure";
import StakedDetails from "./StakedDetails/StakedDetails";

const StakedInfo = () => {
  const {
    isOpen: isOpenHarvest,
    onClose: onCloseHarvest,
    onOpen: onOpenHarvest,
  } = useDisclosure();
  const { isLoggedIn } = useAuthentication();

  const handleHarvest = (e: any) => {
    e.stopPropagation();
    onOpenHarvest();
  };
  return (
    <div className="flex w-full px-7 py- gap-10 flex-col md:flex-row">
      {isLoggedIn ? (
        <>
          <div className="flex flex-1">
            <StakedDetails />
          </div>
          <div className="flex  items-center h-auto">
            <Button
              className="w-full md:w-auto text-sm"
              onClick={handleHarvest}
            >
              {" "}
              withdraw
            </Button>
          </div>

          {/* {isOpenHarvest && (
            <HarvestModal isOpen={isOpenHarvest} onClose={onCloseHarvest} />
          )} */}
        </>
      ) : (
        <div className="flex w-full">Please connect your wallet first</div>
      )}
    </div>
    // <Flex
    //   w="full"
    //   px={7}
    //   py={5}
    //   bg="dark.800"
    //   gap={10}
    //   flexDir={{ xs: "column", tablet: "row" }}
    // >
    //   {isLoggedIn ? (
    //     <>
    //       <Flex flex={1}>
    //         <StakedDetails />
    //       </Flex>
    //       <Flex h="full" alignItems={"center"} height="auto">
    //         <Button
    //           bg="dark.100"
    //           w={{ xs: "full", tablet: "auto" }}
    //           fontSize={"lsm"}
    //           onClick={handleHarvest}
    //         >
    //           {" "}
    //           withdraw
    //         </Button>
    //       </Flex>

    //       {isOpenHarvest && (
    //         <HarvestModal isOpen={isOpenHarvest} onClose={onCloseHarvest} />
    //       )}
    //     </>
    //   ) : (
    //     <Center w="full">Please connect your wallet first</Center>
    //   )}
    // </Flex>
  );
};

export default StakedInfo;
