import styles from './Ratings.module.scss';
import kpLogo from '../../../assets/icons/kp-logo.png';
import imdbLogo from '../../../assets/icons/imdb-logo.png';

const Ratings = ({ kp, imdb }) => {
  return (
    <div className={styles.rating}>
      <div className={styles.rating__container}>
        <img src={kpLogo} alt="kp-logo" className={styles.rating__logo} />
        <span className={styles.rating__value}>{kp} / 10</span>
      </div>

      <div className={styles.rating__container}>
        <img src={imdbLogo} alt="imdb-logo" className={styles.rating__logo} />
        <span className={styles.rating__value}>{imdb} / 10</span>
      </div>
    </div>
  );
};

export default Ratings;
