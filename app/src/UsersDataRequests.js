// import '../../node_modules/jquery/dist/jquery.min'
import $ from 'jquery'
import Alerts from './Alerts'

class UsersDataRequests {


    static signUpReq(newUser) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3010/save-new-user",
            data: newUser
        })
            .done(res => {
                $('#sign-up-block').toggle(1000);
               // Alerts.initAlert(res, 'success')
            })
            .fail(res => {
               // Alerts.initAlert(res, 'fail');
            })
            .always(res => {
                console.log('[Just for test] Server said: ' + res)
            })
    }

}

export default UsersDataRequests;