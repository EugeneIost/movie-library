import styles from './LoadingSpin.module.scss';

const LoadingSpin = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spin}></div>
      <h3 className={styles.loading__title}>Загрузка данных...</h3>
    </div>
  );
};

export default LoadingSpin;
