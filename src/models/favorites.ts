export const ADD_CRYPTO = "ADD_CRYPTO";
export const DELETE_CRYPTO = "DELETE_CRYPTO";

export interface FavoritesData {
  id?: number;
  image?: string;
  name?: string;
  symbol?: string;
  current_price?: number;
}
export interface FavoritesCryptoActionTypes {
  type: string;
  payload: FavoritesData;
  data: FavoritesData[];
}
export interface FavoritesCryptoState {
  readonly data: FavoritesData[];
}

export interface AddCryptoSuccess {
  type: typeof ADD_CRYPTO;
  payload: FavoritesData;
}
/*  interface DELETE CRYPTO */
export interface DeleteCryptoSuccess {
  type: typeof DELETE_CRYPTO;
  payload: FavoritesData;
}
export type FavoritesCryptoTypes = AddCryptoSuccess | DeleteCryptoSuccess;
