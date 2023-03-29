import styles from './Poster.module.scss';
import nullPosterLogo from '../../../assets/icons/photo-camera.png';

const Poster = ({ url, color, altName }) => {
  return (
    <>
      {url ? (
        <img
          src={url}
          alt={altName}
          className={styles.poster}
          style={{ boxShadow: `5px 5px 30px 10px ${color}` }}
        />
      ) : (
        <div className={styles['null-poster']}>
          <img
            src={nullPosterLogo}
            alt={altName}
            className={styles['null-poster-logo']}
          />
          <h3 className={styles['null-poster-title']}>Постер отсутствует...</h3>
        </div>
      )}
    </>
  );
};

export default Poster;
