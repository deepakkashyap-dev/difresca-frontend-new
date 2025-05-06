import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Error404 } from './pages';
import { Profile, AddressList, OrderList } from './components/Account'
import { Loader } from './components/shared';
import Layout from './components/Layout';
import RootLayout from './components/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
const ProductView = React.lazy(() => import('./pages/ProductView'));
const SearchView = React.lazy(() => import('./pages/SearchView'));
const CategoryProductView = React.lazy(() => import('./pages/CategoryProdView'));
const DealProductView = React.lazy(() => import('./pages/DealProductView'));
const Account = React.lazy(() => import('./pages/Account'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));

const AppWithRouting = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Layout component={<Home />} />} />
        <Route path="/search/" element={<Suspense fallback={<Loader />}><Layout noFooter={true} component={<SearchView />} /></Suspense>} />
        <Route
          path="/account/"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Layout noFooter={true} component={<Account />} />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route path='address' element={<AddressList />} />
          <Route path='profile' element={<Profile />} />
          <Route path='order' element={<OrderList />} />
          <Route path="" element={<Navigate to="order" />} />
        </Route>
        <Route path='/checkout' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Layout noFooter={true} component={<CheckoutPage />} />
            </Suspense>
          </ProtectedRoute>
        } />

        <Route
          path="/product/:name/pid/:id"
          element={
            <Suspense fallback={<Loader className="bg-lime-100" />}>
              <Layout component={<ProductView />} />
            </Suspense>
          }
        />
        <Route
          path="/deal/:name/pid/:id"
          element={
            <Suspense fallback={<Loader className="bg-lime-100" />}>
              <Layout component={<DealProductView />} />
            </Suspense>
          }
        />
        <Route
          path="/cat/:name/pid/:catId/:id"
          element={
            <Suspense fallback={<Loader className="bg-lime-100" />}>
              <Layout component={<CategoryProductView />} />
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
      </Route>
    </Routes>
  );
};

export default AppWithRouting;
