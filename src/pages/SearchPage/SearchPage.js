import MoviesList from '@/components/MoviesList';
import Wrapper from '@/components/UI/Wrapper';
import {
  fetchMovies,
  setCurrentPage,
  setSearchValue,
} from '@/store/movies-list-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';

import leftArrow from '../../assets/icons/left-arrow-icon.png';

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = useParams();

  useEffect(() => {
    dispatch(setSearchValue(searchValue));
    dispatch(fetchMovies());
  }, [dispatch]);

  const clickBackButtonHandler = (e) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    dispatch(setSearchValue(''));
    navigate('/');
  };

  return (
    <Wrapper>
      <div className={styles['search-page__title-container']}>
        <button
          className={styles['search-page__back-button']}
          onClick={clickBackButtonHandler}
        >
          <div className={styles['search-page__icon-container']}>
            <img
              src={leftArrow}
              alt="arrow-left"
              className={styles['search-page__back-icon']}
            />
          </div>
          <span className={styles['search-page__button-text']}>на главную</span>
        </button>

        <h1 className={styles['search-page__title']}>
          Результаты поиска {searchValue}
        </h1>
      </div>

      <MoviesList />
    </Wrapper>
  );
};

export default SearchPage;
