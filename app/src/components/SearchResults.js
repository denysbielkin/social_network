import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import FriendsRequests from '../common/FriendsRequests';
import Alerts from './Alerts'

import endPointsList from '../../src/common/endPointsList';
import {connect} from "react-redux";
import UsersDataRequests from "../common/UsersDataRequests";

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.loadFriendsDataFromDb();
    }

    async loadFriendsDataFromDb() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const friendsInfo = await FriendsRequests.loadFriendsData(userInfo.friendsList);
        this.props.initFriendsList(friendsInfo);
    }

    printFriendBtn(index) {
        const typeOfBtn = this.checkFriendsList(index);

        let btn = [];
        if (typeOfBtn.nothing) {
            btn = (
                <div><h5 className='settings-tittles'>It's you</h5></div>
            );
        } else if (typeOfBtn.remove) {
            btn = (
                <button  className='btn btn-danger'
                        onClick={() => this.props.removeFriend({userId: this.props.result[index].userId})}>Remove from
                    Friendlist</button>
            );
        } else if (typeOfBtn.add) {
            btn = (
                <button className='btn btn-success'
                        onClick={() => this.props.addFriend({userId: this.props.result[index].userId})}>Add as
                    Friend</button>
            );
        }
        return btn;
    }

    checkFriendsList(index) {
        const authorizedUserInfo = localStorage.getItem('userId');
        const typeOfBtn = {
            add: false,
            remove: false,
            nothing: false
        };
        if (this.props.result[index].userId === authorizedUserInfo) {
            typeOfBtn.nothing = true;
            return typeOfBtn;
        }
        for (let i in this.props.friendsInfo) {
            if (this.props.friendsInfo[i].userId === this.props.result[index].userId) {
                typeOfBtn.remove = true;
                return typeOfBtn;
            }
        }
        //else=>
        if (!(typeOfBtn.nothing || typeOfBtn.remove)) {
            typeOfBtn.add = true;
            return typeOfBtn;
        }

    }

    pageLink(index) {
        const authorizedUserId = localStorage.getItem('userId');
        if (this.props.result[index].userId === authorizedUserId) {
            return (endPointsList.myPage);
        } else {
            return (endPointsList.anotherUserPage.replace(':userId', this.props.result[index].userId));
        }
    }

    generateResults() {
        let result = [];
        for (let i in this.props.result) {
            result.push(
                (<div className='search-result-block' key={i}>
                    <div className='search-page-btns-block'>
                        <div className='user-search-user-avatar-block'>
                            <img className='user-search-user-avatar' src={this.props.result[i].photo}
                                 alt="photo"/>
                        </div>
                        <div className='search-page-addFriend-btn-block'>
                            {this.printFriendBtn(i)}
                        </div>
                    </div>
                    <div>
                        <NavLink key={i}
                                 to={this.pageLink(i)}>
                            <h5>
                                <span>{this.props.result[i].firstName} {this.props.result[i].middleName} {this.props.result[i].lastName}</span>
                            </h5></NavLink>
                    </div>
                    <div>
                        <p>{this.props.result[i].age}
                            <small>years</small>
                        </p>
                    </div>
                    <div><p>Gender: {this.props.result[i].gender}</p></div>
                    <div><p>{this.props.result[i].email}</p></div>
                </div>)
            );
        }
        return (result);
    }

    render() {
        if (this.props.result.length) {
            return (
                <div>
                    <Alerts/>
                    <div>{this.generateResults()}</div>
                </div>
            )
        } else {
            return (
                <div id='search-noResults'><h4>No results</h4></div>
            )
        }
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
)(SearchResults);