import React from 'react'
import { Nav } from '../components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import MyAccount from './Sections/MyAccount'
import ContentArea from '../components/ContentArea'
import NavContent from './Sections/NavContent'
import { useAuth } from '../ContextProviders/AuthProvider'
import { Button } from '../components/Button'
import logo from '../components/assets/DevJournalLogo.png';

const App = (props: any) => {
  const { isAuthenticated, authenticate, logOut } = useAuth();
  return (
    <div>
      <Router>
        <Nav>
          {isAuthenticated ?
            <Grid container justify="space-between">
              <Grid item>
                <NavContent />
              </Grid>
              <Grid item>
                <MyAccount />
                <Button backgroundColor={"#dd4eaa"} style={{ marginTop: 5, marginBottom: 5 }} onClick={logOut} size="small">Log Out</Button>

              </Grid>
            </Grid>
            :
            <Grid container justify="space-between">
              <Grid item>
                <img src={logo} alt="Dev Journal" style={{ height: 60, marginRight: 10, marginTop: 5 }} />
              </Grid>
              <Grid item>
                <Button backgroundColor={"#dd4eaa"} style={{ marginTop: 10, marginBottom: 10 }} onClick={authenticate} size="medium">
                  Log In
            </Button>
              </Grid>
            </Grid>
          }
        </Nav>
        <ContentArea>
          <Route path="/entries">entries component here</Route>
          <Route path="/about">about component here (probs not needed)</Route>
          <Route path="/home">home component here</Route>
        </ContentArea>
      </Router>
    </div>
  )
}

export default App
