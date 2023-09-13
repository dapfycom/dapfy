import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectedNetwork } from "config/network";
import { AppState } from "redux/store";

export interface SwapLpState {
  fromField: {
    value: string;
    valueDecimals: string;
    selectedToken: string;
  };
  toField: {
    value: string;
    selectedToken: string;
  };
  slipage: number;
}

const initialState: SwapLpState = {
  fromField: {
    value: "",
    valueDecimals: "",
    selectedToken: selectedNetwork.tokensID.egld,
  },
  toField: {
    value: "",
    selectedToken: selectedNetwork.tokensID.bskwegld,
  },
  slipage: 1,
};

export const swapLp = createSlice({
  name: "swapLp",
  initialState,
  reducers: {
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
  },
});

export const selectFromFieldValue = (state: AppState) =>
  state.swapLp.fromField.value;
export const selectFromFieldSelectedToken = (state: AppState) =>
  state.swapLp.fromField.selectedToken;
export const selectToFieldValue = (state: AppState) =>
  state.swapLp.toField.value;
export const selectToFieldSelectedToken = (state: AppState) =>
  state.swapLp.toField.selectedToken;

export const selectFromField = (state: AppState) => state.swapLp.fromField;
export const selectToField = (state: AppState) => state.swapLp.toField;
export const selectSlippage = (state: AppState) => state.swapLp.slipage;

export const {
  onChageFromFieldValue,
  onChangeToField,
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValueDecimals,
} = swapLp.actions;
export default swapLp.reducer;
