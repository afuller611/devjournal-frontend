import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from '../../ContextProviders/AuthProvider'
import { render, fireEvent, screen } from '@testing-library/react'
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
  rest.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/entry/:entryId`,
    (req, res, ctx) => {
      return res(ctx.json(req.body))
    },
  ),
  rest.put(
    `${process.env.REACT_APP_API_URL}/api/v1/entry/:entryId`,
    (req, res, ctx) => {
      return res(ctx.json(req.body))
    },
  ),
  rest.post(
    `${process.env.REACT_APP_API_URL}/api/v1/entry/`,
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
test('Login and then view all entries, then select an entry, then edit it, then delete it, then add a new one', async () => {
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

  
  // -------------------VIEW JOURNAL ENTRIES---------------------
  
  await findByText(`Your Journal Entries`)
  // Go to the test journal entry
  const entryLink = await findByText('test journal entry')
  fireEvent.click(entryLink)

  // Make sure the items are all there that we'd expect
  await findByText('Edit your Entry!')
  await findByText('Delete Entry?')
  await findByLabelText('Title*')
  await findByDisplayValue('test journal entry')
  setTimeout(async () => await findByDisplayValue('what is up'), 1000)

  // -------------------EDIT JOURNAL ENTRY---------------------
  
  // Change the title of the journal entry
  const titleInput = await findByLabelText('Title*')
  fireEvent.change(titleInput, { target: { value: 'Edited Journal Entry' } })

  // Submit the journal entry edit
  const submitEntryButton = await findByText('Save Journal Entry')
  fireEvent.click(submitEntryButton)
  // Check for success text
  await findByText('Journal Entry Successfully Saved!')


  // -------------------DELETE JOURNAL ENTRY---------------------

  // Delete Journal Entry
  const deleteButton = await findByText('Delete Entry?')
  fireEvent.click(deleteButton)
  await findByText('Are you sure you want to delete this journal entry?')

  const confirmDeleteButton = await findByText('Delete')
  fireEvent.click(confirmDeleteButton)
  // Deleting progress bar
  await screen.findByRole("progressbar")
  // Reloading journal entries progress bar
  await screen.findByRole("progressbar")
  await findByText(`Your Journal Entries`)


  // -------------------ADD NEW JOURNAL ENTRY---------------------

  // Add new entry
  const addNewButton = await findByText("Add New Entry +")
  fireEvent.click(addNewButton)
  await findByText("Add a New Entry!")
  // Change the title of the journal entry
  const addTitleInput = await findByLabelText('Title*')
  fireEvent.change(addTitleInput, { target: { value: 'Added Journal Entry' } })
  await findByDisplayValue("Added Journal Entry")

  const submitButtonForAdd = await findByText("Save Journal Entry")
  fireEvent.click(submitButtonForAdd)
  await screen.findByRole("progressbar")
  await screen.findByRole("progressbar")
  // Reloaded the page so now it says you're editing
  await findByText("Edit your Entry!")
})