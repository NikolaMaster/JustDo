const tokenKey = 'TokenKey';

let signIn = function (credentials) {
    return dispatch => {
        return sendRequest('POST', window.constants.signIn, credentials).then(response => {
            return JSON.parse(response.data);
        }).then(data => {
            sessionStorage.setItem(tokenKey, data.access_token);
            dispatch({
                type: 'SIGN_IN_SUCCESS',
                credentials
            });
        }).catch(data => {
            dispatch({
                type: 'SIGN_IN_ERROR',
                errors: data
            });
        });
    };
};

let signUp = function(credentials) {
    return {
        type: 'SIGN_UP',
        credentials
    };
};

let toggleLoading = function() {
    return {
        type: 'TOGGLE_LOADING'
    };
};

function sendRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        const token = sessionStorage.getItem(tokenKey);
        if (token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                reject(xhr.data);
            } else {
                resolve(xhr.data);
            }
        };
        xhr.send(JSON.stringify(data));
    });
}

export default {signIn, signUp, toggleLoading};