import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Welcome from './components/layout/Welcome';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App = () => 
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Welcome} />
      <section className="container">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </section>
     </Fragment>
  </Router>


export default App;

