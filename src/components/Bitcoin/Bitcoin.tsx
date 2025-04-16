import HistoryChart from "../HistoryChart/HistoryChart";
import type { BitcoinInterface } from "@/types/bitcoin.interface";
import { convert, formatToUpperCase, toNumericValue } from "@/utils/convert";
import "./Bitcoin.scss";
import { bitcoinColumnsKeys } from "src/constants/bitcoin";
import { valueOrDefault } from "chart.js/dist/helpers/helpers.core";

const TableRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <td className="color-gold">
    {label === "circulating_supply"
      ? value.toLocaleString()
      : convert(toNumericValue(value).toFixed(2))}{" "}
    €
  </td>
);

const Bitcoin: React.FunctionComponent<{ bitcoin: BitcoinInterface }> = ({ bitcoin }) => {

  return (
    <div className="bitcoin">
      <div className="bitcoin__title">
        <img
          src={bitcoin.image}
          className="bitcoin__img"
          alt={bitcoin.name}
        />
      </div>

      <table className="bitcoin__table">
        <thead>
          <tr>
            {bitcoinColumnsKeys.map((col, index) => (
              <th key={index}>{formatToUpperCase(col)} :</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bitcoin__table-body">
            <TableRow label="market_cap" value={bitcoin.market_cap} />
            <TableRow label="total_supply" value={bitcoin.total_supply} />
            <TableRow label="total_volume" value={bitcoin.total_volume} />
            <TableRow label="high_24h" value={bitcoin.high_24h} />
            <TableRow label="low_24h" value={bitcoin.low_24h} />
            <TableRow label="circulating_supply" value={bitcoin.circulating_supply} />
          </tr>
        </tbody>
      </table>
      <HistoryChart coin={bitcoin.name} />
    </div>
  );
};

export default Bitcoin;