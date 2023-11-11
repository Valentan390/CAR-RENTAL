import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Favourites from 'pages/Favourites';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="favourites" element={<Favourites />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
