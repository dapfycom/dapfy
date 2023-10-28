import { AppState } from "@/redux/store";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export const reducerName = "defi";

interface IDefiState {
  isDepositModal: {
    status: boolean;
    tokenI: string;
  }[];
}

const initialState: IDefiState = {
  isDepositModal: [],
};

export const defi = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    updateDepositModalState: (
      state,
      action: PayloadAction<{ status: boolean; tokenI: string }>
    ) => {
      const currentState = current(state.isDepositModal);
      const currentDepositModalIndex = currentState.findIndex(
        (item) => item.tokenI === action.payload.tokenI
      );

      if (currentDepositModalIndex === -1) {
        state.isDepositModal = [...currentState, action.payload];
      } else {
        state.isDepositModal[currentDepositModalIndex] = action.payload;
      }
    },
  },
});

export const selectisDepositModal = (state: AppState) =>
  state.defi.isDepositModal;

// Action creators are generated for each case reducer function
export const { updateDepositModalState } = defi.actions;

export default defi.reducer;
