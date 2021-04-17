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

const App = () => {
  const { isAuthenticated, authenticating } = useAuth()
  return (
    <div>
      <Nav>{isAuthenticated ? <AuthNavContent /> : <UnauthNavContent />}</Nav>
      <ContentArea>
        {isAuthenticated && !authenticating && (
            <Route path="/entries">
              <Entries />
            </Route>
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
