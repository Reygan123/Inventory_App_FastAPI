import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/Home";
import ProductList from './pages/Products/Products';
import DetailProduct from './pages/Products/detailProduct';
import Warehouse from './pages/Warehouses/Warehouse';
import DetailWarehouse from './pages/Warehouses/DetailWarehouse';
import Supplier from './pages/Suppliers/Supplier';
import DetailSupplier from './pages/Suppliers/DetailSupplier';
import Category from "./pages/Category/Category";
import DetailCategory from "./pages/Category/DetailCategory";
import Order from "./pages/Order/Order";
import DetailOrder from "./pages/Order/OrderDetail";
import SupplyOrder from "./pages/Supply_Orders/SupplyOrder";
import DetailSupplyOrder from "./pages/Supply_Orders/DetailSupplyOrder";
import './App.css'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<DetailProduct />} />
          <Route path='/warehouse' element={<Warehouse />} />
          <Route path='/warehouse/:id' element={<DetailWarehouse />} />
          <Route path='/supplier' element={<Supplier />} />
          <Route path='/supplier/:id' element={<DetailSupplier />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:id' element={<DetailCategory />} />
          <Route path='/order' element={<Order />} />
          <Route path='/order/:id' element={<DetailOrder />} />
          <Route path='/supply-order' element={<SupplyOrder />} />
          <Route path='/supply-order/:id' element={<DetailSupplyOrder />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
