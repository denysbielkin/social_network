const {Validations} = require("../src/common/Validations.js");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const endPoints = require('../src/common/endPointsList');


//const insertUserInDb = require('./db/insertUser');
const pswHash = require('password-hash');
const socialNetworkDb = 'socialNetwork';
const usersCollection = 'users';

app.use(cors());//todo: use proxy instead of cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const passwordGenerator = () => {
    const max = 20;
    const min = 15;
    const length = Math.random() * (max - min) + min;
    const string = "abcdefghijklmnopqrstuvwxyz";
    const numeric = '0123456789';
    const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let password = "";
    let character = "";
    while (password.length < length) {
        let entity1 = Math.ceil(string.length * Math.random() * Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        let entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        let hold = string.charAt(entity1);
        hold = (entity1 % 2 === 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    return password;
};
//const signUpEndPoint = '/sign-up';

app.post(endPoints.saveNewUser, (req, res) => {
    const params = req.body;
    const validationFlag = Validations.validateForm(params);

    if (validationFlag) {
        const notHPassword = passwordGenerator();
        const password = pswHash.generate(notHPassword);

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
                        throw new Error('Error is somewhere in sign up: ' + err);
                    }
                } catch (err) {
                    console.log(err);
                }

                let dataToSend;
                if (result === null) {
                    console.log('No results');
                    myCollection.insertOne(userInfo, (err, result) => {
                        //todo: m8 move forward by 1 code-block content of this func
                        try {
                            if (err) {
                                throw new Error('Error is somewhere in adding new user: ' + err);
                            }
                        } catch (err) {
                            console.log(err);
                        }

                        dataToSend = {
                            show: true,
                            type: 'success',
                            tittle: 'Account has been created successfully! Congrats! Take your password: ' + notHPassword

                        };
                        res.send(200, dataToSend);
                    });
                } else {
                    dataToSend = {
                        show: true,
                        type: 'danger',
                        tittle: 'Fail! This user is already exist'

                    };
                    //res.data=dataToSend;
                    res.send(200, dataToSend);
                }

                db.close();
            });


        });

        //todo instead of code above this   //insertUserInDb.insertUserInDb(res, notHPassword, userInfo);

    } else {
        console.log(':Data is not valid!:');
        res.send(200, ':Data is not valid!:');
    }


});

app.post(endPoints.checkingAuthOfUser, (req, res) => {
    const params = req.body;
    const userInfo = {
        email: params.email,
        password: params.password
    };

    mongodb.connect(endPoints.db, (err, db) => {

        const myDb = db.db(socialNetworkDb);
        const myCollection = myDb.collection(usersCollection);

        myCollection.findOne({email: userInfo.email}, (err, result) => {
            const hashFlag = pswHash.verify(userInfo.password, result.password);
            try {
                if (err) {
                    throw new Error('Error is somewhere in auth: ' + err);
                }
            } catch (err) {
                console.log(err);
            }

            let dataToSend;
            if (!result) {
                dataToSend = {
                    show: true,
                    type: 'danger',
                    tittle: `Fail! We haven't this user`
                };
                res.send(200, dataToSend);
            } else {


                if (userInfo.email === result.email) {
                    console.log('12123');

                    console.log(hashFlag);
                    if (!hashFlag) {
                        console.log('223');


                        dataToSend = {
                            show: true,
                            type: 'danger',
                            tittle: 'Fail! Wrong password'
                        };
                        //todo localstorage only 3 times you can try to sign in
                        res.send(200, dataToSend);
                        // let counter=1;
                        //
                        // return ()=>{
                        //     counter++;
                        //     counter=String(counter);
                        //     localStorage.setItem('Login tries', counter);
                        //    return counter = Number(counter);
                        // };


                    } else {
                        const token = jwt.sign({id: userInfo.email}, 'auth-user', {
                            expiresIn: 86400 // 24h
                        });
                        console.log(token);
                        dataToSend = {
                            show: true,
                            type: 'success',
                            tittle: 'Congrats! You are in',
                            token
                        };
                        myCollection.update({email: result.email}, {...result, token});

                        res.send(200, dataToSend);
                    }
                }
            }
            db.close();
        });


    });
});

app.post(endPoints.loadUserInfo, (req, res) => {
    console.log('We are in');
    const params = req.body;
    const token = params.token;
    console.log(token);
    mongodb.connect(endPoints.db, (err, db) => {
        console.log('in mongodb');
        console.log(token);
        const myDb = db.db(socialNetworkDb);
        const myCollection = myDb.collection(usersCollection);

        myCollection.findOne({token}, (err, result) => {
            console.log('token in findOne');
            console.log(token);


            try {
                if (err) {
                    throw new Error('Error is somewhere in checking token: ' + err);
                }
            } catch (err) {
                console.log(err);
            }
            if (result) {
                console.log('result token');
                console.log(result);

                if (token === result.token) {
                    console.log('token is good, token of ' + result.firstName);
                    res.send(200, result);

                } else {
                    res.send(200, 'nope');
                    console.log('nope');
                }
            } else {
                res.send(200, 'nope and nope');
                console.log('nope and nope');
            }
            db.close();
        });


    });


});

app.listen(port);