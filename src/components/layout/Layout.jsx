import React from 'react';
import styles from './Layout.module.css';
import { NavLink, Outlet } from 'react-router-dom';

let activeClassName = {
  color: 'white',
  backgroundColor: 'orangered',
  borderRadius: '12px',
};

const Layout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.logo}>
          <span className={styles.icon} role="img" aria-label="computer icon">
            🚗🚘🚙
          </span>{' '}
          CAR-RENTAL SERVIS{' '}
          <span className={styles.icon} role="img" aria-label="computer icon">
            🚗🚘🚙
          </span>{' '}
        </p>
        <nav>
          <NavLink
            className={styles.link}
            to="/"
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            className={styles.link}
            to="/catalog"
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            Catalog
          </NavLink>
          <NavLink
            className={styles.link}
            to="/favourites"
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            Favourites
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
