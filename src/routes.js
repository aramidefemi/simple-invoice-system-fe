import React from 'react';
import Login from './pages/authentication/Login';
import SignUp from './pages/authentication/SignUp';
import HomePage from './pages/'; 
import InvoicePage from './pages/invoice'; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './assets/css/styles.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/register" component={SignUp} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/invoice" component={InvoicePage} />
           
        </Switch>
      </Router>
    );
  }
}

const ProtectedRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;

  if (utoken === null) {
    return <Redirect to={'/'} />;
  }

  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
const AuthRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;
  const uuser = user || JSON.parse(window.localStorage.getItem('user')) || null;

  if (utoken !== null) {
    return <Redirect to={'/home'} />;
  }

  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
export default App;
