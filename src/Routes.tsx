import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Error404, Account } from './pages';
import { Profile, AddressList, OrderList } from './components/Account'
import { Loader } from './components/shared';
import Layout from './components/Layout';
const ProductView = React.lazy(() => import('./pages/ProductView'));
const SearchView = React.lazy(() => import('./pages/SearchView'));

const AppWithRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout component={<Home />} />} />
      <Route path="/search/" element={<Layout noFooter={true} component={<SearchView />} />} />
      <Route path="/account" element={<Layout component={<Account />} />} >
        <Route path='address' element={<AddressList />} />
        <Route path='profile' element={<Profile />} />
        <Route path='order' element={<OrderList />} />
      </Route>
      <Route
        path="/prn/:name/prid/:id"
        element={
          <Suspense fallback={<Loader fullscreen />}>
            <Layout component={<ProductView />} />
          </Suspense>
        }
      />
      <Route
        path="/not-found"
        element={<Layout noFooter={true} component={<Error404 />} />}
      />
      <Route
        path="*"
        element={<Layout noFooter={true} component={<Error404 />} />}
      />
    </Routes>
  );
};

export default AppWithRouting;
