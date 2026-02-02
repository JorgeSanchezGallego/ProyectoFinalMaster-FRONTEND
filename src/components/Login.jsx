import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL
            const response = await fetch(`${baseUrl}/users/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const data = await response.json()

            if (!response.ok){
                throw new Error(data || "Error al iniciar sesión")
            }
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("Bienvenido de nuevo "+ data.user.nombre);
            setTimeout(() => {navigate("/products")}, 1500)
            
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='login-container'>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label >Email:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </div>
            <div>
                <label >Contraseña:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button type='submit'>Login!</button>
        </form>
    </div>
  )
}

export default Login