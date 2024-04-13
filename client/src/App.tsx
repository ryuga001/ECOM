import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './components/loader';
import ProductDescription from './pages/productdescription';
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App