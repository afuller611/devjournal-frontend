import { useEffect, useState } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import { useHistory, useParams, Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Typography } from '../../components/Typography'
import { Input } from '../../components/Input'
import { CustomEditor } from '../../components/Editor'
import { addEntry, editEntry, getEntryById } from '../../api/entriesAPI'
import { useAuth } from '../../ContextProviders/AuthProvider'
import DeleteEntryDialog from './DeleteEntryDialog'

const EntryEditor = () => {
  const history = useHistory()
  const { entryId = '' } = useParams<Record<string, string | undefined>>()
  const [title, setTitle] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (entryId !== '0') {
      setLoading(true)
      getEntryById(entryId)
        .then((res) => {
          setTitle(res.title)
          setMarkdown(res.markdown)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          alert('Error fetching journal entry')
        })
    }
  }, [entryId])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (entryId === '0') {
        // It's a new entry so add
        const addedEntry = await addEntry({
          markdown,
          title,
          userid: currentUser.id,
        })
        history.push(`/entries/${addedEntry.id}`)
      } else {
        // It's an edit so edit
        await editEntry({ title, markdown, id: entryId })
      }
      setSuccess(true)
    } catch (err) {
      console.log(err)
      alert('An error occurred while saving your journal entry')
    }
    setSubmitting(false)
  }

  useEffect(() => {
    // If any of the dependencies change, let's set success to false if it's true
    setSuccess(false)
  }, [markdown, title])

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
        to="/entries"
      >
        {'Back to All Entries <'}
      </Link>
      <br />
      <br />
      <Typography variant="header" color="white">
        {entryId === '0' ? 'Add a New Entry!' : 'Edit your Entry!'}
      </Typography>
      <br />
      <Typography variant="subheader" color="white">
        {'Entry should be in markdown'}
      </Typography>
      {success && (
        <Typography color="green" variant="subheader">
          {'Journal Entry Successfully Saved!'}
        </Typography>
      )}
      {entryId !== '0' && (
        <Button
          backgroundColor="red"
          style={{ marginTop: 20 }}
          onClick={() => setDeleteDialogOpen(true)}
        >
          {'Delete Entry?'}
        </Button>
      )}
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <Grid
          container
          justify="space-between"
          style={{ marginTop: 20 }}
          spacing={3}
        >
          <Grid item xs={12}>
            <Input
              required
              id="title"
              label="Title"
              labelColor="white"
              value={title}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomEditor
              value={markdown}
              onChange={(newValue, e) => setMarkdown(newValue || '')}
              height={'50vh'}
            />
          </Grid>
          <Grid item xs={12} container justify="flex-end">
            {submitting ? (
              <CircularProgress />
            ) : (
              <Button>{'Save Journal Entry'}</Button>
            )}
          </Grid>
        </Grid>
      </form>
      <DeleteEntryDialog
        open={deleteDialogOpen}
        entryId={entryId}
        handleClose={() => setDeleteDialogOpen(false)}
      />
    </div>
  )
}

export default EntryEditor
