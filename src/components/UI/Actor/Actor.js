import styles from './Actor.module.scss';

const Actor = ({ photoUrl, name, id, clickPersonHandler }) => {
  return (
    <div
      className={styles.actor}
      onClick={() => {
        clickPersonHandler(id);
      }}
    >
      <img src={photoUrl} alt={name} className={styles.actor__photo} />
      <span className={styles.actor__name}>{name}</span>
    </div>
  );
};

export default Actor;
