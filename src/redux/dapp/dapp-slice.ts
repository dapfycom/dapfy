import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface GeneralState {
  isLoginModal: boolean;
  userAddress: string;
  sidebarMenu: boolean;
  shard: number;
}

const initialState: GeneralState = {
  isLoginModal: false,
  userAddress: "",
  sidebarMenu: false,
  shard: 1,
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
  },
});

export const selectIsLoginModal = (state: AppState) => state.dapp.isLoginModal;
export const selectUserAddress = (state: AppState) => state.dapp.userAddress;

export const { openLogin, setUserAddress, setSidebarMenu, setShard } =
  dapp.actions;
export default dapp.reducer;
