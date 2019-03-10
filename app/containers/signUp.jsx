import React from 'react';
import actions from '../actions.jsx';
import { connect } from 'react-redux';

class SignUpContainer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onUserNameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    onConfirmPasswordChange(e) {
        this.setState({
            passwordConfirm: e.target.value
        });
    }

    onClick() {
        this.props.signUp({
            username: this.state.username,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="username" onChange={this.onUserNameChange}/>
                <input type="password" placeholder="password" onChange={this.onPasswordChange}/>
                <input type="password" placeholder="confirm password" onChange={this.onConfirmPasswordChange}/>
                <button type="button" onClick={this.onClick}>Sign Up</button>
            </div>
        );
    }
}

let mapDispatch = (dispatch) => {
    return {
        signUp: (data) => dispatch(actions.signUp(data))
    };
};

export default connect(null, mapDispatch)(SignUpContainer);