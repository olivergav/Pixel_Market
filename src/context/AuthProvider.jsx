import { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext({}) //factory function, zwraca funkcję bądź klasę

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('accessToken', {})

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
