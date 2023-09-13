import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectedNetwork } from "config/network";
import { AppState } from "redux/store";

export interface CoinFlipState {
  selectedCoinSide: boolean;
  token: string;
  amount: string;
  lastHouseSelection?: boolean;
}

const initialState: CoinFlipState = {
  amount: null,
  selectedCoinSide: true,
  token: selectedNetwork.tokensID.bsk,
  lastHouseSelection: null,
};

export const CoinFlip = createSlice({
  name: "CoinFlip",
  initialState,
  reducers: {
    changeUserAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    changeUserCoinSide: (state, action: PayloadAction<boolean>) => {
      state.selectedCoinSide = action.payload;
    },
    setHouseSelectionSide: (state, action: PayloadAction<boolean>) => {
      state.lastHouseSelection = action.payload;
    },
  },
});

export const selectCoinFlipBetAmount = (state: AppState) =>
  state.coinFlip.amount;
export const selectCoinFlipSide = (state: AppState) =>
  state.coinFlip.selectedCoinSide;
export const selectLastHouseSelection = (state: AppState) =>
  state.coinFlip.lastHouseSelection;
export const selectCoinFlipTokenStr = (state: AppState) => state.coinFlip.token;

export const { changeUserCoinSide, changeUserAmount, setHouseSelectionSide } =
  CoinFlip.actions;
export default CoinFlip.reducer;
