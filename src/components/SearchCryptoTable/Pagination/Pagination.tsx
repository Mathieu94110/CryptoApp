import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RootState } from "@/store/store";
import { changePage } from "@/store/reducers/searchPageSlice";
import "./Pagination.scss";

const Pagination: React.FunctionComponent = () => {
  const currentPage = useSelector((state: RootState) => state.searchPage.page);
  const dispatch = useDispatch();
  const max: number = 250;
  const next = (): null | void => {
    if (currentPage === max) {
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
    if (currentPage + 3 >= max) {
      dispatch(changePage(max - 1));
    } else {
      dispatch(changePage(currentPage + 3));
    }
  };

  const multiStepPrev = () => {
    if (currentPage - 3 <= 1) {
      dispatch(changePage(max + 1));
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
        {currentPage + 1 !== max && currentPage !== max ? (
          <li>
            <button onClick={next} className="pagination__buttons">
              {currentPage + 1}
            </button>
          </li>
        ) : null}
        {currentPage + 1 !== max && currentPage !== max ? (
          <li>
            <button onClick={multiStepNext} className="pagination__buttons">
              ...
            </button>
          </li>
        ) : null}
        {currentPage !== max ? (
          <li>
            <button
              onClick={() => dispatch(changePage(max))}
              className="pagination__buttons"
            >
              {max}
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
};

export default Pagination;
