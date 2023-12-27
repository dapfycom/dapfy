import {
  AbiRegistry,
  Address,
  ArgSerializer,
  ContractFunction,
  EndpointParameterDefinition,
  IAddress,
  ResultsParser,
  SmartContract,
  TypeExpressionParser,
  TypeMapper,
} from "@multiversx/sdk-core/out";
import { WspTypes, getInterface, provider } from "../index";

export const fetchScSimpleData = async <T>(scInfo: string, args?: any[]) => {
  const scInfoArr = scInfo.split(":");
  const scWsp = scInfoArr[0] as WspTypes;
  const funcName = scInfoArr[1];

  const res: any = await scQuery(scWsp, funcName, args);

  const { firstValue } = res;
  const data: T = firstValue?.valueOf();

  return data;
};

export const scQuery = async (
  workspace: WspTypes,
  funcName = "",
  args: any[] = []
) => {
  try {
    const { address, abiUrl } = getInterface(workspace);
    const abiRegistry = await AbiRegistry.create(abiUrl);
    const contract = new SmartContract({
      address: address as IAddress,
      abi: abiRegistry,
    });

    let interaction = contract.methods[funcName](args);
    const query = interaction.check().buildQuery();
    const queryResponse = await provider.queryContract(query);

    const data = new ResultsParser().parseQueryResponse(
      queryResponse,
      interaction.getEndpoint()
    );

    return data;
  } catch (error) {
    console.log(`query error for ${funcName}  : `, error);
    throw error;
  }
};
export const scSimpleQuery = async (
  scAddress: string,
  funcName: string,
  args: any[] = [],
  pureReturn: boolean = false
) => {
  try {
    const contractAddress = new Address(scAddress);
    const contract = new SmartContract({ address: contractAddress });

    const query = contract.createQuery({
      func: new ContractFunction(funcName),
      args: args,
    });
    const resultsParser = new ResultsParser();

    const queryResponse = await provider.queryContract(query);
    if (pureReturn) {
      return queryResponse;
    }
    const bundle = resultsParser.parseUntypedQueryResponse(queryResponse);

    return bundle;
  } catch (error) {
    console.log(error);
  }
};

export const scQueryByFieldsDefinitions = async (
  workspace: WspTypes,
  funcName = "",
  args: any[] = [],
  dataFields?: any[]
) => {
  const { address: scAddress, abiUrl } = getInterface(workspace);
  const abiRegistry = await AbiRegistry.create(abiUrl);
  const contract = new SmartContract({
    address: scAddress as IAddress,
    abi: abiRegistry,
  });

  const query = contract.createQuery({
    func: new ContractFunction(funcName),
    args: args,
  });

  const queryResponse = await provider.queryContract(query);

  const response = queryResponse.returnData
    .map((item: string) => Buffer.from(item, "base64").toString("hex"))
    .join("@");
  const serializer = new ArgSerializer();
  const typeParser = new TypeExpressionParser();
  const typeMapper = new TypeMapper();

  if (!dataFields) {
    return { response, queryResponse };
  }
  const fieldDefinitions = dataFields.map(
    ([name, expression]: [string, string]) =>
      new EndpointParameterDefinition(
        name,
        "",
        typeMapper.mapType(typeParser.parse(expression))
      )
  );

  const parsed = serializer.stringToValues(response, fieldDefinitions);

  return parsed;
};
