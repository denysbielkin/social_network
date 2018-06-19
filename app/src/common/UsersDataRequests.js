import $ from 'jquery'
import axios from 'axios';

class UsersDataRequests {

    static signUpReq(newUser) {
        return axios.post("http://localhost:3010/save-new-user", newUser)
            .then(function(res) {
                if (res.data === 'Account has been created! Congrats!') {
                    $('#signUpBlock').hide(1000);
                    // Alert
                    console.log({status: 'success', message: res.data});
                    return {status: 'success', message: res.data};

                } else if (res.data === 'This user already exist') {
                    return {status: 'danger', message: res.data};                }
            });
    }

}

export default UsersDataRequests;