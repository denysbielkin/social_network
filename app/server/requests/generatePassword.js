const pswHash = require('password-hash');

const endPoints = require('../../src/common/endPointsList');
const commonServerData = require ('../commonServerData');


const generatePassword = (req, res) =>{
    const params = req.body;
    const token = params.token;


    commonServerData.mongodb.connect(endPoints.db, (err, db) => {
        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);

        const newPass = commonServerData.randomStringGenerator();
        const passwordToDb = pswHash.generate(newPass);

        const updatedUserInfo = {
            $set: {
                password: passwordToDb,

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
            if(result){
                const dataToSend = {
                    show:true,
                    type: 'success',
                    tittle: ` Success! You have new password: ${newPass} You should save it.`
                };
                res.send(200, dataToSend);

            }else{
                console.log('no result')
            }
            db.close();
        });
    });
};

module.exports = {generatePassword};