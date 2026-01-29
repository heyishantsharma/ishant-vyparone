
import Navbar from './components/common/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/dashboard/Dashboard'
import Contact from './components/common/Contact'
import Footer from './components/common/Footer'
import Categories from './pages/shop/categories'
import ShopPage from './components/shop/Shop'
import OrdersPage from './pages/wholesaler/Orders'
import ShopDashboard from './pages/dashboard/ShopDashboard'
import WholesalerDashboard from './pages/dashboard/WholesalerDashboard'
import ProductsPage from './pages/shop/products'
import ExpensesPage from './pages/shop/Expanses'
import StockListPage from './components/wholesaler/StockList'
import SendStockForm from './components/wholesaler/SendStockForm'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/shop-dashboard' element={<ShopDashboard />} />
        <Route path='/wholesaler-dashboard' element={<WholesalerDashboard />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/expenses' element={<ExpensesPage />} />
        <Route path='/stockList' element={<StockListPage />} />
        <Route path='/stock-form' element={<SendStockForm />} />
      </Routes>
      <Footer />
    </Router>

  )
}

export default App
