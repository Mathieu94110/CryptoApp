export enum SearchCryptoColumns {
  position = 'Classement',
  coin = 'Coin',
  price = 'Prix',
  period = "24h",
  cap = "Cap.",
  favorites = "Favoris",
}

export type SearchCryptoColumnsKey = keyof typeof SearchCryptoColumns;
export const SearchCryptoColumnsKeys = Object.keys(SearchCryptoColumns) as Array<keyof typeof SearchCryptoColumns>; 