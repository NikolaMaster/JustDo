import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../actions.jsx';

class ToDoContainer extends React.Component
{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadTasks();
    }

    render() {
        return this.props.isAuthorized
            ? <div>
                  {this.props.tasks.map(t => <div>{t.description}</div>)}
              </div>
            : <Redirect to="/SignIn"/>;
    }
}

let mapProps = (state) => {
    return {
        isAuthorized: state.get('isAuthorized'),
        tasks: state.get('tasks') || []
    };
};

let mapDispatch = (dispatch) => {
    return {
        loadTasks: () => dispatch(actions.loadTasks())
    };
};

export default connect(mapProps, mapDispatch)(ToDoContainer);