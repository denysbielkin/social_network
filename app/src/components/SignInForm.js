import React, {Component} from 'react'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { NavLink } from 'react-router-dom'
import { Validations } from '../common/Validations'
//import {connect} from "react-redux";

import Alerts from './Alerts'
import UsersDataRequests from "../common/UsersDataRequests";
class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(this.state.email);
        console.log(this.state.password);

        this.setState({[event.target.name]:event.target.value});

    }



    async handleSubmit(event) {
        //todo
        //const validationFlag = Validation.validateAuth(user);
        //request to server, from server to db
        event.preventDefault();
        console.log('email: ' + this.state.email,'password:' + this.state.password);
        const validationResult = await UsersDataRequests.signInReq({email:this.state.email, password: this.state.password});
        //
        // if(validationResult.isError){
        //     delete validationResult.isError;
        //
        // }
        this.setState({...this.state, alert: validationResult});

    }
    validateForm(user) {
        if (this.props.settings.show) {

            if (!(user.email && user.password)) {
                return {isError: true, show: true, type: 'danger', tittle: 'Fields are empty!'}
            } else {
                const reqToDb = UsersDataRequests.signInReq(user);
                if (reqToDb) {
                    console.log('Authorized')
                } else {
                    console.log('Nope')
                }

            }
        }
    }

    render() {
        console.log(this.state.alert);
        const alert = this.state.alert ?
            <Alerts type={this.state.alert.type} tittle={this.state.alert.tittle} show={this.state.alert.show}> 111 </Alerts> : '';
            console.log(alert);
        return (

                <div>
                    {alert}
                    <div id='wrapper'>
                        <div id='sign-in-form' className='container formBlock'>
                            <form id='sign-in-form' onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='sign-in-email'>
                                        Email:
                                        <input className='form-control signInElement' type="email"
                                               id='sign-in-email'
                                               name='email'
                                               //required
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
                                              // required
                                               value={this.state.password}
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </label>
                                </div>


                                <div className='form-group'>
                                    <input className='btn btn-warning signInElement' type="submit" value="Submit"/>
                                </div>

                                    <div className='form-group'>
                                        <NavLink to='/sign-up'>
                                        <input className='btn btn-dark' type="button"
                                               value="Create new account" />
                                        </NavLink>
                                    </div>

                            </form>
                        </div>
                    </div>
                </div>

        )
    }
}

export default SignInForm;