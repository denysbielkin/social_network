// //import db from './models/db'


//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3005;
const bodyParser = require('body-parser');


app.use(cors());//todo: use proxy instead of cors
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save-new-user', (req, res) => {
const params  = req.body;
    console.log(params, ':', params.value);
    res.send(200, params.value);


});
app.listen(port);
//
// });
//
//
//


//
// mongoose.connect('mongodb://127.0.0.1:27017/myUsers')
//     .then(() => console.log('success connection to the data base'))
//     .catch(err => console.log('There is error : ' + err));

//
// app.get('/get-my-data', (req, res) => {
//     res.send(200, 'Hello World?');
// });
//
// app.listen(port);
