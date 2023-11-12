import React from 'react';
import AnimationForHome from 'components/animationForHome/AnimationForHome';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.backgroundImg}>
      <AnimationForHome />
    </div>
  );
};

export default Home;
