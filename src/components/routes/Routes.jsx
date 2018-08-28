import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import FormLogin from '../login/FormLogin';
import FormRegister from '../login/FormRegister';
import Home from '../home/Home';

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
                        {/* Route par défaut si url non connu*/}
                        <Redirect to='/login' />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Routes;