// import '../../node_modules/jquery/dist/jquery.min'
import $ from 'jquery'

class UsersDataRequests {


    static signUpReq(newUser) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3010/save-new-user",
            data: newUser
        })
            .done(res => {
            console.log('Good: ' + res);
            }).fail(err => {
            console.log('Bad: ' + err);
        })
    }

}

export default UsersDataRequests;