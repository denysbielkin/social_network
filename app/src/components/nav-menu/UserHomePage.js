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

        this.loadUserInfo();

        this.onSignOut = this.onSignOut.bind(this);
        this.onInfoClick = this.onInfoClick.bind(this);
        this.handleSaveInfoClick = this.handleSaveInfoClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const thisInput = {
            content: '',

        };

        thisInput.content = event.target.value;

        this.props.changeUserInfoFormInput({key: event.target.name, value: thisInput});
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
        const readMode = 'user-page-userInfo-form-read';
        const editMode = 'user-page-userInfo-form-edit';

        if (input.className.indexOf(editMode) === -1) {
            input.classList.remove(readMode);
            input.classList.add(editMode);
            input.removeAttribute('readonly');
            this.setState({...this.state, isEdit:true});
            const saveBtnBlock = document.getElementById('save-btn-block');

            if (!document.getElementById('user-page-saveButton')) {
                const saveBtn = document.createElement('input');
                saveBtn.setAttribute('type', 'button');
                saveBtn.setAttribute('id', 'user-page-saveButton');
                saveBtn.setAttribute('value', 'Save');
                saveBtn.classList.add('btn');
                saveBtn.classList.add('btn-primary');
                saveBtnBlock.appendChild(saveBtn);
            }else{
                this.setState({...this.state, isEdit:false});
            }
        }
    }

    saveData(formData){
        
    }

    handleSaveInfoClick() {
        const formData = this.props.userInfo;
        const dataToValidate = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            age: formData.age,
        };
        const isValid = Validations.validateForm(dataToValidate);
        if(isValid){
            this.saveData(formData);
        }
    }


    async loadUserInfo() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const dataToToTo = ['firstName', 'lastName', 'middleName', 'age'];
        dataToToTo.map(key => {
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

        let middleName = '';
        if (this.state.userInfo.middleName) {
            const middleNameValue = `'${this.props.userInfo.middleName.content}'`;
            middleName = (
                <span id='user-page-user-names-first-name'>
                    <input className='user-page-userInfo-form-read' type="text"
                          value={middleNameValue} 
                          onClick={this.onInfoClick}
                          onChange={this.handleChange}
                /> </span>)
        }
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
                                    <div id='user-page-user-avatar'>*photo place*</div>
                                    <div id='save-btn-block' onClick={this.handleSaveInfoClick}></div>
                                    <span><small className='text-muted'>Click on the field which you want to edit</small></span>
                                    <div id='user-page-user-names'>

                                    <span id='user-page-user-names-first-name'>
                                        <input name='firstName'
                                            className='user-page-userInfo-form-read'
                                            type="text"
                                            value={this.props.userInfo.firstName.content}
                                            onClick={this.onInfoClick}
                                            onChange={this.handleChange}
                                        /></span>
                                        {middleName}
                                        <span id='user-page-user-names-last-name'>
                                            <input name='lastName'
                                              className='user-page-userInfo-form-read'
                                              type="text"
                                              value={this.props.userInfo.lastName.content}
                                              onClick={this.onInfoClick}
                                              onChange={this.handleChange}
                                            />

                                        </span>
                                    </div>
                                    <div id='user-page-user-age'>
                                    <span>
                                        <input name='age'
                                               id='user-page-user-age'
                                               className='user-page-userInfo-form-read'
                                               type="number"
                                               value={this.props.userInfo.age.content}
                                               
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
