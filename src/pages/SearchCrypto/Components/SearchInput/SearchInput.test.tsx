import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import SearchInput from './SearchInput';
import { SearchCoins } from '@/apis/coinGecko';
import userEvent from "@testing-library/user-event";
import { renderWithStore } from 'src/helpers/store';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock('@/apis/coinGecko', () => ({
  SearchCoins: jest.fn(),
}));

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (fn: any) => fn,
}));

describe('SearchInput', () => {

  it('should display the entered value in the search field', async () => {
    renderWithStore(<SearchInput />);

    const input = screen.getByPlaceholderText('Rechercher un coin');
    fireEvent.change(input, { target: { value: 'bitcoin' } });

    expect(input).toHaveValue('bitcoin');
  });

  it('should call the API and update the results on store', async () => {
    const mockResults = [
      { id: 'bitcoin', name: 'Bitcoin', thumb: 'https://example.com/btc.png' },
    ];

    // Mock de l'API SearchCoins
    (SearchCoins as jest.Mock).mockResolvedValue(mockResults);

    const { store } = renderWithStore(<SearchInput />);

    const input = screen.getByPlaceholderText('Rechercher un coin');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'bit' } });
    });

    await waitFor(() => {
      const state = store.getState();
      expect(SearchCoins).toHaveBeenCalledWith('bit');
      expect(state.searchList.searchResults).toEqual(mockResults);
    });
  });

  it("should display 'Aucun résultat trouvé' if there are no results", async () => {
    // Mock de la réponse vide
    (SearchCoins as jest.Mock).mockResolvedValue([]);

    const { store } = renderWithStore(<SearchInput />);

    const input = screen.getByPlaceholderText('Rechercher un coin');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'coininexistant' } });
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.searchList.searchResults).toEqual([]);
    });

    await waitFor(() => {
      expect(screen.getByText('Aucun résultat trouvé')).toBeInTheDocument();
    });
  });

  it("should not call performSearch if the input is cleared", async () => {
    const SearchCoinsMock = jest
      .spyOn(require('@/apis/coinGecko'), 'SearchCoins')
      .mockResolvedValue([]);

    renderWithStore(<SearchInput />);

    const input = screen.getByPlaceholderText("Rechercher un coin");

    await act(async () => {
      fireEvent.change(input, { target: { value: "solana" } });
    });

    await waitFor(() => {
      expect(SearchCoinsMock).toHaveBeenCalledWith("solana");
    });

    await act(async () => {
      await userEvent.clear(input);
    });

    await waitFor(() => {
      expect(SearchCoinsMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should display the correct number of results based on the input", async () => {
    const mockSearchResults = [
      { id: "bitcoin", name: "Bitcoin", thumb: "https://bitcoin.jpg" },
      { id: "ethereum", name: "Ethereum", thumb: "https://ethereum.jpg" },
    ];

    jest.spyOn(require("@/apis/coinGecko"), "SearchCoins").mockResolvedValue(mockSearchResults);

    renderWithStore(<SearchInput />);

    userEvent.type(screen.getByPlaceholderText("Rechercher un coin"), "bitcoin");

    await waitFor(() => screen.getAllByRole("listitem"));

    const resultItems = screen.getAllByRole("listitem");
    expect(resultItems).toHaveLength(mockSearchResults.length);
  });
});