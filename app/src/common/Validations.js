class Validations {
    constructor() {

    }

    static typeOfRegexp(content, type) {
        switch (type) {
            case 'name':
                return Validations.regexpName(content);
            case 'email':
                return Validations.regexpEmail(content);
            case 'gender':
                return Validations.regexpGender(content);
            case 'age':
                return Validations.regExpAge(content);
        }
    }


    static validateForm(props) {
        for (let i in props) {
            if (props[i] !== props.middleName && !props[i].isValid) {
                return false;
            }

        }

        if (!props.middleName.isValid && !props.middleName.content) {
            return true;
        } else if (!props.middleName.isValid && props.middleName.content) {
            return false;
        } else {
            return true;
        }
    }

    static regexpImage(img) {

        const imgPath = img.value;
        const validImageExtensions = /(\.jpg|\.jpeg|\.png|\.bmp)$/i;
        const minSize = 40000;
        const maxSize = 5120000;

        if (!validImageExtensions.exec(imgPath)) {
            console.log('bad file');
            return false;
        } else {

            if (img.files && img.files[0]) {
                if (img.files[0].size >= minSize && img.files[0].size <= maxSize) {
                    return true;
                } else {
                    console.log('invalid size');
                }


            }
        }

    }

    static regexpName(name) {
        let pattern = /^[A-Z][a-z]{1,32}$/;
        return pattern.test(name);
    };


    static regexpEmail(email) {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(email).toLowerCase());
    };

    static regexpGender(gender) {
        if (gender) {
            return true;
        }
    }

    static regExpAge(age) {
        const minAge = 1;
        const maxAge = 99;
        if (age >= minAge && age <= maxAge) {
            return true;
        }
    };


}

module.exports = {
    Validations: Validations,
};