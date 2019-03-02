import React from 'react';

export default class SignUpContainer extends React.Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <input type="password" placeholder="confirm password"/>
            </div>
        );
    }
}