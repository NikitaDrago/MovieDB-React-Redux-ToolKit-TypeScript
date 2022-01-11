import {useCallback} from "react";

type Props = {
  id: number | undefined,
  poster: string | undefined,
  title: string | undefined,
  overview: string | undefined,
  onUnfavoriteFilm: Function,
}

const FavoriteItem = ({id, poster, title, overview, onUnfavoriteFilm}: Props) => {

  const handleUnfavoriteFilm = useCallback(() => {
    onUnfavoriteFilm(id);
  }, [onUnfavoriteFilm]);

  return <div className="FavoriteItem-container">
    <img
      className="releases__item"
      src={poster && `http://image.tmdb.org/t/p/w342${poster}`}
      alt={poster ? title : 'Изображение не найдено'}
    />
    <div className="FavoriteItem-dsc">
      <div className="FavoriteItem-buttonWrapper">
        <h2 className="FavoriteItem__title">{title}</h2>
        <button className="movieDB__button" onClick={handleUnfavoriteFilm}>Unfavorite</button>
      </div>
      <p className="FavoriteItem__overview">{overview || 'No Info'}</p>
    </div>
  </div>;
};

export default FavoriteItem;