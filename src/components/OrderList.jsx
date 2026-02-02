import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'

/**
 * Componente que muestra el historial de pedidos del usuario.
 *  Utiliza el hook personalizado `useFetch` para obtener los datos de forma automática
 *  al montar el componente. Implementa renderizado condicional para gestionar:
 *  Estado de carga (Loading).
 *  Mensajes de error del servidor.
 *  Lista de pedidos vacía.
 *  Listado de tarjetas de pedido con detalles de productos.
 * * @component
 * @returns {JSX.Element} La vista del historial de pedidos.
 */
const OrderList = () => {
    const {data: orders, loading, error} = useFetch('/pedidos/historial')

    if(loading){
        return (
            <div className='loading-container'>
                <p className='loading-msg'>Cargando tu historial...</p>
            </div>
        )
    }
    if(error){
        return(
            <div className='error-container'>
                <h3>Error al cargar pedidos</h3>
                <p className='error-text'>{error}</p>
            </div>
        )
    }
    if (orders && orders.length === 0) {
        return (
            <div className='empty-orders'>
                <h2>No tienes pedidos</h2>
                <Link to={'/products'} className='btn-shop'>
                    <button className='btn-shop'>Ir a comprar</button>
                </Link>
            </div>
        )
    }
  return (
    <div className='order-list-container'>
        {orders && orders.map((order) => (
            <article key={order._id} className='order-card'>
                <header className='order-header'>
                    <div className='order-info'>
                        <p className='order-data'> Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className='order-id'>ID: {order._id}</p>
                    </div>
                    <div className='orden-summary'>
                        <span className='status'>{order.status}</span>
                        <span className='order-total'>{order.total.toFixed(2)} €</span>
                    </div>
                </header>
                <ul className='order-product-list'>
                    {order.products.map((item, index) => (
                        <li key={index} className='order-product-item'>
                            <div className="product-img-wrapper">
                                <img src={item.product?.img} alt={item.product?.nombre} className='order-product-img' />
                            </div>
                            <div className='product-info'>
                                <p className='product-quantity'>x {item.quantity} ud </p>
                                <p className='product-price'>{item.price} €</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        ))}
    </div>
  )
}

export default OrderList