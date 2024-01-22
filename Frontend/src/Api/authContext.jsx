import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

const AuthDataProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext)

export {useAuthContext, AuthDataProvider}