const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;
const bodyParser = require('body-parser');

const endPoints = require('../src/common/endPointsList');

const {saveNewUser} = require ('./requests/saveNewUser');
const {checkingAuthOfUser} = require ('./requests/checkingAuthOfUser');
const {loadUserInfo} = require ('./requests/loadUserInfo');
const {updateUserInfo} = require ('./requests/updateUserInfo');

app.use(cors());//todo: use proxy instead of cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post(endPoints.saveNewUser, (req, res) => {
    saveNewUser(req,res);
});

app.post(endPoints.checkingAuthOfUser, (req, res) => {
  checkingAuthOfUser(req,res);
});

app.post(endPoints.loadUserInfo, (req, res) => {
   loadUserInfo(req,res);
});

app.post(endPoints.updateUserInfo, (req, res) => {
   updateUserInfo(req,res);
});

app.listen(port);
