import $ from 'jquery';
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
                return res.data;
            });
    }

    static async loadAnotherUserInfo(userId) {
    console.log('userId')
    console.log(userId)
        return axios.post(`${endPointsList.serverUrl}${endPointsList.loadAnotherUserPage}`, {userId:userId} )
            .then(res => {
                return res.data;
            });
    }



    static updateUserInfo(newData){
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.updateUserInfo}`, {...newData, token})
            .then(res => {
                if(res.data.status){
                    return {show:false};
                }else{
                    return res.data;
                }

            });
    }
    static async loadUsersForSearch(searchData){
        return axios.post(`${endPointsList.serverUrl}${endPointsList.loadUsersForSearch}`, {name:searchData})
            .then(res => {
                    return res.data;
            });
    }
}

export default UsersDataRequests;
