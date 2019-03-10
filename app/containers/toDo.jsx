import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ToDoContainer extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.username ? <div>To Do List</div> : <Redirect to="/SignIn" />;
    }
}

let mapProps = (state) => {
    return {
        username: state.username
    };
};

export default connect(mapProps)(ToDoContainer);