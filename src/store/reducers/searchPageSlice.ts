import { createSlice } from "@reduxjs/toolkit";

export interface searchPageSliceProps {
  page: number;
}
const initialState: searchPageSliceProps = {
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
