import React, { useState, useContext, createContext, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { logInAPI, getUserIdAPI } from '../api/usersAPI'

const defaultAuthState = {
  isAuthenticated: false,
  username: '',
  authenticate: (username: string, password: string) => {},
  logOut: () => {},
  authenticating: false,
  userId: ''
}

const AuthContext = createContext(defaultAuthState)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const authenticate = (usernameParam: string, password: string) => {
    setAuthenticating(true)

    // Call login API
    logInAPI(usernameParam, password).then((res) => {
      // Set the JWT to access token in local storage to be used everywhere else
    localStorage.setItem(
      'accessToken',
      res.headers.authorization.split('Bearer')[1].trim(),
    )
      setIsAuthenticated(true)
      setUsername(usernameParam)
      history.push('/entries')
      setIsAuthenticated(false)
    }).catch((err) => {
      // On error we'll assume invalid login credentials
      setIsAuthenticated(false)
      setUsername("")
      setAuthenticating(false)
      alert("Incorrect Username and Password")
    })
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
              localStorage.removeItem("accessToken")
          }
      })
      // Call get self endpoint to see if JWT is still valid
      // We can also send a request to API to see if it's a valid JWT
    }
  }, [username])

  const authObject = {
    isAuthenticated,
    username,
    authenticate,
    logOut,
    authenticating,
    userId
  }
  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default withRouter(AuthProvider)
