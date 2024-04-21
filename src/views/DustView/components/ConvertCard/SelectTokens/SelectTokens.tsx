import { Card, CardContent } from "@/components/ui/card";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useAppSelector } from "@/hooks/useRedux";
import { selectConvertInfo } from "@/views/DustView/lib/dust-slice";
import { useSelectableDustTokens } from "@/views/DustView/lib/hooks";
import { Loader2 } from "lucide-react";
import RowToken from "./RowToken";

const elementsByRow = (width: number) => {
  if (width > 1024) {
    return 5;
  }
  if (width > 768) {
    return 4;
  }
  if (width > 640) {
    return 3;
  }

  return 2;
};

const SelectTokens = () => {
  const selectedTokens = useAppSelector(selectConvertInfo);
  const { finalTokens, isLoading } = useSelectableDustTokens();
  const width = useBreakpoint();

  const elements = elementsByRow(width);

  return (
    <Card className="text-left">
      <CardContent className="space-y-2 pt-7 px-4 md:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center w-full min-h-[400px]">
            <Loader2 className="animate-ping" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {finalTokens.map((token, index) => {
                const element = index + 1;
                return (
                  <RowToken
                    key={token.identifier}
                    token={token}
                    checked={Boolean(
                      selectedTokens.find(
                        (selectedT) => selectedT.identifier === token.identifier
                      )
                    )}
                    style={{
                      borderTop:
                        element < elements + 1
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",
                      borderBottom:
                        finalTokens.length - element <
                        (finalTokens.length % elements === 0
                          ? elements
                          : finalTokens.length % elements)
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",

                      borderLeft:
                        element % elements === 1
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",

                      borderRight:
                        element % elements === 0
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",
                    }}
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
