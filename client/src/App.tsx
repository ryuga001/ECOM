import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminProduct from './admin/products';
import AdminOrder from './admin/orders';
import AdminCustomer from './admin/customers';

const Dashboard = lazy(() => import('./admin/dashboard'));
const Loader = lazy(() => import('./components/loader'));
const MyOrder = lazy(() => import('./pages/myorder'));
const PlaceOrder = lazy(() => import('./pages/placeorder'));
const ProductDescription = lazy(() => import('./pages/productdescription'));
const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />}></Route>

          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/product/:id' element={<ProductDescription />}></Route>
          <Route path='/place_order' element={<PlaceOrder />}></Route>
          {/* <Route path='/place_order' element={<LoggedRoute />} >        </Route>  */}
          <Route path='/login' element={<Login />}></Route>
          <Route path='/myorders' element={<MyOrder />}></Route>
          {/* {/* <Route path='/admin' element={<AdminRoute />}> */}
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin-product' element={<AdminProduct />} />
          <Route path='/admin-order' element={<AdminOrder />} />
          <Route path='/admin-customer' element={<AdminCustomer />} />
          {/* </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App