class Validations {

    static regexpName(name) {
        //console.log(name);
        let pattern = /^[A-Z][a-z]{1,}$/;
        return pattern.test(name);
    };


    static regexpEmail(email) {
        //console.log(email);
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(email).toLowerCase());
    };

    static regexpGender(gender) {
        return gender;
    }
    static regExpAge(age) {
        if( age>=1 && age<=99){
            return age;
        }
    };



}

export default Validations;