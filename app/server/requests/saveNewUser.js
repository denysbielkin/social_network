const {Validations} = require("../../src/common/Validations.js");
const pswHash = require('password-hash');
const {passwordGenerator} = require ('../functions');
const endPoints = require('../../src/common/endPointsList');

const mongodb = require('mongodb').MongoClient;
const socialNetworkDb = 'socialNetwork';
const usersCollection = 'users';

const saveNewUser = (req, res) => {
    const params = req.body;
    const validationFlag = Validations.validateForm(params);

    if (validationFlag) {
        const plainPassword = passwordGenerator();
        const password = pswHash.generate(plainPassword);

        const userInfo = {
            firstName: params.firstName.content,
            lastName: params.lastName.content,
            middleName: params.middleName.content,
            email: params.email.content,
            gender: params.gender.content,
            age: params.age.content,
            photo: params.photo.content,
            password
        };

        mongodb.connect(endPoints.db, (err, db) => {
            const myDb = db.db(socialNetworkDb);
            const myCollection = myDb.collection(usersCollection);
            myCollection.findOne({email: userInfo.email}, (err, result) => {
                try {
                    if (err) {
                        throw new Error(`Error is somewhere in sign up: ${err}`);
                    }
                } catch (err) {
                    console.log(err);
                }

                let dataToSend;
                if (result === null) {
                    console.log('No results');
                    myCollection.insertOne(userInfo, (err, result) => {
                        try {
                            if (err) {
                                throw new Error(`Error is somewhere in adding new user:  ${err}`);
                            }
                        } catch (err) {
                            console.log(err);
                        }

                        dataToSend = {
                            show: true,
                            type: 'success',
                            tittle: `Account has been created successfully! Congrats! Take your password:  ${plainPassword}`

                        };
                        res.send(200, dataToSend);
                    });
                } else {
                    dataToSend = {
                        show: true,
                        type: 'danger',
                        tittle: 'Fail! This user is already exist'

                    };
                    res.send(200, dataToSend);
                }

                db.close();
            });
        });

    } else {
        res.send(200, ':Data is not valid!:');
    }
};

module.exports =  {saveNewUser};
