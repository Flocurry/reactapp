import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import Users from '../users/Users';
import Roles from '../roles/Roles';
import Login from '../login/Login';

class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {/* Routes de l'application */}
                        <Route exact path='/' component={Login} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/roles' component={Roles} />
                        {/* Route par défaut si url non connu*/}
                        <Redirect to='/' />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Routes;