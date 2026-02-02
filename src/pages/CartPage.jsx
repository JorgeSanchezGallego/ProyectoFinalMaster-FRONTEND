import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Componente que representa la página del carrito de compras.
 * * Funcionalidades:
 * - Visualización detallada de los productos añadidos.
 * - Gestión de cantidades y eliminación de artículos.
 * - Cálculo de subtotales y total general.
 * - Finalización de compra (Checkout) con envío de datos al backend.
 * - Protección de ruta: redirige al login si no hay token al intentar comprar.
 * * @component
 * @returns {JSX.Element} Vista del resumen de compra y pasarela de pedido.
 */
export const CartPage = () => {
    const {cart, removeFromCart, totalPrice, clearCart} = useCart() //Extraemos funciones necesarias del contexto global
    const navigate = useNavigate()//Redirecciones
    const [isBuying, setIsBuying] = useState(false)//Estado para comprobar el loading del boton de compra

    /**
     * Procesa la orden de compra enviándola a la API.
     * Realiza validaciones de seguridad y formatea los datos para el backend.
     * @async
     */
    const handleCheckout = async () => {
        const token = localStorage.getItem("token")//Recuperamos el token
        if (!token){//Verificamos si estamos logueados
            toast.error("Necesitas iniciar sesión para realizar el pedido")
            navigate("/login")
            return
        }
        setIsBuying(true)//Confirmamos estado
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL //Construimos la base de la url
            const orderPayload = { //Mapeo de datos: Transformamos el carrito al formato que espera el modelo Order de Mongoose
                products: cart.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.precio
                })),
                total: totalPrice
            }
            const response = await fetch(`${baseUrl}/pedidos`, {//Montamos url final
                method: "POST",//Metodo post
                headers: {
                    "Content-Type": "application/json",//Sera json y mostramos autorizacion
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(orderPayload)//Pasamos a texto el JSON
            })
            const data = response.json()//Pasamos a objeto JS
            if(!response.ok){
                throw new Error(data.error)
            }
            toast.success("Pedido realizado!")
            clearCart()//Limpiamos el carrito si se ha efectuado la compra
            navigate("/products")
        } catch (error) {
            console.error(error)
            toast.error("No autorizado")
            setIsBuying(false)
        }
    }
    if (cart.length === 0) {//Mensaje si el carrito esta vacio
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
                    <button onClick={() => {clearCart(); toast.success("Carrito vaciado")}} className="btn-clean">Vaciar carrito</button>
                </div>

            </div>
        </div>
    )
}