import styles from './Actor.module.scss';

const Actor = ({ photoUrl, name }) => {
  return (
    <div className={styles.actor}>
      <img src={photoUrl} alt={name} className={styles.actor__photo} />
      <span className={styles.actor__name}>{name}</span>
    </div>
  );
};

export default Actor;
