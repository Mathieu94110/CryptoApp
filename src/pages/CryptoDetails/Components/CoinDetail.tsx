import { useState, useEffect } from "react";
import { CoinDetails } from "../../../apis/coinGecko";
import { CoinsFetchData } from "../../../types/coins.interface";
import "./CoinDetail.scss";
const CoinDetail = ({ coin }: { coin: string }) => {
  const [coinDetails, setCoinDetails] = useState<CoinsFetchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCoinDetails = async () => {
    setIsLoading(true);
    const response = await CoinDetails(coin);
    console.log(response);
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
      <p
        className="coin-details__description"
        dangerouslySetInnerHTML={{
          __html: coinDetails.description.en.length
            ? coinDetails.description.en
            : "Aucune description",
        }}
      ></p>
    </div>
  );
};

export default CoinDetail;
