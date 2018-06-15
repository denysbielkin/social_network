import React, {Component} from 'react'
import Validations from '../Validations.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../css/App.css'
import {connect} from 'react-redux'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.inputId = {
            firstName: 'sign-up-firstName',
            lastName: 'sign-up-lastName',
            email: 'sign-up-email',
            genderMale: 'sign-up-gender-male',
            genderFemale: 'sign-up-gender-female',
            age: 'sign-up-age',
            photo: 'sign-up-photo',
            middleName: 'sign-up-middleName'
        };
        this.typesOfRegexp = {
            name: 'name',
            email: 'email',
            gender: 'gender',
            age: 'age',
            photo: 'photo'

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event, id, typeOfRegexp) {
        let thisInput = {
            content: '',
            isValid: false
        };
        if (typeOfRegexp === 'photo') {
            thisInput.isValid = Validations.regexpImage(id)
        } else {
            thisInput.isValid = Validations.typeOfRegexp(event.target.value, typeOfRegexp);
            thisInput.content = event.target.value;

        }


        // this.setState({[event.target.name]: thisInput});

        this.props.changeRegFormInput({key: event.target.name, value: thisInput});

        this.detectIfValid(thisInput, id);


    }

    detectIfValid(thisInput, id) {
        const thisInputTag = document.getElementById(`${id}`);
        const isValid = 'alert-success';
        const isNotValid = 'alert-danger';

        if (!thisInput.isValid) {
            if (thisInputTag.className.indexOf(' ' + isNotValid) === -1) {
                thisInputTag.className += ' ' + isNotValid;
                thisInputTag.classList.remove(isValid);
            }


        } else {
            if (thisInputTag.className.indexOf(' ' + isValid) === -1) {
                thisInputTag.className += ' ' + isValid;
                thisInputTag.classList.remove(isNotValid);
            }

        }
    }


    handleSubmit(event) {
        event.preventDefault();
        let validateFlag = Validations.validateForm(this.props.signup);

        if (validateFlag) {
            console.log(1);
        } else {
            console.log(2);
        }
    }

    render() {
        return (
            <div id='wrapper'>
                <div id='signUpBlock' className='container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group form'>
                            <label htmlFor='sign-up-firstName'>
                                First name<span className='mandatory-field'>*</span>:
                                <input className='form-control alert' type="text" id='sign-up-firstName'
                                       name='firstName'
                                       value={this.props.signup.firstName.content}
                                       onChange={(event) => this.handleChange(event, this.inputId.firstName, this.typesOfRegexp.name)}/>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sign-up-lastName'>
                                Last name<span className='mandatory-field'>*</span>:
                                <input className='form-control alert' type="text" id='sign-up-lastName' name='lastName'
                                       value={this.props.signup.lastName.content}
                                       onChange={(event) => this.handleChange(event, this.inputId.lastName, this.typesOfRegexp.name)}/>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sign-up-email'>
                                Email<span className='mandatory-field'>*</span>:
                                <input className='form-control alert' type="email" id='sign-up-email' name='email'
                                       value={this.props.signup.email.content}
                                       onChange={(event) => this.handleChange(event, this.inputId.email, this.typesOfRegexp.email)}/>
                            </label>
                        </div>
                        <div className='form-group'>
                            <div>Gender<span className='mandatory-field'>*</span>:</div>
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
                                Age<span className='mandatory-field'>*</span>:
                                <input className='form-control alert' type="number" id='sign-up-age'
                                       value={this.props.signup.age.content}
                                       name='age'
                                       onChange={(event) => this.handleChange(event, this.inputId.age, this.typesOfRegexp.age)}/>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sign-up-photo'>
                                Photo<span className='mandatory-field'>*</span>:
                                <input className='form-control alert' type="file" id='sign-up-photo'
                                       aria-describedby="sign-up-photo-tip"
                                    // value={this.state.photo.content}
                                       name='photo'
                                       onChange={(event) => this.handleChange(event, this.inputId.photo, this.typesOfRegexp.photo)}
                                />
                            </label>
                            <div>

                                <div id='photo-preview'></div>
                            </div>

                            <small id='sign-up-photo-tip' className='form-text text-muted'>
                                Photo size must be between 40kb and 5mb
                            </small>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='sign-up-middleName'>
                                Middle-name:
                                <input className='form-control alert' type="text"
                                       aria-describedby="sign-up-middleName-tip"
                                       id='sign-up-middleName'
                                       value={this.props.signup.middleName.content}
                                       name='middleName'
                                       onChange={(event) => this.handleChange(event, this.inputId.middleName, this.typesOfRegexp.name)}/>
                            </label>
                            <small id='sign-up-middleName-tip' className='form-text text-muted'>Middle-name is optional
                                for
                                filling
                            </small>
                        </div>
                        <div>
                            <small className='form-text text-muted'><span className='mandatory-field'>*</span> - is
                                mandatory
                                for filling
                            </small>
                        </div>
                        <br/>

                        <div className='form-group'>
                            <input className='btn btn-warning' type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        );
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
