import { Link } from "react-router-dom"
import WpImage from "../assets/wp.jpg"

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