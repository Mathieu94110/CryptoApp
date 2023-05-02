import { createSlice } from "@reduxjs/toolkit";
import { SearchCoin } from "../../types/coins.interface";

export interface initialState {
  page: number;
}
const initialState: initialState = {
  page: 1,
};

export const searchPagesSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { changePage } = searchPagesSlice.actions;

export default searchPagesSlice.reducer;
