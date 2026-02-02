import React, { useState } from 'react'
import { useFetch} from "../hooks/useFetch"
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'
import { set } from 'react-hook-form'

const ProductList = () => {
    const {data: products, loading, error} = useFetch("/products")
    const {addToCart} = useCart()
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))
    const isSupplier = user.role === "comercial"
    const isManager = user.role ==="encargado"

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token")
        const baseUrl = import.meta.env.VITE_BACKEND_URL

        try {
            const response = await fetch(`${baseUrl}/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                toast.success("Producto eliminado")
                setTimeout(() => window.location.reload(), 1500 )
            } else {
                toast.error("Error al borrar")
            }
        } catch (error) {
            console.error("Error en la conexión")
        }
    }

    if (loading) return <p>Cargando productos</p>
    if (error) {
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

    const filteredProducts = products ? products.filter((product) => {
        const term = searchTerm.toLowerCase()
        const name = product.nombre.toLowerCase()
        const category = product.categoria.toLowerCase()
        return name.includes(term) || category.includes(term)
    }) : []

  return (
    <div className='product-list-container'>
    <div className='search-container'>
        <input 
            type="text"
            placeholder='Busca por nombre o categoria'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} className='search-input' />
    </div>

    {isSupplier && (
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
                                onClick={() => handleDelete(product._id)}>
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