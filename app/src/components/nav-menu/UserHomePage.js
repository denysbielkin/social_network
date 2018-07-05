import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UsersDataRequests from '../../common/UsersDataRequests'
import endPointsList from '../../common/endPointsList';
import NavigateMenu from './NavigateMenu'
import {Validations} from '../../common/Validations';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import {connect} from "react-redux";

class UserHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
            photo: 'user-page-user-avatar'

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
    }

    handleChange(event, id, typeOfRegexp) {
        const thisInput = {
            content: '',
            isValid: ''

        };

        thisInput.content = event.target.value;
        thisInput.isValid = Validations.typeOfRegexp(event.target.value, typeOfRegexp);

        this.props.changeUserInfoFormInput({key: event.target.name, value: thisInput});
        Validations.detectIfValid(thisInput, id);
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
        const input = event.target;

        if (input.className.indexOf(this.editMode) === -1) {
            input.classList.remove(this.readMode);
            input.classList.add(this.editMode);
            input.removeAttribute('readonly');
            this.setState({...this.state, isEdit: true});
            const saveBtnBlock = document.getElementById('save-btn-block');

            if (!document.getElementById('user-page-saveButton')) {
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

    turnIntoReadMode(){
        for(let i in this.inputId){
            const input = document.getElementById(this.inputId[i]);
            input.classList.remove(this.editMode);
            input.classList.add(this.readMode);
            input.setAttribute('readonly','readonly');
            input.blur();
        }
        let saveBtn = document.getElementById('save-btn-block');
        saveBtn.innerHTML='';

        this.setState({...this.state, isEdit:false});
    }

    async saveData(updatedData) {
        const result = await UsersDataRequests.updateUserInfo(updatedData);
        if(result){
            this.turnIntoReadMode();
        }
    }

    handleSaveInfoClick(event) {
        event.preventDefault();
        const formData = this.props.userInfo;
        const dataToValidate = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            age: formData.age,
        };
        const isValid = Validations.validateForm(dataToValidate);
        if (isValid) {
            this.saveData(dataToValidate);
        }
    }


    async loadUserInfo() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const dataToStore = ['firstName', 'middleName', 'lastName', 'age', 'photo'];
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
        let middleNameValue = '';

        if (this.props.userInfo.middleName.content) {
            middleNameValue = `${this.props.userInfo.middleName.content}`;

        }
        const placeholder = `'Middle name'`;
        const middleName = (
            <span id='user-page-user-names-first-name'>
                    <input className='user-page-userInfo-form-read'
                           type="text"
                           id={this.inputId.middleName}
                           value={middleNameValue}
                           placeholder={placeholder}
                           onClick={this.onInfoClick}
                           readOnly
                           onChange={(event) => {
                               this.handleChange(event, this.inputId.middleName, this.typesOfRegexp.name)
                           }}

                    /> </span>
        );
        return (
            <div>
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
                                        <img id={this.inputId.photo} src={this.props.userInfo.photo.content} alt="photo"/>
                                    </div>
                                    <div id='save-btn-block' onClick={this.handleSaveInfoClick}></div>
                                    <span><small
                                        className='text-muted'>Click on the field which you want to edit</small></span>
                                    <div id='user-page-user-names'>

                                    <span id='user-page-user-names-first-name'>
                                        <input name='firstName'
                                               className='user-page-userInfo-form-read'
                                               type="text"
                                               id={this.inputId.firstName}
                                               value={this.props.userInfo.firstName.content}
                                               onClick={this.onInfoClick}
                                               readOnly
                                               onChange={(event) => {
                                                   this.handleChange(event, this.inputId.firstName, this.typesOfRegexp.name)
                                               }}
                                        /></span>
                                        {middleName}
                                        <span id='user-page-user-names-last-name'>
                                            <input name='lastName'
                                                   className='user-page-userInfo-form-read'
                                                   type="text"
                                                   id={this.inputId.lastName}
                                                   value={this.props.userInfo.lastName.content}
                                                   onClick={this.onInfoClick}
                                                   readOnly
                                                   onChange={(event) => {
                                                       this.handleChange(event, this.inputId.lastName, this.typesOfRegexp.name)
                                                   }}
                                            />

                                        </span>
                                    </div>
                                    <div id='user-page-user-age-block'>
                                    <span>
                                        <input name='age'
                                               className='user-page-userInfo-form-read'
                                               type="number"
                                               id={this.inputId.age}
                                               value={this.props.userInfo.age.content}
                                               onChange={(event) => {
                                                   this.handleChange(event, this.inputId.age, this.typesOfRegexp.age)
                                               }}
                                               readOnly
                                               onClick={this.onInfoClick}/>
                                   </span><span id='user-page-user-age-title'> years</span>
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
