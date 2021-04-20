import React, { useState, useEffect } from 'react'
import { Typography } from '../../components/Typography'
import { Link, useHistory, useParams } from 'react-router-dom'
import { editUserByIdAPI, getUserByIdAPI, signUpAPI } from '../../api/usersAPI'
import { CircularProgress, Grid } from '@material-ui/core'
import { Button } from '../../components/Button'
import DeleteUserDialog from './DeleteUserDialog'
import { Input } from '../../components/Input'

const UserEdit = () => {
  const history = useHistory()
  const { userId = '' } = useParams<Record<string, string | undefined>>()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    if (userId === '0') {
      // New user
      signUpAPI({ name, username, password })
        .then((addedUser) => {
          setSubmitting(false)
          history.push(`/users/${addedUser.id}`)
        })
        .catch((err) => {
          console.log(err)
          setSubmitting(false)
          alert('An error occurred while addin the user')
        })
    } else {
      // Edit user
      editUserByIdAPI({ userId, username, name })
        .then((res) => {
          setName(res.name)
          setSuccess(true)
        })
        .catch((err) => {
          console.log(err)
          alert('An error occurred while editing the user')
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  }

  useEffect(() => {
    setSuccess(false)
  }, [name])

  useEffect(() => {
    if (userId !== '0') {
      setLoading(true)
      getUserByIdAPI(userId)
        .then((res) => {
          setUsername(res.username)
          setName(res.name)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          alert('Error fetching user')
        })
    }
  }, [userId])

  if (loading) {
    return (
      <Grid container justify="center" style={{ marginTop: 20 }}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <div style={{ marginTop: 20 }}>
      <Link
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          marginBottom: 20,
        }}
        to="/users"
      >
        {'Back to All Users <'}
      </Link>
      <br />
      <br />
      <Typography color="white" variant="header">
        {userId === '0' ? 'Add a New User' : 'Edit User'}
      </Typography>
      {success && (
        <Typography color="green" variant="subheader">
          {'User Successfully Saved!'}
        </Typography>
      )}
      {userId !== '0' && (
        <Button
          backgroundColor="red"
          style={{ marginTop: 20 }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          {'Delete User?'}
        </Button>
      )}
      <form onSubmit={handleSubmit}>
        {userId === '0' ? (
          <Grid container spacing={3} style={{ marginTop: 30 }}>
            <Grid item xs={12}>
              <Input
                required
                id="name"
                label="Username"
                labelColor="white"
                value={username}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                id="name"
                label="Password"
                labelColor="white"
                value={password}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                id="name"
                label="Name"
                labelColor="white"
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} style={{ marginTop: 30 }}>
            <Grid item xs={12}>
              <Typography color="white">{`Username (cannot change): ${username}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                id="name"
                label="Name"
                labelColor="white"
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
              />
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} container justify="flex-end">
          {submitting ? <CircularProgress /> : <Button>{'Save User'}</Button>}
        </Grid>
      </form>
      <DeleteUserDialog
        open={deleteDialogOpen}
        userId={userId}
        handleClose={() => setDeleteDialogOpen(false)}
      />
    </div>
  )
}
export default UserEdit
