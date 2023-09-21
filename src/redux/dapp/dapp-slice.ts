import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import Cookies from "js-cookie";

export interface GeneralState {
  isLoginModal: boolean;
  userAddress: string;
  sidebarMenu: boolean;
  shard: number;
  slippage: number;
}

const initialState: GeneralState = {
  isLoginModal: false,
  userAddress: "",
  sidebarMenu: false,
  shard: 1,
  slippage: Cookies.get("dapp-slippage")
    ? Number(Cookies.get("dapp-slippage"))
    : 2,
};

export const dapp = createSlice({
  name: "dapp",
  initialState,
  reducers: {
    openLogin: (state, action: PayloadAction<boolean>) => {
      state.isLoginModal = action.payload;
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    setShard: (state, action: PayloadAction<number>) => {
      state.shard = action.payload;
    },

    setSidebarMenu: (state, action: PayloadAction<boolean>) => {
      state.sidebarMenu = action.payload;
    },

    updateDappSlippage: (state, action: PayloadAction<number>) => {
      Cookies.set("dapp-slippage", action.payload.toString(), {
        expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
      });
      state.slippage = action.payload;
    },
  },
});

export const selectIsLoginModal = (state: AppState) => state.dapp.isLoginModal;
export const selectUserAddress = (state: AppState) => state.dapp.userAddress;
export const selectDappSlippage = (state: AppState) => state.dapp.slippage;
export const {
  openLogin,
  setUserAddress,
  setSidebarMenu,
  setShard,
  updateDappSlippage,
} = dapp.actions;
export default dapp.reducer;
