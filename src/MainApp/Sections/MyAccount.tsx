import React, { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Tooltip, IconButton, Grid } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Typography } from '../../components/Typography'
import { Close } from '@material-ui/icons';

const MyAccount = ({ ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Tooltip title={<Typography color="white">{'My Account'}</Typography>}>
        <IconButton onClick={() => setOpen(true)}>
          <AccountCircle style={{ fontSize: 40, fill: "white" }} />
        </IconButton>
      </Tooltip>
      <Modal handleClose={() => setOpen(false)} open={open}>
        <Grid container justify="space-between">
          <Typography variant="header">
            {"My Account"}
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Grid>
      </Modal>
    </>
  )
}

export default MyAccount
