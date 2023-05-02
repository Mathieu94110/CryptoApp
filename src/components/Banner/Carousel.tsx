import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { TrendingCoins } from "../../apis/coinGecko";
import { CoinMarket } from "../../types/coins.interface";
import "./Carousel.scss";

const Carousel = () => {
  const [trending, setTrending] = useState<CoinMarket[]>([]);

  const fetchTrendingCoins = async () => {
    const response = await TrendingCoins();
    setTrending(response);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const items = trending.map((coin: CoinMarket, index: number) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <div className="carousel-item" key={index}>
        <Link className="carousel-item__link" to={`/coins/${coin.id}`}>
          <img
            src={coin?.image}
            alt={coin.name}
            className="carousel-item__image"
          />
          <span className="carousel-item__texts">
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color:
                  coin?.price_change_percentage_24h > 0
                    ? "rgb(14, 203, 129)"
                    : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span className="carousel-item__price">
            {coin?.current_price && coin?.current_price.toFixed(2) + " €"}
          </span>
        </Link>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
