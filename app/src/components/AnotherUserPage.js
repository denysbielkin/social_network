import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import UsersDataRequests from '../common/UsersDataRequests';
import endPointsList from '../common/endPointsList';
import NavigateMenu from './nav-menu/NavigateMenu';
import Alerts from './Alerts';
import FriendsRequests from "../common/FriendsRequests";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {connect} from "react-redux";


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

    async loadFriendsDataFromDb() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const friendsInfo = await FriendsRequests.loadFriendsData(userInfo.friendsList);
        this.props.initFriendsList(friendsInfo);
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
        const friendsInfo = await FriendsRequests.loadFriendsData(userInfo.friendsList);
        this.setState({...this.state, userInfo, friendsInfo});
    }

    componentWillMount() {
        this.isTokenGood();
        this.loadFriendsDataFromDb();
    }


    printFriendBtn() {
        const typeOfBtn = this.checkFriendsList();

        let btn = [];
       if (typeOfBtn.remove) {
            btn = (
                <button className='btn btn-danger'
                        onClick={() => this.props.removeFriend({userId: this.state.userInfo.userId})}>Remove from
                    Friendlist</button>
            );
        } else if (typeOfBtn.add) {
            btn = (
                <button className='btn btn-success'
                        onClick={() => this.props.addFriend({userId: this.state.userInfo.userId})}>Add as
                    Friend</button>
            );
        }
        return btn;
    }

    checkFriendsList() {
        const typeOfBtn = {
            add: false,
            remove: false
        };

        for (let i in this.props.friendsInfo) {
            if (this.props.friendsInfo[i].userId === this.state.userInfo.userId) {
                typeOfBtn.remove = true;
                return typeOfBtn;
            }
        }
        //else=>
        if (!typeOfBtn.remove) {
            typeOfBtn.add = true;
            return typeOfBtn;
        }

    }

    loadFriendsInfo() {
        let friendsInfo = [];

        let counter = 0;
        const maxValue = 4;
        for (let i in this.state.friendsInfo) {

            if (counter === maxValue) {
                break;
            }
            friendsInfo.push(
                <div className='user-page-friends-data-block'>
                    <NavLink key={i}
                             to={(endPointsList.anotherUserPage.replace(':userId', this.state.friendsInfo[i].userId))}>
                        <div onClick={() => window.location.reload()}>
                            <div>
                                <img className='user-page-friends-data-block-avatar' src={this.state.friendsInfo[i].photo}
                                      alt=""/>
                            </div>
                            <h5>
                                <span>{this.state.friendsInfo[i].firstName} {this.state.friendsInfo[i].lastName}</span>
                            </h5>
                        </div>
                    </NavLink>
                </div>
            );
            counter++;
        }
        return friendsInfo;
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <div>
                    <Redirect to={endPointsList.signIn}/>
                </div>
            )
        }

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
                                <div>
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
                                    <h5 id={this.inputId.gender}>Gender: {this.state.userInfo.gender}</h5>
                                    {this.printFriendBtn()}
                                </div>
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
        alert: state.alert,
        friendsInfo: state.friends
    }
};

const mapDispatchToProps = dispatch => {

    return {
        showAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        }),
        removeFriend: (payload) => dispatch({
            type: 'REMOVE_FRIEND',
            payload
        }),
        addFriend: (payload) => dispatch({
            type: 'ADD_FRIEND',
            payload
        }),
        initFriendsList: (payload) => dispatch({
            type: 'INIT_FRIENDS_LIST',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnotherUserPage)