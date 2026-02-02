import { createContext, useContext, useState } from "react";

const CartContext = createContext()//Crea el contenedor donde viviran los datos

/**
 * Contexto global para la gestión del carrito de compras.
 * * Este componente utiliza la Context API de React para evitar el "prop drilling",
 * permitiendo que cualquier componente de la aplicación acceda y modifique el carrito.
 * * Funcionalidades principales:
 * - Almacenamiento centralizado del estado del carrito.
 * - Lógica de agregación inteligente (suma cantidad si el producto ya existe).
 * - Cálculo automático de totales (cantidad de productos y precio final).
 * - Persistencia temporal durante la sesión del usuario.
 * * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que serán envueltos por el proveedor.
 * @returns {JSX.Element} El proveedor de contexto con el estado y funciones del carrito.
 */
export function CartProvider ({children}) {//Componente que envuelve toda la app, la prop children representa todos los componentes
    const [cart, setCart] = useState([])//Array que empieza vacio y donde iremos guardando los productos
    const addToCart = (product) => {
        setCart((prevCart) => {
            const productInCart = prevCart.find((item) => item._id === product._id)//Si el productincart existe
            if (productInCart) {//Le sumamos 1 ya que ya existe
                return prevCart.map((item) => item._id === product._id ? {...item, quantity: item.quantity + 1}: item)
            } else {//Si no existe, lo creamos con 1 unidad
                return [...prevCart, {...product, quantity: 1}]
            }
        })
    }
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId))//Crea un array donde sobreviven todos los productos excepto el que queremos eliminar
    }
    const clearCart = () => setCart([]) //Limpiamos todo el carrito

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)//Sumamos el total de la cantidad de productos
    const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0)//Sumamos el total de todos los productos y su cantidad

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => useContext(CartContext) //Custom hook para que en otros archivos solo tenga que escribir la importacion y no el useContext