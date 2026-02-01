import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import { Home } from './pages/Home'
import { ProductsPage } from './pages/ProductsPage'
import Register from './components/Register'
import { NavBar } from './components/NavBar'
import { CartPage } from './pages/CartPage'
import { OrdersPage } from './pages/OrdersPage'
import { ProductForm } from './components/ProductForm'
import Footer from './components/Footer'
import { Toaster } from 'sonner'

function App() {
  

  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/orders' element={<OrdersPage/>}/>
        <Route path='/create-product' element={<ProductForm/>}/>
        <Route path='/edit-product/:id' element={<ProductForm/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
