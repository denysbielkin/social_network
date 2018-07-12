import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import UsersDataRequests from '../../common/UsersDataRequests';
import endPointsList from '../../common/endPointsList';
import NavigateMenu from './NavigateMenu';
import {Validations} from '../../common/Validations';
import Alerts from '../Alerts';
import FriendsRequests from '../../common/FriendsRequests';

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
            friendsInfo: {},
            formattedUserInfo: ''
        };

        this.inputId = {
            firstName: 'user-page-user-names-first-name-input',
            middleName: 'user-page-user-names-middle-name-input',
            lastName: 'user-page-user-names-last-name-input',
            age: 'user-page-user-age',
            photo: 'user-page-user-avatar',
            gender: 'user-page-user-gender',
        };

        this.typesOfRegexp = {
            name: 'name',
            gender: 'gender',
            age: 'age',
            photo: 'photo'

        };

        this.readMode = 'user-page-userInfo-form-read';
        this.editMode = 'user-page-userInfo-form-edit';
        this.loadUserInfo();
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

    turnIntoReadMode() {
        for (let i in this.inputId) {
            const input = document.getElementById(this.inputId[i]);
            input.classList.remove(this.editMode);
            input.classList.add(this.readMode);
            input.setAttribute('readonly', 'readonly');
            input.blur();
        }
        let saveBtn = document.getElementById('save-btn-block');
        saveBtn.innerHTML = '';

        this.setState({...this.state, isEdit: false});
    }

    async saveData(updatedData) {
        const result = await UsersDataRequests.updateUserInfo(updatedData);
        if (!result.show) {
            this.turnIntoReadMode();
            this.props.showAlert({show:false});
        } else {
            this.props.showAlert(result);
        }
    }

    handlePhoto() {
        this.setState({...this.state, showPhotoEditModal: true});
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
        } else {
            this.props.showAlert({
                show: true,
                type: 'danger',
                tittle: `Invalid form filling!`
            });
        }
    }

    async loadUserInfo() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const friendsInfo = await FriendsRequests.loadFriendsData(userInfo.friendsList);
        const dataToStore = ['firstName', 'middleName', 'lastName', 'age', 'photo', 'gender'];
        dataToStore.map(key => {
            this.props.changeUserInfoFormInput({
                key,
                value: {
                    content: userInfo[key], isValid: true
                }
            });
        });

        this.setState({...this.state, friendsInfo:friendsInfo});
    }
    loadFriendsInfo(){
        let friendsInfo = [];

        let counter = 0;
        const maxValue = 4;
        for( let i in this.state.friendsInfo){

            if(counter===maxValue){
                break;
            }
            friendsInfo.push(

                <div className='user-page-friends-data-block'>
                    <NavLink key={i} to={(endPointsList.anotherUserPage.replace(':userId', this.state.friendsInfo[i].userId))}>
                    <div><img className='user-page-friends-data-block-avatar' src={this.state.friendsInfo[i].photo} alt=""/></div>
                    <h5><span>{this.state.friendsInfo[i].firstName} {this.state.friendsInfo[i].lastName}</span></h5>

                    </NavLink>
                </div>

            );
            counter++;
        }
        return friendsInfo;
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

        return (
            <div>
                <Alerts />
                <div id='wrapper'>
                    <div id='page-content'>
                        <div id='nav-menu-block'>
                            <NavigateMenu/>
                        </div>
                        <div id='user-page-user-friendlist-block' className='user-page-data-block'>
                            <h2>Friends</h2>
                            <div id='user-page-user-friendlist'>
                                {this.loadFriendsInfo()}
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
                                    <div><span>Gender: <span id={this.inputId.gender}>{this.props.userInfo.gender.content}</span></span></div>
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
        userInfo: state.user,
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch => {

    return {
        changeUserInfoFormInput: (payload) => dispatch({
            type: 'CHANGE_USER_INFO_FORM_INPUT',
            payload
        }),
        showAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHomePage)
