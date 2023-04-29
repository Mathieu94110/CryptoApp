import { useState, useEffect } from "react";
import { CoinDetails } from "../../../apis/coinGecko";
import { CoinsFetchData } from "../../../types/coins.interface";
import "./CoinDetail.scss";
import {
  FaChartLine,
  FaChartPie,
  FaCheck,
  FaCloud,
  FaCoins,
  FaSmile,
  FaUser,
  FaUsers,
} from "react-icons/fa";
const CoinDetail = ({ coin }: { coin: string }) => {
  const [coinDetails, setCoinDetails] = useState<CoinsFetchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCoinDetails = async () => {
    setIsLoading(true);
    const response = await CoinDetails(coin);
    setCoinDetails(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoinDetails();
  }, []);

  if (!coinDetails || isLoading) {
    return <div className="wrapper-container mt-8">Chargement en cours</div>;
  }

  return (
    <div className="coin-details">
      <div className="coin-details__header">
        <img src={coinDetails?.image?.small} alt={coinDetails.name} />
        <h1 className="coin-details__title">{coinDetails.name}</h1>
        <h2 className="coin-details__subtitles">{coinDetails.symbol}</h2>
        <h2 className="coin-details__subtitles">
          classsement: {coinDetails.market_cap_rank}
        </h2>
      </div>
      <div className="coin-details__details">
        <ul className="coin-details__statistics">
          <h2 className="coin-details__statistics-title">Statistiques</h2>
          <li className="mb-10">
            <FaUser /> Nombre de possesseurs:{" "}
            {coinDetails.watchlist_portfolio_users}
          </li>
          <li className="mb-10">
            {" "}
            <FaCoins /> Score de liquidité: {coinDetails.liquidity_score}
          </li>
          <li className="mb-10">
            <FaCloud /> Plateforme:{coinDetails.asset_platform_id}
          </li>{" "}
          <li className="mb-10">
            <FaSmile /> Avis positifs:{" "}
            {coinDetails.sentiment_votes_up_percentage}%
          </li>
          <li>
            <FaUsers /> Score de la communauté: {coinDetails.community_score}
          </li>
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
