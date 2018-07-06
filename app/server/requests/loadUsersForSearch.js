const endPoints = require('../../src/common/endPointsList');
const commonServerData = require('../commonServerData');


let findFlag = false;

const findByNameInDb = async (myDb, myCollection, name, type) => {
    let myResult;
    return await myCollection.find({[type]: name}).toArray(async (err, result) => {
    console.log('name')
    console.log(name)
    console.log('type')
    console.log(type)
        if (result) {
            console.log('result')
            console.log(result)
            const filteredDataToSend = {
                firstName: result.firstName,
                middleName: result.middleName,
                lastName: result.lastName,
                age: result.age,
                email: result.email,
                gender: result.gender,
                photo: result.photo
            };
            console.log('-----ESTT---------------')
            console.log(filteredDataToSend)

            if (!findFlag) {
                findFlag = true;
            }
            console.log('------------------ressssult--------------')
            console.log(result)
return result;

        } else {
            if (findFlag) {
                findFlag = false;
            }
            console.log('notFound');
        }
    })


};

const loadUsersForSearch = async (req, res) => {
    const name = req.body.name;
    console.log('_Start_');
    console.log('search name:');
    console.log(name);

    commonServerData.mongodb.connect(endPoints.db, async (err, db) => {

        const myDb = db.db(commonServerData.socialNetworkDb);
        const myCollection = myDb.collection(commonServerData.usersCollection);
        const totalResultOfSearch = [];


        const names = ['firstName', 'middleName', 'lastName'];
        names.map (async(thisName, i)=> {

            console.log('_______________TEST___1')

            totalResultOfSearch[i] = await findByNameInDb(myDb, myCollection, name,thisName);
            console.log(totalResultOfSearch[i] = await findByNameInDb(myDb, myCollection, name,thisName))
            console.log('_______________TEST___2')
            const onetwo = await findByNameInDb(myDb, myCollection, name,thisName);
            console.log(onetwo)


        })

        console.log('__totalResult:__');
        console.log(totalResultOfSearch);

        res.send(200, totalResultOfSearch);
        db.close();
        console.log('_End_');

    });

};

module.exports = {loadUsersForSearch};