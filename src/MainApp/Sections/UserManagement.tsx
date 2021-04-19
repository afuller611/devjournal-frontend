import { useEffect, useState } from 'react'
import { Typography } from '../../components/Typography'
import { Grid, makeStyles } from '@material-ui/core'
import { Button } from '../../components/Button'
import { getUsersAPI } from '../../api/usersAPI'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  linkHover: {
    color: '#45e0f0',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
    },
  },
})

const UserManagement = () => {
  const history = useHistory()
  const [users, setUsers] = useState([])
  const classes = useStyles()
  useEffect(() => {
    getUsersAPI()
      .then((res) => {
        setUsers(res)
      })
      .catch((err) => {
        console.log(err)
        alert('Error retrieving users')
      })
  }, [])
  return (
    <div style={{ marginTop: 20 }}>
      <Typography color="white" variant="header" textAlign="center">
        {'User Management'}
      </Typography>
      <Grid container justify="space-between" style={{ marginTop: 30 }}>
        <Grid item xs={8}>
          <div style={{ marginBottom: 20 }}>
            <Typography color="white" variant="subheader">
              {'Select a User from the list below to view/edit'}
            </Typography>
          </div>
          {users.map((user: { username: string; id: string }) => {
            return (
              <div key={user.id}>
                <Link className={classes.linkHover} to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </div>
            )
          })}
        </Grid>
        <Grid item xs={4} container justify="flex-end" alignItems="flex-start">
          <Button onClick={() => history.push('/users/0')}>
            {'Add New User +'}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
export default UserManagement
