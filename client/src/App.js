import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Welcome from './components/layout/Welcome';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Welcome} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;

