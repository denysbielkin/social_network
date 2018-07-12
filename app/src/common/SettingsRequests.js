import axios from 'axios';
import endPointsList from './endPointsList'

class SettingsRequests {
    static generatePassword() {
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.generatePassword}`, { token})
            .then(res => {
                return res.data;
            });
    }
}

export default SettingsRequests;
