import history from './history.js';
export const TokenKey = 'TokenKey';

let signIn = function (credentials) {
    return dispatch => {
        dispatch(toggleLoading());
        return sendRequest('POST', window.constants.signIn, credentials).then(data => {
            localStorage.setItem(TokenKey, data.access_token);
            dispatch({
                type: 'SIGN_IN_SUCCESS',
                payload: {
                    username: credentials.username
                }
            });
            history.push('/');
        }).catch(data => {
            dispatch({
                type: 'SIGN_IN_ERROR',
                payload: {
                    errors: data.data
                }
            });
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};

let signUp = function(usersData) {
    return dispatch => {
        dispatch(toggleLoading());
        return sendRequest('POST', window.constants.signUp, usersData).then(() => {
            dispatch({
                type: 'SIGN_UP_SUCCESS'
            });
        }).catch(data => {
            dispatch({
                type: 'SIGN_UP_ERROR',
                errors: data.data
            });
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};

let toggleLoading = function() {
    return {
        type: 'TOGGLE_LOADER'
    };
};

let loadTasks = function() {
    return dispatch => {
        dispatch(toggleLoading());
        return sendRequest('GET', window.constants.tasks).then(data => {
            dispatch({
                type: 'TASKS_LOADED',
                payload: {
                    tasks: data
                }
            });
        }).catch((data) => {
            dispatch({
                type: 'TASKS_LOAD_ERROR',
                payload: {
                    errors: data.data
                }
            });

            if (data.status === 401) {
                localStorage.removeItem(TokenKey);
                dispatch({
                    type: 'DROP_AUTHORIZE'
                });

                history.push('/signin');
            }
        }).finally(() => {
            dispatch(toggleLoading());
        });
    };
};

function sendRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        const token = localStorage.getItem(TokenKey);
        if (token) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            const response = xhr.response && xhr.response.length ? JSON.parse(xhr.response) : '';
            if (xhr.status !== 200) {
                reject({
                    data: response,
                    status: xhr.status
                });
            } else {
                resolve(response);
            }
        };
        xhr.send(JSON.stringify(data));
    });
}

export default { signIn, signUp, toggleLoading, loadTasks};