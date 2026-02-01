import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

export const CartPage = () => {
    const {cart, removeFromCart, totalPrice, clearCart} = useCart()
    const navigate = useNavigate()
    const [isBuying, setIsBuying] = useState(false)

    const handleCheckout = async () => {
        const token = localStorage.getItem("token")
        if (!token){
            toast.error("Necesitas iniciar sesión para realizar el pedido")
            navigate("/login")
            return
        }
        setIsBuying(true)
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL 
            const orderPayload = {
                products: cart.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.precio
                })),
                total: totalPrice
            }
            const response = await fetch(`${baseUrl}/pedidos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(orderPayload)
            })
            const data = response.json()
            if(!response.ok){
                throw new Error(data.error)
            }
            toast.success("Pedido realizado!")
            clearCart()
            navigate("/products")
        } catch (error) {
            console.error(error)
            toast.error("No autorizado")
            setIsBuying(false)
        }
    }
    if (cart.length === 0) {
        return (
            <div className="cart-empty-container">
                <h2>Tu carrito está vacio</h2>
            </div>
        )
    }
    return (
        <div className="cart-container">
            <h1>Resumen de tu pedido</h1>
            <div className="cart-grid">
                <div className="cart-items">
                    {cart.map((product) => (
                        <div key={product._id} className="cart-item">
                            <img src={product.img} alt={product.nombre} />
                            <div className="item-details">
                                <h3>{product.nombre}</h3>
                                <p className="unit-price">{product.precio} € / ud</p>
                            </div>
                            <div className="item-actions">
                                <span className="quantity-badge">x {product.quantity}</span>
                                <button onClick={() => {removeFromCart(product._id); toast.success("Producto eliminado")}} className="btn-remove">Eliminar</button>
                            </div>
                            <div className="item-total-price">
                                {(product.precio * product.quantity).toFixed(2)} €
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Total a pagar</h2>
                    <div className="total-amount">
                        {totalPrice.toFixed(2)} €
                    </div>
                    <button onClick={handleCheckout} className="btn-checkout" disabled={isBuying}>{isBuying ? "Procesando" : "Finalizar compra"}</button>
                    <button onClick={() => {clearCart(); toast.success("Carrito vaciado")}}>Vaciar carrito</button>
                </div>

            </div>
        </div>
    )
}