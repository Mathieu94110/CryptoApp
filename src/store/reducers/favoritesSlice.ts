import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarketData } from "src/models/coins";

export interface favoritesSliceProps {
  favoritesItems: MarketData[];
}
const initialState: favoritesSliceProps = {
  favoritesItems: localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems")!)
    : [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    switchFavorite: (state, action: PayloadAction<MarketData>) => {
      let favoritesIndex = state.favoritesItems.findIndex(
        (item: MarketData) => item?.id === action.payload?.id
      );

      if (favoritesIndex >= 0) {
        const updatedFavorites = state.favoritesItems?.filter(
          (item: MarketData) => item?.id !== action.payload?.id
        );

        state.favoritesItems = updatedFavorites;

        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(state.favoritesItems)
        );
      } else {
        let assembledItem = { ...action.payload };
        state.favoritesItems.push(assembledItem);
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(state.favoritesItems)
        );
      }
    },
    clearFavorites: (state) => {
      state.favoritesItems = [];
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoritesItems)
      );
    },
  },
});

export const { switchFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
