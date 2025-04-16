import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { formatedNumber } from "@/utils/convert";

interface Props {
  price: number;
  change: number;
}

const CarouselPrice: React.FC<Props> = ({ price, change }) => {
  const isPositive = change >= 0;
  const formattedChange = Math.abs(change ?? 0).toFixed(2);

  return (
    <div className="d-flex align-items-center justify-space-between">
      <span className="carousel__price">{formatedNumber(price)} €</span>
      <span
        className={`carousel__price-growth ${isPositive ? "carousel__price-up" : "carousel__price-down"
          }`}
      >
        {isPositive ? (
          <FaCaretUp className="carousel__growth-icon" />
        ) : (
          <FaCaretDown className="carousel__growth-icon" />
        )}
        {formattedChange}%
      </span>
    </div>
  );
};

export default CarouselPrice;
