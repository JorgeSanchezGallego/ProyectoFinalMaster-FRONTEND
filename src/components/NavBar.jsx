import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import brandImg from '../assets/logo-transparent.png'
import { toast } from "sonner"


export const NavBar = () => {
    const {totalItems} =useCart()
    const user = JSON.parse(localStorage.getItem("user")) || {}
    const isManager = user.role === "encargado"

const isLogged = !!user.email
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={brandImg} alt="Jorge Sánchez" className="img-navbar" />
            </div>
            <div className="navbar-links">
                {isLogged && (
                <Link to={"/products"}>Productos</Link>)}
                {isManager && (
                <Link to={"/orders"}>Mis pedidos</Link>)}
                {isManager && (
                <Link to={"/cart"} className="cart-icon">🛒 {totalItems > 0 && (<span className="cart-badge">{totalItems}</span>)}</Link>)}
                {isLogged && (
                    <button
                    className="btn-logout"
                        onClick={() => {
                            localStorage.clear() 
                            toast.success(`Hasta pronto ${user.nombre}!`)
                            setTimeout(() => {window.location.href = "/"}, 1000)
                        }} >Salir</button>
                )}
            </div>
        </nav>
    )
}