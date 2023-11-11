import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Header, Logo, Link, Icon } from './Layout.styled';

const Layout = () => {
  return (
    <Container>
      <Header>
        <Logo>
          <Icon
            role="img"
            aria-label="computer icon"
            style={{ width: '480px' }}
          >
            🚗🚘🚙
          </Icon>{' '}
          CAR-RENTAL
        </Logo>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/favourites">Favourites</Link>
        </nav>
      </Header>
      <Outlet />
    </Container>
  );
};

export default Layout;
