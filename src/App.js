import {
  Route, 
  Switch
} from 'react-router-dom';

import HomePage from './HomePage';
import Login from './accountUI/Login';
import Register from './accountUI/Register';
import AccountActivation from './accountUI/AccountActivation';
import ResendActivationLink from './accountUI/ResendActivationLink';
import ResetPasswordLink from './accountUI/ResetPasswordLink';
import ResetPassword from './accountUI/ResetPassword';
import Header from './header';
/* global stylesheets */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/account/activate" component={AccountActivation} />
        <Route path="/account/resend-activation-link" component={ResendActivationLink} />
        <Route path="/account/reset-password-link" component={ResetPasswordLink} />
        <Route path="/account/reset-password" component={ResetPassword} />
        <Route path="/" component={HomePage} />
      </Switch>
    
    </div>
  );
}

export default App;
