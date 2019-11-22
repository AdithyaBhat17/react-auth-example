import React, { useState, FormEvent } from 'react';
import AuthProvider, { useAuth } from './context/useAuth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

const Home: React.FC = () => {  
  const auth: any = useAuth()

  return (    
    <React.Fragment>
      {auth && auth.user.isAuthenticated ? 'hi' : <Login />}
    </React.Fragment>
  )
}

const Login: React.FC = () => {
  const auth: any = useAuth()

  const [user, setUser] = useState<{email: string; password: string}>({email: '', password: ''})

  const handleChange = (event: any) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: FormEvent, signUp: boolean = false) => {
    event.preventDefault()
    const { email, password } = user
    signUp ? auth.signUp(email, password) : auth.signIn(email, password)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
         type="email" 
         name="email" 
         id="email" 
         onChange={handleChange} 
         value={user.email} 
         placeholder="email"
        />
        <input
         type="password" 
         name="password" 
         id="password" 
         onChange={handleChange} 
         value={user.password} 
         placeholder="password"
        />
        <input type="submit" value="Login"/>
        <input type="button" value="SignUp" onClick={(event: FormEvent) => handleSubmit(event, true)}/>
      </form>
    </>
  )
}

export default App;
