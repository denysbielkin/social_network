const Validations = require("../src/common/Validations.js");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
//const insertUserInDb = require('./db/insertUser');
const pswHash = require('password-hash');




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
const signUpEndPoint = '/sign-up';

app.post('/save-new-user', (req, res) => {
    const params = req.body;
    const validationFlag = Validations.Validations.validateForm(params);

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


            mongodb.connect('mongodb://127.0.0.1:27017/myUsers', (err, db) => {
                const myDb = db.db('socialNetwork');
                const myCollection = myDb.collection('users');
                myCollection.findOne({email: userInfo.email}, (err, result) => {

                    if (err) {
                        throw err;
                    }
                    if (result === null) {
                        console.log('No results');
                        myCollection.insertOne(userInfo, (err, result) => {

                            if (err) {
                                throw err;
                            }

                            res.send(200, 'Account has been created! Congrats! Take your password: ' + notHPassword)
                        });
                    } else {
                        res.send(200, 'This user already exist')

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
app.listen(port);