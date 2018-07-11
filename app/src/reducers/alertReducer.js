const initialState = { show: false };

const alertReducer = (state = initialState , {type, payload}) => {
    switch (type) {
        case 'TOGGLE_ALERT':
            return {...state, ...payload};
        default:
            return {...state};
    }
};

export default alertReducer;