export interface BitcoinInterface {
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
