import styles from './BackdropImage.module.scss';

const BackdropImage = ({ imageUrl }) => {
  return (
    <div
      className={styles.backdrop}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
};

export default BackdropImage;
