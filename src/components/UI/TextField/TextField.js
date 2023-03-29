import styles from './TextField.module.scss';

const TextField = ({ title, items }) => {
  return (
    <div className={styles['text-container']}>
      <span className={styles.text}>
        <b>{title}:</b>
      </span>
      <div>
        {items.map((item, index) => {
          if (index !== items.length - 1) {
            return (
              <span key={item.name} className={styles.text}>
                {item.name}
                {', '}
              </span>
            );
          } else
            return (
              <span key={item.name} className={styles.text}>
                {item.name}
              </span>
            );
        })}
      </div>
    </div>
  );
};

export default TextField;
