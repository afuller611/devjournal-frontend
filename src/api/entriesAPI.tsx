import axios from 'axios'

export const getEntries = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/entry`, {
    headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
  return res.data
}

export const getEntryById = async (id: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/v1/entry/${id}`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
  return res.data
}

export const addEntry = async (entry: {
  markdown: string
  title: string
  userid: string
}) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/entry`,
    entry,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
  return res.data
}

export const editEntry = async (entry: {
  markdown: string
  title: string
  id: string
}) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/v1/entry/${entry.id}`,
    entry,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
  return res.data
}

export const deleteEntry = async (entryId: string) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/entry/${entryId}`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
  return res.data
}
