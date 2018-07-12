import React, {Component} from 'react'
import isGuest from '../common/isGuest'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {NavLink} from 'react-router-dom'
import Alerts from './Alerts';
import UsersDataRequests from "../common/UsersDataRequests";
import endPointsList from '../common/endPointsList';
import {connect} from "react-redux";

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        const validationResult = await this.validateForm(user);

        try {
            if (!validationResult) {
                throw new Error(`Because we have some error we haven't any alerts`);
            }
        } catch (err) {
            console.log(err);
        }

        this.props.showAlert(validationResult);
        if (validationResult.type === 'success') {
            this.setState({isLoggedIn: true});
        }
    }

    async validateForm(user) {
        if (!(user.email && user.password)) {
            return {show: true, type: 'danger', tittle: 'Fields are empty!'}
        } else {
            const reqToDb = await UsersDataRequests.signInReq(user);
            if (reqToDb) {
                console.log('Authorized')
            } else {
                console.log('Nope')
            }
            return reqToDb;
        }
    }

    render() {
        const checkingIsGuest = isGuest;
        if (checkingIsGuest()) {
            return isGuest();
        } else {
            return (
                <div>
                    <Alerts />
                    <div id='wrapper'>
                        <div id='sign-in-form' className='container formBlock'>
                            <form id='sign-in-form' onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='sign-in-email'>
                                        Email:
                                        <input className='form-control signInElement' type="email"
                                               id='sign-in-email'
                                               name='email'

                                               value={this.state.email}
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='sign-in-password'>
                                        Password:
                                        <input className='form-control signInElement' type="password"
                                               id='sign-in-password'
                                               name='password'

                                               value={this.state.password}
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <input className='btn btn-warning signInElement' type="submit" value="Sign in"/>
                                </div>

                                <div className='form-group'>
                                    <NavLink to={endPointsList.signUp}>
                                        <input className='btn btn-dark' type="button"
                                               value="Create new account"/>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch => {

    return {

        showAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInForm)
