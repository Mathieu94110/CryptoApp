export enum largeScreenBitcoinColumns {
  market_cap = 'Capitalisation',
  coin = 'Jeton',
  dayVolume = "volume(24H)",
  dayMax = "max 24h",
  dayMin = "min 24h",
  circulatingSupply = "en circulation"
}
export enum smallScreenBitcoinColumns {
  market_cap = 'cap(24h)',
  coin = 'jeton',
  dayVolume = "vol",
  dayMax = "max",
  dayMin = "min",
  circulatingSupply = "dispo"
}

export type bitcoinColumnsKey = keyof typeof smallScreenBitcoinColumns;
export const smallScreenBitcoinColumnsKeys = Object.keys(smallScreenBitcoinColumns) as Array<keyof typeof smallScreenBitcoinColumns>;
export const largeScreenBitcoinColumnsKeys = Object.keys(largeScreenBitcoinColumns) as Array<keyof typeof largeScreenBitcoinColumns>;

export interface Bitcoin {
  readonly name: string;
  readonly image: string;
  readonly circulating_supply: number;
  readonly market_cap: number;
  readonly total_supply: number;
  readonly total_volume: number;
  readonly low_24h: number;
  readonly high_24h: number;
}

export interface BitcoinChartsData {
  day: BitcoinCharts[];
  week: BitcoinCharts[];
  year: BitcoinCharts[];
}

export interface BitcoinCharts {
  t: number;
  y: string;
}
export interface BitcoinChartsProps {
  data: BitcoinChartsData;
}
export interface Chart {
  lineHeightAnnotation: {
    always: boolean;
    hover: boolean;
    lineWeight: number;
  };

  animation: {
    duration: number;
  };
  maintainAspectRatio: boolean;
  responsive: boolean;
  scales: {
    xAxes: [
      {
        type: string;
        distribution: string;
        gridLines: {
          color: string;
        };
        ticks: {
          fontColor: string;
        };
      }
    ];
    yAxes: [
      {
        gridLines: {
          color: string;
        };
        ticks: {
          fontColor: string;
        };
      }
    ];
  };
}
