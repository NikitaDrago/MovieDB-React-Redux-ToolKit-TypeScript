import "./FilmList.css";
import {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {apiKeySelector, filmSelector, pagesCountSelector} from "../../store/selectors";
import Film from "./Film/Film";
import ReactPaginate from "react-paginate";
import './Pagination.css';
import {useHistory, useParams} from "react-router-dom";
import {fetchFilms} from "../../store/toolkitSlice";
import {TFilmList, UserItemPageParams} from '../../interfaces'
import {Spinner} from "react-bootstrap";

const FilmList: FC = () => {
  const dispatch = useDispatch();
  const filmsList: Array<TFilmList> = useSelector(filmSelector);
  const pagesCount = useSelector(pagesCountSelector);
  const apiKey = useSelector(apiKeySelector);
  const {page} = useParams<UserItemPageParams>();
  const currentPage: string | number = page?.slice(5) || 1;
  const history = useHistory();
  const [spinner, setSpinner] = useState<boolean>(true)

  const handlePageClick = useCallback(({selected}) => {
    history.push(`page-${selected + 1}`);
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(fetchFilms({currentPage, apiKey}));
    setSpinner(false)
  }, [dispatch, currentPage]);


  return (
    spinner ? <div className="text-center mt-4">
        <Spinner animation="border"/>
      </div>
      : <main className="releases">
        <div className="releases-films">
          {
            filmsList && filmsList.map(
              (item) =>
                <Film key={item.id} id={item.id} page={currentPage} poster={item.poster_path}
                      title={item.original_title}/>
            )
          }
        </div>
        <ReactPaginate
          breakLabel="..."
          previousLabel="<"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pagesCount}
          containerClassName="pagination"
        />
      </main>
  );
};

export default FilmList;
