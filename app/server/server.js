const express = require('express');
//const mongodb = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3005;


app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/myUsers')
    .then(() => console.log('success connection to the data base'))
    .catch(err => console.log('There is error : ' + err));

//
// app.get('/get-my-data', (req, res) => {
//     res.send(200, 'Hello World?');
// });
//
// app.listen(port);
