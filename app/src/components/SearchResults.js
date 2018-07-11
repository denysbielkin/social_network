import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import FriendsRequests from '../common/FriendsRequests';
import Alerts from './Alerts'

import endPointsList from '../../src/common/endPointsList';
import {connect} from "react-redux";

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }

    printFriendBtn(index) {

        // const typeOfBtn = this.checkFriendsList(index);
        //
        // let btn = [];
        // if (typeOfBtn.nothing) {
        //     btn = (
        //         <div></div>
        //     );
        // } else if (typeOfBtn.remove) {
        //     btn = (
        //         <button className='btn btn-danger'
        //                 onClick={() => FriendsRequests.removeFriend(this.props.result[index].userId)}>Remove from
        //             friendlist</button>
        //     );
        // } else if (typeOfBtn.add) {
        //     btn = (
        //         <button className='btn btn-success'
        //                 onClick={() => FriendsRequests.addFriend(this.props.result[index].userId)}>Add as
        //             Friend</button>
        //     );
        // }
        // return btn;
    }

    checkFriendsList(index) {

        const typeOfBtn = {
            add: false,
            remove: false,
            nothing: false
        };
        if (this.props.result[index].userId === this.props.authorizedUserInfo.userId){
            typeOfBtn.nothing = true;
            return typeOfBtn;
        }
            for (let i in this.props.result[index].friendsList) {
            if (this.props.result[index].friendsList[i] === this.props.authorizedUserInfo.userId) {
                typeOfBtn.remove = true;
                return typeOfBtn;

            } else {

            }
        }

        // let typeOfBtn = {
        //     remove: false,
        //     add: false,
        //     nothing: false
        // };
        // if (result.isFriend) {
        //     typeOfBtn.remove = true;
        // } else if (result.isItMe) {
        //     typeOfBtn.nothing = true;
        // } else {
        //     typeOfBtn.add = true;
        // }
        //
        //
        // return typeOfBtn;
    }

    //checkFriend(index){

    // const isFriend = result.isFriend;

    //const isItMe = result.isItMe;

    // }

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
                            {/*{this.printFriendBtn(i)}*/}
                        </div>
                    </div>
                    <div>
                        <NavLink key={i}
                                 to={(endPointsList.anotherUserPage.replace(':userId', this.props.result[i].userId))}>
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
                <div><h4>No results</h4></div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch => {

    return {

        showAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);