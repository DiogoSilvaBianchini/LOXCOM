import { useEffect, useState } from "react"

const useFetch = (url, method, token) => {
    const [data, setData] = useState(null)
    const [load, setload] = useState(false)
    const [status, setStatus] = useState(false)
    const [error, setError] = useState(null)
    const backEndUrl = import.meta.env.VITE_SERVER_URL + url || url

    useEffect(() => {
        const httpRequest = async () => {
            try {
                setload(true)
                const request = await fetch(backEndUrl, {
                    headers: {"Content-Type":"application/json", token},
                    method
                })

                const response = await request.json()
                setStatus(response.status)
                if(response.status !== 200){
                    setError(response.message)
                }else{
                    setData(response.message)
                }
                setload(false)
            } catch (error) {
                setError(error.message)
            }
        }

        if(method === "GET"){
            httpRequest()
        }
    },[backEndUrl, method, token])

    const httpRequest = async (body) => {
        setload(true)
        
        const request = await fetch(backEndUrl, {
            headers: {"Content-Type":"application/json", token},
            method,
            body: JSON.stringify(body)
        })
        const response = await request.json()
        
        setStatus(response.status)

        if(response.status !== 200){
            setError(response.message)
        }else{
            setData(response.message)
        }
        setload(false)
    }

    

    return {data, load, status, error, httpRequest}
}


export default useFetch