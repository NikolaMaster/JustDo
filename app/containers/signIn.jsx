import React from 'react';
import actions from '../actions.jsx';
import { connect } from 'react-redux';
import { Fab, Grid, TextField, FormGroup, Typography } from '@material-ui/core';

class SignInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onClick = this.onClick.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onClick() {
        this.props.signIn({
            username: this.state.username,
            password: this.state.password
        });
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    getUserNameError() {
        return this.props.errors ? this.props.errors.UserName : null;
    }

    getPasswordError() {
        return this.props.errors ? this.props.errors.Password : null;
    }

    render() {
        return (
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item>
                    <Typography variant="h3" align="center">Sign In</Typography>
                    <FormGroup>
                        <TextField error={this.getUserNameError()} placeholder="E-mail" onChange={this.onUsernameChange} margin="dense"/>
                        <TextField error={this.getPasswordError()} type="password" placeholder="Password" onChange={this.onPasswordChange} margin="normal" />                        
                    </FormGroup>
                    <Fab variant="extended" onClick={this.onClick}>Sign In</Fab>
                </Grid>
            </Grid>);
    }
}

let mapStateToProps = (state) => {
    return {
        errors: state.get('signInErrors')
    };
};

let mapDispatch = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(actions.signIn(credentials))
    };
};

export default connect(mapStateToProps, mapDispatch)(SignInContainer);