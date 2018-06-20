import React, {Component} from 'react'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { NavLink } from 'react-router-dom'
//import {connect} from "react-redux";
import {Alert} from 'react-bootstrap'
class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {
        console.log(321)
    }

    handleSubmit() {
        //todo
        //const validationFlag = Validation.validateAuth(user);
        //request to server, from server to db
        console.log(123)
    }
    validateForm(){

    }


    render() {
        const alert = this.state.alert ?
            <Alert bsStyle={this.state.alert.status}> {this.state.alert.message} </Alert> : '';
        return (

                <div>
                    {alert}
                    <div id='wrapper'>
                        <div id='sign-in-form' className='container formBlock'>
                            <form id='sign-in-form' onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='sign-in-email'>
                                        Email:
                                        <input className='form-control alert signInElement' type="email"
                                               id='sign-in-email'
                                               name='email'
                                               required
                                               value={this.state.email}
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='sign-in-password'>
                                        Password:
                                        <input className='form-control alert signInElement' type="password"
                                               id='sign-in-password'
                                               name='password'
                                               required
                                               value={this.state.password}
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </label>
                                </div>


                                <div className='form-group'>
                                    <input className='btn btn-warning signInElement' type="submit" value="Submit"/>
                                </div>

                                    <div className='form-group'>
                                        <NavLink to'/sign-up'>
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