import React, {Component} from 'react';
import {Validations} from '../common/Validations.js';
import UsersDataRequests from '../common/UsersDataRequests';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {connect} from 'react-redux';
import '../../node_modules/jquery/dist/jquery.min'
import UserForm from './UserForm';
import isGuest from "../common/isGuest";
import endPointsList from "../common/endPointsList";
import {NavLink} from 'react-router-dom'
import Alerts from './Alerts';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.signUpInputId = {
            firstName: 'sign-up-firstName',
            lastName: 'sign-up-lastName',
            email: 'sign-up-email',
            genderMale: 'sign-up-gender-male',
            genderFemale: 'sign-up-gender-female',
            age: 'sign-up-age',
            photo: 'sign-up-photo',
            middleName: 'sign-up-middleName'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const validateFlag = this.validateForm();
        if (validateFlag) {
            console.log('valid validation');
            const result = await UsersDataRequests.signUpReq(this.props.signup);

            this.setState({...this.state, alert: result});
        } else {
            console.log('invalid validation');
        }
    }
    
    validateForm() {
        const validStatus = document.getElementById('valid-status');
        const validateFlag = Validations.validateForm(this.props.signup);
        if (validateFlag) {
            validStatus.innerHTML = '';
            validStatus.classList.remove('alert-danger');
            const middleName = this.props.signup.middleName;
            if (!middleName.isValid) {
                middleName.isValid = true;
                this.props.changeRegFormInput({key: 'middleName', value: middleName});
            }

        } else {
            validStatus.innerHTML = 'Invalid form filling';
            validStatus.classList.add('alert-danger');
        }
        return validateFlag;
    }
    
    render() {
        const alert = this.state.alert ?
            <Alerts type={this.state.alert.type} tittle={this.state.alert.tittle}
                    show={this.state.alert.show}> {this.state.alert.message} </Alerts> : '';

        const checkingIsGuest = isGuest;
        if (checkingIsGuest()) {
            return isGuest();
        } else {
            return (
                <div>
                    {alert}
                    <div id='wrapper'>
                        <NavLink to={endPointsList.signIn}>
                            <input id='sign-up-back' className='btn btn-dark' type="button" value='<Back'/>
                        </NavLink>
                        <div id='sign-up-block' className='formBlock container'>
                            <UserForm formId='sign-up-form' submitHandler={this.handleSubmit} inputId={this.signUpInputId} user={this.props.signup}
                             changeFormInput={this.props.changeRegFormInput}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        signup: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeRegFormInput: (payload) => dispatch({
            type: 'CHANGE_REG_FORM_INPUT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm)
