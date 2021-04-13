import { Grid } from '@material-ui/core'
import { Button } from '../../components/Button'
import logo from '../../components/assets/DevJournalLogo.png'
import { useHistory } from 'react-router-dom'

const UnauthNavContent = () => {
  const history = useHistory()
  return (
    <Grid container justify="space-between">
      <Grid item>
        <img
          src={logo}
          alt="Dev Journal"
          style={{ height: 60, marginRight: 10, marginTop: 5 }}
        />
      </Grid>
      <Grid item>
        <Button
          backgroundColor={'#dd4eaa'}
          style={{ marginTop: 10, marginBottom: 10 }}
          onClick={() => history.push('/login')}
          size="medium"
        >
          Log In
        </Button>
      </Grid>
    </Grid>
  )
}

export default UnauthNavContent
