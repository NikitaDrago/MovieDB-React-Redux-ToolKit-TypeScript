import { SetStateAction, useCallback, useEffect, useState} from "react";
import {getFilmData} from "../../utils";
import {useSelector} from "react-redux";
import {apiKeySelector} from "../../store/selectors";
import FavoriteItem from "./FavoriteItem";
import "./Favorite.css";
import {TFilmList} from "../../interfaces";

const Favorite = () => {
  const apiKey = useSelector(apiKeySelector);
  const [favoriteList, setFavoriteList] = useState<Array<TFilmList>>([]);

  const fetchFilmData = useCallback(() => {
    const getStorage: string | null = localStorage.getItem('favorite');

    const requests: string | null | Promise<string>[] = getStorage && getStorage.split(',').map(
      id => getFilmData(id, apiKey)
        .then(response => response)
    );

    // @ts-ignore
    Promise.all(requests).then((response: SetStateAction<TFilmList[]>) => setFavoriteList(response));

  }, [setFavoriteList]);

  const handleUnfavoriteFilm = useCallback((id) => {
    const getStorage: string | null = localStorage.getItem('favorite');
    const newList: Array<string> | undefined = getStorage?.split(',').filter(item => +item !== id);
    localStorage.setItem('favorite', newList?.join(',') as string);
    fetchFilmData();
  }, [fetchFilmData]);


  useEffect(() => {
    fetchFilmData();
  }, [fetchFilmData]);

  return <main className="favoriteItem-wrapper">
  <h1 className="favoriteItem__title">My Favorite</h1>
  {
    favoriteList && favoriteList.map(
      (item) =>
        <FavoriteItem key={item.id} id={item.id} poster={item.poster_path} title={item.original_title}
    overview={item.overview} onUnfavoriteFilm={handleUnfavoriteFilm}/>
  )
  }
  </main>;
};

export default Favorite;