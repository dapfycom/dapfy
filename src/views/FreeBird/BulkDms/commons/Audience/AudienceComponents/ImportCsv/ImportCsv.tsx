import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import {
  DotIcon,
  FileIcon,
  TipsIcon,
  UploadFIleIcon,
} from "components/icons/ui-icons";
import { useEffect, useState } from "react";
import { CSVPreview, parseCSV } from "views/FreeBird/BulkDms/utils/functions";
import CustomInputFile from "views/FreeBird/commons/CustomInputFile";

const ImportCsv = () => {
  const [file, setfile] = useState(null);
  const [preview, setPreview] = useState<CSVPreview | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csvText = reader.result as string;
        const csvPreview = parseCSV(csvText);
        setPreview(csvPreview);
      };
    }
  }, [file]);

  return (
    <Flex flexDir={"column"}>
      <Card variant="elevated" mb={5}>
        <CardBody>
          <Flex gap={2} alignItems="center" mb={2}>
            <TipsIcon fontSize={"2xl"} color="green.500" />
            <Heading fontSize={"md"}>
              Insert into your CSV a list of Twitter handles:
            </Heading>
          </Flex>
          <Flex gap={8}>
            <Box></Box>
            <List spacing={3} fontSize="14px">
              <ListItem>
                <ListIcon as={DotIcon} color="green.500" fontSize={"sm"} />
                One user on each row
              </ListItem>
              <ListItem>
                <ListIcon as={DotIcon} color="green.500" fontSize={"sm"} />
                The first column must be the user @handle
              </ListItem>
              <ListItem>
                <ListIcon as={DotIcon} color="green.500" fontSize={"sm"} />
                The following columns define the custom variables
              </ListItem>
              <ListItem>
                <ListIcon as={DotIcon} color="green.500" fontSize={"sm"} />
                Variable names are case insensitive
              </ListItem>
            </List>
          </Flex>
        </CardBody>
      </Card>
      <Flex flexDir={"column"} overflow={"auto"}>
        <CustomInputFile
          placeholder="Select the CSV file..."
          onChangeFile={(file) => setfile(file)}
        />

        {preview && (
          <Box overflow={"auto"} mt={4}>
            <Text fontStyle={"italic"} fontSize="xs" mb={3}>
              {preview.length} rows
            </Text>
            <Flex mb={4}>
              <Icon as={FileIcon} fontSize="15px" mr={2} />
              <Text>File Preview</Text>
            </Flex>
            <Table overflow={"auto"}>
              <Thead>
                <Tr>
                  {preview.headers.map((header) => (
                    <Th key={header}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {preview.rows.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {preview.headers.map((header, columnIndex) => (
                      <Td key={`${rowIndex}-${columnIndex}`}>
                        {row[header].length > 10
                          ? row[header].slice(0, 10) + "..."
                          : row[header]}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
        {file && (
          <Flex w="full" justifyContent={"flex-end"} mt={6}>
            <ActionButton>
              <Icon as={UploadFIleIcon} fontSize="25px" /> Upload
            </ActionButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ImportCsv;
