import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./reducers/favoritesSlice";
import searchSlice from "./reducers/searchSlice";
import searchPageSlice from "./reducers/searchPageSlice";

const store = configureStore({
  reducer: {
    searchList: searchSlice,
    favoritesList: favoritesSlice,
    searchPage: searchPageSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
