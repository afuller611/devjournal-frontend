import React from 'react'
import { Nav } from './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import MyAccount from './MyAccount'
import ContentArea from './components/ContentArea'
import NavContent from './NavContent'

const App = (props: any) => {
  return (
    <div>
      <Router>
        <Nav>
          <Grid container justify="space-between">
            <NavContent />
            <MyAccount />
          </Grid>
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
