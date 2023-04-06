import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Poster from '@/components/UI/Poster';
import LoadingSpin from '@/components/UI/LoadingSpin';
import ErrorMessage from '@/components/UI/ErrorMessage';
import BackdropImage from '@/components/UI/BackdropImage';
import TextField from '../../components/UI/TextField';
import Watchability from '../../components/UI/Watchability';
import Ratings from '@/components/UI/Ratings';
import Directors from '../../components/UI/Directors';

import { urlConverter } from '../../helpers/youtube-url-converter';

import styles from './MovieDetailsPage.module.scss';

import { fetchMovieById, fetchMovieFrames } from '@/store/movie-slice';

import cn from 'classnames';
import Actor from '@/components/UI/Actor';
import Frames from '@/components/UI/Frames';
import ModalFramesCarousel from '@/components/UI/ModalFramesCarousel';

const MovieDetailsPage = () => {
  const navigate = useNavigate();
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

  const clickPersonHandler = (id) => {
    navigate(`/person/${id}`);
  };

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
          <>
            <div className={styles.movie}>
              {movie.backdrop && (
                <BackdropImage imageUrl={movie.backdrop.url} />
              )}

              <div className={styles['movie__left-side']}>
                <div
                  className={cn({
                    [styles['movie__poster-container']]: movie.poster,
                    [styles['movie__poster-container_null']]: !movie.poster,
                  })}
                >
                  {/* TODO Упростить, url null если не нужен */}
                  {movie.poster ? (
                    <Poster
                      url={movie.poster.url}
                      altName={movie.alternativeName}
                      color={movie.color}
                    />
                  ) : (
                    <Poster
                      altName={movie.alternativeName}
                      color={movie.color}
                    />
                  )}
                </div>

                <div className={styles.movie__fields}>
                  <TextField title={'Страна'} items={movie.countries} />

                  <TextField title={'Жанр'} items={movie.genres} />

                  {movie.movieLength && (
                    <TextField
                      title={'Длительность'}
                      items={[{ name: `${movie.movieLength} мин.` }]}
                    />
                  )}

                  {movie.year && (
                    <TextField
                      title={'Год выпуска'}
                      items={[{ name: movie.year }]}
                    />
                  )}
                </div>
              </div>

              <div className={styles.movie__main}>
                <div className={styles.movie__header}>
                  <h1 className={styles.movie__title}>
                    {movie.name ? movie.name : movie.alternativeName}
                  </h1>

                  {movie.slogan && (
                    <h3 className={styles.movie__slogan}>«{movie.slogan}»</h3>
                  )}

                  <Ratings
                    kp={movie.rating.kp.toFixed(1)}
                    imdb={movie.rating.imdb.toFixed(1)}
                  />
                </div>

                {movie.description ? (
                  <p className={styles.movie__description}>
                    {movie.description}
                  </p>
                ) : (
                  <h1 className={styles.movie__description_null}>
                    Описание отсутствует
                  </h1>
                )}

                <div className={styles['movie__center-container']}>
                  <div>
                    {movie.directors[0]?.name && (
                      <Directors
                        items={movie.directors.slice(0, 2)}
                        clickPersonHandler={clickPersonHandler}
                      />
                    )}

                    {movie.watchability.items && (
                      <Watchability items={movie.watchability.items} />
                    )}
                  </div>

                  {/* TODO вынести в поле при запросе данных */}
                  {movie?.videos?.trailers.find(
                    (trailer) => trailer.site === 'youtube'
                  ) && (
                    <iframe
                      width="560"
                      height="340"
                      src={urlConverter(
                        movie.videos.trailers.find(
                          (trailer) => trailer.site === 'youtube'
                        ).url
                      )}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>

                {movie.poster && (
                  <>
                    <h3 className={styles.movie__subtitle}>Актерский состав</h3>
                    <div className={styles.movie__carousel}>
                      <swiper-container
                        slides-per-view="5"
                        speed="500"
                        stretch="10"
                      >
                        {movie.persons.map((person) => (
                          <swiper-slide key={person.photo}>
                            <Actor
                              id={person.id}
                              photoUrl={person.photo}
                              name={person.name}
                              clickPersonHandler={clickPersonHandler}
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
          </>
        )
      )}
    </>
  );
};

export default MovieDetailsPage;
