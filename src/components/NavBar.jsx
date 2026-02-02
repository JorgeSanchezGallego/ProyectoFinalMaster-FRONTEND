import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import brandImg from '../assets/logo.png'
import { toast } from "sonner"

/**
 * Componente que representa la barra de navegación principal de la aplicación.
 *  Este componente gestiona la navegación global y muestra diferentes opciones
 *  dependiendo del estado de autenticación y el rol del usuario:
 *  Usuarios no autenticados: Ven una barra simplificada.
 *  Usuarios autenticados: Acceso a la lista de productos y botón de cierre de sesión.
 *  Usuarios con rol "encargado": Acceso adicional al historial de pedidos y al carrito de compras.
 * * @component
 * @returns {JSX.Element} La estructura de navegación con enlaces condicionales y acciones de usuario.
 */
export const NavBar = () => {
    const {totalItems} =useCart()//Acceso al estado global del carrito para mostrar la cantidad
    const user = JSON.parse(localStorage.getItem("user")) || {}//Recuperacion del objeto user del localStorage, si no hay, objeto vacio
    const isManager = user.role === "encargado"//Determina si el usuario tiene permisos de encargado
    const navigate = useNavigate()//Para reedireccionar

const isLogged = !!user.email//Booleano que indica si una sesion esta activa, comprobando que user tiene email por ejemplo
    return ( //Renderizacion del componente
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={brandImg} alt="Jorge Sánchez" className="img-navbar" />
            </div>
            <div className="app-name">
                <p>Worder</p>
            </div>
            <div className="navbar-links">
                {isLogged && ( //Distintos componentes dependiendo del role del usuario
                <Link to={"/products"}>Productos</Link>)}
                {isManager && (
                <Link to={"/orders"}>Mis pedidos</Link>)}
                {isManager && (
                <Link to={"/cart"} className="cart-icon">🛒 {totalItems > 0 && (<span className="cart-badge">{totalItems}</span>)}</Link>)}
                {isLogged && (
                    <button
                    className="btn-logout" //Boton para salir de la sesion
                        onClick={() => {
                            localStorage.clear() //Al hacer click, limpiamos el localStorage
                            toast.success(`Hasta pronto ${user.nombre}!`)//Mensaje pop up de exito
                            setTimeout(() => {navigate("/")}, 1000)//Tiempo para leer el mensaje antes de reedireccionar
                        }} >Salir</button>
                )}
            </div>
        </nav>
    )
}