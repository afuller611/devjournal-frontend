import ReactDOM from 'react-dom';
import AuthProvider from './ContextProviders/AuthProvider';
import './index.css';
import App from './MainApp/App';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);