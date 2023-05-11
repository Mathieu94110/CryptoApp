import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { changePage } from "../../../../store/reducers/searchPagesSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Pagination.scss";

function Pagination() {
  const currentPage = useSelector((state: RootState) => state.searchPage.page);
  const dispatch = useDispatch();
  const TotalNumber = 250;
  const next = () => {
    if (currentPage === TotalNumber) {
      return null;
    } else {
      dispatch(changePage(currentPage + 1));
    }
  };

  const prev = () => {
    if (currentPage === 1) {
      return null;
    } else {
      dispatch(changePage(currentPage - 1));
    }
  };
  const multiStepNext = () => {
    if (currentPage + 3 >= TotalNumber) {
      dispatch(changePage(TotalNumber - 1));
    } else {
      dispatch(changePage(currentPage + 3));
    }
  };

  const multiStepPrev = () => {
    if (currentPage - 3 <= 1) {
      dispatch(changePage(TotalNumber + 1));
    } else {
      dispatch(changePage(currentPage - 2));
    }
  };
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage - 1 !== 0 ? (
          <li>
            <button onClick={prev} className="pagination__buttons">
              <FaArrowLeft />
            </button>
          </li>
        ) : null}
        {currentPage - 1 > 1 ? (
          <li>
            <button onClick={multiStepPrev} className="pagination__buttons">
              ...
            </button>
          </li>
        ) : null}
        {currentPage - 1 !== 0 ? (
          <li>
            <button onClick={prev} className="pagination__buttons">
              {currentPage - 1}
            </button>
          </li>
        ) : null}
        <li>
          <button disabled className="pagination__buttons--active">
            {currentPage}
          </button>
        </li>
        {currentPage + 1 !== TotalNumber && currentPage !== TotalNumber ? (
          <li>
            <button onClick={next} className="pagination__buttons">
              {currentPage + 1}
            </button>
          </li>
        ) : null}
        {currentPage + 1 !== TotalNumber && currentPage !== TotalNumber ? (
          <li>
            <button onClick={multiStepNext} className="pagination__buttons">
              ...
            </button>
          </li>
        ) : null}
        {currentPage !== TotalNumber ? (
          <li>
            <button
              onClick={() => dispatch(changePage(TotalNumber))}
              className="pagination__buttons"
            >
              {TotalNumber}
            </button>
          </li>
        ) : null}

        <li>
          <button onClick={next} className="pagination__buttons">
            <FaArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
