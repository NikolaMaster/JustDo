import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInContainer from '../signIn.jsx';
import SignUpContainer from '../signUp.jsx';
import NotFoundContainer from '../notFound.jsx';
import ToDoContainer from '../toDo.jsx';
import { Grid, CircularProgress } from '@material-ui/core';
import history from '../../history.js';
import { connect } from 'react-redux';

import './appView.css';

class AppView extends React.Component {

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
                    {this.props.isLoading ? <CircularProgress /> : null}
                </Grid>
            </Grid>);
    }
}

let mapStateToProps = (state) => {
    return {
        isLoading: state.get('isLoading')
    };
};

export default connect(mapStateToProps)(AppView);