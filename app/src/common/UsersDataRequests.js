import $ from 'jquery'
import axios from 'axios';

class UsersDataRequests {

    static signUpReq(newUser) {
        return axios.post("http://localhost:3010/save-new-user", newUser)
            .then((res) => {
                const alertSettings = res.data;
                if (alertSettings.type === 'success') {
                    $('#sign-up-block').hide(1000);

                } //else if (alertSettings.type ==='danger') {
                //}

                return alertSettings;
            });
    }

    static signInReq(user) {

            return axios.post("http://localhost:3010/checking-auth-of-user", user)
                .then((res) => {
                  return {one:'123',two:'123321'};

                });
        }


}

export default UsersDataRequests;