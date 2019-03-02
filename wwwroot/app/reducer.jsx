import { Map } from 'immutable';

export default function(state = Map(), action){
    switch(action.type) {        
        case 'TOGGLE_LOADER': 
            state.set('isLoading', !state.isLoading);
            break;
        case 'SIGN_IN_SUCCESS':
            state.set('username', action.username);
            break;
        case 'SIGN_IN_ERROR':
            state.set('sign-in-errors', action.errors);
            break;
    }

    return state;
}