import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getTrendingCoins } from "../../apis/coinGecko";
import { CoinMarket } from "../../types/coins.interface";
import { settings } from "@/static/carouselInfo";
import CarouselItem from "./CarouselItem";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  const [trending, setTrending] = useState<CoinMarket[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const response = await getTrendingCoins();
      setTrending(response);
    };
    fetchTrendingCoins();
  }, []);

  return (
    <div className="carousel">
      <Slider {...settings}>
        {trending.map((coin, index) => (
          <div className="carousel__slide" key={index}>
            <CarouselItem coin={coin} />
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default Carousel;
