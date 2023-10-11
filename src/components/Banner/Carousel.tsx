import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTrendingCoins } from "../../apis/coinGecko";
import { CoinMarket } from "../../types/coins.interface";
import { settings } from "@/static/carouselInfo";
import "./Carousel.scss";

const Carousel: React.FunctionComponent = () => {
  const [trending, setTrending] = useState<CoinMarket[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async (): Promise<void> => {
      const response = await getTrendingCoins();
      setTrending(response);
    };
    fetchTrendingCoins();
  }, []);

  return (
    <div className="carousel">
      <Slider {...settings}>
        {trending.length > 0
          ? trending.map((coin: CoinMarket, index: number) => {
              let profit = coin?.price_change_percentage_24h >= 0;
              return (
                <div className="carousel-item" key={index}>
                  <Link
                    className="carousel-item__link"
                    to={`/coins/${coin.id}`}
                  >
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
                      {coin?.current_price &&
                        coin?.current_price.toFixed(2) + " €"}
                    </span>
                  </Link>
                </div>
              );
            })
          : null}
      </Slider>
    </div>
  );
};

export default Carousel;
