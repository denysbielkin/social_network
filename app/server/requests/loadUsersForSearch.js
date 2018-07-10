const endPoints = require('../../src/common/endPointsList');
const commonServerData = require('../commonServerData');

const findByNameInDb = (myDb, myCollection, name, callback) => {
    return myCollection.find({$or:[{"firstName":name},{"middleName":name}, {"lastName": name}]}).toArray(function(err, result) {
        if (result) {
            callback(result);
        } else {
            console.log('not Found');
        }
    });
};

const loadUsersForSearch = async (req, res) => {
    const name = req.body.name;
    commonServerData.mongodb.connect(endPoints.db, async (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);
        findByNameInDb(myDb, myCollection, name, function(result){
            res.send(200, result);
        });
        db.close();
    });
};

module.exports = {loadUsersForSearch};