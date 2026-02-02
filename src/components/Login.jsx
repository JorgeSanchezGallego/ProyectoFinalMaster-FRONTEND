import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

    /**
 * Componente funcional que gestiona la interfaz y lógica de inicio de sesión.
 *  Este componente permite al usuario autenticarse en la aplicación mediante:
 *  Captura de credenciales (email y contraseña) a través de un formulario controlado.
 *  Petición asíncrona al endpoint de autenticación del backend.
 *  Validación de la respuesta del servidor y manejo de errores amigables.
 *  Almacenamiento seguro del token JWT y la información del usuario en `localStorage` tras un éxito.
 *  Redirección programática a la vista de productos.
 * * @component
 * @returns {JSX.Element} El componente de formulario de login renderizado.
 */
const Login = () => {
    const [email, setEmail] = useState("") //Estado para el correo electronico del usuario
    const [password, setPassword] = useState("") //Estado para la contraseña del usuario
    const [error, setError] = useState("")//Estado para mostrar y guardar errores del servidor

    const navigate = useNavigate()//Declaramos navigate para usarlo mas adelante

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * Realiza la llamada a la API y gestiona la persistencia de la sesión.
     * * @param {React.FormEvent} e - Evento de envío del formulario.
     * @async
     */
    const handleSubmit = async (e) => { //Funcion asincrona donde capturamos el evento
        e.preventDefault()//Evita que el navegador recargue la pagina automaticamente al hacer click
        setError(null)//Limpia cualquier mensaje de error previo
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL //Nos traemos la url base de nuestro backend
            const response = await fetch(`${baseUrl}/users/login`, { //Añadimos el endpoint
                method: "POST", //Le decimos que será post
                headers: {"Content-Type": "application/json"}, //Comunicamos que sera en formato json
                body: JSON.stringify({email, password})//Formato cadena de texto JSON para que el servidor la entienda
            })
            const data = await response.json() //Respuesta que viene como texto plano, lo pasamos a un objeto JS

            if (!response.ok){ //Si hay un error
                throw new Error(data || "Error al iniciar sesión")
            }
            localStorage.setItem("token", data.token)//Guarda el token para poder usarlo mas adelante
            localStorage.setItem("user", JSON.stringify(data.user))//Convierte a texto y guarda los datos del usuario 
            toast.success("Bienvenido de nuevo "+ data.user.nombre); //Pop up para dar informacion
            setTimeout(() => {navigate("/products")}, 1500)//Le damos tiempo al usuario antes de ser reedirigido para que lea el mensaje
            
        } catch (error) {
            setError(error.message)//Si hay algun error, actualizamos el estado de error
        }
    }
  return ( //Renderizado del componente
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