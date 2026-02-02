import React, { useState } from 'react'
import { useFetch} from "../hooks/useFetch"
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'

/**
 * Componente principal para la visualización y gestión del catálogo de productos.
 *  Funcionalidades principales:
 *  Listado dinámico: Carga automática de productos mediante el hook `useFetch`.
 *  Filtrado en tiempo real: Búsqueda reactiva por nombre o categoría sin peticiones adicionales a la API.
 *  Autorización basada en Roles: 
 *  "comercial": Puede crear, editar y eliminar productos.
 *  "encargado": Puede añadir productos al carrito.
 *  Gestión de persistencia: Manejo de borrado físico de productos con actualización de estado.
 * * @component
 * @returns {JSX.Element} Una rejilla (grid) de productos con herramientas de búsqueda y gestión.
 */
const ProductList = () => {
    const {data: products, loading, error} = useFetch("/products") //Traemos todos los productos
    const {addToCart} = useCart()//Extrae la funcion addtocart del contexto global para añadir productos
    const [searchTerm, setSearchTerm] = useState("")//Estado para comprobar que el usuario escribe en el buscador
    const navigate = useNavigate()//Redireccionar

    const user = JSON.parse(localStorage.getItem("user"))//Recuperamos al user
    const isSupplier = user.role === "comercial" //Devuelve booleano
    const isManager = user.role ==="encargado"

    const handleDelete = async (id) => { //Funcion asincrona que necesita de un id para borrar
        const token = localStorage.getItem("token") //Recuperamos el token para mas adelante
        const baseUrl = import.meta.env.VITE_BACKEND_URL //Importamos la url basica

        try {
            const response = await fetch(`${baseUrl}/products/${id}`, {//Construimos el endpoint con el id
                method: "DELETE",//Metodo delete
                headers: {
                    "Authorization": `Bearer ${token}`//Mostramos nuestro token 
                }
            })
            if (response.ok) {//Mensaje de exito
                toast.success("Producto eliminado")
                setTimeout(() => window.location.reload(), 1500 )
            } else { //Mensaje de error
                toast.error("Error al borrar")
            }
        } catch (error) {
            console.error("Error en la conexión")
        }
    }

    if (loading) return <p>Cargando productos</p>//Mensaje de carga
    if (error) {//Mensaje para el error
        return (
            <div className='error-container'>
                <h3>Ha ocurrido un problema</h3>
                <p>{error}</p>
                <Link to="/" className='back-link'>
                    <button>Volver</button>
                </Link>
            </div>
        )
    }

    const filteredProducts = products ? products.filter((product) => { //Si products existe, le hacemos un filter
        const term = searchTerm.toLowerCase() //Pasamos a lowerCase el termino a buscar
        const name = product.nombre.toLowerCase()
        const category = product.categoria.toLowerCase()
        return name.includes(term) || category.includes(term) //Si cualquiera es verdad, se queda en la lista
    }) : [] //Si no hay productos, es array vacio

  return (
    <div className='product-list-container'>
    <div className='search-container'>
        <input 
            type="text"
            placeholder='Busca por nombre o categoria'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} className='search-input' />
    </div>

    {isSupplier && ( //Si el usuario es comercial lo muestra
        <div className='container-btn-create'>
        <button
            className='btn-create'
            onClick={() => navigate("/create-product")}>
                Subir producto
            </button>
        </div>
    )}

    {products && filteredProducts.length === 0 && (
        <div className='empty-results'>
            <p>No encontrado</p>
        </div>
    )}
    <div className='product-grid'>
        
        {filteredProducts.map((product) => (
            <article key={product._id} className='product-card'>
                <div className='image-container'>
                    <img src={product.img} alt={product.nombre} className='product-img' />
                </div>
                <div className='card-body'>
                    <h3 className='product-title'>{product.nombre}</h3>
                    <p className='product-category'>{product.categoria}</p>
                    <div className='card-footer'>
                        <span className='product-price'>{product.precio}€</span>
                        {isManager && (
                        <button 
                            className='add-btn' 
                            onClick={() => {addToCart(product); toast.success(`Añadido al carrito: ${product.nombre}`)}}>Añadir</button>)}
                        {isSupplier && (
                            <button
                                className='update-btn'
                                onClick={() => navigate(`/edit-product/${product._id}`)}>
                                    Editar producto
                            </button>
                        )}
                        {isSupplier && (
                            <button
                                className='delete-btn'
                                onClick={() => handleDelete(product._id)}> {/*Le pasamos id con ._ por que viene de mongo */}
                                    Borrar producto
                            </button>
                        )}
                    </div>
                </div>

            </article>
        ))}
    </div>
    </div>
  )
}

export default ProductList