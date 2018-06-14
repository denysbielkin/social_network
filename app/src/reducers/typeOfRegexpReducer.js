import Validations from "../Validations";

const typeOfRegexpReducer = (thisInput, typeOfRegexp) => {
    switch (typeOfRegexp) {
        case 'name':
            return Validations.regexpName(thisInput);
        case 'email':
            return Validations.regexpEmail(thisInput);
        case 'gender':
            return Validations.regexpGender(thisInput);
        case 'age':
            return Validations.regExpAge(thisInput);
        default:
            return thisInput;
        // console.log('ThisInput: ', thisInput, validationFlag);
    }
};

export default typeOfRegexpReducer;
