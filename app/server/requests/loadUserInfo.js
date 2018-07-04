const endPoints = require('../../src/common/endPointsList');
const commonServerData = require ('../commonServerData');

const loadUserInfo = (req,res) => {
    const params = req.body;
    const token = params.token;
    commonServerData.mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);
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
