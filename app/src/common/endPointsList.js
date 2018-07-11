const saveNewUser ='/save-new-user';
const checkingAuthOfUser = '/checking-auth-of-user';
const myPage = '/home';
const signUp = '/sign-up';
const settings = '/settings';
const friends = '/friends';
const news = '/news';
const search = '/search';
const signIn = '/';
const loadUserInfo = '/load-user-info';
const db = 'mongodb://127.0.0.1:27017/myUsers';
const serverUrl = 'http://localhost:3010';
const checkAccessForPageEdit = '/check-edit-access';
const updateUserInfo = '/update-user-info';
const loadUsersForSearch = '/load-users-for-search';
const loadAnotherUserPage = '/load-another-user-page';
const anotherUserPage = '/another-user-page/:userId';
const checkFriendsList = '/check-friends-list';
const addFriend = '/add-friend';
const removeFriend = '/remove-friend';
const checkIfFriendExist = '/check-if-friend-exist';
const loadFriendsData = '/load-friends-data';
const loadUserEmail = '/load-user-email';

module.exports = {
    saveNewUser,
    checkingAuthOfUser,
    myPage,
    db,
    serverUrl,
    signUp,
    signIn,
    news,
    friends,
    settings,
    search,
    loadUserInfo,
    checkAccessForPageEdit,
    updateUserInfo,
    loadUsersForSearch,
    loadAnotherUserPage,
    anotherUserPage,
    checkFriendsList,
    addFriend,
    removeFriend,
    checkIfFriendExist,
    loadFriendsData,
    loadUserEmail

};
