const endPoints = require('../../src/common/endPointsList');
const commonServerData = require ('../commonServerData');
const {Validations} = require("../../src/common/Validations.js");

const updateUserInfo = (req,res) => {
    const params = req.body;
    const token = params.token;
    delete params.token;
    const validationFlag = Validations.validateForm(params);
    if (validationFlag) {
        commonServerData.mongodb.connect(endPoints.db, (err, db) => {
            const myDb = db.db(commonServerData.socialNetworkDb);
            const myCollection = myDb.collection(commonServerData.usersCollection);
            const updatedUserInfo = {
                $set: {
                    firstName: params.firstName.content,
                    middleName: params.middleName.content,
                    lastName: params.lastName.content,
                    age: params.age.content
                }
            };

            myCollection.updateOne(token, updatedUserInfo ,(err, result) => {
                try {
                    if (err) {
                        throw new Error(`Error in somewhere: ${err}`);
                    }
                } catch (err) {
                    console.log(err);
                }
                res.send(200, validationFlag);
                db.close();
            });
        });

    } else {
        res.send(200, validationFlag);
    }


  };
module.exports = {updateUserInfo};