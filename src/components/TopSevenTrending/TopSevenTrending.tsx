import { IItems } from "src/models/coins";
import "./TopSevenTrending.scss";
import { topSevenTrendsColumns, topSevenTrendsColumnsKey, topSevenTrendsColumnsKeys } from "src/models/topSevenTrends";
import { FaArrowTrendUp } from "react-icons/fa6";

const TopSevenTrending: React.FC<{ sevenTrends: IItems[] }> = ({ sevenTrends }) => {

  const getTrendsColumnLabel = (col: topSevenTrendsColumnsKey) => topSevenTrendsColumns[col];

  return (
    <div className="top-seven-trending">
      <table>
        <thead>
          <tr>
            <th colSpan={5} className="top-seven-trending__title"><span className="top-seven-trending__icon"><FaArrowTrendUp /></span><span>Top 7 des tendances</span></th>
          </tr>
          <tr>
            {topSevenTrendsColumnsKeys.map((col, index) => (
              <th key={index} className="color-secondary">{getTrendsColumnLabel(col)}</th>
            ))}
          </tr>
        </thead>

        <tbody className="top-seven-trending__tbody">
          {sevenTrends.map((trend, index) => (
            <tr key={index}>
              <td >{index + 1}</td>
              <td >
                <img
                  src={trend.item.small}
                  alt={trend.item.name}
                  className="top-seven-trending__grid-item-image"
                />
              </td>
              <td >{trend.item.name}</td>
              <td >{trend.item.symbol}</td>
              <td >{trend.item.market_cap_rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSevenTrending;