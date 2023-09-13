import { Box, Flex, Image, Input, Spinner, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { AngleDownIcon } from "components/icons/ui-icons";
import useGetAccountToken from "hooks/useGetAccountToken";
import useGetElrondToken from "hooks/useGetElrondToken";
import React, { lazy, useState } from "react";
import { IElrondAccountToken } from "types/elrond.interface";
import { formatBalance } from "utils/functions/formatBalance";
const SelectTokenModal = lazy(() => import("../SelectTokenModal"));

interface IProps {
  selectedTokenI: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    token?: IElrondAccountToken
  ) => void;
  onChangeToken: (t: string) => void;
  isLoadingInput?: boolean;
  disabeledTokenSelection?: boolean;
  onMax?: (t: IElrondAccountToken) => void;
}

const InputBox = ({
  selectedTokenI,
  value,
  onChange,
  onChangeToken,
  isLoadingInput,
  disabeledTokenSelection,
  onMax,
}: IProps) => {
  const [openTokensListModal, setOpenTokensListModal] = useState(false);

  const { elrondToken, isLoading } = useGetElrondToken(selectedTokenI);
  const { accountToken } = useGetAccountToken(selectedTokenI);

  const handleClose = () => {
    setOpenTokensListModal(false);
  };
  const handleOpen = () => {
    // set to true to allow the modal to open
    setOpenTokensListModal(true);
  };

  return (
    <>
      <Box
        bg="whiteT.50"
        borderRadius={{ xs: "md", md: "lg" }}
        p={"20px"}
        border={"1px"}
        borderColor="whiteT.100"
      >
        <Flex w="full" mb="20px" gap="15px" justifyContent={"flex-end"}>
          {isLoadingInput ? (
            <Flex flex={1}>
              <Spinner />
            </Flex>
          ) : (
            <Input
              variant={"unstyled"}
              flex={1}
              placeholder="0.0"
              fontSize={{ xs: "2xl", lg: "4xl" }}
              value={value}
              onChange={(e) => onChange(e, accountToken as IElrondAccountToken)}
              color="white"
            />
          )}
          <ActionButton
            borderRadius={{ xs: "10px", lg: "20px" }}
            px={{ xs: "10px", md: "20px" }}
            py="15px"
            bg={disabeledTokenSelection ? "dark.300" : "dark.100"}
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            h="auto"
            onClick={handleOpen}
            noRipple={disabeledTokenSelection}
            cursor={disabeledTokenSelection ? "default" : "pointer"}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Flex
                  gap={{ xs: "5px", md: "10px" }}
                  alignItems="center"
                  mr={2}
                >
                  <Image
                    src={elrondToken?.assets?.svgUrl}
                    alt={elrondToken?.ticker}
                    w={{ xs: "18px", lg: "40px" }}
                  />
                  <Text fontSize={{ xs: "md", lg: "xl" }}>
                    {elrondToken?.ticker}
                  </Text>
                </Flex>
                {!disabeledTokenSelection && (
                  <AngleDownIcon fontSize={{ xs: "13px", lg: "17px" }} />
                )}
              </>
            )}
          </ActionButton>
        </Flex>
        {accountToken && (
          <Flex justifyContent={"flex-end"}>
            <Text
              fontSize={{ xs: "xs", lg: "lg" }}
              onClick={() => onMax(accountToken as IElrondAccountToken)}
              cursor="pointer"
            >
              Balance: {formatBalance(accountToken)}
            </Text>
          </Flex>
        )}
      </Box>

      {openTokensListModal && !disabeledTokenSelection && (
        <SelectTokenModal
          isOpen={openTokensListModal}
          onClose={handleClose}
          selectToken={(t) => {
            handleClose();
            onChangeToken(t);
          }}
        />
      )}
    </>
  );
};

export default InputBox;
