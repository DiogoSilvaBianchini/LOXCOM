import { AppContexnt } from "./appContext"
import { useCookies } from "react-cookie"

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
    const [cookie, setCookies] = useCookies(['token'])
    const listFavorityIds = [""]

    return <AppContexnt.Provider value={{cookie, setCookies, listFavorityIds}}>
        {children}
    </AppContexnt.Provider>
}