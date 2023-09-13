import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import React from "react";

interface IProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: IProps) => {
  const ref: any = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  return (
    <Box
      bg="#363741"
      borderRadius={"xl"}
      border="1px"
      borderColor="whiteT.100"
      py="30px"
      px="20px"
      ref={ref}
    >
      <Heading fontSize={"md"} mb="10px" fontWeight={500} color="white">
        Transaction Settings
      </Heading>
      <Text fontSize={"lsm"} mb="20px">
        Slippage tolerance
      </Text>
      <Flex alignItems={"center"} gap="9px">
        <ActionButton borderRadius={"full"} fontSize="lsm">
          Auto
        </ActionButton>
        <Box>
          <InputGroup
            w="190px"
            bg="dark.400"
            py="10px"
            px="15px"
            borderRadius={"full"}
          >
            <Input pr="6" variant={"unstyled"} textAlign="right" />
            <InputRightElement pr="10px" children={<Text>%</Text>} />
          </InputGroup>
        </Box>
      </Flex>
    </Box>
  );
};

export default SettingsModal;
