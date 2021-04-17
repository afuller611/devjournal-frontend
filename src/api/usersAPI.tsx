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
    return res
  } catch (err) {
    throw err
  }
}

export const getCurrentUserAPI = async () => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/user/sub/getCurrentUser`,
      {}, // empty body
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

export const updateUserAPI = async (id: string, name: string) => {
  const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`, { "name" : name }, {headers: {
    authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }})
  return res.data
}
