import { Typography } from '../../components/Typography'
import { Grid } from '@material-ui/core'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'

const dummyData = [
  {
    title: 'test 1',
    markdown: 'abcdef',
    id: '1234',
  },
  {
    title: 'test 2',
    markdown: 'abcdef',
    id: '4321',
  },
  {
    title: 'test 3',
    markdown: 'abcdef',
    id: '90210',
  },
]

const Entries = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="header" textAlign="center" color="white">
        View and Create New Entries!
      </Typography>
      <Grid
        container
        justify="space-between"
        spacing={2}
        style={{ marginTop: 30 }}
      >
        <Grid item xs={8}>
          {dummyData.map((entry) => {
            return (
              <div key={entry.id}>
                <Link style={{ color: 'white' }} to={`/entry/${entry.id}`}>
                  {entry.title}
                </Link>
              </div>
            )
          })}
        </Grid>
        <Grid container justify="flex-end" item xs={4}>
          <Button>{'Add New Entry +'}</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Entries
