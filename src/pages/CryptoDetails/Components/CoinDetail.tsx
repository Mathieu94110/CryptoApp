import { CoinStats, CoinStat } from "src/models/coins";
import Loader from "@/components/Loader/Loader";
import "./CoinDetail.scss";
import { useCoinDetails } from "@/hooks/useCoinDetails";

const CoinDetail: React.FunctionComponent<{ coin: string }> = ({ coin }) => {
  const { data: coinDetails, loading: isLoading } = useCoinDetails(coin);

  if (!coinDetails || isLoading) {
    return <Loader />;
  }

  return (
    <div className="coin-details">
      <div className="coin-details__header">
        <img src={coinDetails?.image?.small} alt={coinDetails.name} />
        <h1 className="coin-details__title">{coinDetails.name}</h1>
        <h2 className="coin-details__subtitles">{coinDetails.symbol}</h2>
        <h2 className="coin-details__subtitles">
          classement: {coinDetails.market_cap_rank}
        </h2>
      </div>
      <div className="coin-details__details">
        <ul className="coin-details__statistics">
          <h2 className="coin-details__statistics-title">Statistiques</h2>
          {CoinStats.map((stat: CoinStat) => {
            const value = coinDetails[stat.key];
            let displayValue;

            if (value === undefined || value === null || typeof value === "object") {
              displayValue = "Données non disponibles";
            } else {
              displayValue = value;
            }

            return (
              <li key={stat.key} className="mb-10">
                <span className="color-primary">{stat.icon} {stat.label}:</span>{displayValue}
                {stat.suffix && ` ${stat.suffix}`}
              </li>
            );
          })}
        </ul>
        <div className="d-flex flex-column">
          <h2 className="coin-details__statistics-title">Description</h2>
          <p
            className="coin-details__description"
            dangerouslySetInnerHTML={{
              __html: coinDetails.description.en.length
                ? coinDetails.description.en
                : "Aucune description",
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
