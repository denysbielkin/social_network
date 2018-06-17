// const mongodb = require('mongodb').MongoClient;
// const users = require('./usersCollection');
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