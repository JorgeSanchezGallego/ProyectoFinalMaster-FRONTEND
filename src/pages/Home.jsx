import { Link } from "react-router-dom"
import WpImage from "../assets/wp.jpg"

/**
 * Componente de página de inicio (Landing Page).
 * * Representa el punto de entrada principal de la aplicación. Su objetivo es:
 * - Proporcionar una bienvenida visual al usuario.
 * - Servir como nodo de navegación inicial hacia las rutas de autenticación.
 * - Presentar la identidad visual del proyecto mediante una imagen de fondo temática.
 * * @component
 * @returns {JSX.Element} Vista de bienvenida con opciones de acceso y registro.
 */
export const Home = () => {
    return (
        <div className="home-container">
            <img src={WpImage} alt="Fondo de un bar" className="img-home"/>
            <h1>Bienvenido al Gestor de Pedidos</h1>
        
        <div className="buttons-home">
            <Link to={"/login"}>
                <button className="btn-login">Log in</button>
            </Link>
            <Link to={"/register"}>
                <button className="btn-register">Registrarse</button>
            </Link>
        </div>
        </div>
    )
}