import React, { useState, useContext, createContext, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { logInAPI, getUserIdAPI } from '../api/usersAPI'

const defaultAuthState = {
  isAuthenticated: false,
  username: '',
  authenticate: (username: string, password: string) => {},
  logOut: () => {},
  authenticating: false,
}

const AuthContext = createContext(defaultAuthState)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const authenticate = (username: string, password: string) => {
    setAuthenticating(true)

    // TODO
    // need an axios request that will get the JWT
    // Store jwt in local storage
    // Set name, username in state (assuming we get both from Jwt...probs won't get name)
    logInAPI(username, password)
    setTimeout(() => {
      setIsAuthenticated(true)
      setUsername('test')
      setAuthenticating(false)
      history.push('/entries')
    }, 2000)
  }

  const logOut = () => {
    // Remove JWT
    localStorage.removeItem("accessToken")
    setIsAuthenticated(false)
    history.push('/')
    setUsername('')
  }

  // TODO
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticating(true)
      getUserIdAPI().then((res) => {
        console.log(res)
          if (res) {
            setUserId(res)
            setIsAuthenticated(true)
          } else {
              setAuthenticating(false)
              setIsAuthenticated(false)
          }
      })
      // Call get self endpoint to see if JWT is still valid
      // We can also send a request to API to see if it's a valid JWT
    }
  }, [])

  const authObject = {
    isAuthenticated,
    username,
    authenticate,
    logOut,
    authenticating,
  }
  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default withRouter(AuthProvider)
