import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Typography } from '../../components/Typography'
import { Button } from '../../components/Button'
import { CircularProgress, Grid } from '@material-ui/core'
import { deleteEntry } from '../../api/entriesAPI'
import { useHistory } from 'react-router'

const DeleteEntryDialog = (props: any) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteEntry(props.entryId)
    } catch (err) {
      alert('An error occurre while deleting the entry')
    }
    history.push('/entries')
  }

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      <Typography variant="header" textAlign="center" color="red">
        {'Are you sure you want to delete this journal entry?'}
      </Typography>
      <Grid
        justify="space-between"
        container
        spacing={3}
        style={{ marginTop: 20, padding: 20 }}
      >
        <Grid item xs={6}>
          <Button size="large" onClick={props.handleClose}>
            {'Cancel'}
          </Button>
        </Grid>
        <Grid item xs={6} container justify="flex-end">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              backgroundColor="red"
              size="large"
              onClick={handleDelete}
            >
              {'Delete'}
            </Button>
          )}
        </Grid>
      </Grid>
    </Modal>
  )
}
export default DeleteEntryDialog
