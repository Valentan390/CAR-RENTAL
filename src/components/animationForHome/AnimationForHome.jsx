import React from 'react';

import MovingComponent from 'react-moving-text';
import styles from './AnimationForHome.module.css';

const AnimationsForChaining = ['popIn'];

const AnimationForHome = () => {
  return (
    <div className={styles.title}>
      <MovingComponent
        type={AnimationsForChaining}
        duration="3388ms"
        timing="linear"
        fillMode="forwards"
        iteration={1}
      >
        Welcome <br /> Car-Rental Service
      </MovingComponent>
    </div>
  );
};

export default AnimationForHome;
