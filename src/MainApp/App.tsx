import { Nav } from '../components/Nav'
import { Route } from 'react-router-dom'
import ContentArea from '../components/ContentArea'
import AuthNavContent from './Sections/AuthNavContent'
import { useAuth } from '../ContextProviders/AuthProvider'
import SignUp from './Sections/SignUp'
import UnauthNavContent from './Sections/UnauthNavContext'
import SignUpComplete from './Sections/SignUpComplete'
import LogIn from './Sections/LogIn'
import Entries from './Sections/Entries'
import EntryEditor from './Sections/EntryEditor'

const App = () => {
  const { isAuthenticated, authenticating } = useAuth()
  return (
    <div>
      <Nav>{isAuthenticated ? <AuthNavContent /> : <UnauthNavContent />}</Nav>
      <ContentArea>
        {isAuthenticated && !authenticating && (
          <>
            <Route exact path="/entries">
              <Entries />
            </Route>
            <Route path="/entries/:entryId">
              <EntryEditor />
            </Route>
          </>
        )}
        <Route path="/signup-complete">
          <SignUpComplete />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/" exact>
          <SignUp />
        </Route>
      </ContentArea>
    </div>
  )
}

export default App
