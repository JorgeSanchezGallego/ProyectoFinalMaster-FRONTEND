import logoImage from '../assets/logo-transparent.png' // Importación de imagen

/**
 * Componente funcional que representa el pie de página (footer) de la aplicación.
 * Este componente muestra:
 * Información del copyright con el año actual dinámico.
 * El nombre del autor del proyecto.
 * El logotipo transparente de la marca.
 * * @component
 * @returns {JSX.Element} El elemento footer renderizado con información de autoría y logo.
 */
const Footer = () => { // Componente footer 
    return (
    <footer className='app-footer'>
        <div className='container-copyright'>
            <p>Proyecto Final Master - Gestor de pedidos</p>
            <p>&copy; {new Date().getFullYear()} || Jorge Sánchez Gallego</p> {/*Pintamos año dinámico*/}
        </div>
        <div className='container-logo'>
            <img src={logoImage} alt="Jorge Sánchez" className='img-footer'/>
        </div>
    </footer>
    )
}

export default Footer