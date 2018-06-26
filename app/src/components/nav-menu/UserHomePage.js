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
            isLoggedIn: true
        };
        this.onSignOut=this.onSignOut.bind(this);
        // this.isLoggedIn = false;
    }


    isTokenGood() {
        // const checkToken = await UsersDataRequests.isTokenExist(endPointsList.myPage);
        const checkToken = localStorage.getItem('auth-tok');

        if (checkToken) {

            this.setState({isLoggedIn: true});

        } else {
            this.setState({isLoggedIn: false});

        }

    }

    onSignOut() {
        localStorage.removeItem('auth-tok');
        this.setState({isLoggedIn: false});
        //make redux action
        //<Redirect to='/' />;
    }

    componentWillMount() {
        this.isTokenGood();
    }

    render() {

        //  return (<div></div>)
        // if (this.isTokenGood()) {
        // console.log(this.state.userInfo);

        if (!this.state.isLoggedIn) {

            return (
                <div>
                    <Redirect to={endPointsList.signIn} />
                </div>
            )
        }

        return (
            <div>

                <div id='wrapper'>

                    <div id='page-content'>
                        <div>

                            <NavigateMenu/>
                            <button id='sign-out-btn' className='btn btn-outline-danger' onClick={this.onSignOut}>SIGN OUT</button>
                        </div>
                        <div id='sign-out-btn-block'>

                        </div>
                        <div id='user-page'>
                            <div className='user-page-data-block'>
                                <p>Some blah-blah text {this.state.firstName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );


    }


}

export default UserHomePage;