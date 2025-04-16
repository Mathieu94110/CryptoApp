import { Link } from "react-router-dom";
import { CoinMarket } from "@/types/coins.interface";
import CarouselLabel from "./CarouselLabel";
import CarouselPrice from "./CarouselPrice";

interface Props {
  coin: CoinMarket;
}

const CarouselItem: React.FC<Props> = ({ coin }) => {
  return (
    <div className="carousel__item">
      <Link className="carousel__link" to={`/Details/${coin.id}`}>
        <div className="carousel__box">
          <CarouselLabel name={coin.name || "Unknown"} />

          <div>
            <div className="d-flex align-items-center justify-space-between">
              <img
                src={coin.image}
                alt={coin.name}
                className="carousel__img"
              />
              <span className="carousel__texts">{coin.symbol}</span>
            </div>

            <CarouselPrice
              price={coin.current_price ?? 0}
              change={coin.price_change_percentage_24h}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarouselItem;
