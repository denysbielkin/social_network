import $ from 'jquery'
import axios from 'axios';

class UsersDataRequests {

    static signUpReq(newUser) {
        return axios.post("http://localhost:3010/save-new-user", newUser)
            .then((res) => {
                const alertSettings = res.data;
                if (alertSettings.type === 'success') {
                    $('#sign-up-block').hide(1000);
                }
                return alertSettings;
            });
    }

    static signInReq(user) {
        console.log('email1: ' + user.email,'password1:' + user.password);
            return axios.post("http://localhost:3010/checking-auth-of-user", user)
                .then((res) => {
                    const myTok = res.data.token;
                    console.log(myTok);
                    localStorage.setItem('auth-tok', myTok);
                  return res.data;

                });
        }


}

export default UsersDataRequests;