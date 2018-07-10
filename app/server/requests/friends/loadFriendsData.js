const endPoints = require('../../../src/common/endPointsList');
const commonServerData = require ('../../commonServerData');

const findByFriendsListInDb = (myDb, myCollection, friendsIds, callback) => {
    return myCollection.find({"userId": { $in:friendsIds}}).toArray(function(err, result) {
        if (result) {
            console.log('found it');
            callback(result);
        } else {
            console.log('not Found');
        }
    });
};

const loadFriendsData = async (req, res) => {
    const friendsIds = req.body;
    commonServerData.mongodb.connect(endPoints.db, async (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);
        findByFriendsListInDb(myDb, myCollection, friendsIds, function(result){
            res.send(200, result);
        });
        db.close();
    });
};

module.exports = {loadFriendsData};