import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { formatedNumber } from "@/utils/convert";
import './CoinPrice.scss';

interface Props {
  price: number;
  change: number;
}

const CoinPrice: React.FC<Props> = ({ price, change }) => {
  const isPositive = change >= 0;
  const formattedChange = Math.abs(change ?? 0).toFixed(2);

  return (
    <div className="d-flex align-items-center justify-space-between">
      <span className="coin-price">{formatedNumber(price)} €</span>
      <span
        className={`coin-price-growth ${isPositive ? "coin-price-up" : "coin-price-down"
          }`}
      >
        {isPositive ? (
          <FaCaretUp className="coin-growth__icon" />
        ) : (
          <FaCaretDown className="coin-growth__icon" />
        )}
        {formattedChange}%
      </span>
    </div>
  );
};

export default CoinPrice;
