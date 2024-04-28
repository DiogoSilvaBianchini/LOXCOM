import { useEffect, useState } from "react"

const useFetch = (url, method, token) => {
    const [data, setData] = useState(null)
    const [load, setload] = useState(false)
    const [status, setStatus] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const httpRequest = async () => {
            setload(true)
            const request = await fetch(url, {
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
        }

        if(method === "GET"){
            httpRequest()
        }
    },[url, method, token])

    const httpRequest = async (body) => {
        setload(true)
        
        const request = await fetch(url, {
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