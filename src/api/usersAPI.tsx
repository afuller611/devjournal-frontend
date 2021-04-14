import axios from 'axios'

export const signUpAPI = async (userObject: {
  username: string
  password: string
  name: string
}) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user`, {
    role: 'USER',
    ...userObject,
  })
  return res.data
}

export const logInAPI = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      username,
      password,
    })
    // Set the JWT to access token in local storage to be used everywhere else
    localStorage.setItem(
      'accessToken',
      res.headers.authorization.split('Bearer')[1].trim(),
    )
  } catch (err) {
    throw err
  }
}

export const getUserIdAPI = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/getUserId`,
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    return res.data
  } catch (err) {
    return false
  }
}
