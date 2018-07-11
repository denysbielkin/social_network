const endPoints = require('../../../src/common/endPointsList');

const commonServerData = require('../../commonServerData');

const checkFriendsList = (req, res) => {


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
                    if (friendId === findResult.userId) {
                        console.log('You can\'t make friendship with yourself');
                        const dataToSend = {
                            isFriend: false, isItMe: true
                        };
                        res.send(200, dataToSend);
                    }

                    for (let i in currentFriendListFormDb) {
                        if (currentFriendListFormDb[i] === friendId) {
                            console.log('Already friends');
                            const dataToSend = {
                                isFriend: true, isItMe: false
                            };
                            res.send(200, dataToSend);
                            break;
                        }
                    }

                    db.close();
                }
            );
        });
};

module.exports = {checkFriendsList};
