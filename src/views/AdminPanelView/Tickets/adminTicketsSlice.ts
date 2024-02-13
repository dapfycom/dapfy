import { AppState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TicketState {
  selectedTicketId: string;
}

const initialState: TicketState = {
  selectedTicketId: "",
};

export const ticket = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setSelectedTicketId: (state, action: PayloadAction<string>) => {
      state.selectedTicketId = action.payload;
    },
  },
});

export const selectSelectedTicketId = (state: AppState) =>
  state.adminTicket.selectedTicketId;

export const { setSelectedTicketId } = ticket.actions;
export default ticket.reducer;
