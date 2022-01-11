import React, {useCallback} from "react";
import {useHistory} from "react-router-dom";
import {Props} from "../../../interfaces";

const Film = ({id, page, poster, title}: Props) => {
  const history = useHistory();

  const handleFilmClick = useCallback(() => {
    history.push(`page-${page}/${id}`);
  }, [history, page, id]);

  return <img
    onClick={handleFilmClick}
    className="releases__item"
    src={poster && `http://image.tmdb.org/t/p/w342${poster}`}
    alt={poster ? title : 'Изображение не найдено'}
  />
};

export default Film;