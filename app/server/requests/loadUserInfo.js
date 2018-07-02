const endPoints = require('../../src/common/endPointsList');
const mongodb = require('mongodb').MongoClient;
const socialNetworkDb = 'socialNetwork';
const usersCollection = 'users';

const loadUserInfo = (req,res) => {
    const params = req.body;
    const token = params.token;
    mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(socialNetworkDb);
        const myCollection = myDb.collection(usersCollection);
        myCollection.findOne({token}, (err, result) => {
            try {
                if (err) {
                    throw new Error(`Error is somewhere in checking token: ${err}`);
                }
            } catch (err) {
                console.log(err);
            }
            if (result) {
                if (token === result.token) {
                    res.send(200, result);
                } else {
                    res.send(200, 'nope');
                }
            } else {
                res.send(200, 'nope and nope');
            }
            db.close();
        });
    });
};

module.exports = {loadUserInfo};
