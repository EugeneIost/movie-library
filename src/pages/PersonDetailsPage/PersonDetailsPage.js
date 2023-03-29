import { fetchPersonById } from '@/store/person-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './PersonDetailsPage.module.scss';

const PersonDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const person = useSelector((state) => state.person.person);
  const status = useSelector((state) => state.person.status);
  const error = useSelector((state) => state.person.error);

  useEffect(() => {
    dispatch(fetchPersonById(id));
  }, [id]);

  console.log(person);

  return (
    <>
      {person && (
        <div className={styles.person}>
          <div className={styles.person__header}>
            <img
              src={person.photo}
              alt={person.name}
              className={styles.person__photo}
            />
            <div className={styles['person__fields-container']}>
              <span className={styles.person__name}>
                {person.name ? person.name : person.enName}
              </span>
              <span className={styles['person__text-field']}>
                Возраст: {person.age}
              </span>
              <span className={styles['person__text-field']}>
                Дата рождения:{' '}
                {new Intl.DateTimeFormat('ru-Ru').format(
                  new Date(person.birthday)
                )}
                {person.deth
                  ? `- ${new Intl.DateTimeFormat('ru_Ru').format(
                      new Date(person.deth)
                    )}`
                  : ''}
              </span>
              {person.countAwards && (
                <span className={styles['person__text-field']}>
                  Количество наград: {person.countAwards}
                </span>
              )}
              {person.profession && (
                <span className={styles['person__text-field']}>
                  Профессия:{' '}
                  {person.profession.map((profession, index) => (
                    <span
                      key={profession.value}
                      className={styles['person__text-field']}
                    >
                      {index === person.profession.length - 1
                        ? `${profession.value}`
                        : `${profession.value}, `}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
          {/* <swiper-container slides-per-view="4" speed="500">
            {movie.persons.map((person) => (
              <swiper-slide key={person.photo}>
                <Actor
                  id={person.id}
                  photoUrl={person.photo}
                  name={person.name}
                  clickPersonHandler={clickPersonHandler}
                />
              </swiper-slide>
            ))}
          </swiper-container> */}
        </div>
      )}
    </>
  );
};

export default PersonDetailsPage;
