import ProductList from "../components/ProductList"

/**
 * Componente de página que actúa como contenedor principal para el catálogo de productos.
 * * Esta vista representa el "Marketplace" o lista de existencias de la aplicación. 
 * Su estructura permite:
 * - Separar el encabezado semántico del contenido dinámico.
 * - Centralizar los estilos de layout para la rejilla de productos.
 * - Servir como punto de entrada para el hook de navegación y el filtrado global.
 * * @component
 * @returns {JSX.Element} La página de catálogo con encabezado y lista de productos.
 */
export const ProductsPage = () => {
    return (
        <section className="products-page-container">
            <header className="products-header">
                <h1 className="page-title">Nuestro Catálogo</h1>
            </header>
            <ProductList/>
        </section>
    )
}