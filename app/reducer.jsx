import { Map } from 'immutable';
import { TokenKey } from './actions.jsx';

export default function (state = Map({
    isAuthorized: !!(localStorage.getItem(TokenKey))
}), action){
    switch(action.type) {        
        case 'TOGGLE_LOADER': 
            return state.update('isLoading', (isLoading) => !isLoading);
        case 'SIGN_IN_SUCCESS':
            return state.merge({
                username: action.payload.username,
                isAuthorized: true,
                signInErrors: null
            });
        case 'SIGN_IN_ERROR':
            return state.set('signInErrors', action.payload.errors);
        case 'SIGN_UP_SUCCESS':
            return state.delete('signUpErrors');
        case 'SIGN_UP_ERROR':
            return state.set('signUpErrors', action.errors);
        case 'TASKS_LOADED':
            return state.merge({
                tasks: action.payload.tasks,
                taskLoadErrors: null
            });
        case 'TASKS_LOAD_ERROR':
            return state.set('taskLoadErrors', action.payload.errors);
        case 'DROP_AUTHORIZE':
            return state.set('isAuthorized', false);
    }

    return state;
}