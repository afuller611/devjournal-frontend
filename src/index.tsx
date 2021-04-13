import ReactDOM from 'react-dom'
import AuthProvider from './ContextProviders/AuthProvider'
import './index.css'
import App from './MainApp/App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root'),
)
