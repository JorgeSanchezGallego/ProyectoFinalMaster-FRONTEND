import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Register = () => {
    const { register, handleSubmit, formState: {errors}} = useForm()

    const navigate = useNavigate()
    const [serverError, setServerError] = useState(null)

    const onSubmit = async (data) => {
        setServerError(null)
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL
            const response = await fetch(`${baseUrl}/users/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }) 
            const json = await response.json()
            if (!response.ok){
                throw new Error(json.error)
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
                    {...register("nombre", {
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