import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

/**
 * Componente de formulario dinámico para la gestión de productos.
 *  Funcionalidades clave:
 *  Modo Dual: Detecta automáticamente si debe crear o editar basándose en el parámetro `:id` de la URL.
 *  Gestión de archivos: Utiliza la interfaz `FormData` para permitir el envío de imágenes al servidor.
 *  Seguridad: Implementa cabeceras de autorización con el token JWT recuperado de `localStorage`.
 *  Validación: Utiliza `react-hook-form` para asegurar la integridad de los datos antes del envío.
 * * @component
 * @returns {JSX.Element} Formulario con campos para nombre, categoría, distribuidor, precio e imagen.
 */
export const ProductForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [serverError, setServerError] = useState(null)
    const navigate = useNavigate()

    const { id} = useParams()//Extrae el id de la url
    const isEditing = !!id //Transforma a booleano true si existe

    const onSubmit = async (data) => {
        const formData = new FormData() //Como incluye imagen, no podemos crear un JSON, Form data permite empaquetar archivos y multer procesarlos
        formData.append("nombre", data.nombre)
        formData.append("categoria", data.categoria)
        formData.append("distribuidor", data.distribuidor)
        formData.append("precio", data.precio)

        if (data.img && data.img[0]){ //Los inputs de tipo archivo devuelven un array
            formData.append("img", data.img[0])
        }
        const token = localStorage.getItem("token") //Guardamos el token para poder usarlo en la peticion de mas adelante
        const baseUrl = import.meta.env.VITE_BACKEND_URL //Importamos la url base

        const url = isEditing ? `${baseUrl}/products/${id}` : `${baseUrl}/products` //Si isEditing es true, endpoint con ID, sino, endpoint para crear de 0 un producto
        const method = isEditing ? "PATCH" : "POST" //Si isEditing es true, quiere decir que es patch, sino es post

        try {
            
            const response = await fetch(url, {
                method: method, //Method abstracto declarado mas arriba segun la accion del usuario
                headers: {
                    "Authorization": `Bearer ${token}` //Envia el token para demostrar que eres manager
                },
                body: formData, //Le decimos que le enviamos un formData
            })
            if (!response.ok) { //Si hay algun fallo
                throw new Error("Error al crear el producto")
            }
            toast.success(isEditing ? "Producto actualizado con éxito" : "Producto creado con éxito")//Depende si isEditing es true o false, mostramos una cosa u otra
            navigate("/products")//Reedirigimos 
        } catch (error) {
            setServerError(error.message)
            toast.error("Error al guardar:" + error.message)
        }
    }
    return (
        <div className="form-container">
            <h2>{isEditing ? "Editar producto" : "Crear producto"}</h2>{/*Depende si isEditing es true o false, mostramos una cosa u otra*/}
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