export enum topSevenTrendsColumns {
  position = 'Position',
  logo = 'Logo',
  name = 'Nom',
  symbol = "24h",
  rank = "Classement",
}

export type topSevenTrendsColumnsKey = keyof typeof topSevenTrendsColumns;
export const topSevenTrendsColumnsKeys = Object.keys(topSevenTrendsColumns) as Array<keyof typeof topSevenTrendsColumns>; 