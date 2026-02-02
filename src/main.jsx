import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

/**
 * Punto de entrada principal de la aplicación React (Vite).
 * * Responsabilidades:
 * - Localizar el nodo del DOM ('root') para inyectar la aplicación.
 * - Envolver la aplicación en `StrictMode` para detectar problemas potenciales durante el desarrollo.
 * - Inyectar el `CartProvider` en el nivel más alto para asegurar que el estado global 
 * del carrito esté disponible en todos los componentes y rutas.
 * - Renderizar el componente raíz `App`.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>{/* El Provider debe envolver a App para que cualquier página o componente dentro de ella pueda usar el hook useCart() */}
      <App />
    </CartProvider>
  </StrictMode>,
)
