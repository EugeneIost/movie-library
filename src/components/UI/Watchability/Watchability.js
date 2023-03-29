import styles from './Watchability.module.scss';

const Watchability = ({ items }) => {
  return (
    <div className={styles.watchability}>
      <h2 className={styles.watchability__title}>Где посмотреть?</h2>
      {items.map((item) => (
        <a key={item.name} href={item.url}>
          <img
            src={item.logo.url}
            alt={item.name}
            className={styles.watchability__item}
          />
        </a>
      ))}
    </div>
  );
};

export default Watchability;
