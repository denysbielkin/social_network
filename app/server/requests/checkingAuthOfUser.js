const jwt = require('jsonwebtoken');
const pswHash = require('password-hash');
const endPoints = require('../../src/common/endPointsList');

const commonServerData = require('../commonServerData');

const checkingAuthOfUser = (req, res) => {
    const params = req.body;
    const userInfo = {
        email: params.email,
        password: params.password
    };

    commonServerData.mongodb.connect(endPoints.db, (err, db) => {

        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);

        myCollection.findOne({email: userInfo.email}, (err, result) => {
            let dataToSend;




                try {
                    if (err) {
                        throw new Error(`Error is somewhere in auth: ${err}`);
                    }
                } catch (err) {
                    console.log(err);
                }
            const hashFlag = pswHash.verify(userInfo.password, result.password);
                if (!result) {

                    dataToSend = {
                        show: true,
                        type: 'danger',
                        tittle: `Fail! We haven't this user`
                    };
                    res.send(200, dataToSend);
                } else {

                    if (userInfo.email === result.email) {

                        if (!hashFlag) {
                            dataToSend = {
                                show: true,
                                type: 'danger',
                                tittle: 'Fail! Wrong data'
                            };
                            res.send(200, dataToSend);
                        } else {
                            const token = jwt.sign({id: userInfo.email}, 'auth-user', {
                                expiresIn: 86400 // 24h
                            });
                            dataToSend = {
                                show: true,
                                type: 'success',
                                tittle: 'Congrats! You are in',
                                token,
                                userId: result.userId
                            };
                            myCollection.update({email: result.email}, {...result, token});

                            res.send(200, dataToSend);
                        }
                    } else {
                        dataToSend = {
                            show: true,
                            type: 'danger',
                            tittle: 'Fail! Wrong data'
                        };
                        res.send(200, dataToSend);
                    }

                }

            db.close();

        });
    });
};

module.exports = {checkingAuthOfUser};
