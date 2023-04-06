import { fetchMovies, setCurrentPage } from '@/store/movies-list-slice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import Movie from './Movie/Movie';
import styles from './MoviesList.module.scss';
import LoadingSpin from '../UI/LoadingSpin';
import ErrorMessage from '../UI/ErrorMessage';
import Search from '../Search';

const MoviesList = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.moviesList.currentPage);
  const movies = useSelector((state) => state.moviesList.movies);
  const status = useSelector((state) => state.moviesList.status);
  const error = useSelector((state) => state.moviesList.error);

  const clickPageHandler = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, currentPage]);

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {status === 'loading' ? (
        <LoadingSpin />
      ) : (
        !error && (
          <>
            <Search />
            {movies.length !== 0 ? (
              <>
                <div className={styles['movies-grid']}>
                  {movies.map((movie) => (
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      name={movie.name}
                      poster={movie.poster}
                      altName={movie.alternativeName}
                      year={movie.year}
                      rating={movie.rating.kp}
                      color={movie.color}
                    />
                  ))}
                </div>
                <Pagination clickPageHandler={clickPageHandler} />
              </>
            ) : (
              <h2 className={styles['movies__not-found']}>
                Фильмы не найдены!
              </h2>
            )}
          </>
        )
      )}
    </>
  );
};

export default MoviesList;
