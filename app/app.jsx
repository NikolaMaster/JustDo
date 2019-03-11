import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer.jsx';
import AppView from './containers/appView/appView.jsx';
import thunk from 'redux-thunk';

let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
                    <AppView/>
                </Provider>, document.getElementById('app'));