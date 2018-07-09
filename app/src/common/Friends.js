import endPointsList from './endPointsList'
import axios from 'axios';

class Friends {
    static checkFriendsList() {
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.checkFriendsList}`, token)
            .then(res => {
                return res.data;
            })
    }

    static addFriend(friendId) {
        const token = {token: localStorage.getItem('auth-tok')};
        return axios.post(`${endPointsList.serverUrl}${endPointsList.addFriend}`, {...token, friendId: friendId})
            .then(res => {
                console.log('success');
                console.log(res.data);
                // return Todo alert('success');
            })
    }

    static async loadFriendsData(friendsIds) {
        return axios.post(`${endPointsList.serverUrl}${endPointsList.loadUserInfo}`, friendsIds)
            .then(res => {
                return res.data;
            });
    }
}
export default Friends;
