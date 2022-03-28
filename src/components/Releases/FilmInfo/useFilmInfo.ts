import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {apiKeySelector} from "../../../store/selectors";
import {useCallback, useEffect, useState} from "react";
import {getFilmData, getFilmList} from "../../../utils";
import {fetchFilms} from "../../../store/toolkitSlice";
import {TFilmList, UserItemPageParams} from "../../../interfaces";

export const useFilmInfo = () => {
  const {page, id} = useParams<UserItemPageParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const apiKey = useSelector(apiKeySelector);
  const [data, setData] = useState<TFilmList>({});
  const currentPage: number = Number(page?.slice(5)) || 1;
  const [spinner, setSpinner] = useState<boolean>(true)
  const background = {
    backgroundImage: data.backdrop_path && `url("https://image.tmdb.org/t/p/original/${data?.backdrop_path}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  const fetchFilmData = useCallback(() => {
    getFilmData(id, apiKey).then(response => setData(response));
  }, [id]);

  const handleAddToFavorite = useCallback(() => {
    const storage: string | null = localStorage.getItem('favorite');

    if (storage && id && storage.split(',').includes(id)) {
      alert('This movies is already on the favorites list');
    } else {
      if (typeof id === "string") {
        storage ? localStorage.setItem('favorite', `${storage},${id}`) : localStorage.setItem('favorite', id);
      }
    }
  }, [id]);

  const handleNextMovie = useCallback(async () => {
    let nextPage: number = currentPage;
    let filmsList = await getFilmList(nextPage, apiKey);
    const currentIndex: number = filmsList.results.findIndex((item: { id: number }) => item.id === Number(id));

    if (currentIndex === filmsList.results.length - 1) {
      nextPage += 1;
      filmsList = await getFilmList(nextPage, apiKey);
    }

    history.push(`/page-${nextPage}/${filmsList.results[currentIndex === filmsList.results.length - 1 ? 0 : currentIndex + 1].id}`);
  }, [history, id]);

  useEffect(() => {
    fetchFilmData();
    console.log('2')
  }, [fetchFilmData, id]);

  useEffect(() => {
    dispatch(fetchFilms({currentPage, apiKey}));
    setSpinner(false)
  }, [dispatch, currentPage]);

  return {
    spinner,
    page,
    data,
    background,
    handleAddToFavorite,
    handleNextMovie,
  };
};