import styles from './ModalFramesCarousel.module.scss';
import nullFrame from '../../../assets/icons/photo-camera.png';
import closeIcon from '../../../assets/icons/close-icon.png';

const ModalFramesCarousel = ({
  frames,
  currentFrameIndex,
  onClickCloseModal,
}) => {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <img
          src={closeIcon}
          alt="close icon"
          className={styles['close-icon']}
          onClick={onClickCloseModal}
        />
        <swiper-container
          slides-per-view="1"
          speed="500"
          navigation="true"
          loop="true"
          initial-slide={`${currentFrameIndex}`}
        >
          {frames.map((frame) => (
            <swiper-slide key={frame.url}>
              <div className={styles['image-container']}>
                <img
                  src={frame.url}
                  alt={frame.type}
                  className={styles.modal__frame}
                  onError={(e) => {
                    e.currentTarget.src = nullFrame;
                    e.currentTarget.className = styles['null-frame'];
                  }}
                />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default ModalFramesCarousel;
