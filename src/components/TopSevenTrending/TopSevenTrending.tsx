import { IItems } from "@/types/coins.interface";
import "./TopSevenTrending.scss";

const TopSevenTrending: React.FunctionComponent<{ sevenTrends: IItems[] }> = ({
  sevenTrends,
}) => {
  return (
    <div className="top-seven-trending">
      <table>
        <thead>
          <tr>
            <th colSpan={5}>Top 7 des tendances crypto</th>
          </tr>
          <tr>
            <th>Position</th>
            <th>Logo</th>
            <th>Nom</th>
            <th>Symbole</th>
            <th>Classement</th>
          </tr>
        </thead>
        {sevenTrends.map((trend: IItems, index: number) => {
          return (
            <tbody className="top-seven-trending__tbody" key={index}>
              <tr>
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
};
export default TopSevenTrending;
