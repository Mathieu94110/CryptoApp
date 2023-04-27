import HistoryChart from "./Components/HistoryChart/HistoryChart";
import type { BitcoinInterface } from "../../types/bitcoin.interface";
import { convert } from "../../utils/convert";
import "./Bitcoin.scss";

const Bitcoin = ({ bitcoin }: { bitcoin: BitcoinInterface }) => {
  return (
    <div className="bitcoin">
      <div className="bitcoin__content">
        <div className="bitcoin__title">
          <h2 className="bitcoin__name">{bitcoin.name} </h2>
          <img
            src={bitcoin.image}
            className="bitcoin__image"
            width="46px"
            height="46px"
            alt={bitcoin.name}
          />
        </div>

        <table className="bitcoin__table">
          <thead>
            <tr className="bitcoin__table-header">
              <th>Capitalisation :</th>
              <th> Jeton :</th>
              <th>Volume(24H)</th>
              <th> Max 24h :</th>
              <th> Min 24h :</th>
              <th>En circulation :</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bitcoin__table-body">
              <td className="color-gold">
                {convert(bitcoin.market_cap.toFixed(2))} €
              </td>
              <td className="color-gold">
                {convert(bitcoin.total_supply.toFixed(2))}
              </td>
              <td className="color-gold">
                {convert(bitcoin.total_volume.toFixed(2))} €
              </td>
              <td className="color-gold">
                {convert(bitcoin.high_24h.toFixed(2))} €
              </td>
              <td className="color-gold">
                {convert(bitcoin.low_24h.toFixed(2))} €
              </td>
              <td className="color-gold">
                {bitcoin.circulating_supply.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <HistoryChart coin="bitcoin" />
      </div>
    </div>
  );
};

export default Bitcoin;
