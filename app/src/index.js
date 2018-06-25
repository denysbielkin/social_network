import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers/typeOfRegexpReducer'

//routes
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import UserHomePage from './components/UserHomePage'

import {Router, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path='/' exact component={SignInForm}/>
                <Route path='/sign-up' component={SignUpForm}/>
                <Route path='/my-page' component={UserHomePage}/>
            </div>
        </Router>
    </Provider>

    , document.getElementById('root'));

