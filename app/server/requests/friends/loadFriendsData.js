const endPoints = require('../../../src/common/endPointsList');
const commonServerData = require ('../../commonServerData');

const loadFriendsData = (req, res)=>{
    const params = req.body;
    const friendsIds = params.friendsIds;
    commonServerData.mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);
        myCollection.findOne({friendsIds}, (err, result) => {
            try {
                if (err) {
                    throw new Error(`Error is somewhere in checking friends list: ${err}`);
                }
            } catch (err) {
                console.log(err);
            }
            if (result) {
                if (friendsIds === result.friendsList) {
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

module.exports = {loadFriendsData};