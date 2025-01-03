import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TInitialState = {
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
};

const initialState: TInitialState = {
  timeLeft: Number(process.env.NEXT_PUBLIC_FOCUS_TIME) * 60,
  isBreak: true,
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimer: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsBreak: (state, action: PayloadAction<boolean>) => {
      state.isBreak = action.payload;
    },
    resetTimer: (state) => {
      state.isBreak = initialState.isBreak;
      state.isRunning = initialState.isRunning;
      state.timeLeft = initialState.timeLeft;
    },
  },
});

export const { setIsBreak, setIsRunning, setTimer, resetTimer } =
  timerSlice.actions;
export const selectTimer = (state: RootState) => state.timer;
const timerReducer = timerSlice.reducer;
export default timerReducer;
