import "./FilmList.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { apiKeySelector, filmSelector, pagesCountSelector } from "../../store/selectors";
import Film from "./Film/Film";
import ReactPaginate from "react-paginate";
import './Pagination.css';
import { useHistory, useParams } from "react-router-dom";
import { fetchFilms } from "../../store/toolkitSlice";

const FilmList = () => {
  const dispatch = useDispatch();
  const filmsList = useSelector(filmSelector);
  const pagesCount = useSelector(pagesCountSelector);
  const apiKey = useSelector(apiKeySelector);
  const {page} = useParams();
  const currentPage = page?.slice(5) || 1;
  const history = useHistory();

  const handlePageClick = useCallback(({selected}) => {
    history.push(`page-${selected + 1}`);
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(fetchFilms({currentPage, apiKey}));
  }, [dispatch, currentPage]);


  return (
    <main className="releases">
      <div className="releases-films">
        {
          filmsList &&
          filmsList.map(item =>
            <Film key={item.id} film={item} page={currentPage} poster={item?.poster_path}
                  title={item.original_title}/>
          )
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pagesCount}
        previousLabel="<"
        containerClassName="pagination"
        renderOnZeroPageCount={null}
      />
    </main>
  );
};

export default FilmList;
