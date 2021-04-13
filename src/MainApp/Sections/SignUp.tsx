import React, { useState } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Typography } from '../../components/Typography'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      history.push('/signup-complete')
    }, 2000)

    console.log('submitting')
  }
  return (
    <div>
      <Grid
        container
        justify="center"
        spacing={3}
        style={{ marginBottom: 30, marginTop: 20 }}
      >
        <Grid item xs={12}>
          <Typography color="white" textAlign="center" variant="header">
            Welcome to Dev Journal! Your Personal Journal for all things...Dev!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="white" bold textAlign="center" variant="subheader">
            Log in or create an account below!
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={3} direction="column">
          <Grid item xs={12}>
            <Input
              value={name}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setName(e.currentTarget.value)
              }
              required
              id="name"
              label="Full Name"
              labelColor="white"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              value={username}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setUsername(e.currentTarget.value)
              }
              required
              id="username"
              label="Username"
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
              id="password"
              label="Password"
              labelColor="white"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            {isSubmitting ? (
              <CircularProgress style={{ color: '#19F8FF' }} />
            ) : (
              <Button size="large">{'Create My Account!'}</Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
export default SignUp