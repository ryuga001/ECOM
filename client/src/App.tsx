import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Loader = lazy(() => import('./components/loader'));
const MyOrder = lazy(() => import('./pages/myorder'));
const PlaceOrder = lazy(() => import('./pages/placeorder'));
const ProductDescription = lazy(() => import('./pages/productdescription'));
const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/product/:id' element={<ProductDescription />}></Route>
          <Route path='/place_order' element={<PlaceOrder />}></Route>
          <Route path='/myorders' element={<MyOrder />}></Route>
          <Route path='/login' element={<Login />}></Route>
          {/* login register admin dashboard  */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App