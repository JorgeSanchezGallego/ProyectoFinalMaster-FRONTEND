import { useEffect, useState } from "react";

/**
 * Hook personalizado para la gestión de peticiones HTTP GET.
 * * Proporciona una solución robusta para el consumo de APIs que incluye:
 * - Gestión automática del token de autenticación (JWT) desde localStorage.
 * - Control de estados de ciclo de vida: carga (loading), éxito (data) y error.
 * - Implementación de `AbortController` para cancelar peticiones pendientes si el componente se desmonta.
 * - Sincronización automática con el servidor cada vez que cambia el `endpoint`.
 * * @param {string} endpoint - La ruta relativa de la API (ej: "/products").
 * @returns {Object} Un objeto con tres propiedades:
 * @returns {any} data - Los datos devueltos por la API tras el éxito.
 * @returns {boolean} loading - Indica si la petición está en curso.
 * @returns {string|null} error - Contiene el mensaje de error en caso de fallo.
 */
export function useFetch(endpoint) {
    const [ data, setData] = useState(null)//Estado para la respuesta
    const [loading, setLoading] = useState(true)//Estado para la carga de datos
    const [error, setError] = useState(null)//Estado para el error

    useEffect(() => {//Solo se dispara cuando el endpoint cambia
        const abortController = new AbortController()//Evita doble acciones del usuario
        setLoading(true)//En carga
        const fetchData = async () => {//Dentro de un useEffect no puedes hacer que la función principal sea async. Por eso, creamos una función interna (fetchData) que sí es asíncrona para poder usar await.
            try {
                const baseUrl = import.meta.env.VITE_BACKEND_URL//Importamos la base url
                const url = `${baseUrl}${endpoint}`//Construimos la url final

                const token = localStorage.getItem("token")//Recuperamos el token

                const headers = {
                    "Content-Type": "application/json"//El cuerpo sera json
                }
                if(token) { //Si hay token, mostramos autorizacion
                    headers.Authorization = `Bearer ${token}`
                }
                
                const response = await fetch(url, {signal: abortController.signal, headers: headers})//Esta peticion esta bajo el control de abortController
                if (!response.ok) {//Mensaje de error
                    throw new Error("Error al lanzar la petición")
                }
                const jsonData = await response.json() //Pasamos a objeto JS
                setData(jsonData)//Guardamos en data
                setError(null)//limpiamos errores
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Petición cancelada");
                } else {
                    setError(error.message)
                }
            } finally {
                setLoading(false)//Ya no hay carga
            }
        }
        fetchData()//Llamamos a la funcion
        return () => abortController.abort()//Esta es la función de limpieza (cleanup function). React la ejecuta justo antes de destruir el componente. Es el momento en el que ejecutamos el abort(). Si el componente muere, la petición muere con él.
    }, [endpoint])//Vigilamos el endpoint
    return {data, loading, error}//Devolvemos data, loading y error
}