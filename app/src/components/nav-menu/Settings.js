import React, {Component} from 'react';
import NavigateMenu from './NavigateMenu';
import {Redirect} from 'react-router-dom';

import UsersDataRequests from "../../common/UsersDataRequests";
import {connect} from "react-redux";
import SettingsRequests from "../../common/SettingsRequests";
import Alerts from '../Alerts';
import endPointsList from "../../common/endPointsList";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoggedIn: true
        };

        this.loadUserEmail()
    }

    async loadUserEmail() {
        const email = await UsersDataRequests.loadUserEmail;

        this.props.changeUserInfoEmail({key:'email', value:email});
    }

    async generatePassword() {
        const alert = await SettingsRequests.generatePassword();
        this.props.showAlert(alert);
    };

    onSignOut() {
        localStorage.removeItem('auth-tok');
        localStorage.removeItem('userId');
        this.setState({...this.state, isLoggedIn: false});
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
                    <div id='settings-page-display-flex'>
                        <NavigateMenu/>
                        <div id='settings-page-content'>
                            <div>

                                <button className="btn btn-warning" onClick={() => this.generatePassword()}>Generate new password</button>
                                <br />
                                <br />
                                <br />
                                <button className="btn btn-danger" onClick={() => this.onSignOut()}>Sign out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        settingsInfo: state,
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfoEmail: (payload) => dispatch({
            type: 'CHANGE_USER_INFO_EMAIL',
            payload
        }),
        showAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)

//export default Settings;
