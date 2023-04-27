import { IItems } from "../../types/coins.interface";
import "./TopSevenTrending.scss";

export default function TopSevenTrending({
  sevenTrends,
}: {
  sevenTrends: IItems[];
}) {
  return (
    <div className="top-seven-trending">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Logo</th>
            <th>Nom</th>
            <th>Symbole</th>
            <th>Classement</th>
          </tr>
        </thead>
        {sevenTrends.map((trend: IItems, index) => {
          return (
            <tbody key={index}>
              <tr className="seven-trend-tr">
                <td className="top-seven-trending__td"> {(index += 1)}</td>
                <td className="top-seven-trending__td">
                  {" "}
                  <img
                    src={trend.item.small}
                    alt={trend.item.name}
                    className="top-seven-trending__grid-item-image"
                  />
                </td>
                <td className="top-seven-trending__td"> {trend.item.name}</td>
                <td className="top-seven-trending__td">{trend.item.symbol}</td>
                <td className="top-seven-trending__td">
                  {" "}
                  {trend.item.market_cap_rank}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
