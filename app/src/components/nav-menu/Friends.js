import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NavigateMenu from './NavigateMenu';
import FriendsRequests from "../../common/FriendsRequests";
import UsersDataRequests from "../../common/UsersDataRequests";
import endPointsList from "../../common/endPointsList";
import {connect} from "react-redux";

class Friends extends Component {

    constructor(props) {
        super(props);
        this.loadFriendsDataFromDb();
    }

    printFriendBtn(index) {
        return (
            <button className='btn btn-danger'
                    onClick={() => this.props.removeFriend({userId: this.props.friendsInfo[index].userId})}>Remove from
                Friendlist</button>
            );
    }

    async loadFriendsDataFromDb() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const friendsInfo = await FriendsRequests.loadFriendsData(userInfo.friendsList);
        this.props.initFriendsList(friendsInfo);
    }

    loadFriendsInfo() {
        const friendsInfo = [];

        if(!this.props.friendsInfo.length) {
            return '';
        }

        this.props.friendsInfo.map((friend, i) => {
            friendsInfo.push(
                <div className='user-page-my-friends-data-block'>
                    <NavLink key={i}
                             to={(endPointsList.anotherUserPage.replace(':userId', friend.userId))}>
                        <div><img className='user-page-my-friends-data-block-avatar' src={friend.photo}
                                  alt="photo"/></div>
                        <h5><span>{friend.firstName} {friend.middleName}  {friend.lastName}</span></h5>
                    </NavLink>
                    <div><span>{friend.age} <small>years</small></span></div>
                    <div><span>Gender: {friend.gender}</span></div>
                    <div>{this.printFriendBtn(i)}</div>
                </div>
            );
        });

        return friendsInfo;
    }

    render() {
        return (
            <div>
                <div id='wrapper'>
                    <div id='friends-page-display-flex'>
                        <NavigateMenu/>
                        <div className='friends-page-content'>
                            {this.loadFriendsInfo()}
                        </div>
                    </div>
                </div>

            </div>)
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
        removeFriend: (payload) => dispatch({
            type: 'REMOVE_FRIEND',
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
)(Friends);
