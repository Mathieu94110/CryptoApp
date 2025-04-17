import HistoryChart from "../HistoryChart/HistoryChart";
import type { BitcoinInterface } from "@/types/bitcoin.interface";
import { convert, formatToUpperCase, toNumericValue } from "@/utils/convert";
import "./Bitcoin.scss";
import { bitcoinColumnsKeys, smallScreenBitcoinColumnsKeys } from "src/constants/bitcoin";
import { useResize } from "@/hooks/useResize";

const TableRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => {
  const priceLabels = ["market_cap", "high_24h", "low_24h"];
  const formattedValue = label === "circulating_supply"
    ? value.toLocaleString()
    : convert(toNumericValue(value).toFixed(2));

  return (
    <td>
      <span className="color-secondary"> {formattedValue}{priceLabels.includes(label) ? '€' : ''}</span>
    </td>
  );
};


const Bitcoin: React.FunctionComponent<{ bitcoin: BitcoinInterface }> = ({ bitcoin }) => {
  const { screenSize } = useResize();
  const columnsKeys = screenSize >= 600 ? bitcoinColumnsKeys : smallScreenBitcoinColumnsKeys;
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
            {columnsKeys.map((col, index) => (
              <th key={index}>{formatToUpperCase(col)}</th>
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