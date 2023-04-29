import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Poster from '@/components/UI/Poster';
import LoadingSpin from '@/components/UI/LoadingSpin';
import ErrorMessage from '@/components/UI/ErrorMessage';
import BackdropImage from '@/components/UI/BackdropImage';
import Ratings from '@/components/UI/Ratings';

import { fetchMovieById, fetchMovieFrames } from '@/store/movie-slice';

import cn from 'classnames';
import Actor from '@/components/UI/Actor';
import Frames from '@/components/UI/Frames';
import ModalFramesCarousel from '@/components/UI/ModalFramesCarousel';
import styles from './MovieDetailsPage.module.scss';
import { urlConverter } from '../../helpers/youtube-url-converter';
import Directors from '../../components/UI/Directors';
import Watchability from '../../components/UI/Watchability';
import TextField from '../../components/UI/TextField';

const MovieDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector((state) => state.movie.movie);
  const frames = useSelector((state) => state.movie.frames);
  const status = useSelector((state) => state.movie.status);
  const error = useSelector((state) => state.movie.error);

  const [showModalCarousel, setShowModalCarousel] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(null);

  const onFrameClickHandler = (frameIndex) => {
    setShowModalCarousel(true);
    setCurrentFrameIndex(frameIndex);
  };

  const closeModalHandler = () => {
    setShowModalCarousel(false);
  };

  useEffect(() => {
    dispatch(fetchMovieById(id));
    dispatch(fetchMovieFrames(id));
  }, [dispatch, id]);

  return (
    <>
      {showModalCarousel && (
        <ModalFramesCarousel
          frames={frames}
          currentFrameIndex={currentFrameIndex}
          onClickCloseModal={closeModalHandler}
        />
      )}

      {error && <ErrorMessage error={error} />}

      {status === 'loading' ? (
        <LoadingSpin />
      ) : (
        !error &&
        movie && (
          <div className={styles.movie}>
            {movie.backdrop && <BackdropImage imageUrl={movie.backdrop.url} />}

            <div className={styles['movie__left-side']}>
              <div
                className={cn({
                  [styles['movie__poster-container']]: movie.poster,
                  [styles['movie__poster-container_null']]: !movie.poster,
                })}
              >
                <Poster
                  url={movie.poster?.url}
                  altName={movie.alternativeName}
                  color={movie.color}
                />
              </div>

              <div className={styles.movie__fields}>
                <TextField title="Страна" items={movie.countries} />

                <TextField title="Жанр" items={movie.genres} />

                {movie.movieLength && (
                  <TextField
                    title="Длительность"
                    items={[{ name: `${movie.movieLength} мин.` }]}
                  />
                )}

                {movie.year && (
                  <TextField
                    title="Год выпуска"
                    items={[{ name: movie.year }]}
                  />
                )}
              </div>
            </div>

            <div className={styles.movie__main}>
              <div className={styles.movie__header}>
                <div className={styles['movie__title-slogan']}>
                  <h1 className={styles.movie__title}>
                    {movie.name ? movie.name : movie.alternativeName}
                  </h1>

                  {movie.slogan && (
                    <h3 className={styles.movie__slogan}>«{movie.slogan}»</h3>
                  )}
                </div>

                <Ratings
                  kp={movie.rating.kp.toFixed(1)}
                  imdb={movie.rating.imdb.toFixed(1)}
                />
              </div>

              {movie.description ? (
                <p className={styles.movie__description}>{movie.description}</p>
              ) : (
                <h1 className={styles.movie__description_null}>
                  Описание отсутствует
                </h1>
              )}

              <div className={styles['movie__center-container']}>
                <div>
                  {movie.directors[0]?.name && (
                    <Directors items={movie.directors.slice(0, 2)} />
                  )}

                  {movie.watchability.items && (
                    <Watchability items={movie.watchability.items} />
                  )}
                </div>

                {movie?.youtubeTrailer && (
                  <div className={styles['movie__youtube-frame']}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={urlConverter(movie.youtubeTrailer.url)}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              {movie.poster && (
                <>
                  <h3 className={styles.movie__subtitle}>Актерский состав</h3>
                  <div className={styles.movie__carousel}>
                    <swiper-container slides-per-view="5" speed="500">
                      {movie.persons.map((person) => (
                        <swiper-slide key={person.photo}>
                          <Actor
                            id={person.id}
                            photoUrl={person.photo}
                            name={person.name}
                          />
                        </swiper-slide>
                      ))}
                    </swiper-container>
                  </div>
                </>
              )}
            </div>
            {frames && frames.length !== 0 && (
              <Frames
                frames={frames}
                onFrameClickHandler={onFrameClickHandler}
              />
            )}
          </div>
        )
      )}
    </>
  );
};

export default MovieDetailsPage;
