import FriendsRequests from '../common/FriendsRequests';
const initialState = [];

const friendReducer = (state = initialState , {type, payload}) => {
    switch (type) {
        case 'INIT_FRIENDS_LIST':
            return [...payload];
        case 'REMOVE_FRIEND':
            FriendsRequests.removeFriend(payload.userId);
            const newState = state.filter(item => item.userId !== payload.userId);
            return [...newState];
        case 'ADD_FRIEND':
            FriendsRequests.addFriend(payload.userId);
            return [...state, {userId: payload.userId}];
        default:
            return [...state];
    }
};

export default friendReducer;