import endPointsList from './endPointsList'
import axios from 'axios';

class FriendsRequests {


    static addFriend(friendId) {
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.addFriend}`, {...token, friendId: friendId})
            .then(res => {
                console.log('success, it is added');
                console.log(res.data);

            })
    }

    static removeFriend(friendId){
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.removeFriend}`, {...token, friendId: friendId})
            .then(res => {

            })
    }

    static async loadFriendsData(friendsIds) {
        return axios.post(`${endPointsList.serverUrl}${endPointsList.loadFriendsData}`, friendsIds)
            .then(res => {
                return res.data;
            });
    }
}

export default FriendsRequests;
