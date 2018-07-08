import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers/formReducer'
import endPointsList from './common/endPointsList';
import {Router, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
//routes
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import News from './components/nav-menu/News'
import Settings from './components/nav-menu/Settings'
import Friends from './components/nav-menu/Friends'
import Search from './components/nav-menu/Search'
import UserHomePage from './components/nav-menu/UserHomePage'
import AnotherUserPage from "./components/AnotherUserPage";
const history = createBrowserHistory();
const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path={endPointsList.signIn} exact component={SignInForm}/>
                <Route path={endPointsList.signUp} component={SignUpForm}/>
                <Route path={endPointsList.myPage} component={UserHomePage}/>
                <Route path={endPointsList.news} component={News}/>
                <Route path={endPointsList.settings} component={Settings}/>
                <Route path={endPointsList.friends} component={Friends}/>
                <Route path={endPointsList.search} component={Search}/>
                <Route path={endPointsList.anotherUserPage} component={AnotherUserPage}/>
            </div>
        </Router>
    </Provider> , document.getElementById('root')
);
