//todo inserting new user in this file!


// const mongodb = require('mongodb').MongoClient;


//
//
// module.exports =
//     {
//         insertUserInDb: (res, notHPassword, userInfo) => {
//
//
//             mongodb.connect('mongodb://127.0.0.1:27017/myUsers', (err, db) => {
//                 const myDb = db.db('socialNetwork');
//                 const myCollection = myDb.collection('users');
//                 myCollection.findOne({email: userInfo.email}, (err, result) => {
//
//                     if (err) {
//                         throw err;
//                     }
//                     if (result === null) {
//                         console.log('No results');
//                         myCollection.insertOne(userInfo, (err, result) => {
//
//                             if (err) {
//                                 throw err;
//                             }
//
//                             res.send(200, 'Account has been created! Congrats! Take your password: ' + notHPassword)
//                         });
//                     } else {
//                         res.send(200, 'This user already exist')
//
//                     }
//                     db.close();
//                 });
//
//
//             });
//         }
//     };
//
