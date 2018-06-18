// const mongodb = require('mongodb').MongoClient;
// const users = require('./usersCollection');
// const mongoose = require('mongoose');
//
//
// const Schema = mongoose.Schema;
// mongoose.connect('mongodb://127.0.0.1:27017/myUsers')
//     .then(() => console.log('success connection to the data base'))
//     .catch(err => console.log('There is error : ' + err));
//
//
// mongodb.connect('mongodb://127.0.0.1:27017/myUsers', (err, db) => {
//     const myDb = db.db('socialNetwork');
//     const myCollection = myDb.collection('users');
//
//     myCollection.insertMany(users, (err, result) => {
//
//
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('Connection successful', result.ops);
//         db.close();
//     });
//
// });

