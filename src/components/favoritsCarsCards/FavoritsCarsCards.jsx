import { useSelector } from 'react-redux';
import { getFilterFavorite } from 'redux/favorite/selectorsFavorite';
import styles from './FavoritsCarsCards.module.css';

import CarItem from 'components/carItem/CarItem';
import { selectFiltersFavorite } from 'redux/filters/selectorsFilters';
import LoaderSpiner from 'components/loaderSpiner/LoaderSpiner';

const FavoritsCarsCards = () => {
  const favoritsCarsFilter = useSelector(selectFiltersFavorite);

  const isFilterOn = Boolean(
    favoritsCarsFilter.selectedMake ||
      favoritsCarsFilter.selectedPrice ||
      favoritsCarsFilter.minMileage ||
      favoritsCarsFilter.maxMileage
  );

  const filterFavoritsCars = useSelector(getFilterFavorite);

  return (
    <>
      {/* {isFilterOn && <LoaderSpiner />} */}
      {filterFavoritsCars.length > 0 ? (
        <ul className={styles.advertsList}>
          {filterFavoritsCars.map(car => {
            return <CarItem car={car} key={car.id} />;
          })}
        </ul>
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
