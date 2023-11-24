import { selectedNetwork } from "@/config/network";
import { AppState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const reducerName = "dust";

interface IdustState {
  toToken: string;
  convertInfo: {
    identifier: string;
    balance: string;
  }[];
  slipage: number;
}

const initialState: IdustState = {
  toToken: selectedNetwork.tokensID.wegld, // token that user wants to receive
  convertInfo: [],
  slipage: 2,
};

export const dust = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    selectToToken: (state, action: PayloadAction<string>) => {
      if (state.toToken === action.payload) return;
      state.toToken = action.payload;
      // state.convertInfo = [];
    },

    selectOutputToken: (
      state,
      action: PayloadAction<{
        isCheked: boolean;
        data:
          | {
              identifier: string;
              balance: string;
            }
          | {
              identifier: string;
              balance: string;
            }[];
      }>
    ) => {
      if (!Array.isArray(action.payload.data)) {
        if (action.payload.isCheked) {
          state.convertInfo = [
            ...state.convertInfo,
            {
              ...action.payload.data,
            },
          ];
        } else {
          state.convertInfo = state.convertInfo.filter(
            (tokenI) =>
              tokenI.identifier !==
              (
                action.payload.data as {
                  identifier: string;
                  balance: string;
                }
              ).identifier
          );
        }
      } else {
        if (action.payload.isCheked) {
          state.convertInfo = action.payload.data;
        } else {
          state.convertInfo = state.convertInfo.filter(
            (tokenI) =>
              !(
                action.payload.data as {
                  identifier: string;
                  balance: string;
                }[]
              )
                .map((token) => token.identifier)
                .includes(tokenI.identifier)
          );
        }
      }
    },

    setSlipage: (state, action: PayloadAction<number>) => {
      state.slipage = action.payload;
    },
  },
});

export const selectConvertInfo = (state: AppState) => state.dust.convertInfo;

export const selectToTokenDust = (state: AppState) => state.dust.toToken;

export const selectDustSlippage = (state: AppState) => state.dust.slipage;

// Action creators are generated for each case reducer function
export const { selectOutputToken, selectToToken, setSlipage } = dust.actions;

export default dust.reducer;
