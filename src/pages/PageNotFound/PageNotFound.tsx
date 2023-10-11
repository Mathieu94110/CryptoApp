import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.scss";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <div className="page-not-found__back-button">
        <button
          className="page-not-found__back-button-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="page-not-found__title">
        <h1>404 Page non trouvée</h1>
        <hr />
      </div>
    </div>
  );
}
export default PageNotFound;
