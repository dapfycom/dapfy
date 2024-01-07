import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useRedux";
import { selectConvertInfo } from "@/views/DustView/lib/dust-slice";
import { useSelectableDustTokens } from "@/views/DustView/lib/hooks";
import { Loader2 } from "lucide-react";
import RowToken from "./RowToken";

const SelectTokens = () => {
  const selectedTokens = useAppSelector(selectConvertInfo);
  const { finalTokens, isLoading } = useSelectableDustTokens();

  return (
    <Card className="text-left">
      <CardContent className="space-y-2 pt-7 px-4 md:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center w-full min-h-[400px]">
            <Loader2 className="animate-ping" />
          </div>
        ) : (
          <>
            <div className="flex  gap-4 flex-wrap">
              {finalTokens.map((token) => {
                return (
                  <RowToken
                    key={token.identifier}
                    token={token}
                    checked={Boolean(
                      selectedTokens.find(
                        (selectedT) => selectedT.identifier === token.identifier
                      )
                    )}
                  />
                );
              })}
            </div>

            {finalTokens.length === 0 && (
              <div className="flex items-center justify-center w-full min-h-[200px]">
                <p className="text-center text-lg">No tokens found</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>

    // <Card
    //   as={Flex}
    //   flexDir={"column"}
    //   gap={"17px"}
    //   py={5}
    //   maxH="500px"
    //   overflow={"auto"}
    //   rounded="xl"
    //   px={{ xs: "12px", md: "20px" }}
    // >
    //   {isLoading ? (
    //     <Center w="full" minH="400px">
    //       <Spinner />
    //     </Center>
    //   ) : (
    //     <Flex flexDir={"column"}>
    //       <Text mb={3} mt={4} color="white">
    //         Your dust
    //       </Text>
    //       <Divider mb={3} borderColor={"rgba(f,f,f,0.1)"} />
    //       <CheckboxGroup
    //         colorScheme="green"
    //         value={selectedTokens.map((item) => item.identifier)}
    //       >
    //         <Stack>
    //           {finalTokens.map((token) => {
    //             return <RowToken key={token.identifier} token={token} />;
    //           })}
    //         </Stack>

    //         {finalTokens.length === 0 && (
    //           <Center w="full" minH="200px">
    //             <Text fontSize={"xl"} textAlign={"center"}>
    //               No tokens found
    //             </Text>
    //           </Center>
    //         )}
    //       </CheckboxGroup>
    //     </Flex>
    //   )}
    // </Card>
  );
};

export default SelectTokens;
