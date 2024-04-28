import { useContext } from "react"
import { AppContexnt } from "../context/appContext"

export const useAppContext = () => {
    const context = useContext(AppContexnt)
    
    if(context === undefined){
        throw new Error("Contexto inesistente")
    }

    return context
}