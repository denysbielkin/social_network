import React, {Component} from 'react';
import {Validations} from "../common/Validations";

class UserForm extends Component {
    constructor(props) {
        super(props);
        
        this.typesOfRegexp = {
            name: 'name',
            email: 'email',
            gender: 'gender',
            age: 'age',
            photo: 'photo'

        };

        this.handleChange = this.handleChange.bind(this);
        this.photoHandleChange = this.photoHandleChange.bind(this);
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

                this.props.changeFormInput({key: 'photo', value: thisInput});
            };

            reader.readAsDataURL(img.files[0]);

        } else {
            console.log('it is not correct file');
            return false;
        }
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
    
    handleChange(event, id, typeOfRegexp) {
        const thisInput = {
            content: '',
            isValid: false
        };
        thisInput.isValid = Validations.typeOfRegexp(event.target.value, typeOfRegexp);
        thisInput.content = event.target.value;

        this.props.changeFormInput({key: event.target.name, value: thisInput});
        this.detectIfValid(thisInput, id);
    }
    
    render() {
        return (
            <form id={this.props.formId} onSubmit={this.props.submitHandler}>
                <div className='form-group form'>
                    <label htmlFor='sign-up-firstName'>
                        First name<span className='mandatory-field'>*</span>:
                        <input className='form-control signUpElement' type="text"
                               id='sign-up-firstName'
                               required
                               name='firstName'
                               value={this.props.user.firstName.content}
                               onChange={(event) => this.handleChange(event, this.props.inputId.firstName, this.typesOfRegexp.name)}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor='sign-up-lastName'>
                        Last name<span className='mandatory-field'>*</span>:
                        <input className='form-control signUpElement' type="text"
                               id='sign-up-lastName'
                               name='lastName'
                               required
                               value={this.props.user.lastName.content}
                               onChange={(event) => this.handleChange(event, this.props.inputId.lastName, this.typesOfRegexp.name)}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor='sign-up-middleName'>
                        Middle-name:
                        <input className='form-control signUpElement' type="text"
                               aria-describedby="sign-up-middleName-tip"
                               id='sign-up-middleName'
                               value={this.props.user.middleName.content}
                               name='middleName'
                               onChange={(event) => this.handleChange(event, this.props.inputId.middleName, this.typesOfRegexp.name)}/>
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
                        <input className='form-control signUpElement' type="email" id='sign-up-email'
                               name='email'
                               required
                               value={this.props.user.email.content}
                               onChange={(event) => this.handleChange(event, this.props.inputId.email, this.typesOfRegexp.email)}/>
                    </label>
                </div>
                <div className='form-group' id='sign-up-gender'>
                    <div>Gender<span className='mandatory-field'>*</span>:</div>
                    <div>
                        <div>
                            <label htmlFor='sign-up-gender-male' className='signUpGender'><input
                                name="gender"
                                id='sign-up-gender-male'
                                onChange={(event) => this.handleChange(event, this.props.inputId.genderMale, this.typesOfRegexp.gender)}
                                type="radio"
                                value="male"/> Male</label>
                        </div>
                        <div>
                            <label htmlFor='sign-up-gender-female' className='signUpGender'><input
                                name="gender"
                                id='sign-up-gender-female'
                                onChange={(event) => this.handleChange(event, this.props.inputId.genderFemale, this.typesOfRegexp.gender)}
                                type="radio"
                                value="female"/> Female</label>

                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='sign-up-age'>
                        Age<span className='mandatory-field'>*</span>:
                        <input className='form-control signUpElement' type="number"
                               id='sign-up-age'
                               required
                               value={this.props.user.age.content}
                               name='age'
                               onChange={(event) => this.handleChange(event, this.props.inputId.age, this.typesOfRegexp.age)}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor='sign-up-photo'>
                        Photo<span className='mandatory-field'>*</span>:
                        <input className='form-control signUpElement' type="file" id='sign-up-photo'
                               aria-describedby="sign-up-photo-tip"
                               name='photo'
                               required
                               onChange={(event) => this.photoHandleChange(event, this.props.inputId.photo)}
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
                    <small className='form-text text-muted'><span className='mandatory-field'>*</span> -
                        is
                        mandatory
                        for filling
                    </small>
                </div>
                <br/>
                <div>
                    <small className='form-text' id='valid-status'></small>
                </div>
                <div className='form-group'>
                    <input className='btn btn-warning signUpElement' type="submit" value="Sign up"/>
                </div>
            </form>
        );
    }
}

export default UserForm;
