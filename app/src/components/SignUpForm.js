import React, {Component} from 'react'
import {Validations} from '../common/Validations.js';
import UsersDataRequests from '../common/UsersDataRequests';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {connect} from 'react-redux';
import { Alert } from 'react-bootstrap'


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        this.photoHandleChange = this.photoHandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    photoHandleChange(event, imgId) {
        const thisInput = {
            content: '',
            isValid: false
        };


        const img = document.getElementById(imgId);

        const reader = new FileReader();
        const validationFlag = Validations.regexpImage(img);
        if (validationFlag) {
            thisInput.isValid = true;
            reader.onload = (eventOfLoad) => {
                document.getElementById('photo-preview').innerHTML = `
                     <small class='form-text text-muted'>Photo preview:</small>
                     <img id="photo-preview-img" src='${eventOfLoad.target.result}'/>`;

                thisInput.content = reader.result;

                this.props.changeRegFormInput({key: 'photo', value: thisInput});
            };

            reader.readAsDataURL(img.files[0]);

        } else {
            console.log('it is not correct file');
        }
    }

    handleChange(event, id, typeOfRegexp) {
        const thisInput = {
            content: '',
            isValid: false
        };
        thisInput.isValid = Validations.typeOfRegexp(event.target.value, typeOfRegexp);
        thisInput.content = event.target.value;


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

    async handleSubmit(event) {
        event.preventDefault();

        const validateFlag = this.validateForm();
        if (validateFlag) {
            console.log('valid validation');
            const result = await UsersDataRequests.signUpReq(this.props.signup);

            if (result.status === 'success') {
                this.setState({...this.state, alert: result});
            }
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
            if (middleName.isValid === false) {
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
        const alert = this.state.alert ? <Alert bsStyle={this.state.alert.status}> {this.state.alert.message} </Alert> : '';
        return (
            <div>
                {alert}
                <div id='wrapper'>

                    <div id='signUpBlock' className='container'>
                        <form id='signUpForm' onSubmit={this.handleSubmit}>
                            <div className='form-group form'>
                                <label htmlFor='sign-up-firstName'>
                                    First name<span className='mandatory-field'>*</span>:
                                    <input className='form-control alert signUpElement' type="text" id='sign-up-firstName'
                                           required
                                           name='firstName'
                                           value={this.props.signup.firstName.content}
                                           onChange={(event) => this.handleChange(event, this.inputId.firstName, this.typesOfRegexp.name)}/>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='sign-up-lastName'>
                                    Last name<span className='mandatory-field'>*</span>:
                                    <input className='form-control alert signUpElement' type="text" id='sign-up-lastName'
                                           name='lastName'
                                           required
                                           value={this.props.signup.lastName.content}
                                           onChange={(event) => this.handleChange(event, this.inputId.lastName, this.typesOfRegexp.name)}/>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='sign-up-middleName'>
                                    Middle-name:
                                    <input className='form-control alert signUpElement' type="text"
                                           aria-describedby="sign-up-middleName-tip"
                                           id='sign-up-middleName'
                                           value={this.props.signup.middleName.content}
                                           name='middleName'
                                           onChange={(event) => this.handleChange(event, this.inputId.middleName, this.typesOfRegexp.name)}/>
                                </label>
                                <small id='sign-up-middleName-tip' className='form-text text-muted'>Middle-name is
                                    optional
                                    for
                                    filling
                                </small>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='sign-up-email'>
                                    Email<span className='mandatory-field'>*</span>:
                                    <input className='form-control alert signUpElement' type="email" id='sign-up-email' name='email'
                                           required
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
                                    <input className='form-control alert signUpElement' type="number" id='sign-up-age'
                                           required
                                           value={this.props.signup.age.content}
                                           name='age'
                                           onChange={(event) => this.handleChange(event, this.inputId.age, this.typesOfRegexp.age)}/>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='sign-up-photo'>
                                    Photo<span className='mandatory-field'>*</span>:
                                    <input className='form-control alert signUpElement' type="file" id='sign-up-photo'
                                           aria-describedby="sign-up-photo-tip"
                                           name='photo'
                                           required
                                           onChange={(event) => this.photoHandleChange(event, this.inputId.photo)}
                                    />
                                </label>
                                <div>

                                    <div id='photo-preview'></div>
                                </div>

                                <small id='sign-up-photo-tip' className='form-text text-muted'>
                                    Photo size must be between 40kb and 5mb
                                    <div>There is list of valid photo extensions: .jpeg .jpg .png .bmp </div>
                                </small>
                            </div>

                            <div>
                                <small className='form-text text-muted'><span className='mandatory-field'>*</span> - is
                                    mandatory
                                    for filling
                                </small>
                            </div>
                            <br/>
                            <div>
                                <small className='alert form-text' id='valid-status'></small>
                            </div>
                            <div className='form-group'>
                                <input className='btn btn-warning signUpElement' type="submit" value="Submit"/>
                            </div>
                        </form>
                    </div>
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
