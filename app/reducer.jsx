import { Map } from 'immutable';

export default function(state = Map(), action){
    switch(action.type) {        
        case 'TOGGLE_LOADER': 
            state.set('isLoading', !state.isLoading);
            break;
        case 'SIGN_IN_SUCCESS':
            state.merge({
                username: action.username,
                'sign-in-errors': undefined
            });
            break;
        case 'SIGN_IN_ERROR':
            state.set('sign-in-errors', action.errors);
            break;
        case 'SIGN_UP_SUCCESS':
            state.delete('sign-up-errors');
            break;
        case 'SIGN_UP_ERROR':
            state.set('sign-up-errors', action.errors);
            break;
    }

    return state;
}