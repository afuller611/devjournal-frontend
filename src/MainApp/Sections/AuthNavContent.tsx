import StyledNavLink from '../../components/NavLink'
import logo from '../../components/assets/DevJournalLogo.png'
import { Grid } from '@material-ui/core'
import { Button } from '../../components/Button'
import MyAccount from './MyAccount'
import { useAuth } from '../../ContextProviders/AuthProvider'
import { Link } from 'react-router-dom'

const AuthNavContent = () => {
  const { logOut } = useAuth()
  return (
    <Grid container justify="space-between">
      <Grid item>
        <div style={{ display: 'flex' }}>
          <Link to="/">
            <img
              src={logo}
              alt="Dev Journal"
              style={{ height: 60, marginRight: 10, marginTop: 5 }}
            />
          </Link>          
          <StyledNavLink
            activeStyle={{ backgroundColor: 'black' }}
            to="/entries"
          >
            {'Entries'}
          </StyledNavLink>
          <StyledNavLink activeStyle={{ backgroundColor: 'black' }} to="/users">
            {'User Management'}
          </StyledNavLink>
        </div>
      </Grid>
      <Grid item>
        <MyAccount />
        <Button
          backgroundColor={'#dd4eaa'}
          style={{ marginTop: 5, marginBottom: 5 }}
          onClick={logOut}
          size="small"
        >
          Log Out
        </Button>
      </Grid>
    </Grid>
  )
}

export default AuthNavContent
