import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export function CartProvider ({children}) {
    const [cart, setCart] = useState([])
    const addToCart = (product) => {
        setCart((prevCart) => {
            const productInCart = prevCart.find((item) => item._id === product._id)
            if (productInCart) {
                return prevCart.map((item) => item._id === product._id ? {...item, quantity: item.quantity + 1}: item)
            } else {
                return [...prevCart, {...product, quantity: 1}]
            }
        })
    }
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId))
    }
    const clearCart = () => setCart([])

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0)

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
export const useCart = () => useContext(CartContext)