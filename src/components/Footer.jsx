import logoImage from '../assets/logo-transparent.png' // Importación de imagen

const Footer = () => { // Componente footer 
    return (
    <footer className='app-footer'>
        <div className='container-copyright'>
            <p>Proyecto Final Master - Gestor de pedidos</p>
            <p>&copy; {new Date().getFullYear()} || Jorge Sánchez Gallego</p>
        </div>
        <div className='container-logo'>
            <img src={logoImage} alt="Jorge Sánchez" className='img-footer'/>
        </div>
    </footer>
    )
}

export default Footer