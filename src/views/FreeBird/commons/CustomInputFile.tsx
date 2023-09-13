import { CloseIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { FileIcon } from "components/icons/ui-icons";
import React, { ChangeEvent, useRef, useState } from "react";

interface IProps {
  onChangeFile?: (file: File | null) => void;
  placeholder?: string;
}

const CustomInputFile: React.FC<IProps> = ({ onChangeFile, placeholder }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === "text/csv") {
        setSelectedFile(file);
        if (onChangeFile) {
          onChangeFile(file);
        }
      } else {
        alert("Please select a CSV file.");
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleRemoveFile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (onChangeFile) {
      onChangeFile(selectedFile);
    }
  };

  return (
    <Flex
      alignItems={"center"}
      onClick={handleButtonClick}
      border="1px solid"
      borderColor={"blackT.200"}
      w="full"
      px={4}
      py={2}
      borderRadius="md"
      cursor={"pointer"}
    >
      <Icon as={FileIcon} fontSize="30px" mr={2} />
      <Box flex={1} color="blackT.400">
        {selectedFile ? (
          <Text>{selectedFile.name}</Text>
        ) : (
          <Text>{placeholder}</Text>
        )}
      </Box>

      <Center
        boxSize={"30px"}
        bg="blackT.100"
        borderRadius={"base"}
        onClick={handleRemoveFile}
      >
        <Icon as={CloseIcon} fontSize="14px" />
      </Center>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept="text/csv"
      />
    </Flex>
  );
};

export default CustomInputFile;
