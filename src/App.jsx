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

/**
 * Componente raíz de la aplicación.
 * * Responsabilidades:
 * - Configurar el enrutamiento global mediante `BrowserRouter`.
 * - Definir la estructura base de la interfaz (NavBar, Contenido dinámico, Footer).
 * - Centralizar el sistema de notificaciones `Toaster`.
 * - Establecer el mapeo entre las URLs del navegador y los componentes/páginas.
 * * @component
 * @returns {JSX.Element} El esqueleto principal de la aplicación con todas sus rutas.
 */
function App() {
  

  return (
    <BrowserRouter>{/*Envoltorio principal */}
      <Toaster position="top-center" richColors />{/* Componente de notificaciones: 'richColors' habilita estilos por tipo (éxito/error) */}
      <NavBar/> {/*Se coloca fuera de las routes para que este siempre visible */}
      <Routes>{/*Definicion de las rutas */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/orders' element={<OrdersPage/>}/>
        <Route path='/create-product' element={<ProductForm/>}/>
        <Route path='/edit-product/:id' element={<ProductForm/>}/>
      </Routes>
      <Footer/>{/*Se coloca fuera de las routes para que este siempre visible */}
    </BrowserRouter>
  )
}

export default App
