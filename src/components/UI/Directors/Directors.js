import styles from './Directors.module.scss';

const Directors = ({ items }) => {
  return (
    <div className={styles.directors}>
      {items.map((item) => (
        <div key={item.name} className={styles.directors__container}>
          <img
            src={item.photo}
            alt={item.name}
            className={styles.directors__photo}
          />
          <div className={styles['directors__name-container']}>
            <span className={styles.directors__name}>{item.name}</span>
            <span className={styles.directors__profession}>
              {item.profession.slice(0, item.profession.length - 1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Directors;
