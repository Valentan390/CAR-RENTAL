import { useSelector } from 'react-redux';
import { selectFavorite } from 'redux/favorite/selectorsFavorite';
import styles from './FavoritsCarsCards.module.css';

import CarItem from 'components/carItem/CarItem';

const FavoritsCarsCards = () => {
  const favoritsCars = useSelector(selectFavorite);

  return (
    <>
      <ul className={styles.advertsList}>
        {favoritsCars.map(car => {
          return <CarItem car={car} key={car.id} />;
        })}
      </ul>
    </>
  );
};

export default FavoritsCarsCards;
