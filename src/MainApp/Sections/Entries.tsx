import { useEffect, useState } from 'react'
import { Typography } from '../../components/Typography'
import { Grid, CircularProgress, makeStyles } from '@material-ui/core'
import { Button } from '../../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { getEntries } from '../../api/entriesAPI'

const useStyles = makeStyles({
  linkHover: {
    color: "#45e0f0",
    textDecoration: "none",
    '&:hover': {
      color: "white"
    }
  }
})

const Entries = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const classes = useStyles();

  useEffect(() => {
    setLoading(true)
    getEntries()
      .then((res) => {
        setEntries(res)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="header" textAlign="center" color="white">
        {"Your Journal Entries"}
      </Typography>
      <Grid
        container
        justify="space-between"
        spacing={2}
        style={{ marginTop: 30 }}
      >
        <Grid item xs={8}>
          {loading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress />
            </div>
          ) : entries && entries.length > 0 ? (
            <>
            <div style={{marginBottom: 20}}>
            <Typography color="white" variant="subheader">{"Select a Journal Entry from the list below to view/edit"}</Typography>
            </div>
            {entries.map((entry: any) => {
              return (
                <div key={entry.id}>
                  <Link className={classes.linkHover} to={`/entries/${entry.id}`}>
                    {entry.title}
                  </Link>
                </div>
              )
            })}
            </>
          ) : (
            <Typography variant="subheader" color="white">
              {'No Entries Found, click Add New Entry to create one.'}
            </Typography>
          )}
        </Grid>
        <Grid container justify="flex-end" item xs={4} alignItems="flex-start">
          <Button onClick={() => history.push('/entries/0')}>
            {'Add New Entry +'}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Entries
