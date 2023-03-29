import styles from './Search.module.scss';

import searchIcon from '../../assets/icons/search-icon.png';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentPage, setSearchValue } from '@/store/movies-list-slice';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isErrorValue, setIsErrorValue] = useState(false);

  const changeSearchInputHandler = (e) => {
    setSearchInputValue(e.target.value);
    if (searchInputValue.trim() !== '') {
      setIsErrorValue(false);
    }
  };

  const clickSearchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchInputValue.trim() === '') {
      setIsErrorValue(true);
      return;
    }

    dispatch(setSearchValue(searchInputValue));
    dispatch(setCurrentPage(1));
    navigate(`/search/${searchInputValue}`);
  };

  return (
    <>
      <form
        className={cn(styles.search, {
          [styles.search_error]: isErrorValue,
        })}
        onSubmit={clickSearchSubmitHandler}
      >
        <input
          type="text"
          className={styles.search__input}
          onChange={changeSearchInputHandler}
          value={searchInputValue}
          placeholder="Введите название фильма или сериала"
        />
        <button type="submit" className={styles.search__button}>
          <img src={searchIcon} alt="search" className={styles.search__icon} />
        </button>
      </form>
      {isErrorValue && (
        <h3 className={styles['search__error-message']}>
          Поле не должно быть пустым
        </h3>
      )}
    </>
  );
};

export default Search;
