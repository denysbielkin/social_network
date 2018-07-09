const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;
const bodyParser = require('body-parser');

const endPoints = require('../src/common/endPointsList');

const {saveNewUser} = require('./requests/saveNewUser');
const {checkingAuthOfUser} = require('./requests/checkingAuthOfUser');
const {loadUserInfo} = require('./requests/loadUserInfo');
const {loadAnotherUserInfo} = require('./requests/loadAnotherUserInfo');
const {updateUserInfo} = require('./requests/updateUserInfo');
const {loadUsersForSearch} = require('./requests/loadUsersForSearch');

app.use(cors());//todo: use proxy instead of cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post(endPoints.saveNewUser,saveNewUser);

app.post(endPoints.checkingAuthOfUser,checkingAuthOfUser);

app.post(endPoints.loadUserInfo, loadUserInfo);

app.post(endPoints.updateUserInfo, updateUserInfo);

app.post(endPoints.loadUsersForSearch, loadUsersForSearch);

app.post(endPoints.loadAnotherUserPage, loadAnotherUserInfo);

app.listen(port);
