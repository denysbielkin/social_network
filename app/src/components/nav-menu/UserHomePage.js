import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UsersDataRequests from '../../common/UsersDataRequests';
import endPointsList from '../../common/endPointsList';
import NavigateMenu from './NavigateMenu';
import {Validations} from '../../common/Validations';
import Alerts from '../Alerts';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap';
import $ from 'jquery';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import {connect} from "react-redux";

class UserHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPhotoEditModal: false,
            isEdit: false,
            isLoggedIn: true,
            isNeedUserInfo: true,
            userInfo: {},
            formattedUserInfo: ''
        };


        this.inputId = {
            firstName: 'user-page-user-names-first-name-input',
            middleName: 'user-page-user-names-middle-name-input',
            lastName: 'user-page-user-names-last-name-input',
            age: 'user-page-user-age',
            photo: 'user-page-user-avatar',
            email: 'user-page-user-email',

        };

        this.typesOfRegexp = {
            name: 'name',
            email: 'email',
            gender: 'gender',
            age: 'age',
            photo: 'photo'

        };

        this.readMode = 'user-page-userInfo-form-read';
        this.editMode = 'user-page-userInfo-form-edit';
        this.loadUserInfo();
        this.onSignOut = this.onSignOut.bind(this);
        this.onInfoClick = this.onInfoClick.bind(this);
        this.handleSaveInfoClick = this.handleSaveInfoClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
    }

    handleChange(event, typeOfRegexp) {
        const thisInput = {
            content: '',
            isValid: ''
        };
        thisInput.content = event.target.value;
        thisInput.isValid = Validations.typeOfRegexp(event.target.value, typeOfRegexp);
        this.props.changeUserInfoFormInput({key: event.target.name, value: thisInput});
        Validations.detectIfValid(thisInput, event.target.id);
    }

    onSignOut() {
        localStorage.removeItem('auth-tok');
        this.setState({...this.state, isLoggedIn: false});
    }

    isTokenGood() {
        const checkToken = localStorage.getItem('auth-tok');
        if (checkToken) {
            this.setState({...this.state, isLoggedIn: true});
        } else {
            this.setState({...this.state, isLoggedIn: false});
        }
    }

    onInfoClick(event) {
        const input = $(event.target);
        console.log($(input).attr.class );
        if ($(input).className.indexOf(this.editMode) === -1) {
            $(input).toggleClass(this.readMode);
            $(input).toggleClass(this.editMode);
            $(input).removeAttr('readonly');
            this.setState({...this.state, isEdit: true});
            const saveBtnBlock = $('#save-btn-block');
            if (!$('#user-page-saveButton')) {
                let saveBtn = document.createElement('input');
                saveBtn.setAttribute('type', 'button');
                saveBtn.setAttribute('id', 'user-page-saveButton');
                saveBtn.setAttribute('value', 'Save');
                saveBtn.classList.add('btn');
                saveBtn.classList.add('btn-primary');
                saveBtnBlock.appendChild(saveBtn);
            }
        }
    }

    turnIntoReadMode() {
        for (let i in this.inputId) {
            const input = $(`#${this.inputId[i]}`);
            $(input).toggleClass(this.editMode);
            $(input).toggleClass(this.readMode);
            $(input).setAttribute('readonly', 'readonly');
            $(input).blur();
        }
        let saveBtn = $('#save-btn-block');
        $(saveBtn).html('');

        this.setState({...this.state, isEdit: false});
    }

    async saveData(updatedData) {
        const result = await UsersDataRequests.updateUserInfo(updatedData);
        if (!result.show) {
            this.turnIntoReadMode();
        } else {
            this.setState({...this.state, alert: result});
        }
    }
    handlePhoto(){
console.log(1)
        this.setState({...this.state, showPhotoEditModal: true });
    }
    handleCloseModal() {
        console.log(2)
        this.setState({...this.state, showPhotoEditModal: false });
    }

    generatePhotoEditModal(){
        console.log(3)
       return (
            <div>


                    <Modal id='photoProfileEdit' show={this.state.showPhotoEditModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit profile photo </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="file"/>
                            <p>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </p>

                            <p>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                                cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                                dui. Donec ullamcorper nulla non metus auctor fringilla.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleCloseModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                </div>

        );
    }
    handleSaveInfoClick(event) {
        event.preventDefault();
        const formData = this.props.userInfo;
        const dataToValidate = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            age: formData.age,
            email: formData.email
        };
        const isValid = Validations.validateForm(dataToValidate);
        if (isValid) {
            this.saveData(dataToValidate);
        } else {
            this.setState({
                ...this.state, alert: {
                    show: true,
                    type: 'danger',
                    tittle: `Invalid form filling!`
                }
            });
        }
    }


    async loadUserInfo() {
        const userInfo = await UsersDataRequests.loadUserInfo();


        const dataToStore = ['firstName', 'middleName', 'lastName', 'age', 'photo', 'email'];
        dataToStore.map(key => {
            this.props.changeUserInfoFormInput({
                key,
                value: {
                    content: userInfo[key], isValid: true
                }
            });
        });
    }

    componentWillMount() {
        this.isTokenGood();
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <div>
                    <Redirect to={endPointsList.signIn}/>
                </div>
            )
        }

        const middleNamePlaceholder = `'Middle name'`;


                            const alert = this.state.alert ?
            <Alerts type={this.state.alert.type} tittle={this.state.alert.tittle}
                    show={this.state.alert.show}> {this.state.alert.message} </Alerts> : '';

        return (
            <div>
                {alert}
                <div id='wrapper'>
                    <div id='page-content'>
                        <div id='nav-menu-block'>
                            <NavigateMenu/>
                            <li>
                                <button id='sign-out-btn' className='btn btn-outline-danger'
                                        onClick={this.onSignOut}>SIGN OUT
                                </button>
                            </li>
                        </div>
                        <div id='user-page-user-friendlist-block' className='user-page-data-block'>
                            <h2>Friends</h2>
                            <div id='user-page-user-friendlist'>
                                Blah-blah
                            </div>
                        </div>
                        <div className='user-page-data-block' id='user-page-infoBlock'>
                            <div id='user-page'>
                                <form name='userInfoForm'>
                                    <div id='user-page-user-avatar-block'>
                                        <img id={this.inputId.photo} src={this.props.userInfo.photo.content}
                                             alt="photo" onClick={this.handlePhoto}/>
                                    </div>
                                    <div id='save-btn-block' onClick={this.handleSaveInfoClick}></div>
                                    <span><small
                                        className='text-muted'>Click on the field which you want to edit</small></span>
                                    <div id='user-page-user-names'>


                                        <input name='firstName'
                                               className='user-page-userInfo-form-read'
                                               type="text"
                                               id={this.inputId.firstName}
                                               value={this.props.userInfo.firstName.content}
                                               onClick={this.onInfoClick}
                                               readOnly
                                               onChange={(event) => {
                                                   this.handleChange(event, this.typesOfRegexp.name)
                                               }}
                                        />

                                        <input className='user-page-userInfo-form-read'
                                               name='middleName'
                                               type="text"
                                               id={this.inputId.middleName}
                                               value={this.props.userInfo.middleName.content}
                                               placeholder={middleNamePlaceholder}
                                               onClick={this.onInfoClick}
                                               readOnly
                                               onChange={(event) => {
                                                   this.handleChange(event, this.typesOfRegexp.name)
                                               }}

                                        />

                                            <input name='lastName'
                                                   className='user-page-userInfo-form-read'
                                                   type="text"
                                                   id={this.inputId.lastName}
                                                   value={this.props.userInfo.lastName.content}
                                                   onClick={this.onInfoClick}
                                                   readOnly
                                                   onChange={(event) => {
                                                       this.handleChange(event, this.typesOfRegexp.name)
                                                   }}
                                            />


                                    </div>
                                    <div id='user-page-user-age-block'>
                                        <input name='age'
                                               className='user-page-userInfo-form-read'
                                               type="number"
                                               id={this.inputId.age}
                                               value={this.props.userInfo.age.content}
                                               onChange={(event) => {
                                                   this.handleChange(event, this.typesOfRegexp.age)
                                               }}
                                               readOnly
                                               onClick={this.onInfoClick}/>
                                  <span id='user-page-user-age-title'> years</span>
                                    </div>
                                    <div>
                                        <input name='email'
                                               className='user-page-userInfo-form-read'
                                               type="email"
                                               id={this.inputId.email}
                                               value={this.props.userInfo.email.content}
                                               onClick={this.onInfoClick}
                                               readOnly
                                               onChange={(event) => {
                                                   this.handleChange(event, this.typesOfRegexp.email)
                                               }}
                                        />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state
    }
};

const mapDispatchToProps = dispatch => {

    return {
        changeUserInfoFormInput: (payload) => dispatch({
            type: 'CHANGE_USER_INFO_FORM_INPUT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHomePage)
