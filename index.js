var Factory = require('./model/Factory.js');
var Common = require('../common/Common.js');

const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/cliente', (req, res) => {
//     var factory = new Factory();
//     var o = factory.CreateObj('Cliente');
//     var oTMng = factory.CreateMng(o);
    
//     oTMng.Action('lst', (data) => 
//     res.send(JSON.stringify(data)))
// });

// app.get('/aduana', (req, res) => {
//     var factory = new Factory();
//     var o = factory.CreateObj('Aduana');
//     var oTMng = factory.CreateMng(o);
    
//     oTMng.Action('lst', (data) => 
//     res.send(JSON.stringify(data)))
// });

app.get(/.*/, function (req, res) {
    var strReq = req.originalUrl;
    strReq = Common.Capitalize(strReq.replace('/',''));
    var factory = new Factory();
    var o = factory.CreateObj(strReq);
    var oTMng = factory.CreateMng(o);
    
    oTMng.Action('lst', (data) => 
    res.send(JSON.stringify(data)))
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
