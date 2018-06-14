import React, {Component} from 'react';
//import Validations from '../Validations.js';
import typeOfRegexpReducer from '../reducers/typeOfRegexpReducer';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: {content: '', isValid: false},
            lastName: {content: '', isValid: false},
            email: {content: '', isValid: false},
            gender: {content: null, isValid: false},
            age: {content: '', isValid: false}
        };


        this.inputId = {
            firstName: 'sign-up-firstName',
            lastName: 'sign-up-lastName',
            email: 'sign-up-email',
            genderMale: 'sign-up-gender-male',
            genderFemale: 'sign-up-gender-female',
            age: 'sign-up-age'
        };

        this.typesOfRegexp = {
            name: 'name',
            email: 'email',
            gender: 'gender',
            age: 'age'

        };
        this.handleChange = this.handleChange.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event, id, typeOfRegexp) {
        let thisInputTag = document.getElementById(`${id}`);

        let thisInput = {
            content: event.target.value,
            isValid: typeOfRegexpReducer(this.content, typeOfRegexp)
        };
        this.setState({[event.target.name]: thisInput});


        if (!thisInput.isValid) {
            if (thisInputTag.className.indexOf(' isNotValid') === -1) {
                thisInputTag.className += ' isNotValid';
                thisInputTag.classList.remove('isValid');
            }


        } else {
            if (thisInputTag.className.indexOf(' isValid') === -1) {
                thisInputTag.className += ' isValid';
                thisInputTag.classList.remove('isNotValid');
            }

        }

    }


    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div id='signUpBlock' className='container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group form'>
                        <label htmlFor='sign-up-firstName'>
                            First name:
                            <input className='form-control' type="text" id='sign-up-firstName' name='firstName'
                                   value={this.state.firstName.content}
                                   onChange={(event) => this.handleChange(event, this.inputId.firstName, this.typesOfRegexp.name)}/>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sign-up-lastName'>
                            Last name:
                            <input className='form-control' type="text" id='sign-up-lastName' name='lastName'
                                   value={this.state.lastName.content}
                                   onChange={(event) => this.handleChange(event, this.inputId.lastName, this.typesOfRegexp.name)}/>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sign-up-email'>
                            Email:
                            <input className='form-control' type="email" id='sign-up-email' name='email'
                                   value={this.state.email.content}
                                   onChange={(event) => this.handleChange(event, this.inputId.email, this.typesOfRegexp.email)}/>
                        </label>
                    </div>
                    <div className='form-group'>
                        <div>Gender:</div>
                        <div>
                            <label htmlFor='sign-up-gender-male' className='signUpGender'><input name="gender"
                                                                                                 id='sign-up-gender-male'
                                                                                                 onChange={(event) => this.handleChange(event, this.inputId.genderMale, this.typesOfRegexp.gender)}
                                                                                                 type="radio"
                                                                                                 value="male"/> Male</label>
                            <label htmlFor='sign-up-gender-female' className='signUpGender'><input name="gender"
                                                                                                   id='sign-up-gender-female'
                                                                                                   onChange={(event) => this.handleChange(event, this.inputId.genderFemale, this.typesOfRegexp.gender)}
                                                                                                   type="radio"
                                                                                                   value="female"/> Female</label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sign-up-age'>
                            Age:
                            <input className='form-control' type="number" id='sign-up-age'
                                   value={this.state.age.content}
                                   name='age'
                                   onChange={(event) => this.handleChange(event, this.inputId.age, this.typesOfRegexp.age)}/>
                        </label>
                    </div>
                    <div className='form-group'>
                        <input className='btn btn-primary' type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpForm
