import coinFlipReducer from "@/views/CoinFlipView/lib/con-flip-slice";
import dustReducer from "@/views/DustView/lib/dust-slice";
import swapReducer from "@/views/SwapView/lib/swap-slice";
import swapLpReducer from "@/views/SwapView/lib/swapLp-slice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import dappReducer from "./dapp/dapp-slice";
export function makeStore() {
  return configureStore({
    reducer: {
      dapp: dappReducer,
      swap: swapReducer,
      swapLp: swapLpReducer,
      coinFlip: coinFlipReducer,
      dust: dustReducer,
    },
  });
}
const store = makeStore();
setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
