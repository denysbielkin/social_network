import $ from 'jquery'
import axios from 'axios';
import endPointsList from './endPointsList'

class UsersDataRequests {

    static signUpReq(newUser) {
        return axios.post(`${endPointsList.serverUrl}${endPointsList.saveNewUser}`, newUser)
            .then((res) => {
                const alertSettings = res.data;
                if (alertSettings.type === 'success') {
                    $('#sign-up-block').hide(1000);

                }
                return alertSettings;
            });
    }

    static signInReq(user) {
        //console.log('email1: ' + user.email,'password1:' + user.password);
        console.log(user);
        return axios.post(`${endPointsList.serverUrl}${endPointsList.checkingAuthOfUser}`, user)
            .then(res => {
                const myTok = res.data.token;
                console.log(user);
                console.log(myTok);
                localStorage.setItem('auth-tok', myTok);
                return res.data;

            });
    }


    static loadUserInfo() {
        console.log('We are almost in');

        console.log(`${endPointsList.serverUrl}${endPointsList.loadUserInfo}`);
        const token = {token:localStorage.getItem('auth-tok')};
        console.log(token);
        return axios.post(`${endPointsList.serverUrl}${endPointsList.loadUserInfo}`, token)
            .then(res => {
                console.log('We did reach the main goal');
                return res.data;
            });
    }


}

export default UsersDataRequests;