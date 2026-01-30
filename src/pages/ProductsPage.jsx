import ProductList from "../components/ProductList"

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