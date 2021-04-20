import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from '../../ContextProviders/AuthProvider'
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import App from '../App'

// Set up mock server
const server = setupServer(
  rest.post(`${process.env.REACT_APP_API_URL}/login`, (req, res, ctx) => {
    return res(
      ctx.json(req.body),
      ctx.set(
        'Authorization',
        'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkcmUtYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoidXNlcjpkZWxldGUifSx7ImF1dGhvcml0eSI6InVzZXI6cmVhZCJ9LHsiYXV0aG9yaXR5IjoidXNlcjp3cml0ZSJ9LHsiYXV0aG9yaXR5IjoiZW50cnk6d3JpdGUifSx7ImF1dGhvcml0eSI6ImVudHJ5OmRlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiZW50cnk6cmVhZCJ9XSwiaWQiOiJhbnl0aGluZyIsImlhdCI6MTYxODk1Mzk5MiwiZXhwIjoxNjE5NzYyNDAwfQ.gGhuh9yA3LsTfF_YBpgbsy-rAJeNQEwfkYO3NEbn03AOnr-zltdJqEG_90vaLNS_T6oFk0K_3aDHSN4c00NVPg',
      ),
    )
  }),
  rest.put(
    `${process.env.REACT_APP_API_URL}/api/v1/user/sub/getCurrentUser`,
    (req, res, ctx) => {
      const user = {
        id: '6d90d2c2-81b7-4e95-817e-60fa68aa87ff',
        name: 'tester',
        username: 'testermctest',
        password: '',
        role: 'ADMIN',
      }
      return res(ctx.json(user))
    },
  ),
  rest.get(`${process.env.REACT_APP_API_URL}/api/v1/entry`, (req, res, ctx) => {
    const entries = [
      {
        id: 'b98f3d73-ca3a-4c77-ad08-a6ccacfdb4df',
        title: 'test journal entry',
      },
    ]
    return res(ctx.json(entries))
  }),
  rest.get(`${process.env.REACT_APP_API_URL}/api/v1/user`, (req, res, ctx) => {
    const users = [
      {
        id: 'b98f3d73-ca3a-4c77-ad08-a6ccacfdb4df',
        username: 'test-user',
      },
    ]
    return res(ctx.json(users))
  }),
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/user/:userId`,
    (req, res, ctx) => {
      const user = {
        id: 'b98f3d73-ca3a-4c77-ad08-a6ccacfdb4df',
        username: 'test-user',
        name: 'tester name',
      }
      return res(ctx.json(user))
    },
  ),
  rest.put(
    `${process.env.REACT_APP_API_URL}/api/v1/user/:userId`,
    (req, res, ctx) => {
      return res(ctx.json(req.body))
    },
  ),
  rest.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/user/:userId`,
    (req, res, ctx) => {
      return res(ctx.json(req.body))
    },
  ),
  rest.post(
    `${process.env.REACT_APP_API_URL}/api/v1/user/`,
    (req, res, ctx) => {
      return res(ctx.json(req.body))
    },
  ),
)

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
)
// beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// We could separate these into separate tests. But doing them all at once works too.
test('Login and then view all users, edit a user, delete a user, add a user', async () => {
  const {
    getByText,
    getByLabelText,
    findByText,
    findByLabelText,
    findByDisplayValue,
  } = render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>,
  )

  // -------------------LOGGING IN---------------------

  // Click on login button
  const loginButtonNav = getByText('Log In')
  fireEvent.click(loginButtonNav)

  // Grab inputs
  const usernameInput = getByLabelText('Username*')
  const passwordInput = getByLabelText('Password*')

  // Type in each input
  fireEvent.change(usernameInput, { target: { value: 'andre-adminwoohoo' } })
  fireEvent.change(passwordInput, { target: { value: 'test-password' } })

  // Log In
  const submitButton = getByText('Log Me In')
  fireEvent.click(submitButton)

  // -------------------VIEW USERS---------------------

  // Make sure initial page finishes loading
  await findByText('test journal entry')

  // Click on User Management button
  const usersNavButton = await findByText(`User Management`)
  fireEvent.click(usersNavButton)
  await findByText('Select a User from the list below to view/edit')
  await findByText('test-user')

  // Click on user
  const userText = await findByText('test-user')
  fireEvent.click(userText)

  // Check to make sure the name displays right
  await findByDisplayValue('tester name')

  // -------------------EDIT USER---------------------

  // Change name
  const nameInputEdit = await findByLabelText('Name*')
  fireEvent.change(nameInputEdit, { target: { value: 'edited tester name' } })
  await findByDisplayValue('edited tester name')

  // Submit Edit
  const submitButtonEdit = await findByText('Save User')
  fireEvent.click(submitButtonEdit)
  await findByText('User Successfully Saved!')

  // -------------------DELETE USER---------------------

  // Get delete button and click
  const deleteButton = await findByText('Delete User?')
  fireEvent.click(deleteButton)
  await findByText('Are you sure you want to delete this user?')

  const deleteConfirmButton = await findByText('Delete')
  fireEvent.click(deleteConfirmButton)
  // Deleting progress bar
  await screen.findByRole('progressbar')
  // Reloading users progress bar
  await screen.findByRole('progressbar')
  await findByText('Select a User from the list below to view/edit')

  // -------------------ADD USER---------------------

  // click add new user button
  const addUserButton = await findByText('Add New User +')
  fireEvent.click(addUserButton)
  await findByText('Add a New User')

  // Input username, password, and name
  const usernameInputAdd = await findByLabelText('Username*')
  const passwordInputAdd = await findByLabelText('Password*')
  const nameInputAdd = await findByLabelText('Name*')
  fireEvent.change(usernameInputAdd, { target: { value: 'test username' } })
  fireEvent.change(passwordInputAdd, { target: { value: 'test password' } })
  fireEvent.change(nameInputAdd, { target: { value: 'test mcname' } })

  // Submit
  const submitButtonAdd = await findByText('Save User')
  fireEvent.click(submitButtonAdd)
  await screen.findByRole('progressbar')
  await screen.findByRole('progressbar')
  // Should pull up the edit user page
  await findByText('Edit User')
})