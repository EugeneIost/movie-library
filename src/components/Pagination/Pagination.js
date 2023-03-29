import { useSelector } from 'react-redux';
import { paginationCreator } from '../../helpers/pagination-creator';
import cn from 'classnames';
import arrowRight from '../../assets/icons/arrow-right.png';
import styles from './Pagination.module.scss';

const Pagination = ({ clickPageHandler }) => {
  const pagesQuantity = useSelector((state) => state.moviesList.pagesQuantity);
  const currentPage = useSelector((state) => state.moviesList.currentPage);

  const pagination = paginationCreator(currentPage, pagesQuantity);
  return (
    <>
      {pagination.length > 1 && (
        <div className={styles.pagination}>
          {currentPage !== 1 && (
            <img
              src={arrowRight}
              alt="arrow left"
              className={cn(styles.pagination__left, styles.pagination__arrow)}
              onClick={() => {
                if (currentPage != 1) clickPageHandler(currentPage - 1);
              }}
            />
          )}
          {pagination.map((page, index) => {
            if (index < pagination.length - 1 || pagination.length <= 5) {
              return (
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
              );
            } else if (pagination.length > 5) {
              return (
                <div key={page}>
                  <span className={styles.pagination__skip}>...</span>
                  <span
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
              );
            }
          })}
          {currentPage !== pagesQuantity && (
            <img
              src={arrowRight}
              alt="arrow right"
              className={cn(styles.pagination__rigth, styles.pagination__arrow)}
              onClick={() => {
                if (currentPage !== pagesQuantity)
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