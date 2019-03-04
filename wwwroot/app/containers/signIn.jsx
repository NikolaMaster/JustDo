import React from 'react';
import actions from '../actions.jsx';
import { connect } from 'react-redux';

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

    render() {
        return (
            <div>
                <input type="text" placeholder="username" onChange={this.onUsernameChange} />
                <input type="password" placeholder="password" onChange={this.onPasswordChange} />
                <button type="button" onClick={this.onClick}>Sign In</button>
            </div>);
    }
}

let mapDispatch = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(actions.signIn(credentials))
    };
};

export default connect(null, mapDispatch)(SignInContainer);