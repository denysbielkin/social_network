import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Friends from '../common/Friends';

const endPoints = require('../../src/common/endPointsList');

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }
     addFriend(index){
        let btnValue='Add as Friend';

        const btn = (
            <button className='btn btn-success' onClick={ ()=>Friends.addFriend(this.props.result[index].userId)}>{btnValue}</button>
        );
        return btn;
    }

    generateResults() {
        let result = [];

        for (let i in this.props.result) {
            result.push(
                <div className='search-result-block'>
                    <div className='search-page-btns-block'>
                        <div className='user-search-user-avatar-block'>
                            <img className='user-search-user-avatar' src={this.props.result[i].photo}
                                 alt="photo"/>
                        </div>
                        <div className='search-page-addFriend-btn-block'>
                            {this.addFriend(i)}
                        </div>
                    </div>
                    <div>
                        <NavLink key={i}
                                 to={(endPoints.anotherUserPage.replace(':userId', this.props.result[i].userId))}>
                            <h5>
                                <span>{this.props.result[i].firstName} {this.props.result[i].middleName} {this.props.result[i].lastName}</span>
                            </h5></NavLink>
                    </div>
                    <div><p>{this.props.result[i].age} years</p></div>
                    <div><p>Gender: {this.props.result[i].gender}</p></div>
                    <div><p>{this.props.result[i].email}</p></div>
                </div>
            );
        }
        return (result);
    }

    render() {
        return (
            <div>
                <div>{this.generateResults()}</div>
            </div>
        )
    }
}

export default SearchResults;