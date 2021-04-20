import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from '../../ContextProviders/AuthProvider'
import { render, fireEvent, waitFor } from '@testing-library/react'
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
        'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZnVsbGVyNjExIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoidXNlcjp3cml0ZSJ9LHsiYXV0aG9yaXR5IjoiZW50cnk6d3JpdGUifSx7ImF1dGhvcml0eSI6ImVudHJ5OmRlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoiZW50cnk6cmVhZCJ9XSwiaWQiOiJhbnl0aGluZyIsImlhdCI6MTYxODg5MjczNCwiZXhwIjoxNjE5Njc2MDAwfQ.j3Rxdvm9BWPqIewD_HTgX1toP04tYSgK789enlNcoeToI1bPYDLdevAdfPqL7Yc7-Gv0Ublni3k-DupNLT8x5w',
      ),
    )
  }),
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
    `${process.env.REACT_APP_API_URL}/api/v1/entry/:entryId`,
    (req, res, ctx) => {
      const entry = {
        id: req.params.entryId,
        title: 'test journal entry',
        markdown: 'what is up',
      }

      return res(ctx.json(entry))
    },
  ),
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
)

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
)
// beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Login and then view all entries, then select an entry', async () => {
  const { getByText, getByLabelText, getByDisplayValue } = render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>,
  )

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

  await waitFor(() => getByText(`Your Journal Entries`))

  const entryLink = await waitFor(() => getByText('test journal entry'))
  fireEvent.click(entryLink)

  await waitFor(() => getByText('Edit your Entry!'))
  await waitFor(() => getByText('Delete Entry?'))
  await waitFor(() => getByText('Title*'))
  await waitFor(() => getByDisplayValue('test journal entry'))
  await waitFor(() => getByDisplayValue('what is up'))
})
