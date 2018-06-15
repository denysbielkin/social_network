const initialState = {
    firstName: {
        content: '',
        isValid: false
    },
    lastName: {
        content: '',
        isValid: false
    },
    age: {
        content: '',
        isValid: false
    },
    gender: {
        content: '',
        isValid: false
    },
    email: {
        content: '',
        isValid: false
    },
    photo: {
        content: null,
        isValid: true
    },
    middleName: {
        content: '',
        isValid: false
    }

};

const typeOfRegexpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_REG_FORM_INPUT':
            const key = action.payload.key;
            return {...state, [key]: action.payload.value};
        default:
            return {...state};
    }
};

export default typeOfRegexpReducer;
