import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchCoin } from "src/models/coins";

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
    getSearchResult: (state, action: PayloadAction<SearchCoin[]>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { getSearchResult } = searchSlice.actions;

export default searchSlice.reducer;
