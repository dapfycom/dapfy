import ActionButton from "components/ActionButton/ActionButton";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { maxAllowedTokensCount } from "views/DustView/lib/contants";
import {
  selectConvertInfo,
  selectOutputToken,
} from "views/DustView/lib/dust-slice";
import { useSelectableDustTokens } from "views/DustView/lib/hooks";

const SelectAllTokens = () => {
  const { finalTokens } = useSelectableDustTokens();
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectConvertInfo);

  const handleSelectAll = () => {
    if (
      selectedTokens.length >= maxAllowedTokensCount ||
      finalTokens.length === selectedTokens.length
    ) {
      dispatch(
        selectOutputToken({
          data: finalTokens,
          isCheked: false,
        })
      );
    } else {
      const allSelctedTpkens = finalTokens.slice(0, maxAllowedTokensCount);

      dispatch(
        selectOutputToken({
          data: allSelctedTpkens,
          isCheked: true,
        })
      );
    }
  };
  return (
    <ActionButton onClick={handleSelectAll} fontSize={"lsm"}>
      Select All
    </ActionButton>
  );
};

export default SelectAllTokens;
