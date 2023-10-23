import { selectedNetwork } from "@/config/network";
import { AppState } from "@/redux/store";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface SwapState {
  fromField: {
    value: string;
    valueDecimals: string;
    selectedToken: string;
  };
  toField: {
    value: string;
    selectedToken: string;
    valueDecimals: string;
  };
  rate: number;
  slipage: number;
}

const initialState: SwapState = {
  fromField: {
    value: "",
    valueDecimals: "",
    selectedToken: selectedNetwork.tokensID.egld,
  },
  toField: {
    value: "",
    selectedToken: selectedNetwork.tokensID.bsk,
    valueDecimals: "",
  },
  rate: 0,
  slipage: 5,
};

export const swapAggregator = createSlice({
  name: "swap-aggregator",
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    changeFromFieldToken: (state, action: PayloadAction<string>) => {
      state.fromField.selectedToken = action.payload;
    },
    changeToFieldToken: (state, action: PayloadAction<string>) => {
      state.toField.selectedToken = action.payload;
    },
    onChageFromFieldValue: (state, action: PayloadAction<string>) => {
      state.fromField.value = action.payload;
    },
    onChageFromFieldValueDecimals: (state, action: PayloadAction<string>) => {
      state.fromField.valueDecimals = action.payload;
    },
    onChangeToField: (state, action: PayloadAction<string>) => {
      state.toField.value = action.payload;
    },
    onChangeToFieldValueDecimals: (state, action: PayloadAction<string>) => {
      state.toField.valueDecimals = action.payload;
    },
    onSwapFields: (state) => {
      const from = current(state.fromField);
      const to = current(state.toField);

      state.fromField.selectedToken = to.selectedToken;
      state.fromField.value = to.value;
      state.fromField.valueDecimals = to.valueDecimals;

      state.toField.selectedToken = from.selectedToken;
    },
  },
});

export const selectFromFieldValue = (state: AppState) =>
  state.swapAggregator.fromField.value;
export const selectFromFieldValueDecimals = (state: AppState) =>
  state.swapAggregator.fromField.valueDecimals;
export const selectFromFieldSelectedToken = (state: AppState) =>
  state.swapAggregator.fromField.selectedToken;
export const selectToFieldValue = (state: AppState) =>
  state.swapAggregator.toField.value;
export const selectToFieldSelectedToken = (state: AppState) =>
  state.swapAggregator.toField.selectedToken;

export const selectFromField = (state: AppState) =>
  state.swapAggregator.fromField;
export const selectToField = (state: AppState) => state.swapAggregator.toField;
export const selectSlippage = (state: AppState) => state.swapAggregator.slipage;

export const {
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  changeFromFieldToken,
  changeToFieldToken,
  setRate,
  onChangeToFieldValueDecimals,
  onSwapFields,
} = swapAggregator.actions;
export default swapAggregator.reducer;
