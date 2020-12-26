import {
  Route, 
  Switch
} from 'react-router-dom';

import HomePage from './HomePage';
import Login from './accountUI/Login';
import Register from './accountUI/Register';
/* global stylesheets */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Header
      </header>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={HomePage} />
      </Switch>
    
    </div>
  );
}

export default App;
