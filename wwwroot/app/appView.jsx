import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInContainer from './containers/signIn.jsx';
import SignUpContainer from './containers/signUp.jsx';
import NotFoundContainer from './containers/notFound.jsx';
import ToDoContainer from './containers/toDo.jsx';

export default class AppView extends React.Component {
    render(){
        return (
        <Router>
            <Switch>
                    <Route exact path="/SignIn" component={SignInContainer} />
                    <Route exact path="/" component={ToDoContainer} />
                    <Route exact path="/SignUp" component={SignUpContainer} />
                    <Route component={NotFoundContainer} />
            </Switch>
        </Router>);
    }
}