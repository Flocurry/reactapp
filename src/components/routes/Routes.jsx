import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import FormLogin from '../login/FormLogin';
import FormRegister from '../register/FormRegister';
import Home from '../home/Home';
import Users from '../users/Users';
import Roles from '../roles/Roles';

class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {/* Routes de l'application */}
                        <Route exact path='/login' component={FormLogin} />
                        <Route exact path='/register' component={FormRegister} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/roles' component={Roles} />
                        {/* Route par défaut si url non connu*/}
                        <Redirect to='/login' />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Routes;