import { useEffect, useState } from "react";

export function useFetch(endpoint) {
    const [ data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        setLoading(true)
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_BACKEND_URL
                const url = `${baseUrl}${endpoint}`

                const token = localStorage.getItem("token")

                const headers = {
                    "Content-Type": "application/json"
                }
                if(token) {
                    headers.Authorization = `Bearer ${token}`
                }
                
                const response = await fetch(url, {signal: abortController.signal, headers: headers})
                if (!response.ok) {
                    throw new Error("Error al lanzar la petición")
                }
                const jsonData = await response.json()
                setData(jsonData)
                setError(null)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Petición cancelada");
                } else {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        return () => abortController.abort()
    }, [endpoint])
    return {data, loading, error}
}