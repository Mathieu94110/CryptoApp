import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  page: number;
}
const initialState: initialState = {
  page: 1,
};

export const searchPageSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { changePage } = searchPageSlice.actions;

export default searchPageSlice.reducer;
