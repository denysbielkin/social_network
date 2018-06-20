import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers/typeOfRegexpReducer'


import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import {BrowserRouter, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <div>
                <Route path='/' exact component={SignInForm}/>
                <Route path='/sign-up' component={SignUpForm}/>
            </div>
        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));

