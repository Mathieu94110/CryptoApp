import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { changePage } = searchPageSlice.actions;

export default searchPageSlice.reducer;
