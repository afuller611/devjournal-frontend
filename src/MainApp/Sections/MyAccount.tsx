import React, { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Tooltip, IconButton, Grid, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Typography } from '../../components/Typography'
import { Close } from '@material-ui/icons'
import { Input } from '../../components/Input'
import { useAuth } from '../../ContextProviders/AuthProvider'
import { Button } from '../../components/Button'
import { updateUserAPI } from '../../api/usersAPI'

const MyAccount = ({ ...props }) => {
  const { currentUser, setCurrentUser } = useAuth()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(currentUser.name)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    updateUserAPI(currentUser.id, currentUser.name)
      .then((res) => {
        setCurrentUser(res)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Tooltip title={<Typography color="white">{'My Account'}</Typography>}>
        <IconButton onClick={() => setOpen(true)}>
          <AccountCircle style={{ fontSize: 40, fill: 'white' }} />
        </IconButton>
      </Tooltip>
      <Modal handleClose={() => setOpen(false)} open={open}>
        <Grid container justify="space-between">
          <Typography variant="header">{'My Account'}</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Grid>
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={6}>
              <Input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                id="name"
                label="Name"
              />
            </Grid>
            <Grid item xs={6}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button>{'Submit New Name'}</Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  )
}

export default MyAccount
