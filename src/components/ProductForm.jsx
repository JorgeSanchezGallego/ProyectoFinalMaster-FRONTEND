import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

export const ProductForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [serverError, setServerError] = useState(null)
    const navigate = useNavigate()

    const { id} = useParams()
    const isEditing = !!id

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("nombre", data.nombre)
        formData.append("categoria", data.categoria)
        formData.append("distribuidor", data.distribuidor)
        formData.append("precio", data.precio)

        if (data.img && data.img[0]){
            formData.append("img", data.img[0])
        }
        const token = localStorage.getItem("token")
        const baseUrl = import.meta.env.VITE_BACKEND_URL

        const url = isEditing ? `${baseUrl}/products/${id}` : `${baseUrl}/products`
        const method = isEditing ? "PATCH" : "POST"

        try {
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })
            if (!response.ok) {
                throw new Error("Error al crear el producto")
            }
            alert(isEditing ? "Producto actualizado con éxito" : "Producto creado con éxito")
            navigate("/products")
        } catch (error) {
            setServerError(error.message)
        }
    }
    return (
        <div className="form-container">
            <h2>{isEditing ? "Editar producto" : "Crear producto"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    placeholder="Nombre"
                    {...register("nombre", {required: true})} />
                    <select {...register("categoria", {required:true})}>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Comida">Comida</option>
                        <option value="Limpieza">Limpieza</option>
                    </select>
                    <select {...register("distribuidor", {required:true})}>
                        <option value="Makro">Makro</option>
                        <option value="Comcarcia">Comcarcia</option>
                        <option value="Coca cola">Coca cola</option>
                        <option value="Fruteria Pepe">Fruteria Pepe</option>
                    </select>
                    <input 
                        type="number" 
                        step="0.01"
                        placeholder="Precio"
                        {...register("precio", {required:true})} />
                        <input 
                            type="file" 
                            accept="image/*"
                            {...register("img", {required:true})} />
                            <button type="submit">{isEditing ? "Actualizar datos" : "Crear producto"}</button>
                            {serverError && <p className="error">{serverError}</p>}
            </form>
        </div>
    )
}