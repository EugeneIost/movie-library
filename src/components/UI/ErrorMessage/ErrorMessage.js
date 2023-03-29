import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.error}>
      <h3 className={styles.error__title}>Упс! Что-то пошло не так...</h3>
      <p className={styles.error__code}>Код ошибки: {error}</p>
    </div>
  );
};

export default ErrorMessage;
