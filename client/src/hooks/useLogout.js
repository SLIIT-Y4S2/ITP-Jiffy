import { useAuthContext } from "./useAuthContext"
import Cookies from 'js-cookie'

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // remove user-session cookie
        if (Cookies.get("cookie-session")) {
            Cookies.remove("cookie-session");
        }
        
        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}