import styles from './Frames.module.scss';
import nullFrame from '../../../assets/icons/photo-camera.png';

const Frames = ({ frames, onFrameClickHandler }) => {
  return (
    <div className={styles.frames}>
      <h3 className={styles.frames__title}>Кадры из фильма</h3>
      <div className={styles.frames__grid}>
        {frames.map((frame, index) => (
          <img
            key={frame.url}
            src={frame.url}
            alt={frame.type}
            className={styles['frames__item-image']}
            onClick={() => {
              onFrameClickHandler(index);
            }}
            onError={(e) => {
              e.currentTarget.src = nullFrame;
              e.currentTarget.className = styles['null-frame'];
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Frames;
