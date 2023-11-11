import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useSelector } from 'react-redux';
import { selectCarsModal } from 'redux/carsData/selectorsCardsData';
import closeBtn from '../../imeges/close.svg';
import modalCarPhoto from './../../imeges/2020errarif8spyder1031593551679.jpg';

const ModalRoot = document.getElementById('ModalRoot');

const Modal = ({ onClose, shownModal }) => {
  const arreyCersModal = useSelector(selectCarsModal);
  //   const carModal = arreyCersModal[0];

  //   console.log(year);

  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    // if (shownModal) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflow = 'auto';
    // }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, shownModal]);

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdrop}>
      <div className={styles.modalContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src={closeBtn} alt="close" width={14} height={14} />
        </button>
        {arreyCersModal.map(car => {
          return (
            <div key={car.id}>
              <div className={styles.wrapperCar}>
                <img
                  src={car.img || modalCarPhoto}
                  alt="car"
                  className={styles.carImage}
                  width={461}
                  height={248}
                  onError={e => {
                    e.target.src = modalCarPhoto;
                  }}
                />
              </div>
              <div className={styles.carTitle}>
                <h2>
                  {car.make} <span> {styles.model}</span>, {car.year}
                </h2>
              </div>

              <div className={styles.carInfo}>
                {car.address.split(',')[1]}&ensp;|&ensp;
                {car.address.split(',')[2]}
                &ensp;|&ensp;Id: {car.id}
                &ensp;|&ensp;Year: {car.year}&ensp;|&ensp;Type: {car.type}
              </div>

              <div className={styles.carInfo}>
                Fuel Consumption: {car.fuelConsumption}
                &ensp;|&ensp;Engine Size: {car.engineSize}
              </div>

              <div className={styles.carDescription}>{car.description}</div>
              <div className={styles.secondaryTitle}>
                Accessories and functionalities:
              </div>

              <div className={styles.AccessoriesList}>
                {car.functionalities.map((functionaliti, index) => {
                  return <li key={index}> {functionaliti} | </li>;
                })}
              </div>
              <div className={styles.secondaryTitle}>Rental Conditions: </div>

              <ul className={styles.conditionList}>
                {car.rentalConditions.split('\n').map((condition, index) => {
                  const characters = condition.split('');
                  return (
                    <li key={index}>
                      {characters.map((char, charIndex) => {
                        const isDigit = /^\d+$/.test(char);
                        return (
                          <span
                            key={charIndex}
                            style={{
                              color: isDigit ? '#3470FF' : '#363535',
                              fontWeight: isDigit ? 600 : 400,
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </li>
                  );
                })}
                <li>
                  Mileage:{' '}
                  <span style={{ color: '#3470FF', fontWeight: 600 }}>
                    {Number(car.mileage).toLocaleString('en')}
                  </span>
                </li>
                <li>
                  Price:{' '}
                  <span style={{ color: '#3470FF', fontWeight: 600 }}>
                    {car.rentalPrice}
                  </span>
                </li>
              </ul>
              <a className={styles.btnRentalCar} href="tel:+380730000000">
                Rental car
              </a>
            </div>
          );
        })}
      </div>
    </div>,
    ModalRoot
  );
};

export default Modal;
