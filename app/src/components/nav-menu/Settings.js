import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NavigateMenu from './NavigateMenu';
import UsersDataRequests from "../../common/UsersDataRequests";
import endPointsList from "../../common/endPointsList";
import {connect} from "react-redux";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.loadUserEmail()
    }

    async loadUserEmail() {
        const email = await UsersDataRequests.loadUserEmail;

        this.props.changeUserInfoEmail({key:'email', value:email});
    }

    handleChange(event, typeOfRegExp) {

    }
    handleSaveButton(){

    }


    render() {
        return (
            <div>
                <div id='wrapper'>
                    <div id='settings-page-display-flex'>
                        <NavigateMenu/>
                        <div id='settings-page-content'>

                            <div><input id='save-btn-settings' type="button" className='btn btn-primary' value='Save'/></div>

                            <div>
                                <h4>Change email</h4>
                                <input name='email'
                                       className='form-control'
                                       type="email"
                                       id='settings-email-input'
                                       value={this.state.email}
                                       onChange={(event) => {
                                           this.handleChange(event, 'email');
                                       }}
                                />
                            </div>
                            <div>

                                <h4>Change password</h4>

                                <h5 className='settings-tittles'>Old password</h5>
                                <input name='oldPassword'
                                       className='form-control'
                                       type="password"
                                       id='settings-oldPassword-input'
                                    // value={this.state.oldPassword}
                                       onChange={(event) => {
                                           this.handleChange(event, 'oldPassword');
                                       }}
                                />
                                <h5 className='settings-tittles'>New password</h5>
                                <input name='newPassword'
                                       className='form-control'
                                       type="password"
                                       id='settings-newPassword-input'
                                    // value={this.state.oldPassword}
                                       onChange={(event) => {
                                           this.handleChange(event, 'newPassword');
                                       }}
                                />
                                <h5 className='settings-tittles'>New password confirm</h5>
                                <input name='newPasswordConfirm'
                                       className='form-control'
                                       type="password"
                                       id='settings-newPasswordConfirm-input'
                                    // value={this.state.oldPassword}
                                       onChange={(event) => {
                                           this.handleChange(event, 'newPasswordConfirm');
                                       }}
                                />
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
        settingsInfo: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfoEmail: (payload) => dispatch({
            type: 'CHANGE_USER_INFO_EMAIL',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)

//export default Settings;
