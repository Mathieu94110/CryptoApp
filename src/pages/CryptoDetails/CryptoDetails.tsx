import { useNavigate, useParams } from "react-router-dom";
import HistoryChart from "../../components/HistoryChart/HistoryChart";
import CoinDetail from "./Components/CoinDetail";
import { CoinParams } from "../../types/coins.interface";
import "./CryptoDetails.scss";
import { FaArrowLeft } from "react-icons/fa";
const CryptoDetail = () => {
  const { id } = useParams<CoinParams>();
  const navigate = useNavigate();

  return (
    <div className="crypto-details">
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
  );
};

export default CryptoDetail;
