//import db from './db'

const Validations = require("./Validations.js");
//import Validations from '../src/Validations.js'
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/myUsers');
// mongoose.Promise = global.Promise;
// const myDb = mongoose.connection;
// const userTextValuesSchema = new mongoose.Schema({
//     content: String,
//     isValid: Boolean
// });
//
// const userNumberValuesSchema = new mongoose.Schema({
//     content: Number,
//     isValid: Boolean
// });
//
//
// const userPhotoValuesSchema = new mongoose.Schema({
//     content: Buffer,
//     isValid: Boolean
// });
//
//
// const userSchema = new mongoose.Schema({
//     firstName: userTextValuesSchema,
//     lastName: userTextValuesSchema,
//     middleName: userTextValuesSchema,
//     email: userTextValuesSchema,
//     gender: userTextValuesSchema,
//     age: userNumberValuesSchema,
//     photo: userPhotoValuesSchema,
// }, {collection:'users'});
//
// const UserData = mongoose.model('UserData', userSchema);
//






app.use(cors());//todo: use proxy instead of cors
app.use(bodyParser.urlencoded({extended: true}));


const passwordGenerator = () => {
    const max = 20;
    const min = 15;
    const length = Math.random() * (max - min) + min;
    let string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    let numeric = '0123456789';
    let punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
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





app.post('/save-new-user', (req, res) => {
    const params = req.body;
    const validationFlag = Validations.validateForm(params);
    if (validationFlag) {
        console.log(params, ':123:');


        const userInfo={
            firstName: params.firstName.content,
            lastName: params.lastName.content,
            middleName: params.middleName.content,
            email: params.email.content,
            gender: params.gender.content,
            age: params.age.content,
            photo: params.photo.content,
            password: passwordGenerator()
        };


        mongodb.connect('mongodb://127.0.0.1:27017/myUsers', (err, db) => {
            const myDb = db.db('socialNetwork');
            const myCollection = myDb.collection('users');

            myCollection.insertOne(userInfo, (err, result) => {

                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Connection successful', result.ops);
                

                db.close();
            });

        });

        //
        // const data = new UserData(userInfo);
        // data.save();

        // res.send(200, userInfo.firstName.content);
    } else {
        console.log(':Data is not valid!:');
        res.send(200, ':Data is not valid!:');
    }


});
app.listen(port);
//
// });
//
//
//


//

//
// app.get('/get-my-data', (req, res) => {
//     res.send(200, 'Hello World?');
// });
//
// app.listen(port);
