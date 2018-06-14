import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
//import App from './App';
import './css/App.css'
import {createStore} from 'redux'
import rootReducer from './reducers/typeOfRegexpReducer'
import SignUpForm from './components/SignUpForm'


const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <SignUpForm/>
    </Provider>

    , document.getElementById('root'));

