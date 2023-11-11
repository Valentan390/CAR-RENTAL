import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import styles from './LoaderSpiner.module.css';

const LoaderSpiner = () => {
  return (
    <div className={styles.overlay} id="overlay">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#E3FFA8"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

export default LoaderSpiner;
