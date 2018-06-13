const express = require('express');
const cors = require('cors');
const app = express();
const port = 3005;
app.use(cors());
app.get('/get-my-data', (req,res)=>{
    res.send(200,'Hello World?');
});

app.listen(port);
// app.listen(port+'/get-my-data', (res,req)=>{ res.send(200,'Hello World?');});
//module.exports = router;