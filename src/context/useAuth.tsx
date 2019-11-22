import React, { createContext, useContext, useState } from 'react'

export type User = {
    isAuthenticated: boolean;
    email: string;
}

const authContext = createContext(null)

const AuthProvider: React.FC<{
    children: any
}> = ({children}) => {
    const auth = useProvideAuth()
    // @ts-ignore
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// hooks to be used by child components to access the auth object
export const useAuth = () => {
    return useContext(authContext)
}

// provide signIn/signUp methods
export const useProvideAuth = () => {
    let [user, setUser] = useState<User>({
        isAuthenticated: false,
        email: ''
    })

    // implement your own auth, maybe use OAuth providers...
    const signIn = (email: string, password: string): User => {
        let userExists: boolean = false
        users.forEach(user => {
            if(user.email === email && user.password === password)
                userExists = true
        })
        if(userExists)
            setUser({isAuthenticated: true, email})
            
        return user
    }

    const signUp = (email: string, password: string): User | boolean => {
        for(let user of users) {
            if(user.email === email)
                return false
        }

        if(email && password) {            
            users = [{email, password}, ...users]
            setUser({isAuthenticated: true, email})
        }

        return user
    }

    const signOut = (): User => {
        setUser({isAuthenticated: false, email: ''})
        return user
    }

    return {
        signUp, 
        signIn, 
        signOut, 
        user
    }
}

let users: Array<{email: string; password: string}> = [
    {
        email: 'adi@gmail.com',
        password: 'adi' // fuck encryption eh?
    }
]

export default AuthProvider

