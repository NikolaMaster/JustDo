import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInContainer from './containers/signIn.jsx';
import SignUpContainer from './containers/signUp.jsx';
import NotFoundContainer from './containers/notFound.jsx';
import ToDoContainer from './containers/toDo.jsx';
import Grid from '@material-ui/core/Grid';
import history from './history.js';

import './appView.css';

export default class AppView extends React.Component {
    render() {
        return (
            <Grid container className="main-container" alignItems="stretch">
                <Grid item xs={6} className="logo-container"/>
                <Grid item xs={6}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/SignIn" component={SignInContainer} />
                            <Route exact path="/SignUp" component={SignUpContainer} />
                            <Route exact path="/" component={ToDoContainer} />
                            <Route component={NotFoundContainer} />
                        </Switch>
                    </Router>
                </Grid>
            </Grid>);
    }
}