import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from '../../ContextProviders/AuthProvider'
import {
  render,
  fireEvent,
  screen,
  findByAltText,
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
test('Login and go to My account, change name', async () => {
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

  // -------------------GO TO MY ACCOUNT---------------------
  const myAccountButton = await screen.findByTestId('myAccountButton')
  fireEvent.click(myAccountButton)
  await findByText('My Account')

  // Get name input
  const nameInput = await findByLabelText('Name')
  fireEvent.change(nameInput, { target: { value: 'new name oh yah' } })
  await findByDisplayValue('new name oh yah')

  // Submit the name
  const submitButtonMyAccount = await findByText('Submit New Name')
  fireEvent.click(submitButtonMyAccount)
  await screen.findByRole('progressbar')

  // Close My account
  const closeButton = await screen.findByTestId('closeMyAccount')
  fireEvent.click(closeButton)
  await findByText('Your Journal Entries')
})
