import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';

class App extends Component {

  render() {
    
    return (
      <Router>
        <div className="container-fluid bg-light py-3">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="btn btn-outline-secondary"><Link to={'/login'}>Login</Link></div>&nbsp;
              <div className="btn btn-outline-secondary"><Link to={'/register'}>Register</Link></div>
            </div>
          </div>
          <Switch>
            <Route exact path='/login' component={FormLogin} />
            <Route exact path='/register' component={FormRegister} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
