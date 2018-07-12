const endPoints = require('../../../src/common/endPointsList');
const commonServerData = require('../../commonServerData');

const addFriend = (req, res) => {
    const params = req.body;
    const token = params.token;
    const userId = params.userId;
    const friendId = params.friendId;

    commonServerData.mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);

        const updatedFriendsList = {
            $push: {
                friendsList: friendId
            }
        };
        const updatedFriendsListOfFriend = {
            $push: {
                friendsList: userId
            }
        };
        myCollection.updateOne({token}, updatedFriendsList, (err, result) => {
            try {
                if (err) {
                    throw new Error(`Error in somewhere: ${err}`);
                }
            } catch (err) {
                console.log(err);
            }
            if (result) {

                myCollection.updateOne({userId: friendId}, updatedFriendsListOfFriend, (err, result) => {
                    try {
                        if (err) {
                            throw new Error(`Error in somewhere: ${err}`);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    if (result) {
                        res.send(200, 'added successfully');
                        db.close();
                    } else {
                        console.log('result is not exist')
                    }
                });
                // db.close();
            } else {
                console.log('result is not exist')
            }
        });

});


};

module.exports = {addFriend};