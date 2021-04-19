import React, { useState, useContext, createContext, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { logInAPI, getCurrentUserAPI } from '../api/usersAPI'
import jwt_decode from 'jwt-decode'

const defaultAuthState = {
  isAuthenticated: false,
  username: '',
  authenticate: (username: string, password: string) => {},
  logOut: () => {},
  authenticating: false,
  currentUser: { name: '', id: '' },
  setCurrentUser: (object: any) => {},
  isAdmin: false,
}

const AuthContext = createContext(defaultAuthState)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ ...props }) => {
  const history = useHistory()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [username, setUsername] = useState('')
  const [currentUser, setCurrentUser] = useState({ name: '', id: '' })
  const [isAdmin, setIsAdmin] = useState(false)

  const authenticate = (usernameParam: string, password: string) => {
    setAuthenticating(true)

    // Call login API
    logInAPI(usernameParam, password)
      .then((res) => {
        // Set the JWT to access token in local storage to be used everywhere else
        localStorage.setItem(
          'accessToken',
          res.headers.authorization.split('Bearer')[1].trim(),
        )
        setIsAuthenticated(true)
        setUsername(usernameParam)
        history.push('/entries')
        setAuthenticating(false)
        fetchCurrentUser()
      })
      .catch((err) => {
        // On error we'll assume invalid login credentials
        setIsAuthenticated(false)
        setUsername('')
        setAuthenticating(false)
        alert('Incorrect Username and Password')
      })
  }

  const logOut = () => {
    // Remove JWT
    localStorage.removeItem('accessToken')
    setIsAuthenticated(false)
    history.push('/')
    setUsername('')
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [username, isAuthenticated])

  useEffect(() => {
    // If they're authenticated, lets check to see if they're an admin
    if (isAuthenticated) {
      let jwt = localStorage.getItem('accessToken') || null
      if (jwt) {
        let decodedJwt: {
          authorities: Array<{ authority: string }>
        } = jwt_decode(jwt)
        if (
          decodedJwt.authorities.some(
            (authority) => authority.authority === 'ROLE_ADMIN',
          )
        ) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      }
    } else {
      setIsAdmin(false)
    }
  }, [isAuthenticated])

  const fetchCurrentUser = () => {
    // On each refresh or authentication change let's check for access token
    if (localStorage.getItem('accessToken')) {
      // If there is an access token, let's check to see if it's valid by calling the getUserIDAPI
      setAuthenticating(true)
      // getCurrentUserAPI will give us the details of the user that's currently logged in
      getCurrentUserAPI().then((res) => {
        if (res) {
          setCurrentUser(res)
          setIsAuthenticated(true)
        } else {
          // If res is false, then scrap the token and set the user as not authenticated
          setIsAuthenticated(false)
          localStorage.removeItem('accessToken')
        }
        setAuthenticating(false)
      })
    }
  }

  const authObject = {
    isAuthenticated,
    username,
    authenticate,
    logOut,
    authenticating,
    currentUser,
    setCurrentUser,
    isAdmin,
  }
  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default withRouter(AuthProvider)
