import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TInitialState = {
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
};

const initialState: TInitialState = {
  timeLeft: 25 * 60,
  isBreak: false,
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimer: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    setIsRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    setIsBreak: (state) => {
      state.isBreak = !state.isBreak;
    },
  },
});

export const { setIsBreak, setIsRunning, setTimer } = timerSlice.actions;
export const selectTimer = (state: RootState) => state.timer;
const timerReducer = timerSlice.reducer;
export default timerReducer;
