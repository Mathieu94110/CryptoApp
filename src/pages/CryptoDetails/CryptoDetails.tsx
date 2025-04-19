import { useNavigate, useParams } from "react-router-dom";
import HistoryChart from "@/components/HistoryChart/HistoryChart";
import CoinDetail from "./Components/CoinDetail";
import { CoinParams } from "src/models/coins";
import { FaArrowLeft } from "react-icons/fa";
import "./CryptoDetails.scss";

const CryptoDetail: React.FunctionComponent = () => {
  const { id } = useParams<CoinParams>();
  const navigate = useNavigate();

  return (
    <div className="crypto-details">
      <div className="crypto-details__container">
        <div className="crypto-details__back-button">
          <button
            className="crypto-details__back-button-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft />
          </button>
        </div>
        {id && (
          <>
            <div className="crypto-details__chart">
              <HistoryChart coin={id} />
            </div>
            <CoinDetail coin={id} />
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoDetail;
