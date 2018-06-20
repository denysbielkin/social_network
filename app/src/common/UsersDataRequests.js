import $ from 'jquery'
import axios from 'axios';

class UsersDataRequests {

    static signUpReq(newUser) {
        return axios.post("http://localhost:3010/save-new-user", newUser)
            .then((res)=> {
                if (res.data.indexOf('Congrats') !== -1) {
                    $('#formBlock').hide(1000);
                    return {status: 'success', message: res.data};

                } else if (res.data.indexOf('exist') !==-1) {
                    return {status: 'danger', message: res.data};                }
            });
    }
    static signInReq(user) {
        return axios.post("http://localhost:3010/checking-auth-of-user", user)
            .then((res)=> {
                if (res.data.indexOf('exist') !== -1) {
                    $('#sign-up-block').hide(1000);
                    return {status: 'success', message: res.data};

                } else {
                    return {status: 'danger', message: res.data};                }
            });
    }

}

export default UsersDataRequests;