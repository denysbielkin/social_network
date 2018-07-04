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
        return axios.post(`${endPointsList.serverUrl}${endPointsList.checkingAuthOfUser}`, user)
            .then(res => {
                const myTok = res.data.token;
                localStorage.setItem('auth-tok', myTok);
                return res.data;

            });
    }

    static async loadUserInfo() {
        const token = {token: localStorage.getItem('auth-tok')};

        return axios.post(`${endPointsList.serverUrl}${endPointsList.loadUserInfo}`, token)
            .then(res => {
                console.log(res.data.photo )

                console.log(res.data.photo )
                return res.data;
            });
    }



    static updateUserInfo(newData){
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.updateUserInfo}`, {...newData, token})
            .then(res => {
                return res.data;
            });
    }
}

export default UsersDataRequests;
