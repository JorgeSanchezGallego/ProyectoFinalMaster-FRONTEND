import OrderList from "../components/OrderList"

/**
 * Componente de página que actúa como contenedor para el historial de pedidos.
 * * Este componente representa la vista de nivel de ruta ("/orders"). 
 * Su función principal es:
 * - Proporcionar el marco semántico (<section>) y el título de la página.
 * - Orquestar el renderizado del componente especializado `OrderList`.
 * - Facilitar la separación de conceptos entre la "página" (estructura) y el "componente" (lógica de datos).
 * * @component
 * @returns {JSX.Element} La página de historial de pedidos completa.
 */
export const OrdersPage = () => {
    return (
        <section className="orders-page">
            <h1>Mis pedidos</h1>
            <OrderList/>
        </section>
    )
}