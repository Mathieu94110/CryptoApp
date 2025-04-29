import { IItems } from "src/models/coins";
import "./TopSevenTrends.scss";
import {
  topSevenTrendsColumns,
  topSevenTrendsColumnsKey,
  topSevenTrendsColumnsKeys,
} from "src/models/topSevenTrends";
import { FaArrowTrendUp } from "react-icons/fa6";

const TopSevenTrends: React.FC<{ sevenTrends: IItems[] }> = ({ sevenTrends }) => {
  const getTrendsColumnLabel = (col: topSevenTrendsColumnsKey) => topSevenTrendsColumns[col];

  return (
    <div className="top-seven-trends">
      <table className="top-seven-trends__table">
        <caption className="top-seven-trends__caption">
          <FaArrowTrendUp className="top-seven-trends__icon" />
          <span className="top-seven-trends__title">Top 7 des tendances</span>
        </caption>
        <thead className="top-seven-trends__head">
          <tr className="top-seven-trends__row top-seven-trends__row--head">
            {topSevenTrendsColumnsKeys.map((col, index) => (
              <th key={index} className="top-seven-trends__cell top-seven-trends__cell--head">
                {getTrendsColumnLabel(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="top-seven-trends__body">
          {sevenTrends.map((trend, index) => (
            <tr key={index} className="top-seven-trends__row">
              <td className="top-seven-trends__cell">{index + 1}</td>
              <td className="top-seven-trends__cell">
                <img
                  src={trend.item.small}
                  alt={trend.item.name}
                  className="top-seven-trends__image"
                />
              </td>
              <td className="top-seven-trends__cell">{trend.item.name}</td>
              <td className="top-seven-trends__cell">{trend.item.symbol}</td>
              <td className="top-seven-trends__cell">{trend.item.market_cap_rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSevenTrends;
