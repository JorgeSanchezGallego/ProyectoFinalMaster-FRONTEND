import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const CartPage = () => {
    const {cart, removeFromCart, totalPrice, clearCart} = useCart()
    const navigate = useNavigate()

    const handleCheckout = () => {
        alert("Pedido realizado con éxito")
        clearCart()
        navigate("/products")
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
                                <button onClick={() => removeFromCart(product._id)} className="btn-remove">Eliminar</button>
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
                    <button onClick={handleCheckout} className="btn-checkout">Finalizar compra</button>
                    <button onClick={clearCart}>Vaciar carrito</button>
                </div>

            </div>
        </div>
    )
}