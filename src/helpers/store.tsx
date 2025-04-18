import { ReactElement } from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import searchPageReducer from '@/store/reducers/searchPageSlice';
import favoritesReducer from '@/store/reducers/favoritesSlice';
import searchReducer from '@/store/reducers/searchSlice';

export const createMockStore = (initialPage = 1) => {
  return configureStore({
    reducer: {
      searchPage: searchPageReducer,
      favoritesList: favoritesReducer,
      searchList: searchReducer,
    },
    preloadedState: {
      searchPage: { page: initialPage },
      favoritesList: { favoritesItems: [] },
      searchList: { searchResults: [] },
    },
  });
};

// Rend un composant avec un store mocké, et retourne store + spy
export const renderWithStore = (Component: ReactElement, page = 1) => {
  const store = createMockStore(page);
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      {Component}
    </Provider>
  );

  return { store, dispatchSpy };
};
