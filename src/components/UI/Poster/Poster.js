import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Poster.module.scss';
import nullPosterLogo from '../../../assets/icons/photo-camera.png';

const Poster = ({ url, color, altName }) => {
  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    const temp = url || nullPosterLogo;
    setImgUrl(temp);
  }, [url]);

  return (
    <div className={styles['null-poster']}>
      <img
        src={imgUrl}
        alt={altName}
        className={cn({
          [styles.poster]: url,
          [styles['null-poster-logo']]: !url,
        })}
        style={{ boxShadow: `5px 5px 30px 10px ${color}` }}
      />
      {!url && (
        <h3 className={styles['null-poster-title']}>Постер отсутствует...</h3>
      )}
    </div>
  );
};

export default Poster;
