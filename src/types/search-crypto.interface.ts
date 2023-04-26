import { FavoritesData } from "./favorites.interface";

export const SEARCH_CRYPTO_LOADING = "SEARCH_CRYPTO_LOADING";
export const SEARCH_CRYPTO_FAIL = "SEARCH_CRYPTO_FAIL";
export const SEARCH_CRYPTO_UNDEFINED = "SEARCH_CRYPTO_UNDEFINED";
export const SEARCH_CRYPTO_SUCCESS = "SEARCH_CRYPTO_SUCCESS";
export const SET_ERROR = "SET_ERROR";

export type SearchCryptoData = {};

export interface SearchCryptoProps {
  data: FavoritesData;
}

export interface SearchCryptoError {
  cod: string;
  message: string;
}

export interface SearchCryptoState {
  data: SearchCryptoData | null;
  loading: boolean;
  message?: string;
}

export interface SearchCryptoLoading {
  type: typeof SEARCH_CRYPTO_LOADING;
}
export interface SearchCryptoFail {
  type: typeof SEARCH_CRYPTO_FAIL;
}
//

export interface SearchCryptoSuccess {
  type: typeof SEARCH_CRYPTO_SUCCESS;
  payload: SearchCryptoData;
}

export type SearchCryptoActions =
  | SearchCryptoLoading
  | SearchCryptoFail
  | SearchCryptoSuccess;
