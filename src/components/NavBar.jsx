import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export const NavBar = () => {
    const {totalItems} =useCart()
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to={"/"} className="brand-link">Gestor de pedidos</Link>
            </div>
            <div className="navbar-links">
                <Link to={"/products"}>Productos</Link>
                <Link to={"/orders"}>Mis pedidos</Link>
                <Link to={"/cart"} className="cart-icon">🛒 {totalItems > 0 && (<span className="cart-badge">{totalItems}</span>)}</Link>
            </div>
        </nav>
    )
}