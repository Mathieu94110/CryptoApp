import { Link } from "react-router-dom";
import CarouselLabel from "./CarouselLabel";
import CoinPrice from "src/common/CoinPrice/CoinPrice";
import { CoinMarket } from "src/models/coins";

interface Props {
  coin: CoinMarket;
}

const CarouselItem: React.FC<Props> = ({ coin }) => {
  return (
    <div className="carousel__item">
      <Link className="carousel__link" to={`/Details/${coin.id}`} aria-label={`Go to ${coin.name} details`}>
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

          <CoinPrice
            price={coin.current_price ?? 0}
            change={coin.price_change_percentage_24h}
          />
        </div>
      </Link>
    </div>
  );
};

export default CarouselItem;
