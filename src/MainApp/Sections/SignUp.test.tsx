import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from '../../ContextProviders/AuthProvider'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import App from '../App'

// Set up mock server
const server = setupServer(
  rest.post(`${process.env.REACT_APP_API_URL}/api/v1/user`, (req, res, ctx) => {
    return res(ctx.json(req.body))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Rendering of the sign up page', () => {
  const { getByText, getByLabelText } = render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>,
  )

  // Checks all fields and buttons that should exist on sign up page
  getByText(
    `Welcome to Dev Journal! Your Personal Journal for all things...Dev!`,
  )
  getByLabelText('Full Name*')
  getByLabelText('Username*')
  getByLabelText('Password*')
  getByText('Log In')
  getByText('Create My Account!')
})

test('Can Submit Sign Up Page', async () => {
  const { getByText, getByLabelText, getByDisplayValue } = render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>,
  )  

  // Grab inputs
  const nameInput = getByLabelText('Full Name*')
  const usernameInput = getByLabelText('Username*')
  const passwordInput = getByLabelText('Password*')

  // Type in each input
  fireEvent.change(nameInput, { target: { value: 'andre' } })
  fireEvent.change(usernameInput, { target: { value: 'andre-adminwoohoo' } })
  fireEvent.change(passwordInput, { target: { value: 'test-password' } })

  // Check to make sure the inputs worked right
  getByDisplayValue('andre')
  getByDisplayValue('andre-adminwoohoo')
  getByDisplayValue('test-password')

  const submitButton = getByText('Create My Account!')
  fireEvent.click(submitButton)

  await waitFor(() => getByText(`Sign Up Complete! Please Click "Log In" to continue!`))
})
