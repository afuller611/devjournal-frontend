import React, { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Tooltip, IconButton } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Typography } from '../../components/Typography'

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
        My Account Modal
      </Modal>
    </>
  )
}

export default MyAccount
