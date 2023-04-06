import cn from 'classnames';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import arrowRight from '../../assets/icons/arrow-right.png';
import { paginationCreator } from '../../helpers/pagination-creator';
import styles from './Pagination.module.scss';

const Pagination = ({ clickPageHandler }) => {
  const pagesQuantity = useSelector((state) => state.moviesList.pagesQuantity);
  const currentPage = useSelector((state) => state.moviesList.currentPage);

  const pagination = useMemo(
    () => paginationCreator(currentPage, pagesQuantity),
    [currentPage, pagesQuantity]
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {pagination.length > 1 && (
        <div className={styles.pagination}>
          {currentPage !== 1 && (
            <img
              src={arrowRight}
              alt="arrow left"
              className={cn(styles.pagination__left, styles.pagination__arrow)}
              onClick={() => {
                clickPageHandler(currentPage - 1);
              }}
            />
          )}
          {pagination.map((page, index) => (
            <div key={page}>
              {pagination.length > 5 && index === pagination.length - 1 && (
                <span className={styles.pagination__skip}>...</span>
              )}
              <span
                key={page}
                className={cn(styles.pagination__item, {
                  [styles.pagination__item_active]: page === currentPage,
                })}
                onClick={() => {
                  clickPageHandler(page);
                }}
              >
                {page}
              </span>
            </div>
          ))}

          {currentPage !== pagesQuantity && (
            <img
              src={arrowRight}
              alt="arrow right"
              className={cn(styles.pagination__rigth, styles.pagination__arrow)}
              onClick={() => {
                clickPageHandler(currentPage + 1);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
