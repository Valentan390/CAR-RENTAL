import { useSelector } from 'react-redux';
import { getFilterFavorite } from 'redux/favorite/selectorsFavorite';
import styles from './FavoritsCarsCards.module.css';

import CarItem from 'components/carItem/CarItem';
import CarFilterFavorits from 'components/carFilterFavorits/CarFilterFavorits';

const FavoritsCarsCards = () => {
  const filterFavoritsCars = useSelector(getFilterFavorite);

  return (
    <>
      {filterFavoritsCars.length > 0 ? (
        <>
          {' '}
          <CarFilterFavorits />
          <ul className={styles.advertsList}>
            {filterFavoritsCars.map(car => {
              return <CarItem car={car} key={car.id} />;
            })}
          </ul>
        </>
      ) : (
        <div className={styles.noMatching}>
          Oops, there's nothing here. Go to the catalog to add cars to your
          favorites.
        </div>
      )}
    </>
  );
};

export default FavoritsCarsCards;
