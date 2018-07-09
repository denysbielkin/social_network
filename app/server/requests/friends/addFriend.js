const endPoints = require('../../../src/common/endPointsList');
const commonServerData = require('../../commonServerData');

const addFriend = (req, res) => {
    const params = req.body;
    const token = params.token;
    const friendId = params.friendId;
    commonServerData.mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);

        let currentFriendListFormDb = [];
        myCollection.findOne({token}, (err, findResult) => {
            if (err) {
                throw new Error(`Error in somewhere searching equals : ${err}`);
            }
            if (findResult) {
                currentFriendListFormDb = findResult.friendsList;
            } else {
                console.log('findResult not found')
            }
            let friendExistFlag = false;
            if( friendId===findResult.userId){
                console.log('You can\'t make friendship yourself');
                res.send(200, 'You can\'t make friendship yourself');
                friendExistFlag = true;
            }

            for (let i in currentFriendListFormDb) {
                if (currentFriendListFormDb[i] === friendId) {
                    console.log('Already friends');
                    res.send(200, 'Already friends');
                    friendExistFlag = true;
                    break;
                }
            }
            if (!friendExistFlag) {
                const updatedFriendsList = {
                    $push: {
                        friendsList: friendId
                    }
                };
                const updatedFriendsListOfFriend = {
                    $push: {
                        friendsList: findResult.userId
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
                        console.log('result is exist')
                        res.send(200, 'good');
                        db.close();
                    } else {
                        console.log('result is not exist')
                    }
                   //todo save "friend id" in documents of both users
                });

            }
        });
    });


};

module.exports = {addFriend};