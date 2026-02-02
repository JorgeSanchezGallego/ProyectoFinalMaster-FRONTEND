import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

/**
 * Componente que gestiona el registro de nuevos usuarios en la plataforma.
 *  Funcionalidades clave:
 *  Utiliza `react-hook-form` para gestionar el estado del formulario y las validaciones.
 *  Implementa validaciones en el cliente (Required, minLength, Regex para email).
 *  Realiza una petición POST asíncrona al backend para crear el perfil de usuario.
 *  Maneja respuestas de error tanto de validación como del servidor (usuarios duplicados).
 *  Proporciona feedback visual mediante `sonner` y redirige al login tras el éxito.
 * * @component
 * @returns {JSX.Element} Formulario de registro con validación de datos.
 */
const Register = () => {
    const { register, handleSubmit, formState: {errors}} = useForm()//Register para conectar los inputs, handleSubmit middleware que valida que este correcto y ejecuta otra funcion, errors contiene los mensajes de validacion

    const navigate = useNavigate()//Redireccion
    const [serverError, setServerError] = useState(null)//Estado para errores del server

    const onSubmit = async (data) => { //Funcion que le pasamos los datos del usuario
        setServerError(null)//Limpiamos de posibles errores
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL//Traemos la base de la url
            const response = await fetch(`${baseUrl}/users/register`, {//Montamos url con el endpoint
                method: 'POST',//Metodo post
                headers: { "Content-Type": "application/json" },//Sera json
                body: JSON.stringify(data)//Cadena de texto de JSON
            }) 
            const json = await response.json()//Lo pasamos a objeto JS
            if (!response.ok){//Manejo de errores
                const message = typeof json === 'string' ? json : json.error || "Error al registrarse"
                throw new Error(message)
            }
            console.log("Usuario registrado", json);
            toast.success("Cuenta creada con éxito, ahora inicia sesión!")
            navigate("/login")
            
        } catch (error) {
            setServerError(error.message)
        }
    }
  return (
    <div className='register-container'>
        <h2>Crea tu cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
                <label>Nombre</label>
                <input 
                    type="text" 
                    {...register("nombre", {//Nos quedamos con todo register, pero en nombre lo actualizas y con estos requerimientos
                        required: "El nombre es obligatorio",
                        minLength: {value: 2, message: "Mínimo 2 caracteres"}
                    })} />
                    {errors.nombre && <p className='error-text'>{errors.nombre.message}</p>}
            </div>
            <div className='form-group'>
                <label >Email</label>
                <input 
                    type="email" 
                    {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Correo no válido"
                        }
                    })} />
                    {errors.email && <p className='error-text'>{errors.email.message}</p>}
            </div>
            <div className='form-group'>
                <label >Role</label>
                <select 
                    {...register("role", {required: "Debes asignar un role"})}>
                    <option value="encargado">Encargado</option>
                    <option value="comercial">Comercial</option>
                    <option value="trabajador">Trabajador</option>
                </select>
                    {errors.role && <p className='error-text'>{errors.role.message}</p>}
            </div>
            <div className='form-group'>
                <label >Contraseña</label>
                <input 
                    type="password" 
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: {value: 8, message: "La contraseña debe tener al menos 8 caracteres"}
                    })} />
                    {errors.password && <p className='error-text'>{errors.password.message}</p>}
            </div>
            {serverError && <p className='server-error'>{serverError}</p>}
            <button type='submit'>Registrarse</button>
        </form>
    </div>
  )
}

export default Register