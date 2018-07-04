const endPoints = require('../../src/common/endPointsList');
const commonServerData = require ('../commonServerData');
const {Validations} = require("../../src/common/Validations.js");

const updateUserInfo = (req,res) => {
    const params = req.body;
    const token = params.token;
    delete params.token;
    console.log(params);
    console.log('params');
    console.log(token);
    console.log('token');
    console.log(5)
    console.log(params)
    const validationFlag = Validations.validateForm(params);
    console.log(validationFlag)
    if (validationFlag) {
        console.log('1');
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
                console.log(result.age);
                console.log('Document updated');

                res.send(200, validationFlag);

                db.close();
            });
        });

    } else {
        console.log(':Data is not valid!:');
        res.send(200, validationFlag);
    }


  };
module.exports = {updateUserInfo};