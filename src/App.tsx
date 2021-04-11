import React from 'react'
import { Nav } from './components/Nav'
import StyledNavLink from './components/NavLink'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'

function App() {
  return (
    <div>
      <Router>
        <Nav>
          <StyledNavLink activeStyle={{backgroundColor: "black"}} to="/home">{'Home'}</StyledNavLink>
          <StyledNavLink activeStyle={{backgroundColor: "black"}} to="/about">{'About'}</StyledNavLink>
          <StyledNavLink activeStyle={{backgroundColor: "black"}} to="/entries">{'Entries'}</StyledNavLink>
        </Nav>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
            <Route path="/entries">entries</Route>
            <Route path="/about">about</Route>
            <Route path="/home">home</Route>
          </Grid>
        </Grid>
      </Router>
    </div>
  )
}

export default App
