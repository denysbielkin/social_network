import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NavigateMenu from './NavigateMenu';
import FriendsRequests from "../../common/FriendsRequests";
import UsersDataRequests from "../../common/UsersDataRequests";
import endPointsList from "../../common/endPointsList";

class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendsInfo: {}
        };

        this.loadFriendsDataFromDb();
    }

    async loadFriendsDataFromDb() {
        const userInfo = await UsersDataRequests.loadUserInfo();
        const friendsInfo = await FriendsRequests.loadFriendsData(userInfo.friendsList);
        this.setState({...this.state, userInfo, friendsInfo});
    }

    loadFriendsInfo() {
        let friendsInfo = [];

        for (let i in this.state.friendsInfo) {

            friendsInfo.push(
                <div className='user-page-my-friends-data-block'>
                    <NavLink key={i}
                             to={(endPointsList.anotherUserPage.replace(':userId', this.state.friendsInfo[i].userId))}>
                        <div><img className='user-page-my-friends-data-block-avatar' src={this.state.friendsInfo[i].photo}
                                  alt="photo"/></div>
                        <h5><span>{this.state.friendsInfo[i].firstName} {this.state.friendsInfo[i].middleName}  {this.state.friendsInfo[i].lastName}</span></h5>
                    </NavLink>
                    <div><span>{this.state.friendsInfo[i].age} <small>years</small></span></div>
                    <div><span>Gender: {this.state.friendsInfo[i].gender}</span></div>
                </div>
            );
        }
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

export default Friends;
