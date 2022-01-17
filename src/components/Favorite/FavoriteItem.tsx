import {useCallback} from "react";

type TProps = {
  id?: number | undefined,
  poster?: string | undefined,
  title?: string | undefined,
  overview?: string | undefined,
  onUnfavoriteFilm: Function,
}

const FavoriteItem = ({id, poster, title, overview, onUnfavoriteFilm}: TProps) => {

  const handleUnfavoriteFilm = useCallback(() => {
    onUnfavoriteFilm(id);
  }, [onUnfavoriteFilm]);

  return <div className="favoriteItem-container">
    <img
      className="releases__item"
      src={poster && `http://image.tmdb.org/t/p/w342${poster}`}
      alt={poster ? title : 'Изображение не найдено'}
    />
    <div className="favoriteItem-dsc">
      <div className="favoriteItem-buttonWrapper">
        <h2 className="favoriteItem__title">{title}</h2>
        <button className="movieDB__button" onClick={handleUnfavoriteFilm}>Unfavorite</button>
      </div>
      <p className="favoriteItem__overview">{overview || 'No Info'}</p>
    </div>
  </div>;
};

export default FavoriteItem;