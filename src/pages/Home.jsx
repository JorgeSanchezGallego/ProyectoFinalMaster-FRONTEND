import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido al Gestor de Pedidos</h1>
        
        <div className="buttons-home">
            <Link to={"/login"}>
                <button>Log in</button>
            </Link>
            <Link to={"/register"}>
                <button>Registrarse</button>
            </Link>
        </div>
        </div>
    )
}