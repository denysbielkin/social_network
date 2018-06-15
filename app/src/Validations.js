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

    /*static regexpImage(imgId) {
        const validImageExtensions = /(\.jpg|\.jpeg|\.png|\.bmp)$/i;

        const img = document.getElementById(imgId);
        const fileUploadPath = img.value;
        const imgExtension = fileUploadPath.substring(fileUploadPath.lastIndexOf('.')+1).toLowerCase();
        let extensionFlag=false;
        for(let i in validImageExtensions.length){
            if(validImageExtensions[i]===imgExtension){
                extensionFlag=true;
                break;
            }
        }
        if(!extensionFlag){
            if(img.files===img.files[0]){
                const reader = new FileReader();

               reader.readAsDataURL(img.files[0]);
            }
        }
    }*/

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
        if (age >= 1 && age <= 99) {
            return age;
        }
    };


}

export default Validations;