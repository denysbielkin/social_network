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

    static isTokenExist(currentPage) {
        const token = localStorage.getItem('auth-tok');
        if (!token) {
            return false;
        } else {
            return axios.post(`${endPointsList.serverUrl}${currentPage}`, token)
                .then(res => {
                    const userData = res.data;

                    return {userData, isTokenGood:true };
                });
        }

    }


}

export default UsersDataRequests;