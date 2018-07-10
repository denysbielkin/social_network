import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UsersDataRequests from '../common/UsersDataRequests';
import endPointsList from '../common/endPointsList';
import NavigateMenu from './nav-menu/NavigateMenu';
import Alerts from './Alerts';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import Friends from "../common/Friends";

class AnotherUserPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPhotoEditModal: false,
            isLoggedIn: true,
            isNeedUserInfo: true,
            userInfo: {},
            formattedUserInfo: ''
        };

        this.inputId = {
            firstName: 'another-user-page-user-names-first-name-input',
            middleName: 'another-user-page-user-names-middle-name-input',
            lastName: 'another-user-page-user-names-last-name-input',
            age: 'another-user-page-user-age',
            photo: 'another-user-page-user-avatar',
            email: 'another-user-page-user-email',

        };

        this.loadUserInfo();
    }

    isTokenGood() {
        const checkToken = localStorage.getItem('auth-tok');
        if (checkToken) {
            this.setState({...this.state, isLoggedIn: true});
        } else {
            this.setState({...this.state, isLoggedIn: false});
        }
    }

    async loadUserInfo() {
        const userInfo = await UsersDataRequests.loadAnotherUserInfo(this.props.match.params.userId);
        this.setState({...this.state, userInfo});
    }

    componentWillMount() {
        this.isTokenGood();
    }

    addFriend(){
        let btnValue='Add as Friend';
        const btn = (
            <input type="button" className='btn btn-success'
                   onClick={ ()=>Friends.addFriend(this.state.userInfo.userId)} value={btnValue} />
        );
        return btn;
    }
    render() {
        if (!this.state.isLoggedIn) {
            return (
                <div>
                    <Redirect to={endPointsList.signIn}/>
                </div>
            )
        }
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
                                        <img id={this.inputId.photo} src={this.state.userInfo.photo}
                                             alt="photo"/>
                                    </div>
                                    <div id='user-page-user-names'>
                                        <h3>
                                            <span>
                                                {this.state.userInfo.firstName} {this.state.userInfo.middleName} {this.state.userInfo.lastName}
                                            </span>
                                        </h3>
                                    </div>
                                    <div id='user-page-user-age-block'>
                                        <h5 id={this.inputId.age}>{this.state.userInfo.age}<span
                                            id='user-page-user-age-title'> years</span></h5>
                                    </div>
                                    <h5 id={this.inputId.email}>{this.state.userInfo.email}</h5>
                                    <h5 id={this.inputId.gender}>{this.state.userInfo.gender}</h5>
                                    {this.addFriend()}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AnotherUserPage;
