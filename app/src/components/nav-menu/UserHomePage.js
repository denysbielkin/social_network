import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UsersDataRequests from '../../common/UsersDataRequests'
import endPointsList from '../../common/endPointsList';
import NavigateMenu from './NavigateMenu'


import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

class UserHomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            isNeedUserInfo: true,
            userInfo: '',
            formattedUserInfo: ''
        };

        //  this.loadUserInfo=this.loadUserInfo.bind(this)

        this.onSignOut = this.onSignOut.bind(this);
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


    async loadUserInfo() {

        const userInfo = await UsersDataRequests.loadUserInfo();
        console.log(userInfo);

        if (userInfo) {
            this.setState({...this.state, userInfo: userInfo, isNeedUserInfo: false});
            console.log(this.state.userInfo);
            console.log(this.state.userInfo.firstName);
        }
        //
    }

    componentWillMount() {
        this.isTokenGood();


    }

    renderUserInfo() {
//         let allBlocks = [];
//         for (let i of this.state.userInfo) {
// console.log(i);
//             if (this.state.userInfo[i] === 'photo' ){//&& !this.state.userInfo[i] === this.state.userInfo.gender) {
//                 const id = `user-page-infoBlock-input-${this.state.userInfo[i].value}`;
//             allBlocks.push (
//                     <div className="user-page-data">
//                         <input key={i} type="text" className="user-page-infoBlock-input" id={id}
//                                value={this.state.userInfo[i].value.toUpperCase()} readOnly/>
//                     </div>
//                 );
//             }
//
//
//        }
//
//         return (<div>{allBlocks}</div>)


    }

    render() {

        if (!this.state.isLoggedIn) {

            return (
                <div>
                    <Redirect to={endPointsList.signIn}/>
                </div>
            )
        }
        console.log(this.state.userInfo);
        console.log(this.state.isNeedUserInfo);
        if (this.state.isNeedUserInfo) {
            this.loadUserInfo();
            //  this.s.userInfo =

        }
        let middleName = '';
        if (this.state.userInfo.middleName) {
            middleName = (<span id='user-page-user-names-first-name'>'<input className='user-page-form' type="text" value={this.state.userInfo.middleName} readOnly />' </span>)
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

                            {/*{this.renderUserInfo()}*/}

                            <div id='user-page'>


                                <div id='user-page-user-avatar'>*photo place*</div>
                                <div id='user-page-user-names'>
                                    <span id='user-page-user-names-first-name'>  <input className='user-page-form' type="text" value={this.state.userInfo.firstName}   readOnly /></span>
                                    {middleName}
                                    <span id='user-page-user-names-last-name'> <input className='user-page-form' type="text" value={this.state.userInfo.lastName} readOnly /></span>
                                </div>
                                <div id='user-page-user-age'>
                                    <span> <span id='user-page-user-age-title'>Age:</span><input className='user-page-form' type="number" value={this.state.userInfo.age} readOnly /> </span>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );


    }


}

export default UserHomePage;