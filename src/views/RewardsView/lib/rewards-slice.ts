import { AppState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RewardsState {
  streakDialogOpen: boolean;
}

const initialState: RewardsState = {
  streakDialogOpen: false,
};

export const rewards = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    changeStreakDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.streakDialogOpen = action.payload;
    },
  },
});

export const selectFromFieldValue = (state: AppState) =>
  state.rewards.streakDialogOpen;

export const { changeStreakDialogOpen } = rewards.actions;
export default rewards.reducer;
