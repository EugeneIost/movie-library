import styles from './Movie.module.scss';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import Poster from '@/components/UI/Poster';

const Movie = ({ name, altName, rating, year, poster, id, color }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.movie}
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
      <div className={styles['movie__poster-container']}>
        {poster ? (
          <Poster url={poster.url} altName={altName} color={color} />
        ) : (
          <Poster altName={altName} color={color} />
        )}

        <div
          className={cn(styles['movie__rating-container'], {
            [styles['movie__rating-container_green']]: Math.round(rating) >= 8,
            [styles['movie__rating-container_yellow']]:
              Math.round(rating) === 7,
            [styles['movie__rating-container_grey']]: Math.round(rating) <= 6,
          })}
        >
          <span className={styles.movie__rating}>{rating.toFixed(1)}</span>
        </div>
      </div>
      {name ? (
        <h3 className={styles.movie__title}>{name}</h3>
      ) : (
        <h3 className={styles.movie__title}>{altName}</h3>
      )}
      <span className={styles.movie__year}>{year}</span>
    </div>
  );
};

export default Movie;
