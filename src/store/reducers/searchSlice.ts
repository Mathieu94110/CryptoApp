import { createSlice } from "@reduxjs/toolkit";
import { SearchCoin } from "@/types/coins.interface";

export interface searchSliceProps {
  searchResults: SearchCoin[];
}
const initialState: searchSliceProps = {
  searchResults: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchResult: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { getSearchResult } = searchSlice.actions;

export default searchSlice.reducer;
