import { createSlice } from "@reduxjs/toolkit";
import { CoinMarket } from "../../types/coins.interface";

export interface initialState {
  favoritesItems: CoinMarket[];
}
const initialState: initialState = {
  favoritesItems: localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems")!)
    : [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    switchFavorite: (state, action) => {
      let favoritesIndex = state.favoritesItems.findIndex(
        (item: CoinMarket) => item?.id === action.payload?.id
      );

      if (favoritesIndex >= 0) {
        const updatedFavorites = state.favoritesItems?.filter(
          (item: CoinMarket) => item?.id !== action.payload?.id
        );

        state.favoritesItems = updatedFavorites;

        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(state.favoritesItems)
        );
      } else {
        let assembledItem;
        assembledItem = { ...action.payload };
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
