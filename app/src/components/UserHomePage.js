import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UsersDataRequests from '../common/UsersDataRequests'
import endPointsList from '../common/endPointsList';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

class UserHomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn:true
        };
       // this.isLoggedIn = false;
    }









     isTokenGood() {
       // const checkToken = await UsersDataRequests.isTokenExist(endPointsList.myPage);
        const checkToken = localStorage.getItem('auth-tok');
       // if(checkToken)
        if (checkToken) {
            // console.log(1213);
            // delete checkToken.isTokenGood;
             this.setState({isLoggedIn:true});
           // return true;
        } else {
            this.setState({isLoggedIn:false});
            //return false;
        }
        //console.log(checkToken);
        //return checkToken;
    }

    onSignOut(){
       localStorage.removeItem('auth-tok');

       return (<Redirect to='/' />);
    }
    componentWillMount(){
        this.isTokenGood();
    }

     render() {

        //  return (<div></div>)
       // if (this.isTokenGood()) {
       // console.log(this.state.userInfo);

        if(this.state.isLoggedIn){

            return (
                <div>
                <div id='wrapper'>
                <div id='sign-out-btn-block'>
                    <button onClick={this.onSignOut}>Sign out</button>
                </div>
                    <div id='user-page'>
                        <div className='user-page-data-block'>
                            <p>My name is {this.state.firstName}</p>
                        </div>
                    </div>

                </div>
            </div>
            );

        } else {
            console.log('ELSE');
            return (
                <Redirect to='/'/>
            )
        }
    }


}

export default UserHomePage;