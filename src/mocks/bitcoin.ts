import { BitcoinInterface } from "@/types/bitcoin.interface";

export const fakeBitcoin: BitcoinInterface = {
  name: 'Bitcoin',
  image: 'https://fakeurl.com/bitcoin.png',
  market_cap: 123456789,
  total_supply: 21000000,
  total_volume: 987654321,
  high_24h: 30000,
  low_24h: 25000,
  circulating_supply: 19500000
};