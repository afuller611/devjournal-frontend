import React, { useState } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useAuth } from '../../ContextProviders/AuthProvider'
import { Typography } from '../../components/Typography'
import { Redirect } from 'react-router-dom'

const LogIn = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    authenticate(username, password);
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { authenticate, authenticating, isAuthenticated } = useAuth()

  // If the user is already authenticated and comes to the login page, then just send them to the home page
  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        direction="column"
        style={{ marginTop: 20 }}
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography color="white" variant="header">
            {'Lets get ya logged in!'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Input
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
            required
            label="Username"
            id="username"
            labelColor="white"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            value={password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            required
            label="Password"
            id="password"
            labelColor="white"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          {authenticating ? (
            <CircularProgress style={{ color: '#19F8FF' }} />
          ) : (
            <Button>{'Log Me In'}</Button>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default LogIn
