// HOC component
// Token authentication 

import { Navigate } from "react-router-dom"
import { getToken } from "../utils"

const AuthRoute = ({ children }) => {
    const token = getToken()
    // if the user is authenticated, it renders the children components passed to AuthRoute
    if (token) {
        return <>{children}</>
    }
    // if the user is authenticated, it redirects to the /login route using the Navigate component from react-router-dom
    else {
        return <Navigate to='/login' replace />
    }
}

export default AuthRoute
