import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from '../../ContextProviders/AuthProvider'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import App from '../App'
import LogIn from './LogIn'

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
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Rendering of the log in page', () => {
  const { getByText, getByLabelText } = render(<LogIn />)

  // Checks all fields and buttons that should exist on log in page
  getByLabelText('Username*')
  getByLabelText('Password*')
  getByText('Log Me In')
})

test('Can Login on login page', async () => {
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

  // Check to make sure the inputs worked right
  getByDisplayValue('andre-adminwoohoo')
  getByDisplayValue('test-password')

  const submitButton = getByText('Log Me In')
  fireEvent.click(submitButton)

  await waitFor(() => getByText(`Your Journal Entries`))
})
